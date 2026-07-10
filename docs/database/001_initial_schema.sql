-- Website Builder SaaS MVP - PostgreSQL 16+
-- Run in a new database. Application code must set app.tenant_id for tenant-scoped requests.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TYPE tenant_status AS ENUM ('trial', 'active', 'suspended', 'cancelled');
CREATE TYPE subscription_plan AS ENUM ('basic', 'standard', 'pro');
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'past_due', 'suspended', 'cancelled');
CREATE TYPE user_role AS ENUM ('platform_admin', 'customer_owner');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TYPE site_status AS ENUM ('draft', 'published', 'unpublished');
CREATE TYPE record_status AS ENUM ('active', 'inactive', 'archived');
CREATE TYPE domain_type AS ENUM ('subdomain', 'custom');
CREATE TYPE domain_status AS ENUM ('pending', 'active', 'failed');
CREATE TYPE page_type AS ENUM ('home', 'services', 'gallery', 'contact');
CREATE TYPE price_type AS ENUM ('fixed', 'from', 'range', 'contact');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'won', 'lost', 'spam');
CREATE TYPE media_status AS ENUM ('active', 'archived');
CREATE TYPE ai_feature AS ENUM ('business_intro', 'service_description', 'faq', 'seo');
CREATE TYPE release_status AS ENUM ('building', 'published', 'failed');

CREATE FUNCTION set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END $$;

CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(160) NOT NULL,
  slug varchar(50) NOT NULL,
  industry varchar(120),
  status tenant_status NOT NULL DEFAULT 'trial',
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT tenants_slug_format CHECK (slug ~ '^[a-z0-9](?:[a-z0-9-]{1,48}[a-z0-9])$'),
  CONSTRAINT tenants_slug_reserved CHECK (slug NOT IN
    ('admin','api','app','cms','www','static','assets','support','billing','login','logout','root'))
);
CREATE UNIQUE INDEX tenants_slug_uq ON tenants (lower(slug));

CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL UNIQUE REFERENCES tenants(id) ON DELETE RESTRICT,
  plan subscription_plan NOT NULL DEFAULT 'basic',
  status subscription_status NOT NULL DEFAULT 'trial',
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  internal_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT subscriptions_date_range CHECK (ends_at IS NULL OR ends_at > starts_at)
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE RESTRICT,
  email citext NOT NULL UNIQUE,
  password_hash text NOT NULL,
  full_name varchar(160) NOT NULL,
  phone varchar(30),
  role user_role NOT NULL,
  status user_status NOT NULL DEFAULT 'active',
  password_changed_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT users_role_tenant_ck CHECK (
    (role = 'platform_admin' AND tenant_id IS NULL) OR
    (role = 'customer_owner' AND tenant_id IS NOT NULL)
  )
);
CREATE INDEX users_tenant_idx ON users (tenant_id) WHERE tenant_id IS NOT NULL;

CREATE TABLE auth_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash char(64) NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX auth_sessions_user_active_idx ON auth_sessions (user_id, expires_at)
  WHERE revoked_at IS NULL;

CREATE TABLE templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar(80) NOT NULL UNIQUE,
  name varchar(120) NOT NULL,
  industry varchar(120),
  thumbnail_url text,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  status record_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT templates_config_object CHECK (jsonb_typeof(config) = 'object')
);

CREATE TABLE sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL UNIQUE REFERENCES tenants(id) ON DELETE RESTRICT,
  template_id uuid NOT NULL REFERENCES templates(id) ON DELETE RESTRICT,
  name varchar(160) NOT NULL,
  business_name varchar(160) NOT NULL,
  status site_status NOT NULL DEFAULT 'draft',
  logo_asset_id uuid,
  favicon_asset_id uuid,
  primary_color varchar(7) NOT NULL DEFAULT '#2563EB',
  secondary_color varchar(7) NOT NULL DEFAULT '#0F172A',
  font_preset varchar(40) NOT NULL DEFAULT 'sans',
  slogan varchar(200),
  short_description varchar(500),
  industry varchar(120),
  current_release_id uuid,
  last_published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT sites_primary_color_ck CHECK (primary_color ~ '^#[0-9A-Fa-f]{6}$'),
  CONSTRAINT sites_secondary_color_ck CHECK (secondary_color ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE TABLE domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  hostname citext NOT NULL UNIQUE,
  type domain_type NOT NULL,
  status domain_status NOT NULL DEFAULT 'pending',
  is_primary boolean NOT NULL DEFAULT false,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT domains_hostname_ck CHECK (
    hostname::text = lower(hostname::text) AND
    hostname::text ~ '^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$'
  ),
  CONSTRAINT domains_primary_active_ck CHECK (NOT is_primary OR status = 'active')
);
CREATE UNIQUE INDEX domains_one_primary_per_site_uq ON domains (site_id) WHERE is_primary;
CREATE INDEX domains_site_idx ON domains (site_id);
CREATE INDEX domains_tenant_idx ON domains (tenant_id);

