export const HUBS = [
  { id: "mess", href: "/services/mess", icon: "🍲", en: "Mess & Residences", bn: "মেস ও রেজিডেন্স" },
  { id: "repair", href: "/services/repair", icon: "🔧", en: "Home Repair", bn: "বাসা মেরামত" },
  { id: "bus", href: "/services/bus", icon: "🚌", en: "Bus", bn: "বাস" },
  { id: "train", href: "/services/train", icon: "🚆", en: "Train", bn: "ট্রেন" },
  { id: "heritage", href: "/services/heritage", icon: "🏛️", en: "Heritage", bn: "ঐতিহ্য" },
  { id: "hotel", href: "/services/hotel", icon: "🏨", en: "Hotel", bn: "হোটেল" },
  { id: "tutor", href: "/services/tutor", icon: "📚", en: "Tutor", bn: "টিউটর" },
  { id: "doctor", href: "/services/doctor", icon: "🩺", en: "Hospitals and Doctors", bn: "ডাক্তার ও হাসপাতাল" },
  { id: "blood", href: "/services/blood", icon: "🩸", en: "Blood", bn: "রক্ত" },
  { id: "ambulance", href: "/services/ambulance", icon: "🚑", en: "Ambulance", bn: "অ্যাম্বুলেন্স" },
];

export const SERVICE_PAGES = {
  bus: { icon: "🚌", en: "Bus Schedules", bn: "বাসের সময়সূচি" },
  train: { icon: "🚆", en: "Train Schedules", bn: "ট্রেনের সময়সূচি" },
  heritage: { icon: "🏛️", en: "Heritage", bn: "ঐতিহ্য" },
  blood: { icon: "🩸", en: "Blood Banks", bn: "ব্লাড ব্যাংক" },
  ambulance: { icon: "🚑", en: "Ambulance", bn: "অ্যাম্বুলেন্স" },
};

export const CATEGORY = {
  mess: {
    icon: "🍲",
    en: "Mess & Residences",
    bn: "মেস ও রেজিডেন্স",
    chip: "bg-brand-teal/10 text-brand-teal",
    thumb: "from-brand-teal/30 via-brand-teal/10 to-transparent",
    dot: "bg-brand-teal",
    unit: "month",
  },
  repair: {
    icon: "🔧",
    en: "Home Repair",
    bn: "বাসা মেরামত",
    chip: "bg-brand-coral/10 text-brand-coral",
    thumb: "from-brand-coral/30 via-brand-coral/10 to-transparent",
    dot: "bg-brand-coral",
    unit: "visit",
  },
  hotel: {
    icon: "🏨",
    en: "Hotel",
    bn: "হোটেল",
    chip: "bg-brand-blue/10 text-brand-blue",
    thumb: "from-brand-blue/30 via-brand-blue/10 to-transparent",
    dot: "bg-brand-blue",
    unit: "night",
  },
  tutor: {
    icon: "📚",
    en: "Tutor",
    bn: "টিউটর",
    chip: "bg-brand-purple/10 text-brand-purple",
    thumb: "from-brand-purple/30 via-brand-purple/10 to-transparent",
    dot: "bg-brand-purple",
    unit: "month",
  },
};

export const PLACE = {
  beach: { icon: "🏖️", chip: "from-brand-blue/60", en: "Beach", bn: "সমুদ্র সৈকত" },
  island: { icon: "🏝️", chip: "from-brand-teal/60", en: "Island", bn: "দ্বীপ" },
  forest: { icon: "🌳", chip: "from-success/60", en: "Forest", bn: "বন" },
  heritage: { icon: "🏛️", chip: "from-brand-purple/60", en: "Heritage", bn: "ঐতিহ্য" },
  "tea-garden": { icon: "🍃", chip: "from-success/60", en: "Tea Garden", bn: "চা বাগান" },
  park: { icon: "🌳", chip: "from-success/60", en: "Park", bn: "পার্ক" },
  river: { icon: "🌊", chip: "from-brand-blue/60", en: "Riverside", bn: "নদীতীর" },
};

export const PLACE_TYPE = {
  mosque: {
    icon: "🕌",
    en: "Mosque",
    bn: "মসজিদ",
    chip: "bg-brand-purple/10 text-brand-purple",
  },
  hospital: {
    icon: "🏥",
    en: "Hospital",
    bn: "হাসপাতাল",
    chip: "bg-danger/10 text-danger",
  },
  doctor: {
    icon: "🩺",
    en: "Doctor",
    bn: "ডাক্তার",
    chip: "bg-success/10 text-success",
  },
  atm: {
    icon: "🏧",
    en: "ATM",
    bn: "এটিএম",
    chip: "bg-brand-blue/10 text-brand-blue",
  },
  blood: {
    icon: "🩸",
    en: "Blood Bank",
    bn: "ব্লাড ব্যাংক",
    chip: "bg-danger/10 text-danger",
  },
  ambulance: {
    icon: "🚑",
    en: "Ambulance",
    bn: "অ্যাম্বুলেন্স",
    chip: "bg-brand-coral/10 text-brand-coral",
  },
};

export const categoryMeta = (id) => CATEGORY[id] ?? CATEGORY.mess;
export const placeTypeMeta = (id) => PLACE_TYPE[id] ?? PLACE_TYPE.mosque;
