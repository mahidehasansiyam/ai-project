import { notFound } from "next/navigation";
import { CATEGORY, SERVICE_PAGES } from "@/lib/catalog";
import CategoryListing from "@/components/services/CategoryListing";
import CategoryPlaces from "@/components/services/CategoryPlaces";
import BusList from "@/components/services/BusList";
import TrainList from "@/components/services/TrainList";
import HeritageList from "@/components/services/HeritageList";
import listings from "@/data/listings.json";
import places from "@/data/places.json";
import busRoutes from "@/data/busRoutes.json";
import trainRoutes from "@/data/trainRoutes.json";
import destinations from "@/data/destinations.json";

const LISTING_CATEGORIES = Object.keys(CATEGORY);
const PLACE_TYPES = {
  mosque: ["mosque"],
  doctor: ["doctor", "hospital"],
  blood: ["blood"],
  ambulance: ["ambulance"],
};

export function generateStaticParams() {
  return [
    ...LISTING_CATEGORIES,
    "mosque",
    "doctor",
    "bus",
    "train",
    "heritage",
    "blood",
    "ambulance",
  ].map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const meta = CATEGORY[category] ?? SERVICE_PAGES[category];
  const title = meta ? meta.en : category;
  return {
    title: `${title} — CitySheba`,
    description: `Browse ${title.toLowerCase()} across Bangladesh on CitySheba.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  if (LISTING_CATEGORIES.includes(category)) {
    const items = listings.filter((listing) => listing.category === category);
    return <CategoryListing category={category} items={items} />;
  }

  if (PLACE_TYPES[category]) {
    const types = PLACE_TYPES[category];
    const items = places.filter((place) => types.includes(place.type));
    return <CategoryPlaces category={category} items={items} />;
  }

  if (category === "bus") {
    return <BusList routes={busRoutes} />;
  }

  if (category === "train") {
    return <TrainList routes={trainRoutes} />;
  }

  if (category === "heritage") {
    const items = destinations.filter((place) => place.category === "heritage");
    return <HeritageList items={items} />;
  }

  notFound();
}