CREATE TABLE media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  original_filename varchar(255) NOT NULL,
  storage_key text NOT NULL UNIQUE,
  public_url text NOT NULL,
  mime_type varchar(100) NOT NULL,
  size_bytes bigint NOT NULL,
  width integer,
  height integer,
  alt_text varchar(300),
  caption varchar(500),
  status media_status NOT NULL DEFAULT 'active',
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT media_size_ck CHECK (size_bytes > 0 AND size_bytes <= 5242880),
  CONSTRAINT media_mime_ck CHECK (mime_type IN ('image/jpeg','image/png','image/webp')),
  CONSTRAINT media_dimensions_ck CHECK ((width IS NULL OR width > 0) AND (height IS NULL OR height > 0))
);
CREATE INDEX media_assets_site_status_idx ON media_assets (site_id, status, created_at DESC);

ALTER TABLE sites ADD CONSTRAINT sites_logo_fk FOREIGN KEY (logo_asset_id) REFERENCES media_assets(id) ON DELETE SET NULL;
ALTER TABLE sites ADD CONSTRAINT sites_favicon_fk FOREIGN KEY (favicon_asset_id) REFERENCES media_assets(id) ON DELETE SET NULL;

CREATE TABLE site_contact_settings (
  site_id uuid PRIMARY KEY REFERENCES sites(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  phone varchar(30) NOT NULL,
  email citext,
  zalo_url text,
  facebook_url text,
  tiktok_url text,
  instagram_url text,
  address text,
  google_map_embed_url text,
  opening_hours text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  title varchar(160) NOT NULL,
  slug varchar(80) NOT NULL,
  page_type page_type NOT NULL,
  status record_status NOT NULL DEFAULT 'active',
  seo_title varchar(70),
  seo_description varchar(160),
  og_image_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  noindex boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pages_slug_ck CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT pages_site_slug_uq UNIQUE (site_id, slug),
  CONSTRAINT pages_site_type_uq UNIQUE (site_id, page_type)
);
CREATE INDEX pages_tenant_site_idx ON pages (tenant_id, site_id);

CREATE TABLE site_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  block_key varchar(80) NOT NULL,
  block_type varchar(50) NOT NULL,
  title varchar(160),
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_blocks_data_object CHECK (jsonb_typeof(data) = 'object'),
  CONSTRAINT site_blocks_order_ck CHECK (sort_order >= 0),
  CONSTRAINT site_blocks_key_uq UNIQUE (page_id, block_key)
);
CREATE INDEX site_blocks_page_order_idx ON site_blocks (page_id, sort_order);

CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  name varchar(120) NOT NULL,
  short_description varchar(300) NOT NULL,
  long_description text,
  image_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  price_type price_type NOT NULL DEFAULT 'contact',
  price_min numeric(14,2),
  price_max numeric(14,2),
  duration varchar(100),
  is_featured boolean NOT NULL DEFAULT false,
  status record_status NOT NULL DEFAULT 'active',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT services_price_ck CHECK (
    (price_type = 'contact' AND price_min IS NULL AND price_max IS NULL) OR
    (price_type IN ('fixed','from') AND price_min IS NOT NULL AND price_min >= 0 AND price_max IS NULL) OR
    (price_type = 'range' AND price_min IS NOT NULL AND price_max IS NOT NULL AND price_min >= 0 AND price_max >= price_min)
  ),
  CONSTRAINT services_order_ck CHECK (sort_order >= 0)
);
CREATE INDEX services_site_list_idx ON services (site_id, status, sort_order);

