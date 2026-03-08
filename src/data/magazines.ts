export type MagazineReport = {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  publishDate: string;
};

export const magazines: MagazineReport[] = [
  {
    id: 1,
    title: "Shivarpan Foundation Impact Report 2024",
    description:
      "Shivarpan Foundation Annual Work Report with impact highlights, outreach numbers, and beneficiary stories from 2024.",
    coverImage: "/covers/impact-report-2024.jpg",
    pdfUrl: "/pdfs/impact-report-2024.pdf",
    publishDate: "March 2024",
  },
  {
    id: 2,
    title: "Health Outreach Report 2023",
    description:
      "A focused report on health camps, diagnostic drives, and awareness initiatives conducted across communities.",
    coverImage: "/covers/health-outreach-2023.jpg",
    pdfUrl: "/pdfs/health-outreach-2023.pdf",
    publishDate: "December 2023",
  },
  {
    id: 3,
    title: "Education Progress Report 2023",
    description:
      "Scholarships, learning support programs, and youth development outcomes from our education initiatives.",
    coverImage: "/covers/education-report-2023.jpg",
    pdfUrl: "/pdfs/education-report-2023.pdf",
    publishDate: "September 2023",
  },
  {
    id: 4,
    title: "Climate Action Report 2022",
    description:
      "Environmental sustainability report documenting plantation, conservation, and awareness campaigns.",
    coverImage: "/covers/climate-report-2022.jpg",
    pdfUrl: "/pdfs/climate-report-2022.pdf",
    publishDate: "November 2022",
  },
];

export const getMagazineById = (id: number) =>
  magazines.find((magazine) => magazine.id === id);
