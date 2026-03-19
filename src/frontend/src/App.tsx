import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useGetTestimonials, useSubmitContact } from "./hooks/useQueries";

const queryClient = new QueryClient();

// ===================== DATA =====================
const PROJECTS = [
  {
    id: 1,
    title: "Luxury Residence",
    location: "Bhopal, MP",
    category: "Residential",
    image: "/assets/generated/project-residential.dim_800x600.jpg",
  },
  {
    id: 2,
    title: "Corporate Headquarters",
    location: "Indore, MP",
    category: "Commercial",
    image: "/assets/generated/project-commercial.dim_800x600.jpg",
  },
  {
    id: 3,
    title: "Premium Interior",
    location: "Bhopal, MP",
    category: "Interior",
    image: "/assets/generated/project-interior.dim_800x600.jpg",
  },
  {
    id: 4,
    title: "Mixed-Use Development",
    location: "Jabalpur, MP",
    category: "Mixed-Use",
    image: "/assets/generated/project-mixeduse.dim_800x600.jpg",
  },
  {
    id: 5,
    title: "Hillside Villa",
    location: "Bhopal, MP",
    category: "Residential",
    image: "/assets/generated/project-villa.dim_800x600.jpg",
  },
  {
    id: 6,
    title: "Civic Center",
    location: "Bhopal, MP",
    category: "Institutional",
    image: "/assets/generated/project-institutional.dim_800x600.jpg",
  },
];

const PORTFOLIO_GRID_POSITIONS = [
  "p-item-0", // featured — 2-col wide
  "p-item-1", // right col
  "p-item-2", // left
  "p-item-3", // centre
  "p-item-4", // right
  "p-item-5", // full-width banner
] as const;

const SERVICES = [
  {
    icon: "🏛",
    title: "Architecture Design",
    desc: "Bespoke architectural solutions that harmonise aesthetics with function. From concept sketches to construction documents, we craft buildings that endure.",
  },
  {
    icon: "🛋",
    title: "Interior Design",
    desc: "Curated interiors that reflect the client's personality. We transform spaces into living experiences with precision, texture, and intention.",
  },
  {
    icon: "🏗",
    title: "Construction Management",
    desc: "End-to-end site supervision ensuring quality, timelines, and budgets are upheld without compromise. Your vision, professionally executed.",
  },
  {
    icon: "🏙",
    title: "Urban Planning",
    desc: "Strategic masterplanning for townships, corridors, and mixed-use zones. We think beyond buildings to shape sustainable urban environments.",
  },
  {
    icon: "🔧",
    title: "Renovation & Restoration",
    desc: "Breathe new life into existing structures. Our team combines heritage sensitivity with modern solutions to revitalise buildings beautifully.",
  },
  {
    icon: "📋",
    title: "Project Consulting",
    desc: "Independent expert advice at every stage — feasibility, design review, regulatory compliance, and value engineering for informed decisions.",
  },
];

const WHY_US = [
  {
    title: "Legacy & Trust",
    desc: "Over two decades of consistent excellence in Madhya Pradesh. Our portfolio spans luxury residences to landmark civic structures.",
  },
  {
    title: "Client-Centric Approach",
    desc: "Every project begins with deep listening. We co-create with our clients, ensuring every design decision reflects their vision and lifestyle.",
  },
  {
    title: "Award-Winning Design",
    desc: "Recognised by leading industry bodies for design innovation, construction quality, and sustainable practices across Central India.",
  },
  {
    title: "End-to-End Service",
    desc: "From the first sketch to the final fitting, we handle every phase in-house — architecture, interiors, and construction under one roof.",
  },
  {
    title: "Local Expertise",
    desc: "Deep knowledge of Bhopal's terrain, climate, and regulatory landscape means faster approvals and smarter site-specific design.",
  },
  {
    title: "Sustainable Architecture",
    desc: "Passive design strategies, local materials, and energy-efficient systems are integrated from day one — for buildings that respect the planet.",
  },
];