CREATE TABLE price_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  name varchar(120) NOT NULL,
  description text,
  price_type price_type NOT NULL DEFAULT 'contact',
  price_min numeric(14,2),
  price_max numeric(14,2),
  unit varchar(50),
  note varchar(300),
  is_featured boolean NOT NULL DEFAULT false,
  status record_status NOT NULL DEFAULT 'active',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT price_items_price_ck CHECK (
    (price_type = 'contact' AND price_min IS NULL AND price_max IS NULL) OR
    (price_type IN ('fixed','from') AND price_min IS NOT NULL AND price_min >= 0 AND price_max IS NULL) OR
    (price_type = 'range' AND price_min IS NOT NULL AND price_max IS NOT NULL AND price_min >= 0 AND price_max >= price_min)
  ),
  CONSTRAINT price_items_order_ck CHECK (sort_order >= 0)
);
CREATE INDEX price_items_site_list_idx ON price_items (site_id, status, sort_order);

CREATE TABLE gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  media_asset_id uuid NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  caption varchar(500),
  alt_text varchar(300),
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT gallery_site_asset_uq UNIQUE (site_id, media_asset_id),
  CONSTRAINT gallery_order_ck CHECK (sort_order >= 0)
);
CREATE INDEX gallery_items_site_order_idx ON gallery_items (site_id, is_visible, sort_order);

CREATE TABLE faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  question varchar(500) NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  status record_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT faqs_order_ck CHECK (sort_order >= 0)
);
CREATE INDEX faqs_site_list_idx ON faqs (site_id, status, sort_order);

CREATE TABLE testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  customer_name varchar(160) NOT NULL,
  rating smallint NOT NULL,
  comment text NOT NULL,
  avatar_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  status record_status NOT NULL DEFAULT 'active',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT testimonials_rating_ck CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT testimonials_order_ck CHECK (sort_order >= 0)
);
CREATE INDEX testimonials_site_list_idx ON testimonials (site_id, status, sort_order);

-- Immutable public snapshots. Build snapshot in application code inside one DB transaction.
CREATE TABLE site_releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  version integer NOT NULL,
  status release_status NOT NULL DEFAULT 'building',
  snapshot jsonb NOT NULL,
  published_by uuid REFERENCES users(id) ON DELETE SET NULL,
  published_at timestamptz,
  failure_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_releases_snapshot_object CHECK (jsonb_typeof(snapshot) = 'object'),
  CONSTRAINT site_releases_version_ck CHECK (version > 0),
  CONSTRAINT site_releases_version_uq UNIQUE (site_id, version),
  CONSTRAINT site_releases_state_ck CHECK (
    (status = 'published' AND published_at IS NOT NULL AND failure_reason IS NULL) OR
    (status = 'failed' AND failure_reason IS NOT NULL) OR
    (status = 'building' AND published_at IS NULL)
  )
);
CREATE INDEX site_releases_site_latest_idx ON site_releases (site_id, version DESC);
ALTER TABLE sites ADD CONSTRAINT sites_current_release_fk
  FOREIGN KEY (current_release_id) REFERENCES site_releases(id) ON DELETE RESTRICT DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE RESTRICT,
  interested_service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  full_name varchar(160) NOT NULL,
  phone varchar(30) NOT NULL,
  email citext,
  message varchar(1000) NOT NULL,
  source_page varchar(120),
  status lead_status NOT NULL DEFAULT 'new',
  internal_note text,
  ip_address_hash char(64),
  user_agent varchar(500),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX leads_site_created_idx ON leads (site_id, created_at DESC);
CREATE INDEX leads_tenant_status_created_idx ON leads (tenant_id, status, created_at DESC);
CREATE INDEX leads_phone_search_idx ON leads (tenant_id, phone);
CREATE INDEX leads_name_search_idx ON leads (tenant_id, lower(full_name));

CREATE TABLE ai_generation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  feature ai_feature NOT NULL,
  provider varchar(80) NOT NULL,
  model varchar(120),
  input jsonb NOT NULL DEFAULT '{}'::jsonb,
  output jsonb,
  input_tokens integer,
  output_tokens integer,
  success boolean NOT NULL DEFAULT true,
  error_code varchar(100),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ai_input_object_ck CHECK (jsonb_typeof(input) = 'object'),
  CONSTRAINT ai_tokens_ck CHECK (
    (input_tokens IS NULL OR input_tokens >= 0) AND (output_tokens IS NULL OR output_tokens >= 0)
  )
);
CREATE INDEX ai_generation_logs_tenant_created_idx ON ai_generation_logs (tenant_id, created_at DESC);

