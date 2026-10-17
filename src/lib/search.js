export function filterListings(items, options = {}) {
  const {
    q = "",
    category,
    areaId,
    minPrice,
    maxPrice,
    verifiedOnly = false,
  } = options;
  const query = q.trim().toLowerCase();

  return items.filter((item) => {
    if (category && item.category !== category) return false;
    if (areaId && item.areaId !== areaId) return false;
    if (verifiedOnly && item.verification !== "verified") return false;

    const amount = item.price?.amount ?? 0;
    if (typeof minPrice === "number" && amount < minPrice) return false;
    if (typeof maxPrice === "number" && amount > maxPrice) return false;

    if (query) {
      const haystack = [
        item.title?.en,
        item.title?.bn,
        item.area,
        item.category,
        ...(item.details?.facilities ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function sortListings(items, sort = "newest") {
  const copy = [...items];
  if (sort === "price-asc") {
    return copy.sort((a, b) => (a.price?.amount ?? 0) - (b.price?.amount ?? 0));
  }
  if (sort === "price-desc") {
    return copy.sort((a, b) => (b.price?.amount ?? 0) - (a.price?.amount ?? 0));
  }
  return copy.sort(
    (a, b) => new Date(b.confirmedAt) - new Date(a.confirmedAt)
  );
}

export function filterPlaces(items, options = {}) {
  const { q = "", type, areaId } = options;
  const query = q.trim().toLowerCase();

  return items.filter((item) => {
    if (type && item.type !== type) return false;
    if (areaId && item.areaId !== areaId) return false;
    if (query) {
      const haystack = [item.name?.en, item.name?.bn, item.area, item.type]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function filterRoutes(items, options = {}) {
  const { origin, destination } = options;
  return items.filter((route) => {
    if (origin && !route.origin.toLowerCase().includes(origin.toLowerCase()))
      return false;
    if (
      destination &&
      !route.destination.toLowerCase().includes(destination.toLowerCase())
    )
      return false;
    return true;
  });
}
