import { serviceCategories, rajasthanDistricts } from "./data";

export const allServices = serviceCategories.flatMap((c) => c.items);
export const allLocations = [...rajasthanDistricts, "All India"];

export type LawyerStatus = "pending" | "approved" | "rejected";

export interface Lawyer {
  _id?: string;
  name: string;
  credentials: string;
  firmRole: string;
  expertise: string[];
  locations: string[];
  phone: string;
  email: string;
  bio: string;
  status: LawyerStatus;
  createdAt: string;
}

export interface LawyerInput {
  name: string;
  credentials: string;
  firmRole: string;
  expertise: string[];
  locations: string[];
  phone: string;
  email: string;
  bio: string;
}

const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLawyerInput(data: unknown): { valid: true; value: LawyerInput } | { valid: false; error: string } {
  if (typeof data !== "object" || data === null) {
    return { valid: false, error: "Invalid submission" };
  }
  const d = data as Record<string, unknown>;

  const name = typeof d.name === "string" ? d.name.trim() : "";
  const credentials = typeof d.credentials === "string" ? d.credentials.trim() : "";
  const firmRole = typeof d.firmRole === "string" ? d.firmRole.trim() : "";
  const phone = typeof d.phone === "string" ? d.phone.trim() : "";
  const email = typeof d.email === "string" ? d.email.trim() : "";
  const bio = typeof d.bio === "string" ? d.bio.trim() : "";
  const expertise = Array.isArray(d.expertise) ? d.expertise.filter((s): s is string => typeof s === "string") : [];
  const locations = Array.isArray(d.locations) ? d.locations.filter((s): s is string => typeof s === "string") : [];

  if (name.length < 2 || name.length > 100) {
    return { valid: false, error: "Name must be between 2 and 100 characters" };
  }
  if (!phoneRegex.test(phone)) {
    return { valid: false, error: "Phone must be a 10-digit number" };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Enter a valid email address" };
  }
  if (expertise.length === 0 || !expertise.every((e) => allServices.includes(e))) {
    return { valid: false, error: "Select at least one valid practice area" };
  }
  if (locations.length === 0 || !locations.every((l) => allLocations.includes(l))) {
    return { valid: false, error: "Select at least one valid location" };
  }
  if (bio.length > 1000) {
    return { valid: false, error: "Bio must be under 1000 characters" };
  }
  if (credentials.length > 200 || firmRole.length > 100) {
    return { valid: false, error: "Credentials or role text too long" };
  }

  return {
    valid: true,
    value: { name, credentials, firmRole, expertise, locations, phone, email, bio },
  };
}
