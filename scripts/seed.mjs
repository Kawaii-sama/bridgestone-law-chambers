import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URI is not set. Add it to .env or export it before running this script.");
  process.exit(1);
}

const rajasthanDistricts = [
  "Ajmer", "Alwar", "Balotra", "Banswara", "Baran", "Barmer", "Beawar",
  "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu",
  "Dausa", "Deeg", "Dholpur", "Didwana-Kuchaman", "Dungarpur", "Hanumangarh",
  "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur",
  "Karauli", "Khairthal-Tijara", "Kotputli-Behror", "Kota", "Nagaur",
  "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar",
  "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur",
];

// Keep in sync with serviceCategories in src/lib/data.ts.
const allServices = [
  "Marriage and Matrimonial", "Divorce", "Bail Applications", "Anticipatory Bail",
  "Criminal Trial", "Criminal Appeals", "Session Court", "Magistrate Court",
  "NDPS (Drugs Cases)", "POCSO Act", "Juvenile Justice",
  "Anti-Corruption Cases", "Lokpal Cases", "Cyber Crime",
  "Will & Succession", "Marriage Registration", "Divorce & Family Law",
  "Property Cases (RERA)", "Rent & Tenancy", "Land Acquisition",
  "NCLT & Corporate", "Corporate Law", "Securities Law (SEBI)", "Banking Law",
  "IBC (Insolvency)", "Debt Recovery Tribunal (DRT)", "Taxation (Direct & Indirect)",
  "Bounced Cheque (N.I. Act)", "Intellectual Property (IPR)", "Trademark", "Copyright",
  "High Court Writs", "Public Interest Litigation (PIL)", "Civil Wrongs",
  "Arbitration & Mediation", "Human Rights", "Environment Law",
  "Consumer Court", "Insurance Claims",
  "Online Legal Advisory", "General Legal Advisor", "Passport & Visa",
];

async function seed() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("bridgestone");
  const collection = db.collection("lawyers");

  await collection.createIndex({ status: 1 });
  await collection.createIndex({ expertise: 1 });
  await collection.createIndex({ locations: 1 });

  const founder = {
    name: "Dr. Naresh Kumar Aggrwal",
    credentials: "LL.B, M.A., Ph.D, ND, PGDCA",
    firmRole: "Founder & Advocate",
    expertise: allServices,
    locations: [...rajasthanDistricts, "All India"],
    phone: "9413929515",
    email: "Bridgestonelawchamber@gmail.com",
    bio: "Founder of न्याय आपके द्वार (registered as Bridgestone Law Chambers), Sri Ganganagar. Registered under Reg. No. 950 / 30-05-2018, handling matters across all types of legal work, all over India.",
    status: "approved",
    createdAt: new Date().toISOString(),
  };

  const existing = await collection.findOne({ email: founder.email });
  if (existing) {
    await collection.updateOne({ _id: existing._id }, { $set: founder });
    console.log("Updated existing founder profile.");
  } else {
    await collection.insertOne(founder);
    console.log("Inserted founder profile.");
  }

  await client.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
