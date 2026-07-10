import {
  AboutBlock,
  ContactCtaBlock,
  FaqBlock,
  GalleryPreviewBlock,
  HeroBlock,
  MapBlock,
  PriceHighlightBlock,
  ServicesHighlightBlock,
  TestimonialsBlock,
} from "./_components/blocks";
import { demoSite } from "@/lib/mock/data";
import {
  getBlocksBySiteId,
  getFaqsBySiteId,
  getMediaBySiteId,
  getPricesBySiteId,
  getServicesBySiteId,
  getTestimonialsBySiteId,
} from "@/lib/mock/selectors";

export default function PublicHomePage() {
  const site = demoSite;
  const blocks = getBlocksBySiteId(site.id).filter((b) => b.isVisible);
  const services = getServicesBySiteId(site.id);
  const prices = getPricesBySiteId(site.id);
  const media = getMediaBySiteId(site.id);
  const faqs = getFaqsBySiteId(site.id);
  const testimonials = getTestimonialsBySiteId(site.id);

  return (
    <>
      {blocks.map((block) => {
        switch (block.blockType) {
          case "hero":
            return <HeroBlock key={block.id} block={block} site={site} />;
          case "about":
            return <AboutBlock key={block.id} block={block} site={site} />;
          case "services_highlight":
            return (
              <ServicesHighlightBlock
                key={block.id}
                block={block}
                site={site}
                services={services}
              />
            );
          case "price_highlight":
            return (
              <PriceHighlightBlock
                key={block.id}
                block={block}
                site={site}
                prices={prices}
              />
            );
          case "gallery_preview":
            return (
              <GalleryPreviewBlock
                key={block.id}
                block={block}
                media={media}
              />
            );
          case "testimonials":
            return (
              <TestimonialsBlock
                key={block.id}
                block={block}
                testimonials={testimonials}
                site={site}
              />
            );
          case "faq":
            return (
              <FaqBlock key={block.id} block={block} faqs={faqs} site={site} />
            );
          case "contact_cta":
            return (
              <ContactCtaBlock
                key={block.id}
                block={block}
                site={site}
                services={services}
              />
            );
          case "map":
            return <MapBlock key={block.id} block={block} site={site} />;
          default:
            return null;
        }
      })}
    </>
  );
}