const FALLBACK_TESTIMONIALS = [
  {
    content:
      "Shantanu & Associates transformed our vision into a home we are deeply proud of. Their attention to detail, thoughtful design, and transparent communication made the entire journey genuinely enjoyable.",
    clientName: "Rajesh Malhotra",
    role: "Homeowner, Bhopal",
  },
  {
    content:
      "We commissioned our corporate campus from Shantanu & Associates and the result exceeded every expectation. The space communicates our brand identity and our teams love working in it every day.",
    clientName: "Priya Sharma",
    role: "Director, TechVista Solutions, Indore",
  },
  {
    content:
      "The renovation of our heritage bungalow was handled with exceptional sensitivity. They preserved its character while introducing modern comforts seamlessly. Highly recommended.",
    clientName: "Col. Vikram Tiwari (Retd.)",
    role: "Property Owner, Bhopal",
  },
  {
    content:
      "Working with this firm was a masterclass in professionalism. The project was delivered on schedule, within budget, and the quality of craftsmanship is outstanding. We will work with them again.",
    clientName: "Anita & Suresh Gupta",
    role: "Villa Clients, Bhopal",
  },
];

// ===================== LOADER =====================
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="loader-overlay">
      <div className="loader-logo">S&amp;A</div>
      <div className="loader-tagline">Shantanu &amp; Associates</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
      <div
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase",
        }}
      >
        Architectural Services &amp; Construction
      </div>
    </div>
  );
}

