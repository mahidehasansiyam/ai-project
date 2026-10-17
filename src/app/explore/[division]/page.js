import { notFound } from "next/navigation";
import DivisionDestinations from "@/components/explore/DivisionDestinations";
import destinations from "@/data/destinations.json";
import areas from "@/data/areas.json";

export function generateStaticParams() {
  return areas.map((city) => ({ division: city.id }));
}

export async function generateMetadata({ params }) {
  const { division } = await params;
  const city = areas.find((item) => item.id === division);
  if (!city) return { title: "Division not found — CitySheba" };
  return {
    title: `${city.name.en} — Explore Bangladesh | CitySheba`,
    description: `Tourist destinations in ${city.name.en} division, Bangladesh.`,
  };
}

export default async function DivisionPage({ params }) {
  const { division } = await params;
  const city = areas.find((item) => item.id === division);
  if (!city) notFound();

  const items = destinations.filter((item) => item.division === division);
  return <DivisionDestinations division={city} items={items} />;
}
