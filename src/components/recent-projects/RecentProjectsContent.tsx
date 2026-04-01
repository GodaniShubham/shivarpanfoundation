import { motion } from "framer-motion";
import type { RefObject } from "react";
import { useMemo } from "react";
import { recentProjects } from "@/data/recentProjects";
import AllocationTrust from "./AllocationTrust";
import ClosingPartnershipCta from "./ClosingPartnershipCta";
import ExecutionModel from "./ExecutionModel";
import ImpactLedger from "./ImpactLedger";
import PortfolioLanding from "./PortfolioLanding";
import ProjectChapters from "./ProjectChapters";

interface RecentProjectsContentProps {
  contentRef: RefObject<HTMLDivElement | null>;
  contentTitleRef: RefObject<HTMLHeadingElement | null>;
  imageOverrides?: Record<string, string>;
  activeProjects: number;
  completedProjects: number;
  totalBeneficiaries: number;
  totalVolunteers: number;
  totalPartners: number;
  totalSpent: number;
  totalBudget: number;
  utilization: number;
}

const RecentProjectsContent = ({
  contentRef,
  contentTitleRef,
  imageOverrides,
  activeProjects,
  completedProjects,
  totalBeneficiaries,
  totalVolunteers,
  totalPartners,
  totalSpent,
  totalBudget,
  utilization,
}: RecentProjectsContentProps) => {
  const projectsWithImages = useMemo(
    () =>
      recentProjects.map((project) => {
        const keyBySlug = project.slug;
        const keyByTitle = project.title.trim().toLowerCase();
        return {
          ...project,
          image:
            imageOverrides?.[keyBySlug] ??
            imageOverrides?.[keyByTitle] ??
            project.image,
        };
      }),
    [imageOverrides],
  );
  const featuredProject =
    projectsWithImages.find((project) => project.status === "Active") ??
    projectsWithImages[0];

  if (!featuredProject) {
    return null;
  }

  return (
    <div
      ref={contentRef}
      className="recent-projects-content"
    >
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, -22, 0], opacity: [0.18, 0.3, 0.18] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 top-44 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -26, 0], y: [0, 20, 0], opacity: [0.16, 0.3, 0.16] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-16 top-[56rem] h-80 w-80 rounded-full bg-accent/20 blur-3xl"
      />

      <PortfolioLanding titleRef={contentTitleRef} featuredProject={featuredProject} />
      <ImpactLedger
        activeProjects={activeProjects}
        completedProjects={completedProjects}
        totalBeneficiaries={totalBeneficiaries}
        totalVolunteers={totalVolunteers}
        totalPartners={totalPartners}
        totalSpent={totalSpent}
        totalBudget={totalBudget}
        utilization={utilization}
      />
      <ProjectChapters projects={projectsWithImages} />
      <ExecutionModel />
      <AllocationTrust
        activeProjects={activeProjects}
        completedProjects={completedProjects}
        totalVolunteers={totalVolunteers}
        totalPartners={totalPartners}
        utilization={utilization}
      />
      <ClosingPartnershipCta />
    </div>
  );
};

export default RecentProjectsContent;
