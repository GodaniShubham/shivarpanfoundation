import {
  BookOpenText,
  Calendar,
  CheckCircle2,
  HandHeart,
  Leaf,
  MapPin,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import aboutHero from "@/assets/about-hero.png";
import campaignEducation from "@/assets/campaign-education.jpg";
import campaignEnvironment from "@/assets/campaign-environment.jpg";
import campaignFood from "@/assets/campaign-food.jpg";
import campaignHealth from "@/assets/campaign-health.jpg";

export interface RecentProject {
  title: string;
  image: string;
  icon: LucideIcon;
  focus: string;
  status: "Completed" | "Active";
  location: string;
  timeline: string;
  beneficiaries: number;
  volunteers: number;
  partners: number;
  budget: number;
  spent: number;
  objective: string;
  outcomes: string[];
}

export interface SectorSplit {
  title: string;
  icon: LucideIcon;
  share: number;
  description: string;
}

export interface DeliveryStep {
  title: string;
  detail: string;
  icon: LucideIcon;
}

export const recentProjects: RecentProject[] = [
  {
    title: "Winter Nutrition Relief Network",
    image: campaignFood,
    icon: HandHeart,
    focus: "Food Security",
    status: "Completed",
    location: "Mumbai, Thane, Navi Mumbai",
    timeline: "Dec 2025 - Feb 2026",
    beneficiaries: 2180,
    volunteers: 124,
    partners: 9,
    budget: 180000,
    spent: 180000,
    objective:
      "Protect high-risk households from winter food insecurity through rapid distribution and nutrition support.",
    outcomes: [
      "500 household ration kits delivered in 72 hours",
      "Community kitchens served 12,800 hot meals",
      "Nutrition screening enabled targeted pediatric support",
    ],
  },
  {
    title: "Scholarship Continuity Accelerator",
    image: campaignEducation,
    icon: BookOpenText,
    focus: "Education",
    status: "Completed",
    location: "Maharashtra Cluster Schools",
    timeline: "Jan 2026 - Mar 2026",
    beneficiaries: 1200,
    volunteers: 61,
    partners: 14,
    budget: 220000,
    spent: 220000,
    objective:
      "Reduce dropout risk among first-generation learners through scholarship continuity and mentoring support.",
    outcomes: [
      "1,200 students received complete school-kit bundles",
      "50 full scholarships funded for board-year students",
      "Mentor circles launched across 14 partner institutions",
    ],
  },
  {
    title: "Rural Preventive Health Corridor",
    image: campaignHealth,
    icon: Stethoscope,
    focus: "Healthcare",
    status: "Active",
    location: "Nashik and Palghar Blocks",
    timeline: "Feb 2026 - Apr 2026",
    beneficiaries: 860,
    volunteers: 48,
    partners: 7,
    budget: 260000,
    spent: 252000,
    objective:
      "Expand access to preventive diagnostics and follow-up referrals for underserved communities.",
    outcomes: [
      "500+ patients screened in camp format",
      "Referral desk mapped cases to district facilities",
      "Mobile follow-up system reduced missed consultations",
    ],
  },
  {
    title: "Urban Green Belt Restoration Grid",
    image: campaignEnvironment,
    icon: Leaf,
    focus: "Environment",
    status: "Active",
    location: "Navi Mumbai Urban Fringe",
    timeline: "Jan 2026 - May 2026",
    beneficiaries: 1460,
    volunteers: 89,
    partners: 11,
    budget: 140000,
    spent: 125500,
    objective:
      "Rebuild degraded urban green stretches using high-survival plantation cycles and local stewardship.",
    outcomes: [
      "2,000 saplings planted with species diversification",
      "School eco-clubs adopted post-plantation maintenance",
      "Watering and survival audits now tracked weekly",
    ],
  },
];

export const sectorSplit: SectorSplit[] = [
  {
    title: "Food Security",
    icon: HandHeart,
    share: 31,
    description: "Emergency kits, community kitchens, and targeted nutrition support.",
  },
  {
    title: "Education",
    icon: BookOpenText,
    share: 29,
    description: "Scholarships, learning kits, and mentor continuity for students.",
  },
  {
    title: "Healthcare",
    icon: Stethoscope,
    share: 23,
    description: "Preventive screening, medicine access, and structured referral workflows.",
  },
  {
    title: "Environment",
    icon: Leaf,
    share: 17,
    description: "Tree plantation drives with community-led upkeep and audits.",
  },
];

export const deliverySteps: DeliveryStep[] = [
  {
    title: "Need Mapping",
    detail: "Field teams and community leaders validate demand, urgency, and population clusters.",
    icon: MapPin,
  },
  {
    title: "Program Design",
    detail: "Budget, timelines, and impact KPIs are set with partner institutions and volunteers.",
    icon: Calendar,
  },
  {
    title: "Execution Sprints",
    detail: "Campaigns run through weekly checkpoints for logistics, risk, and quality assurance.",
    icon: ShieldCheck,
  },
  {
    title: "Outcome Audits",
    detail: "Post-delivery evaluation confirms utilization, beneficiary reach, and retention impact.",
    icon: CheckCircle2,
  },
];

export const recentIntroGridImages = [
  aboutHero,
  campaignFood,
  campaignEducation,
  campaignHealth,
  campaignEnvironment,
  campaignFood,
  campaignEducation,
  campaignHealth,
  campaignEnvironment,
  aboutHero,
  campaignFood,
  campaignEducation,
  campaignHealth,
  campaignEnvironment,
  aboutHero,
  campaignFood,
  campaignEducation,
  campaignHealth,
  campaignEnvironment,
  aboutHero,
  campaignFood,
  campaignEducation,
  campaignHealth,
  campaignEnvironment,
  aboutHero,
  campaignFood,
];

export const recentProjectsNumberFormat = new Intl.NumberFormat("en-IN");

export const formatRecentProjectsInr = (value: number) =>
  `INR ${recentProjectsNumberFormat.format(value)}`;
