import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        title: "Ecommerce Platform",
        description:
          "A complete ecommerce platform with product listing, cart system, authentication, order management and admin-ready structure.",
        tech: ["Next.js", "Node.js", "Express.js", "MongoDB"],
        link: "#",
      },
      {
        title: "Education Consultancy CMS",
        description:
          "A dynamic CMS-based education consultancy website for managing pages, blogs, universities, gallery and website content.",
        tech: ["React", "Next.js", "API", "MongoDB"],
        link: "#",
      },
      {
        title: "Food Blog Platform",
        description:
          "A responsive food blog website with dynamic posts, clean UI and content-focused layout.",
        tech: ["Next.js", "Tailwind CSS", "API Routes"],
        link: "#",
      },
      {
        title: "Business Portfolio Website",
        description:
          "A modern business portfolio website with profile, projects, services and contact form integration.",
        tech: ["Next.js", "Tailwind CSS", "MongoDB"],
        link: "#",
      },
      {
        title: "Production Website",
        description:
          "A production-level company website focused on performance, responsive design and clean user experience.",
        tech: ["React", "Next.js", "Tailwind CSS"],
        link: "#",
      },
    ],
  });
}