export const firm = {
  name: "Bridgestone Law Chambers",
  advocate: "Dr. Naresh Kumar Aggrwal",
  credentials: "LL.B, M.A., Ph.D, ND, PGDCA",
  address: "149G-(1) Block, Sri Ganganagar, Rajasthan",
  phones: ["9413929515", "9588951519"],
  email: "Bridgestonelawchamber@gmail.com",
  regNo: "950 / 30-05-2018",
  certNo: "IN-DL21601102527545Q",
  certAuthority: "www.ricta.in",
  tagline: "All Types of Legal Works — All Over India",
};

export type ServiceCategory = {
  title: string;
  items: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Criminal Law & Bail",
    items: [
      "NDPS (Drugs Cases)",
      "POCSO Act",
      "Criminal Trial",
      "Session Court",
      "Magistrate Court",
      "Criminal Appeals",
      "Juvenile Justice",
      "Anticipatory Bail",
      "Bail Applications",
      "Anti-Corruption Cases",
      "Lokpal Cases",
      "Cyber Crime",
    ],
  },
  {
    title: "Family & Personal Law",
    items: ["Will & Succession", "Marriage Registration", "Divorce & Family Law"],
  },
  {
    title: "Property & Real Estate",
    items: ["Property Cases (RERA)", "Rent & Tenancy", "Land Acquisition"],
  },
  {
    title: "Corporate, Banking & Finance",
    items: [
      "NCLT & Corporate",
      "Corporate Law",
      "Securities Law (SEBI)",
      "Banking Law",
      "IBC (Insolvency)",
      "Debt Recovery Tribunal (DRT)",
      "Taxation (Direct & Indirect)",
      "Bounced Cheque (N.I. Act)",
    ],
  },
  {
    title: "Intellectual Property",
    items: ["Intellectual Property (IPR)", "Trademark", "Copyright"],
  },
  {
    title: "Constitutional & Civil Litigation",
    items: [
      "High Court Writs",
      "Public Interest Litigation (PIL)",
      "Civil Wrongs",
      "Arbitration & Mediation",
      "Human Rights",
      "Environment Law",
    ],
  },
  {
    title: "Consumer & Insurance",
    items: ["Consumer Court", "Insurance Claims"],
  },
  {
    title: "Other Legal Services",
    items: ["Online Legal Advisory", "General Legal Advisor", "Passport & Visa"],
  },
];

export const rajasthanDistricts = [
  "Ajmer", "Alwar", "Balotra", "Banswara", "Baran", "Barmer", "Beawar",
  "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu",
  "Dausa", "Deeg", "Dholpur", "Didwana-Kuchaman", "Dungarpur", "Hanumangarh",
  "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur",
  "Karauli", "Khairthal-Tijara", "Kotputli-Behror", "Kota", "Nagaur",
  "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar",
  "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur",
];
