export type Language = 'ru' | 'kz';

export type ProductType = 
  | 'curtain-track'
  | 'roller-blind'
  | 'day-night'
  | 'roman-blind'
  | 'wood-blinds'
  | 'pleated';

export type MotorType = 'battery' | 'wire-220v';

export type MotorBrand = 'dooya' | 'aqara' | 'somfy';

export type FabricCategory = 'basic' | 'blackout' | 'screen' | 'premium';

export interface CalculatorState {
  productType: ProductType;
  width: number; // in meters (e.g. 2.4)
  height: number; // in meters (e.g. 2.6)
  motorType: MotorType;
  motorBrand: MotorBrand;
  fabricCategory: FabricCategory;
  controlOptions: {
    remote: boolean;
    appControl: boolean;
    aliceVoice: boolean;
    sunSensor: boolean;
  };
  includeInstallation: boolean;
  quantity: number;
}

export interface BookingFormData {
  name: string;
  phone: string;
  city: string;
  address: string;
  preferredDate: string;
  preferredTimeSlot: string;
  comment: string;
  calculatorSummary?: string;
  estimatedPrice?: number;
}

export interface ProductItem {
  id: ProductType;
  nameRu: string;
  nameKz: string;
  taglineRu: string;
  taglineKz: string;
  descriptionRu: string;
  descriptionKz: string;
  basePriceKz: number;
  featuresRu: string[];
  featuresKz: string[];
  imageUrl: string;
  badgeRu?: string;
  badgeKz?: string;
}

export interface PortfolioItem {
  id: string;
  titleRu: string;
  titleKz: string;
  category: ProductType;
  cityRu: string;
  cityKz: string;
  objectTypeRu: string;
  objectTypeKz: string;
  dimensions: string;
  motor: string;
  fabricRu: string;
  fabricKz: string;
  imageUrl: string;
}

export interface ReviewItem {
  id: string;
  authorRu: string;
  authorKz: string;
  cityRu: string;
  cityKz: string;
  rating: number;
  dateRu: string;
  dateKz: string;
  textRu: string;
  textKz: string;
  projectRu: string;
  projectKz: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  questionRu: string;
  questionKz: string;
  answerRu: string;
  answerKz: string;
}
