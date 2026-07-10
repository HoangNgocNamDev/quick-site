# Plan: Gom UI theo module (mức mạnh)

## Mục tiêu học tập

- Code thuộc module nào thì nằm trong module đó.
- Mở folder `app/(admin)` là hiểu hết UI Admin; tương tự CMS / Public / Auth.
- Chỉ giữ `components/ui/*` (shadcn) làm shared UI library.
- Chấp nhận lặp code nhỏ giữa Admin và CMS (PageHeader, SectionCard, shell…) để dễ học.

## Nguyên tắc đặt file

| Loại | Đặt ở đâu |
|---|---|
| Route / page / layout | `app/(module)/...` |
| UI chỉ dùng trong 1 module | `app/(module)/.../_components/` |
| shadcn primitives | `components/ui/` (giữ nguyên) |
| Mock data / types / format | `lib/`, `types/` (không phải UI — giữ) |

Folder `_components` (có `_`) **không tạo route** trong App Router — an toàn để colocate.

## Cấu trúc đích

```text
web/src/
  app/
    layout.tsx                 # root; toaster inline hoặc app/_components/toaster.tsx
    globals.css
    _components/
      toaster.tsx              # optional, chỉ root app

    (admin)/admin/
      _components/
        shell.tsx              # sidebar + topbar Admin (copy từ AppShell, hardcode nav)
        page-header.tsx
        section-card.tsx
        stat-card.tsx
        status-badge.tsx       # Tenant / Site / Plan / Lead badges
        mock-actions.tsx       # MockSubmitButton (và nếu cần)
      layout.tsx               # import shell local, không import @/components/layout
      page.tsx
      tenants/...
      leads/...

    (cms)/cms/
      _components/
        shell.tsx              # shell CMS riêng (copy + nav CMS)
        page-header.tsx        # copy (chấp nhận lặp)
        section-card.tsx
        stat-card.tsx
        status-badge.tsx       # Site / Lead / Content
        mock-actions.tsx       # SaveDraft / Publish / MockSubmit
        ai-suggest-button.tsx
        service-form.tsx
      layout.tsx
      page.tsx
      services/... pages/... settings/...

    (public-site)/
      _components/
        site-header.tsx
        site-footer.tsx
        floating-actions.tsx
        contact-form.tsx
        blocks.tsx
      layout.tsx
      page.tsx
      services/ contact/ gallery/

    (auth)/
      _components/
        login-form.tsx
      login/page.tsx
      admin/login/page.tsx
      cms/login/page.tsx

    (status)/
      _components/
        status-pages.tsx       # Suspended / Unpublished / ComingSoon
      suspended/ unpublished/ coming-soon/

  components/
    ui/                        # CHỈ shadcn — giữ
    # XÓA: layout/, auth/, cms/, public/

  lib/  types/                 # giữ nguyên
```

## Mapping file cũ → mới

| Hiện tại | Đích |
|---|---|
| `components/layout/app-shell.tsx` | Copy → `(admin)/admin/_components/shell.tsx` và `(cms)/cms/_components/shell.tsx` (nav hardcode trong từng shell hoặc layout) |
| `components/layout/page-header.tsx` | Copy → admin + cms `_components/page-header.tsx` |
| `components/layout/section-card.tsx` | Copy → admin + cms |
| `components/layout/stat-card.tsx` | Copy → admin + cms |
| `components/layout/empty-state.tsx` | Copy nếu còn dùng; không dùng thì bỏ |
| `components/layout/status-badge.tsx` | Split/copy badges theo module |
| `components/layout/mock-form-actions.tsx` | admin (MockSubmit) + cms (SaveDraft/Publish/MockSubmit) |
| `components/layout/ai-suggest-button.tsx` | cms `_components/` |
| `components/layout/app-toaster.tsx` | `app/_components/toaster.tsx` hoặc inline root layout |
| `components/cms/service-form.tsx` | `(cms)/cms/_components/service-form.tsx` |
| `components/auth/login-form.tsx` | `(auth)/_components/login-form.tsx` |
| `components/public/*` | `(public-site)/_components/*` |
| `components/public/status-pages.tsx` | `(status)/_components/status-pages.tsx` |

## Cách import sau refactor (ví dụ)

```ts
// app/(admin)/admin/page.tsx
import { PageHeader } from "./_components/page-header";
import { SectionCard } from "./_components/section-card";

// app/(admin)/admin/tenants/page.tsx  (nested)
import { PageHeader } from "../_components/page-header";
// hoặc deepest: import { PageHeader } from "../../_components/page-header";
```

Gợi ý học: nested pages import relative lên `_components` của module. Không dùng alias `@/components/layout/...` nữa.

Với CMS services form:

```ts
// app/(cms)/cms/services/new/page.tsx
import { ServiceForm } from "../_components/service-form";
// từ services/[serviceId]/edit → ../../../_components/service-form
```

## Shell Admin / CMS

Hai lựa chọn (chọn A cho dễ học):

**A. Shell tự chứa nav (khuyến nghị)**  
- `admin/_components/shell.tsx` hardcode nav Admin + brand Admin  
- `cms/_components/shell.tsx` hardcode nav CMS + brand CMS  
- `layout.tsx` chỉ:

```tsx
export default function AdminLayout({ children }) {
  return (
    <AdminShell userName={...} userEmail={...}>
      {children}
    </AdminShell>
  );
}
```

**B. Shell generic + nav props** — giống hiện tại, nhưng file nằm trong module (vẫn tách config). Kém “đọc 1 file là hết” hơn A.

→ Plan dùng **A**.

## Thứ tự thực hiện (an toàn, từng module)

1. **Admin**
   - Tạo `admin/_components/*`
   - Sửa mọi page admin import local
   - `admin/layout.tsx` dùng `AdminShell`
2. **CMS**
   - Tạo `cms/_components/*` (gồm service-form, ai, mock-actions)
   - Sửa mọi page cms
3. **Public**
   - Chuyển header/footer/blocks/contact/floating vào `(public-site)/_components`
   - Sửa layout + pages public
4. **Auth**
   - Chuyển login-form → `(auth)/_components`
5. **Status**
   - Chuyển status-pages → `(status)/_components`
6. **Root toaster**
   - `app/_components/toaster.tsx` hoặc inline
7. **Dọn**
   - Xóa `components/layout`, `components/auth`, `components/cms`, `components/public`
   - Giữ `components/ui` + `.gitkeep` nếu cần
8. **Verify**
   - `npx next build` từ `C:\...` (uppercase drive)
   - Smoke: `/admin`, `/cms`, `/`, `/login`, `/suspended`

## Rủi ro & lưu ý

- **Lặp code**: PageHeader/SectionCard/shell giống nhau ở Admin & CMS — cố ý. Sau này học xong mới extract.
- **Relative import sâu**: `services/[serviceId]/edit` → `../../../_components/...` hơi dài nhưng rõ module.
- **`"use client"`**: shell, forms, mock buttons vẫn client; layout server vẫn import được client child.
- **Không đụng** `lib/mock`, `types`, shadcn `components/ui`.
- EmptyState: kiểm tra còn import không; nếu không dùng thì không copy.

## Ngoài scope

- Không đổi UI visual (chỉ di chuyển file + import).
- Không gắn API/DB.
- Không gộp route groups.

## Definition of done

- [ ] Không còn import `@/components/layout/*`, `@/components/auth/*`, `@/components/cms/*`, `@/components/public/*`
- [ ] `components/` chỉ còn `ui/`
- [ ] Admin / CMS / Public / Auth / Status tự chứa UI module
- [ ] Build production pass
