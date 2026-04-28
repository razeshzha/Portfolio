import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      name: "Rajesh Kumar Jha",
      title: "MERN Full Stack Web Developer",
      location: "Kathmandu, Nepal",
      experience: "2 Years",
      summary:
        "I build modern, responsive and API-connected web applications using Next.js, React, Node.js, Express.js and MongoDB.",
      email: "razeshjha0@gmail.com",
      phone: "+977 9807669785",
      skills: [
        "Next.js",
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST API",
        "JWT Authentication",
        "CMS Development",
      ],
    },
  });
}