// ===================== CUSTOM CURSOR =====================
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest(
          "a, button, [data-cursor-expand], .portfolio-item, .service-card",
        )
      ) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${expanded ? "expanded" : "dot"} hidden md:block`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

// ===================== SCROLL PROGRESS =====================
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      data-ocid="scroll.progress"
    />
  );
}

// ===================== REVEAL HOOK =====================
function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ===================== SECTION HEADER (editorial) =====================
function SectionHeader({
  number,
  label,
  title,
  light = false,
}: {
  number: string;
  label: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div
      data-reveal
      style={{ position: "relative", marginBottom: "clamp(2rem, 5vw, 4rem)" }}
    >
      {/* Ghost numeral */}
      <div className={`section-ghost-num${light ? " light" : ""}`}>
        {number}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow row: counter + dash + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.25rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.8rem",
              color: "#C7A15A",
              fontWeight: 600,
            }}
          >
            {number}
          </span>
          <span
            style={{
              width: "2.5rem",
              height: "1px",
              background: "#C7A15A",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "#C7A15A",
              fontWeight: 600,
            }}
          >
            {label}
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 700,
            color: light ? "#ffffff" : "#111111",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            marginBottom: "2.5rem",
          }}
        >
          {title}
        </h2>

        {/* Gold hairline */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: light
              ? "rgba(199,161,90,0.18)"
              : "rgba(199,161,90,0.2)",
          }}
        />
      </div>
    </div>
  );
}

// ===================== NAVBAR =====================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Why Us", id: "why-us" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group no-cursor"
          data-ocid="nav.link"
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#C7A15A",
              letterSpacing: "0.1em",
            }}
          >
            S&amp;A
          </span>
          <div className="hidden sm:block">
            <div
              style={{
                color: "#ffffff",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Shantanu &amp; Associates
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.id)}
              data-ocid={"nav.link"}
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.3s ease",
                background: "none",
                border: "none",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#C7A15A";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color =
                  "rgba(255,255,255,0.82)";
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            data-ocid="nav.primary_button"
            style={{
              border: "1px solid #C7A15A",
              color: "#C7A15A",
              padding: "0.55rem 1.4rem",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              borderRadius: 0,
              cursor: "pointer",
              transition: "background 0.3s ease, color 0.3s ease",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#C7A15A";
              (e.currentTarget as HTMLElement).style.color = "#111";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#C7A15A";
            }}
          >
            Request Consultation
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
          style={{ cursor: "pointer" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`mobile-nav lg:hidden ${mobileOpen ? "open" : "closed"}`}
        style={{ background: "rgba(10,10,10,0.96)" }}
      >
        <div className="px-6 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.id)}
              data-ocid={"nav.link"}
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textAlign: "left",
                padding: "0.5rem 0",
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="btn-gold mt-2 text-center"
            data-ocid="nav.primary_button"
            style={{ cursor: "pointer" }}
          >
            Request Consultation
          </button>
        </div>
      </div>
    </nav>
  );
}

// ===================== HERO =====================
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        minHeight: 640,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background image — Ken Burns */}
      <div
        className="hero-bg"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('/assets/generated/hero-architecture.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient — strong left, feathers right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(6,6,6,0.93) 0%, rgba(6,6,6,0.72) 52%, rgba(6,6,6,0.18) 100%)",
        }}
      />

      {/* Ghost architecture watermark */}
      <div className="hero-ghost-text">Architecture</div>

      {/* Vertical rotated label — right edge */}
      <div className="hero-vertical-label">
        Bhopal &nbsp;·&nbsp; Madhya Pradesh &nbsp;·&nbsp; Est. 2003
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
          paddingRight: "clamp(1.5rem, 4vw, 6rem)",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <div
          className="hero-text-1"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "2.5rem",
              height: "1px",
              background: "#C7A15A",
            }}
          />
          <span
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "#C7A15A",
              fontWeight: 600,
            }}
          >
            Architecture &amp; Construction — Bhopal
          </span>
        </div>

        {/* Monumental H1 */}
        <h1
          className="hero-text-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 9.5vw, 8.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          Crafting
          <br />
          Extra
          <wbr />
          ordinary
          <br />
          <em
            style={{
              color: "#C7A15A",
              fontStyle: "normal",
            }}
          >
            Spaces.
          </em>
        </h1>

        {/* Body */}
        <p
          className="hero-text-3"
          style={{
            fontSize: "clamp(0.82rem, 1.4vw, 0.95rem)",
            color: "rgba(255,255,255,0.52)",
            letterSpacing: "0.04em",
            marginBottom: "3rem",
            lineHeight: 1.8,
            maxWidth: "480px",
          }}
        >
          Two decades of luxury residential, commercial &amp; institutional
          architecture across Madhya Pradesh. We design spaces that endure.
        </p>

        {/* CTAs */}
        <div
          className="hero-text-4"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(1rem, 4vw, 2.5rem)",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            className="btn-gold"
            onClick={() =>
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.primary_button"
          >
            View Projects
          </button>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.secondary_button"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.72)",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: 0,
              transition: "color 0.3s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#C7A15A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.72)";
            }}
          >
            Our Story
            <span style={{ fontSize: "1rem" }}>→</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Scroll
        </span>
        <div className="scroll-indicator">
          <ChevronDown size={16} color="rgba(199,161,90,0.6)" />
        </div>
      </div>
    </section>
  );
}

// ===================== ABOUT =====================
function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "#ffffff",
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: "clamp(2rem, 5vw, 4rem)",
          alignItems: "center",
        }}
      >
        {/* Left: text */}
        <div data-reveal>
          <SectionHeader
            number="01"
            label="About Us"
            title="Two Decades of Architectural Excellence"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <p
              style={{
                color: "#6B6B6B",
                lineHeight: 1.85,
                fontSize: "0.95rem",
              }}
            >
              Founded in 2003 by Shantanu Verma in Bhopal, Shantanu &amp;
              Associates has grown into one of Madhya Pradesh's most respected
              architectural practices. With a philosophy rooted in contextual
              design and material honesty, we have shaped the residential,
              commercial, and civic landscape of Central India.
            </p>
            <p
              style={{
                color: "#6B6B6B",
                lineHeight: 1.85,
                fontSize: "0.95rem",
              }}
            >
              Our studio brings together a multidisciplinary team of architects,
              interior designers, urban planners, and construction specialists
              who share a singular commitment: to deliver spaces that elevate
              the human experience. Every project is treated as a unique
              conversation between client, context, and craft.
            </p>
            <p
              style={{
                color: "#6B6B6B",
                lineHeight: 1.85,
                fontSize: "0.95rem",
              }}
            >
              From luxury hillside villas in the Vindhya highlands to
              institutional landmarks in Bhopal's expanding urban core, our work
              reflects a deep understanding of place, climate, and culture —
              combined with rigorous technical execution.
            </p>
          </div>
        </div>

        {/* Right: stats */}
        <div
          data-reveal
          data-reveal-delay="2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            background: "#f2f2f2",
            border: "1px solid #ebebeb",
          }}
        >
          {[
            { number: "20+", label: "Years of Experience" },
            { number: "150+", label: "Projects Completed" },
            { number: "50+", label: "Awards Won" },
            { number: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#ffffff",
                padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 2rem)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 700,
                  color: "#C7A15A",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#9B9B9B",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== SERVICES =====================
function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        background: "#F2F2F2",
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader number="02" label="Our Services" title="What We Do" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "1.5px",
            background: "#e8e8e8",
          }}
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              data-reveal
              data-reveal-delay={`${(i % 3) + 1}` as "1" | "2" | "3"}
              className="service-card"
              style={{
                background: "#ffffff",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
              data-ocid={`services.item.${i + 1}`}
            >
              <div
                style={{
                  width: "3rem",
                  height: "3px",
                  background: "#C7A15A",
                  marginBottom: "0.5rem",
                }}
              />
              <div style={{ fontSize: "1.8rem" }}>{service.icon}</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "#111111",
                  letterSpacing: "-0.01em",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  color: "#6B6B6B",
                  fontSize: "0.88rem",
                  lineHeight: 1.8,
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== PORTFOLIO =====================
function PortfolioSection() {
  const [selected, setSelected] = useState<(typeof PROJECTS)[0] | null>(null);

  return (
    <section
      id="portfolio"
      style={{
        background: "#0c0c0c",
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        {/* Header */}
        <div
          data-reveal
          style={{
            position: "relative",
            marginBottom: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          <div className="section-ghost-num light">03</div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.8rem",
                  color: "#C7A15A",
                  fontWeight: 600,
                }}
              >
                03
              </span>
              <span
                style={{
                  width: "2.5rem",
                  height: "1px",
                  background: "#C7A15A",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "#C7A15A",
                  fontWeight: 600,
                }}
              >
                Our Work
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                marginBottom: "2.5rem",
              }}
            >
              Selected Projects
            </h2>
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(199,161,90,0.18)",
              }}
            />
          </div>
        </div>

        {/* Editorial grid */}
        <div className="portfolio-editorial-grid">
          {PROJECTS.map((project, i) => (
            <button
              type="button"
              key={project.id}
              className={`portfolio-item ${PORTFOLIO_GRID_POSITIONS[i]}`}
              data-reveal
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                padding: 0,
                background: "#1a1a1a",
                cursor: "pointer",
                display: "block",
                position: "relative",
                overflow: "hidden",
              }}
              onClick={() => setSelected(project)}
              data-cursor-expand
              data-ocid={`portfolio.item.${i + 1}`}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              <div className="portfolio-overlay">
                <div className="portfolio-info">
                  <div
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#C7A15A",
                      marginBottom: "0.45rem",
                      fontWeight: 600,
                    }}
                  >
                    {project.category}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: i === 0 ? "1.6rem" : "1.15rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: "0.35rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.55)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <MapPin size={10} />
                    {project.location}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.96)",
            zIndex: 5000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setSelected(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelected(null);
          }}
          aria-label="Project preview"
          aria-modal="true"
          tabIndex={-1}
          data-ocid="portfolio.modal"
        >
          <div
            style={{
              maxWidth: "960px",
              width: "100%",
              position: "relative",
              animation: "fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="document"
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              data-ocid="portfolio.close_button"
              className="portfolio-modal-close"
              style={{
                position: "absolute",
                top: "-3.5rem",
                right: 0,
                color: "rgba(255,255,255,0.6)",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#C7A15A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.6)";
              }}
            >
              <X size={16} />
              Close
            </button>
            <img
              src={selected.image}
              alt={selected.title}
              style={{
                width: "100%",
                display: "block",
                maxHeight: "78vh",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                background: "#0f0f0f",
                padding: "1.75rem 2.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgba(199,161,90,0.2)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    color: "#ffffff",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    marginBottom: "0.3rem",
                  }}
                >
                  {selected.title}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {selected.location} &nbsp;·&nbsp; {selected.category}
                </div>
              </div>
              <div
                style={{
                  width: "1px",
                  height: "2.5rem",
                  background: "#C7A15A",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ===================== WHY CHOOSE US =====================
// ===================== WHY CHOOSE US =====================
function WhyChooseUs() {
  const icons = [
    <Clock key="clock" size={22} color="#C7A15A" />,
    <Users key="users" size={22} color="#C7A15A" />,
    <Award key="award" size={22} color="#C7A15A" />,
    <Star key="star" size={22} color="#C7A15A" />,
    <MapPin key="map" size={22} color="#C7A15A" />,
    <ChevronDown key="chevron" size={22} color="#C7A15A" />,
  ];

  return (
    <section
      id="why-us"
      style={{
        background: "#F2F2F2",
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader
          number="04"
          label="Why Choose Us"
          title="The Shantanu Difference"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "2rem",
          }}
        >
          {WHY_US.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              data-reveal-delay={`${(i % 3) + 1}` as "1" | "2" | "3"}
              style={{
                padding: "2rem",
                background: "#ffffff",
                borderTop: "1px solid #ebebeb",
              }}
              data-ocid={`why.item.${i + 1}`}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  border: "1px solid rgba(199,161,90,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                {icons[i]}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#111111",
                  marginBottom: "0.75rem",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: "#6B6B6B",
                  fontSize: "0.88rem",
                  lineHeight: 1.8,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== TESTIMONIALS =====================
function TestimonialsSection() {
  const { data: backendTestimonials } = useGetTestimonials();
  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials
      : FALLBACK_TESTIMONIALS;

  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, [testimonials.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startTimer();
  };

  const prev = () =>
    goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      style={{
        background: "#111111",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          data-reveal
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#C7A15A",
            fontWeight: 600,
            marginBottom: "3rem",
          }}
        >
          Client Testimonials
        </div>

        {/* Quote mark */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            color: "#C7A15A",
            lineHeight: 0.6,
            marginBottom: "2rem",
            opacity: 0.8,
          }}
        >
          &#x201C;
        </div>

        <div
          key={current}
          style={{
            animation: "fadeIn 0.7s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.8,
              fontStyle: "italic",
              marginBottom: "2.5rem",
            }}
          >
            {t.content}
          </p>

          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                color: "#ffffff",
                fontWeight: 600,
                marginBottom: "0.35rem",
              }}
            >
              {t.clientName}
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C7A15A",
              }}
            >
              {t.role}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <button
            type="button"
            onClick={prev}
            data-ocid="testimonials.pagination_prev"
            style={{
              width: "40px",
              height: "40px",
              border: "1px solid rgba(199,161,90,0.4)",
              background: "transparent",
              color: "#C7A15A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.3s ease, background 0.3s ease",
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {testimonials.map((_t, i) => (
              <button
                type="button"
                // biome-ignore lint/suspicious/noArrayIndexKey: testimonials are ordered
                key={i}
                onClick={() => goTo(i)}
                data-ocid={"testimonials.toggle"}
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "2px",
                  background:
                    i === current ? "#C7A15A" : "rgba(255,255,255,0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.4s ease, background 0.4s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            data-ocid="testimonials.pagination_next"
            style={{
              width: "40px",
              height: "40px",
              border: "1px solid rgba(199,161,90,0.4)",
              background: "transparent",
              color: "#C7A15A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.3s ease, background 0.3s ease",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ===================== CONTACT =====================
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { mutate, isPending, isSuccess } = useSubmitContact();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        toast.success("Message sent! We will be in touch shortly.", {
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #C7A15A",
          },
        });
        setForm({ name: "", email: "", phone: "", message: "" });
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "#f8f8f8",
    border: "1px solid #e0e0e0",
    borderRadius: 0,
    fontSize: "0.88rem",
    color: "#111",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.3s ease",
  };

  return (
    <section
      id="contact"
      style={{
        background: "#ffffff",
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader
          number="05"
          label="Get In Touch"
          title="Let's Build Something Extraordinary"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          {/* Left: Map + info */}
          <div
            data-reveal
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div style={{ overflow: "hidden", lineHeight: 0 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117498.28628706!2d77.3368!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="280"
                style={{
                  border: 0,
                  display: "block",
                  filter: "grayscale(0.2)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shantanu & Associates Location - Bhopal"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                {
                  icon: <MapPin size={16} color="#C7A15A" />,
                  label: "Location",
                  value: "Bhopal, Madhya Pradesh, India",
                },
                {
                  icon: <Phone size={16} color="#C7A15A" />,
                  label: "Phone",
                  value: "078790 79874",
                  href: "tel:+917879079874",
                },
                {
                  icon: <Mail size={16} color="#C7A15A" />,
                  label: "Email",
                  value: "studio@shantanuassociates.in",
                  href: "mailto:studio@shantanuassociates.in",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(199,161,90,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#9B9B9B",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          color: "#111",
                          fontSize: "0.9rem",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ color: "#111", fontSize: "0.9rem" }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/917879079874"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.primary_button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  background: "#25D366",
                  color: "#ffffff",
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  textDecoration: "none",
                  alignSelf: "flex-start",
                  transition: "opacity 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <SiWhatsapp size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div data-reveal data-reveal-delay="2">
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              data-ocid="contact.panel"
            >
              <div
                className="contact-form-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: "block",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#9B9B9B",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rajesh Sharma"
                    style={inputStyle}
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: "block",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#9B9B9B",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    style={inputStyle}
                    data-ocid="contact.input"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  style={{
                    display: "block",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#9B9B9B",
                    marginBottom: "0.4rem",
                  }}
                >
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  style={inputStyle}
                  data-ocid="contact.input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: "block",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#9B9B9B",
                    marginBottom: "0.4rem",
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  data-ocid="contact.textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isPending || isSuccess}
                data-ocid="contact.submit_button"
                style={{
                  background: isPending ? "#555" : "#111111",
                  color: "#ffffff",
                  padding: "1rem 2rem",
                  fontSize: "0.78rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  border: "none",
                  cursor: isPending ? "not-allowed" : "pointer",
                  transition: "background 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {isPending ? "Sending..." : "Get In Touch"}
              </button>

              {isSuccess && (
                <div
                  data-ocid="contact.success_state"
                  style={{
                    padding: "0.75rem 1rem",
                    background: "rgba(199,161,90,0.1)",
                    border: "1px solid rgba(199,161,90,0.3)",
                    color: "#C7A15A",
                    fontSize: "0.82rem",
                    letterSpacing: "0.08em",
                    textAlign: "center",
                  }}
                >
                  Thank you! We will be in touch shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== FOOTER =====================
function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "#0B0B0B" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 6rem) 0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.2rem",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.08em",
                marginBottom: "0.4rem",
              }}
            >
              S &amp; A
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C7A15A",
                marginBottom: "1rem",
              }}
            >
              Shantanu &amp; Associates
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#7A7A7A",
                lineHeight: 1.7,
                maxWidth: "clamp(200px, 100%, 240px)",
              }}
            >
              Architectural Services &amp; Construction
              <br />
              Bhopal, Madhya Pradesh, India
            </div>
          </div>

          {/* Links */}
          <div>
            <div
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#5A5A5A",
                marginBottom: "1.25rem",
              }}
            >
              Navigation
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {["about", "services", "portfolio", "why-us", "contact"].map(
                (id) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => scrollTo(id)}
                    data-ocid="footer.link"
                    style={{
                      color: "#B8B8B8",
                      fontSize: "0.82rem",
                      letterSpacing: "0.08em",
                      textTransform: "capitalize",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#C7A15A";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "#B8B8B8";
                    }}
                  >
                    {id.replace("-", " ")}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#5A5A5A",
                marginBottom: "1.25rem",
              }}
            >
              Contact
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <a
                href="tel:+917879079874"
                style={{
                  color: "#B8B8B8",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                +91 78790 79874
              </a>
              <a
                href="https://wa.me/917879079874"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#25D366",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                WhatsApp Us
              </a>
              <div style={{ color: "#7A7A7A", fontSize: "0.82rem" }}>
                Bhopal, Madhya Pradesh
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            padding: "1.5rem 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ color: "#5A5A5A", fontSize: "0.75rem" }}>
            &copy; {year} Shantanu &amp; Associates. All rights reserved.
          </div>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#5A5A5A",
              fontSize: "0.72rem",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ===================== FLOATING WHATSAPP =====================
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/917879079874"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      data-ocid="whatsapp.button"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 900,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
      }}
    >
      <SiWhatsapp size={26} color="#ffffff" />
    </a>
  );
}

// ===================== MAIN APP =====================
function AppContent() {
  const [loaderDone, setLoaderDone] = useState(false);

  useReveal();

  // Re-run reveal after loader finishes
  useEffect(() => {
    if (loaderDone) {
      setTimeout(() => {
        const elements = document.querySelectorAll("[data-reveal]");
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
              }
            }
          },
          { threshold: 0.12 },
        );
        for (const el of elements) {
          observer.observe(el);
        }
        return () => observer.disconnect();
      }, 100);
    }
  }, [loaderDone]);

  return (
    <div style={{ position: "relative" }}>
      {!loaderDone && <Loader onDone={() => setLoaderDone(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
