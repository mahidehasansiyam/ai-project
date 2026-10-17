import { notFound } from "next/navigation";
import ListingDetail from "@/components/listing/ListingDetail";
import listings from "@/data/listings.json";

export function generateStaticParams() {
  return listings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const listing = listings.find((item) => item.slug === slug);
  if (!listing) return { title: "Listing not found — CitySheba" };

  return {
    title: `${listing.title.en} — ${listing.area} | CitySheba`,
    description: `${listing.title.en} in ${listing.area}. ৳${listing.price.amount}/${listing.price.unit}. See facilities, reviews and contact details on CitySheba.`,
  };
}

export default async function ListingPage({ params }) {
  const { slug } = await params;
  const listing = listings.find((item) => item.slug === slug);
  if (!listing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: listing.title.en,
    description: `${listing.title.en} in ${listing.area}.`,
    areaServed: listing.area,
    telephone: listing.contacts?.phone || undefined,
    priceRange: `৳${listing.price?.amount ?? ""}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetail listing={listing} />
    </>
  );
}
