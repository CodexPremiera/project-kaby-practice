export interface CitizenProfile {
  created_at: string; // ISO timestamp
  last_name: string;
  first_name: string;
  middle_name: string;
  birthdate: string; // YYYY-MM-DD format
  accumulatedBadge: number;
  currentBadge: number;
  id: string; // UUID
  barangay: string;
  user_id: string; // UUID
  barangay_id: string; // UUID
  is_worker: boolean;
  profile_pic: string; // path to image file
  suffix: string;
  sex: "Male" | "Female" | "Other" | string;
  birthplace: string;
  citizenship: string;
  religion: string;
  employment: string;
  highest_education:
    | "No Formal Education"
    | "Elementary"
    | "High School"
    | "Vocational"
    | "College"
    | "Master’s"
    | "Doctorate/PhD"
    | string;
  other_information: string[];
  region: string;
  province: string;
  city: string;
  sitio: string;
  years_of_residence: number;
  mobile_number: string;
  telephone_number: string;
}

export const getName = (citizen : CitizenProfile) => {
  return `${citizen.first_name} ${citizen.last_name}`
}

export const getAddress = (citizen : CitizenProfile) => {
  return `${citizen.barangay}, ${citizen.city}, ${citizen.province}`
}