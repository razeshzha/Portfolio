"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string;
};

type Profile = {
  name: string;
  title: string;
  location: string;
  experience: string;
  summary: string;
  email: string;
  phone: string;
  skills: string[];
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          axios.get("/api/profile"),
          axios.get("/api/projects"),
        ]);

        setProfile(profileRes.data.data);
        setProjects(projectsRes.data.data);
      } catch (error) {
        console.log("FETCH_ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSuccess(false);

    try {
      await axios.post("/api/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      alert("Error sending message");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f5fb]">
        <p className="text-lg font-semibold text-slate-700">
          Loading portfolio...
        </p>
      </main>
    );
  }

  return (
    <main className="bg-[#f6f5fb] text-slate-900">
      {/* HERO */}
      <section id="home" className="min-h-screen px-4 py-6 md:px-10 md:py-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
          {/* HEADER */}
          <header className="flex items-center justify-between px-5 py-5 md:px-14 md:py-7">
            <a href="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-80">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white">
                R
              </span>
              <span>Rajesh</span>
            </a>

            <nav className="hidden gap-10 text-xs font-bold uppercase tracking-widest md:flex">
              <a href="#about" className="transition hover:text-violet-600">
                About
              </a>
              <a href="#skills" className="transition hover:text-violet-600">
                Skills
              </a>
              <a href="#projects" className="transition hover:text-violet-600">
                Portfolio
              </a>
              <a href="#contact" className="transition hover:text-violet-600">
                Contact
              </a>
            </nav>

            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl md:block"
            >
              Hire Me
            </a>
          </header>

          {/* HERO CONTENT */}
          <div className="grid items-center gap-12 px-6 pb-16 pt-8 md:grid-cols-2 md:px-20 lg:gap-16">
            {/* LEFT */}
            <div className="order-2 md:order-1">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-600">
                {profile?.name || "Rajesh Kumar Jha"}
              </p>

              <h1 className="mt-5 text-4xl font-black leading-[1.08] text-slate-950 sm:text-5xl md:text-6xl lg:text-[68px]">
                Hello, my <br />
                name&apos;s Rajesh. <br />
                I&apos;m MERN <br className="hidden sm:block" />
                Developer.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
                {profile?.summary ||
                  "I build modern, responsive and API-connected web applications using Next.js, React, Node.js, Express.js and MongoDB."}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#contact"
                  className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Contact Me
                </a>

                <a
                  href="/Rajesh-CV.pdf"
                  download
                  className="font-bold text-slate-700 transition hover:text-violet-600"
                >
                  Download CV
                </a>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative flex h-[320px] w-[320px] items-center justify-center sm:h-[380px] sm:w-[380px] md:h-[460px] md:w-[460px]">
                {/* Background circle */}
                <div className="absolute h-[280px] w-[280px] rounded-full bg-violet-100 sm:h-[340px] sm:w-[340px] md:h-[420px] md:w-[420px]" />

                {/* Premium image circle */}
                <div className="relative z-10 h-[280px] w-[280px] overflow-hidden rounded-full border-[10px] border-white bg-white shadow-2xl sm:h-[340px] sm:w-[340px] md:h-[420px] md:w-[420px]">
                  <img
                    src="/profile.png"
                    alt="Rajesh Kumar Jha"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                {/* Small decoration */}
                <div className="absolute bottom-8 right-8 z-20 hidden rounded-2xl bg-white px-5 py-3 shadow-xl md:block">
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                    2+ Years
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          About Me
        </p>

        <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
          I create modern, scalable and user-friendly web applications.
        </h2>

        <p className="mt-5 max-w-3xl leading-8 text-gray-600">
          I am a MERN Full Stack Web Developer with 2 years of experience. I
          have worked on ecommerce websites, education consultancy CMS,
          production websites, food blogs and portfolio websites.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold text-slate-900">Location</h3>
            <p className="mt-2 text-gray-600">{profile?.location || "Nepal"}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold text-slate-900">Experience</h3>
            <p className="mt-2 text-gray-600">
              {profile?.experience || "2 Years"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold text-slate-900">Email</h3>
            <p className="mt-2 break-words text-gray-600">
              {profile?.email || "your.email@example.com"}
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          Expertise
        </p>

        <h2 className="mt-3 text-3xl font-black">Skills</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {profile?.skills?.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow transition hover:-translate-y-0.5 hover:text-violet-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          Experience
        </p>

        <h2 className="mt-3 text-3xl font-black">Work Experience</h2>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h3 className="text-xl font-black">Full Stack Web Developer</h3>
          <p className="mt-1 text-sm font-bold text-violet-600">
            Janak Tech Company Ltd | 2024 - 2026
          </p>

          <p className="mt-5 leading-8 text-gray-600">
            Worked as a Full Stack Web Developer at Janak Tech Company Ltd,
            developing ecommerce websites, production websites, food blogs,
            portfolio websites and education consultancy CMS platforms. Built
            responsive frontend interfaces using React and Next.js, developed
            backend APIs using Node.js and Express.js, managed MongoDB
            databases, and implemented JWT-based authentication.
          </p>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-8 shadow">
          <h3 className="text-xl font-black">MERN Stack Intern</h3>
          <p className="mt-1 text-sm font-bold text-violet-600">
            Broadway Infosys | 3 Months
          </p>

          <p className="mt-5 leading-8 text-gray-600">
            Completed a 3-month MERN Stack internship at Broadway Infosys,
            gaining hands-on experience in full stack development using MongoDB,
            Express.js, React.js and Node.js. Built REST APIs, implemented
            authentication and developed responsive web applications.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          Portfolio
        </p>

        <h2 className="mt-3 text-3xl font-black">Recent Projects</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-xl font-black">{project.title}</h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-sm font-bold text-violet-600 hover:text-pink-500"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-3xl bg-white p-6 shadow-xl md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            Contact
          </p>

          <h2 className="mt-3 text-3xl font-black">Let&apos;s work together</h2>

          {success && (
            <p className="mt-4 rounded-xl bg-green-50 p-4 text-sm font-bold text-green-700">
              Message saved and email sent successfully ✅
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-violet-500"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-violet-500"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <textarea
              className="min-h-36 w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-violet-500"
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            <button
              type="submit"
              disabled={sending}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-8 py-4 font-bold text-white shadow-lg disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white px-6 py-6 text-center text-lg font-bold text-black/50 md:text-xl">
        © 2026 Rajesh Kumar Jha. All rights reserved.
      </footer>
    </main>
  );
}