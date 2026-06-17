export interface FirmDetails {
  name: string;
  location: string;
  phone: string;
  email: string;
  hours: string;
  experience: string;
  credentials: string;
}

export interface CustomizeState {
  firm: FirmDetails;
  themeColor: string;
  typography: string;
  targetStack: string;
  tone: string;
  includeAnnouncement: boolean;
  selectedPages: string[];
  selectedIndustries: string[];
  announcementText: string;
  additionalNotes: string;
  interactiveFeatures: string[];
}

export interface PageBlueprint {
  id: string;
  title: string;
  summary: string;
  sections: string[];
  images: string[];
  copyDirectives: string[];
}
