import ExploreDivisions from "@/components/explore/ExploreDivisions";
import destinations from "@/data/destinations.json";
import areas from "@/data/areas.json";

export const metadata = {
  title: "Explore Rajshahi — CitySheba",
  description:
    "Places to visit in Rajshahi city — museums, the Padma riverside, parks and heritage sites.",
};

export default function ExplorePage() {
  const divisions = areas.map((city) => ({
    id: city.id,
    name: city.name,
    count: destinations.filter((item) => item.division === city.id).length,
  }));

  return <ExploreDivisions divisions={divisions} />;
}
