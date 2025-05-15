// src/data/officials.ts

export interface Official {
  name: string;
  email: string;
  position: string;
  startTerm: string;
  endTerm: string;
  imageUrl: string;
}

export const officials: Official[] = [
  {
    name: "Derrick Yap",
    email: "derrick.yap@email.com",
    position: "Punong Barangay",
    startTerm: "Jul 2023",
    endTerm: "Sep 2028",
    imageUrl: "/assets/img/profile/bg-profile.png",
  },
  {
    name: "Marie Cruz",
    email: "marie.cruz@email.com",
    position: "Kagawad",
    startTerm: "Jul 2023",
    endTerm: "Sep 2028",
    imageUrl: "/assets/img/profile/bg-profile.png",
  },
  // Add more officials as needed
];
