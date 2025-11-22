export interface NavItem {
  label: string;
  href: string;
}

export interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  popular?: boolean;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  imageUrl?: string;
}