import { notFound } from "next/navigation";
import DestinationDetail from "@/components/explore/DestinationDetail";
import destinations from "@/data/destinations.json";

export function generateStaticParams() {
  return destinations.map((destination) => ({
    division: destination.division,
    slug: destination.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return { title: "Destination not found — CitySheba" };

  return {
    title: `${destination.name.en} — ${destination.district} | CitySheba`,
    description:
      destination.description?.en ??
      `${destination.name.en} in ${destination.district}, Bangladesh.`,
  };
}

export default async function DestinationPage({ params }) {
  const { division, slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination || destination.division !== division) notFound();

  const nearby = destinations
    .filter(
      (item) => item.division === destination.division && item.slug !== destination.slug
    )
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: destination.name.en,
    description: destination.description?.en,
    address: {
      "@type": "PostalAddress",
      addressRegion: destination.division,
      addressLocality: destination.district,
      addressCountry: "BD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationDetail destination={destination} nearby={nearby} />
    </>
  );
}
