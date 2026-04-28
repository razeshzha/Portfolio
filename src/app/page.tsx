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
      <section id="home" className="min-h-screen px-4 py-8 md:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
          <header className="flex items-center justify-between px-6 py-6 md:px-14">
            <a href="/" className="text-xl font-bold hover:opacity-80">
              <span className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-2 py-1 text-white">
                R
              </span>{" "}
              Rajesh
            </a>

            <nav className="hidden gap-10 text-xs font-bold uppercase tracking-widest md:flex">
              <a href="#about" className="hover:text-violet-600">
                About
              </a>
              <a href="#skills" className="hover:text-violet-600">
                Skills
              </a>
              <a href="#projects" className="hover:text-violet-600">
                Portfolio
              </a>
              <a href="#contact" className="hover:text-violet-600">
                Contact
              </a>
            </nav>

            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white md:block"
            >
              Hire Me
            </a>
          </header>

          <div className="grid items-center gap-10 px-6 pb-16 pt-10 md:grid-cols-2 md:px-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                {profile?.name}
              </p>

              <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">
                Hello, my <br />
                name&apos;s Rajesh. <br />
                I&apos;m MERN Developer.
              </h1>

              <p className="mt-6 max-w-xl leading-8 text-gray-600">
                {profile?.summary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg"
                >
                  Contact Me
                </a>

                <a
                  href="/Rajesh-CV.pdf"
                  download
                  className="font-bold text-slate-700 hover:text-violet-600"
                >
                  Download CV
                </a>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute top-8 h-[330px] w-[330px] rounded-full bg-violet-100 md:h-[450px] md:w-[450px]" />

              <img
                src="/profile.png"
                alt="Rajesh Kumar Jha"
                className="relative z-10 h-[400px] object-contain md:h-[520px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          About Me
        </p>

        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          I create modern, scalable and user-friendly web applications.
        </h2>

        <p className="mt-5 max-w-3xl leading-8 text-gray-600">
          I am a MERN Full Stack Web Developer with 2 years of experience. I
          have worked on ecommerce websites, education consultancy CMS,
          production websites, food blogs and portfolio websites.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow">
            <h3 className="font-bold">Location</h3>
            <p className="mt-2 text-gray-600">{profile?.location}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow">
            <h3 className="font-bold">Experience</h3>
            <p className="mt-2 text-gray-600">{profile?.experience}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow">
            <h3 className="font-bold">Email</h3>
            <p className="mt-2 text-gray-600">{profile?.email}</p>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          Expertise
        </p>

        <h2 className="mt-3 text-3xl font-bold">Skills</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {profile?.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          Experience
        </p>

        <h2 className="mt-3 text-3xl font-bold">Work Experience</h2>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h3 className="text-xl font-bold">Full Stack Web Developer</h3>
          <p className="mt-1 text-sm font-semibold text-violet-600">
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
          <h3 className="text-xl font-bold">MERN Stack Intern</h3>
          <p className="mt-1 text-sm font-semibold text-violet-600">
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

      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          Portfolio
        </p>

        <h2 className="mt-3 text-3xl font-bold">Recent Projects</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-xl font-bold">{project.title}</h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-3xl bg-white p-6 shadow-xl md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            Contact
          </p>

          <h2 className="mt-3 text-3xl font-bold">Let&apos;s work together</h2>

          {success && (
            <p className="mt-4 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">
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
              className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-8 py-4 font-bold text-white disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-white px-6 py-6 text-center text-xl font-semibold text-black/50">
      © 2026 Rajesh Kumar Jha. All rights reserved.
      </footer>
    </main>
  );
}