CREATE TABLE audit_logs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tenant_id uuid REFERENCES tenants(id) ON DELETE SET NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action varchar(100) NOT NULL,
  entity_type varchar(80) NOT NULL,
  entity_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  ip_address_hash char(64),
  request_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT audit_metadata_object_ck CHECK (jsonb_typeof(metadata) = 'object')
);
CREATE INDEX audit_logs_tenant_created_idx ON audit_logs (tenant_id, created_at DESC);
CREATE INDEX audit_logs_entity_idx ON audit_logs (entity_type, entity_id, created_at DESC);

-- Composite keys prevent a row from claiming tenant A while referencing a parent from tenant B.
ALTER TABLE sites ADD CONSTRAINT sites_id_tenant_uq UNIQUE (id, tenant_id);
ALTER TABLE pages ADD CONSTRAINT pages_id_site_tenant_uq UNIQUE (id, site_id, tenant_id);
ALTER TABLE services ADD CONSTRAINT services_id_site_tenant_uq UNIQUE (id, site_id, tenant_id);
ALTER TABLE media_assets ADD CONSTRAINT media_id_site_tenant_uq UNIQUE (id, site_id, tenant_id);

ALTER TABLE domains ADD CONSTRAINT domains_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE media_assets ADD CONSTRAINT media_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE site_contact_settings ADD CONSTRAINT contact_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE pages ADD CONSTRAINT pages_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE site_blocks ADD CONSTRAINT blocks_page_site_tenant_fk
  FOREIGN KEY (page_id, site_id, tenant_id) REFERENCES pages(id, site_id, tenant_id) ON DELETE CASCADE;
ALTER TABLE services ADD CONSTRAINT services_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE price_items ADD CONSTRAINT prices_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE gallery_items ADD CONSTRAINT gallery_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE gallery_items ADD CONSTRAINT gallery_media_site_tenant_fk
  FOREIGN KEY (media_asset_id, site_id, tenant_id) REFERENCES media_assets(id, site_id, tenant_id) ON DELETE CASCADE;
ALTER TABLE faqs ADD CONSTRAINT faqs_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE testimonials ADD CONSTRAINT testimonials_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE site_releases ADD CONSTRAINT releases_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE CASCADE;
ALTER TABLE leads ADD CONSTRAINT leads_site_tenant_fk
  FOREIGN KEY (site_id, tenant_id) REFERENCES sites(id, tenant_id) ON DELETE RESTRICT;
ALTER TABLE leads ADD CONSTRAINT leads_service_site_tenant_fk
  FOREIGN KEY (interested_service_id, site_id, tenant_id)
  REFERENCES services(id, site_id, tenant_id) ON DELETE SET NULL (interested_service_id);

-- Keep updated_at reliable even if an application forgets it.
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'tenants','subscriptions','users','templates','sites','domains','media_assets',
    'site_contact_settings','pages','site_blocks','services','price_items',
    'gallery_items','faqs','testimonials','leads'
  ] LOOP
    EXECUTE format('CREATE TRIGGER %I_set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at()', t, t);
  END LOOP;
END $$;

-- Optional defense in depth. The application DB role must not have BYPASSRLS.
CREATE FUNCTION current_tenant_id() RETURNS uuid LANGUAGE sql STABLE AS $$
  SELECT nullif(current_setting('app.tenant_id', true), '')::uuid
$$;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'subscriptions','sites','domains','media_assets','site_contact_settings','pages',
    'site_blocks','services','price_items','gallery_items','faqs','testimonials',
    'site_releases','leads','ai_generation_logs'
  ] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %I USING (tenant_id = current_tenant_id()) WITH CHECK (tenant_id = current_tenant_id())', t
    );
  END LOOP;
END $$;

COMMIT;

-- Per request/transaction example:
-- BEGIN;
-- SELECT set_config('app.tenant_id', '00000000-0000-0000-0000-000000000000', true);
-- ... tenant-scoped queries ...
-- COMMIT;
