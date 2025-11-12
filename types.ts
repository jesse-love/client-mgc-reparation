import type React from 'react';

export type BilingualText = {
  en: string;
  fr: string;
};

export interface Service {
  slug: string;
  title: BilingualText;
  shortDescription: BilingualText;
  // FIX: Use React.ComponentType to correctly type heroicons components, which are ForwardRefExoticComponent.
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  metaDescription: BilingualText;
  headline: BilingualText;
  subHeadline: BilingualText;
  pageContent: BilingualText;
  servicePoints: BilingualText[];
  whyChoosePoints: { title: BilingualText; description: BilingualText }[];
}

export interface GMBReview {
  reviewer: {
    displayName: string;
    profilePhotoUrl: string;
  };
  starRating: string;
  comment: string;
  createTime: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  googleMapsUrl: string;
  operatingHours: { en: string; fr: string }[];
  reviews: GMBReview[];
  isLoading: boolean;
  error: string | null;
}


export interface NavLink {
  name: BilingualText;
  href: string;
  subLinks?: NavLink[];
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: 'Email' | 'Phone';
  vehicleType: string;
  vehicleDetails: string;
  serviceNeeded: string[];
  description: string;
  appointmentDate: string;
  appointmentTime: string;
  referralSource: string;
}

export interface QuoteWizardData {
  step: number;
  vehicleType: string;
  serviceCategory: string;
  fullName: string;
  email: string;
  phone: string;
  description: string;
  appointmentDate: string;
  appointmentTime: string;
}