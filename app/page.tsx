"use client"

/**
 * Horizon Freight — single-page marketing site
 *
 * Sections:
 *  1. Navbar
 *  2. Hero         – headline + CTA + globe
 *  3. About Us     – copy + value pillar cards with images
 *  4. Services     – 4 service cards with images
 *  5. Global Reach – large interactive globe
 *  6. Contact      – corporate contact panel + WhatsApp CTA
 *  7. Footer
 */

import { Globe } from "@/components/ui/cobe-globe"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Package,
  Warehouse,
  Truck,
  Globe2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  Clock,
  BarChart3,
  Menu,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

/* ─── Brand logo ──────────────────────────────────────────────────────────── */

/**
 * HorizonLogo — custom SVG mark + stacked wordmark.
 *
 * The mark is a navy rounded-square badge containing a simplified globe:
 *  • outer circle  — global reach
 *  • horizon line  — the "Horizon" in our name
 *  • meridian arc  — longitude / international routes
 *  • NE arrow      — forward momentum / cargo in motion
 *
 * The wordmark stacks "HORIZON" (bold) above "FREIGHT" (tracked, blue).
 *
 * `variant="dark"` inverts text colours for use on dark backgrounds.
 */
function HorizonLogo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const wordPrimary = variant === "dark" ? "#ffffff"   : "#111827" // white  | zinc-900
  const wordAccent  = variant === "dark" ? "#93c5fd"   : "#2563eb" // blue-300 | blue-600

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* ── Icon mark ── */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Badge background — deep navy */}
        <rect width="36" height="36" rx="9" fill="#1e3a5f" />

        {/* Globe circle */}
        <circle cx="18" cy="18" r="10.5" stroke="white" strokeWidth="1.6" />

        {/* Horizon equator — the brand's namesake line, slightly bolder */}
        <line x1="7.5" y1="18" x2="28.5" y2="18" stroke="white" strokeWidth="2" />

        {/* Upper-hemisphere latitude arc */}
        <path
          d="M 9 13.5 Q 18 11 27 13.5"
          stroke="white"
          strokeWidth="1.1"
          strokeOpacity="0.55"
          fill="none"
        />

        {/* Meridian ellipse */}
        <ellipse
          cx="18"
          cy="18"
          rx="4.8"
          ry="10.5"
          stroke="white"
          strokeWidth="1.1"
          strokeOpacity="0.55"
        />

        {/* North-east arrow — cargo in motion */}
        <path
          d="M 18.5 13.5 L 24.5 9.5"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 20.5 9.5 L 24.5 9.5 L 24.5 13.5"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* ── Wordmark ── */}
      <div className="leading-none">
        <div
          className="text-[15px] font-extrabold tracking-tight"
          style={{ color: wordPrimary }}
        >
          HORIZON
        </div>
        <div
          className="text-[9.5px] font-semibold tracking-[0.22em] mt-[3px]"
          style={{ color: wordAccent }}
        >
          FREIGHT
        </div>
      </div>
    </div>
  )
}

/* ─── WhatsApp icon (Lucide does not ship brand icons) ────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const MARKERS = [
  { id: "sf",  location: [ 37.7595, -122.4367] as [number, number], label: "San Francisco" },
  { id: "nyc", location: [ 40.7128,  -74.006 ] as [number, number], label: "New York"      },
  { id: "tok", location: [ 35.6762,  139.6503] as [number, number], label: "Tokyo"         },
  { id: "lon", location: [ 51.5074,   -0.1278] as [number, number], label: "London"        },
  { id: "syd", location: [-33.8688,  151.2093] as [number, number], label: "Sydney"        },
  { id: "dur", location: [-29.8587,   31.0218] as [number, number], label: "Durban"        },
  { id: "jhb", location: [-26.2041,   28.0473] as [number, number], label: "Johannesburg"  },
  { id: "dxb", location: [ 25.2048,   55.2708] as [number, number], label: "Dubai"         },
  { id: "par", location: [ 48.8566,    2.3522] as [number, number], label: "Paris"         },
  { id: "gru", location: [-23.5505,  -46.6333] as [number, number], label: "São Paulo"     },
  { id: "cpt", location: [-33.9249,   18.4241] as [number, number], label: "Cape Town"     },
]

const ARCS = [
  { id: "sf-tok",  from: [ 37.7595, -122.4367] as [number, number], to: [ 35.6762,  139.6503] as [number, number], label: "SF → Tokyo"      },
  { id: "nyc-lon", from: [ 40.7128,  -74.006 ] as [number, number], to: [ 51.5074,   -0.1278] as [number, number], label: "NYC → London"    },
  { id: "dur-dxb", from: [-29.8587,   31.0218] as [number, number], to: [ 25.2048,   55.2708] as [number, number], label: "Durban → Dubai"  },
  { id: "jhb-lon", from: [-26.2041,   28.0473] as [number, number], to: [ 51.5074,   -0.1278] as [number, number], label: "JHB → London"    },
  { id: "cpt-gru", from: [-33.9249,   18.4241] as [number, number], to: [-23.5505,  -46.6333] as [number, number], label: "CPT → São Paulo" },
]

const GLOBE_PROPS = {
  markers:         MARKERS,
  arcs:            ARCS,
  markerColor:     [0.3, 0.45, 0.85] as [number, number, number],
  baseColor:       [1,   1,    1   ] as [number, number, number],
  arcColor:        [0.3, 0.45, 0.85] as [number, number, number],
  glowColor:       [0.94,0.93, 0.91] as [number, number, number],
  dark:            0,
  mapBrightness:   10,
  markerSize:      0.025,
  markerElevation: 0.01,
}

const SERVICES = [
  {
    icon:     Package,
    title:    "Air & Sea Freight",
    image:    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    imageAlt: "Cargo containers stacked at a shipping terminal",
    description:
      "We orchestrate full container load (FCL), less-than-container load (LCL), and airfreight movements across 120+ trade corridors, underpinned by real-time shipment intelligence and a rigorously vetted carrier network.",
  },
  {
    icon:     Warehouse,
    title:    "Warehousing",
    image:    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800",
    imageAlt: "Modern large-scale warehouse interior with organised racking",
    description:
      "Our strategically located bonded facilities in Johannesburg, Cape Town, and Durban deliver enterprise-grade storage, precision pick-and-pack operations, and integrated inventory management tailored to your velocity requirements.",
  },
  {
    icon:     Truck,
    title:    "Last-Mile Delivery",
    image:    "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800",
    imageAlt: "Delivery truck on an urban road",
    description:
      "Horizon Freight's dedicated fleet and certified carrier network guarantee time-definite, proof-of-delivery service across South Africa's major metropolitan centres and extended rural corridors — without exception.",
  },
  {
    icon:     Globe2,
    title:    "Cross-Border Logistics",
    image:    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800",
    imageAlt: "Aerial view of a busy international border crossing",
    description:
      "Our dedicated customs and compliance specialists manage end-to-end documentation, tariff classification, and border facilitation across the SADC region, eliminating costly clearance delays and regulatory risk for your business.",
  },
]

const STATS = [
  { value: "120+",   label: "Countries Served"      },
  { value: "18 yrs", label: "Industry Experience"   },
  { value: "50K+",   label: "Shipments Per Annum"   },
  { value: "99.2%",  label: "On-Time Delivery Rate" },
]

/* Value pillars now include Unsplash images */
const PILLARS = [
  {
    icon:     Shield,
    title:    "Dependable",
    image:    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
    imageAlt: "Two professionals shaking hands in agreement",
    body:     "Consistent, on-schedule performance guaranteed by a dedicated 24/7 operations centre and proactive exception management.",
  },
  {
    icon:     Clock,
    title:    "Agile",
    image:    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
    imageAlt: "Analyst reviewing logistics performance data on screen",
    body:     "Optimised routing algorithms and priority-handling protocols ensure your critical cargo meets every deadline, without compromise.",
  },
  {
    icon:     BarChart3,
    title:    "Transparent",
    image:    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    imageAlt: "Executive reviewing shipping documentation at a desk",
    body:     "Granular shipment visibility and milestone-by-milestone reporting give your team the intelligence to make confident supply-chain decisions.",
  },
]

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">

      {/* ── 1. Navbar ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">

          {/* Custom SVG logo replaces the generic Globe2 icon */}
          <a href="#hero" aria-label="Horizon Freight home">
            <HorizonLogo variant="light" />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#about"    className="hover:text-zinc-900 transition-colors">About</a>
            <a href="#services" className="hover:text-zinc-900 transition-colors">Services</a>
            <a href="#reach"    className="hover:text-zinc-900 transition-colors">Global Reach</a>
            <a href="#contact"  className="hover:text-zinc-900 transition-colors">Contact</a>
          </nav>

          <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 h-9 text-sm">
            Request a Quote
          </Button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <Menu className="size-5" />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-zinc-100 bg-white px-6 py-4 flex flex-col gap-4 text-sm font-medium text-zinc-700">
            {["About", "Services", "Global Reach", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMobileOpen(false)}
                className="hover:text-zinc-900 transition-colors"
              >
                {label}
              </a>
            ))}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-full h-9">
              Request a Quote
            </Button>
          </div>
        )}
      </header>

      {/* ── 2. Hero ──────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 tracking-wide uppercase">
              <MapPin className="size-3" /> Africa's Premier Freight Operator
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-zinc-900">
              Precision Logistics.<br />
              <span className="text-blue-600">Global</span> Scale.
            </h1>

            <p className="text-lg text-zinc-500 leading-relaxed max-w-md">
              Horizon Freight delivers mission-critical supply-chain solutions across 120+ countries —
              combining South African expertise with a world-class international carrier network to move
              your cargo with absolute confidence.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 h-11 text-sm font-semibold">
                Request a Quote <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 h-11 text-sm font-semibold border-zinc-300 hover:bg-zinc-50"
              >
                Explore Services
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-4 border-t border-zinc-100">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-zinc-900">{s.value}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[480px]">
              <div className="absolute inset-0 rounded-full bg-blue-100/60 blur-3xl scale-75" />
              <Globe {...GLOBE_PROPS} className="relative" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. About Us ──────────────────────────────────────────────────── */}
      <section id="about" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug">
              South Africa's global logistics backbone since 2006.
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Established in Johannesburg, Horizon Freight has evolved from a regional road-freight
              operator into a full-service international logistics enterprise. Our competitive advantage
              lies in the seamless integration of deep-rooted local market knowledge with an
              extensively curated global partner network — ensuring your cargo reaches its destination
              safely, compliantly, and on schedule.
            </p>
            <p className="text-zinc-500 leading-relaxed">
              From emerging exporters shipping their inaugural container to Fortune 500 multinationals
              managing complex, multi-modal supply chains, our 200-strong team of logistics specialists
              applies the same rigorous standard of service excellence to every engagement.
            </p>
            <Button
              variant="outline"
              className="self-start rounded-full px-5 h-9 text-sm border-zinc-300"
            >
              Our Story <ArrowRight className="size-4" />
            </Button>
          </div>

          {/* Right — value pillar cards with Unsplash photos */}
          <div className="grid gap-4">
            {PILLARS.map(({ icon: Icon, title, image, imageAlt, body }) => (
              <div
                key={title}
                className="group flex gap-0 rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-blue-100 hover:shadow-md transition-all duration-200"
              >
                {/* Thumbnail image — fixed width, full card height */}
                <div className="relative w-28 shrink-0 overflow-hidden">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle right-edge fade into card content */}
                  <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex items-start gap-3 p-4">
                  <div className="flex-shrink-0 size-9 rounded-lg bg-blue-600/10 flex items-center justify-center mt-0.5">
                    <Icon className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 text-sm">{title}</p>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Services ──────────────────────────────────────────────────── */}
      <section
        id="services"
        className="bg-gradient-to-b from-slate-50 to-white py-24"
      >
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Our Capabilities
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Comprehensive logistics solutions
            </h2>
            <p className="mt-4 text-zinc-500 max-w-xl mx-auto leading-relaxed">
              From point of origin to final delivery, Horizon Freight manages every critical node
              in your supply chain — so your organisation can focus on its core strategic priorities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ icon: Icon, title, image, imageAlt, description }) => (
              <Card
                key={title}
                className="group overflow-hidden hover:shadow-md hover:border-blue-100 transition-all duration-200"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 size-9 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
                    <Icon className="size-4 text-blue-600" />
                  </div>
                </div>
                <CardHeader className="pt-4">
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Global Reach ──────────────────────────────────────────────── */}
      <section id="reach" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Global Reach
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Wherever your cargo needs to go
            </h2>
            <p className="mt-4 text-zinc-500 max-w-xl mx-auto leading-relaxed">
              Our active trade lanes span six continents. Interact with the globe below to
              explore Horizon Freight's principal shipping corridors connecting South Africa
              to the world's most strategically important commercial hubs.
            </p>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
            <div className="relative w-full max-w-[640px]">
              <Globe {...GLOBE_PROPS} />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {ARCS.map((arc) => (
              <span
                key={arc.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                <span className="size-1.5 rounded-full bg-blue-500 inline-block" />
                {arc.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Contact ───────────────────────────────────────────────────── */}
      <section id="contact" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Get In Touch
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Engage our logistics team
            </h2>
            <p className="mt-4 text-zinc-500 max-w-lg mx-auto leading-relaxed">
              Connect with a Horizon Freight specialist to discuss your freight requirements,
              request a tailored quotation, or commission a supply-chain consultation.
              Our team responds within one business hour.
            </p>
          </div>

          {/*
           * Corporate contact panel — two-zone layout:
           *   Left (navy): brand reinforcement + contact details list
           *   Right (light): availability note + WhatsApp CTA
           */}
          <div className="mx-auto max-w-4xl rounded-3xl overflow-hidden border border-zinc-200 shadow-sm grid md:grid-cols-[1fr_auto]">

            {/* ── Left: navy detail panel ── */}
            <div className="bg-[#1e3a5f] px-10 py-12 flex flex-col gap-8">

              {/* Logo in white/blue-300 variant */}
              <HorizonLogo variant="dark" />

              <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
                Africa's leading international freight and logistics partner, operating
                across 120+ countries from our Durban headquarters.
              </p>

              {/* Contact details list */}
              <div className="flex flex-col gap-6">

                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 size-10 rounded-xl bg-white/10 flex items-center justify-center mt-0.5">
                    <MapPin className="size-4 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-1">
                      Head Office
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      14 Harbour Exchange<br />
                      Umhlanga Ridge<br />
                      Durban, 4319<br />
                      South Africa
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 size-10 rounded-xl bg-white/10 flex items-center justify-center mt-0.5">
                    <Phone className="size-4 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-1">
                      Telephone
                    </p>
                    <a
                      href="tel:+27310004500"
                      className="text-white text-sm hover:text-blue-300 transition-colors"
                    >
                      +27 31 000 4500
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 size-10 rounded-xl bg-white/10 flex items-center justify-center mt-0.5">
                    <Mail className="size-4 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@horizonfreight.co.za"
                      className="text-white text-sm hover:text-blue-300 transition-colors"
                    >
                      info@horizonfreight.co.za
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: action panel ── */}
            <div className="bg-slate-50 px-10 py-12 flex flex-col justify-center items-start gap-6 min-w-[280px]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                  Instant Response
                </p>
                <h3 className="text-xl font-bold text-zinc-900 leading-snug">
                  Chat directly<br />with our team
                </h3>
                <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                  Our operations specialists are available on WhatsApp — Monday to Friday,
                  07:00 – 18:00 SAST.
                </p>
              </div>

              {/* WhatsApp CTA button — updated number */}
              <a
                href="https://wa.me/27676381778?text=Thank%20you%20for%20viewing%20this%20Proudly%20Atlantic%20product.%20Let%20us%20know%20what%20you%20think."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#17a854] text-white font-semibold text-sm px-6 h-11 transition-colors shadow-sm"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                Chat on WhatsApp
              </a>

              {/* Availability note */}
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <p className="text-xs text-zinc-500">Typically replies within 30 minutes</p>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-zinc-200" />

              {/* Secondary email CTA */}
              <a
                href="mailto:info@horizonfreight.co.za"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Mail className="size-4" />
                Send us an email
                <ChevronRight className="size-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Footer ────────────────────────────────────────────────────── */}
      <footer className="bg-zinc-900 text-zinc-400 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* Logo in dark variant */}
          <HorizonLogo variant="dark" />

          <p className="text-center text-xs">
            © {new Date().getFullYear()} Horizon Freight (Pty) Ltd. All rights reserved.
          </p>

          <nav className="flex gap-5 text-xs">
            <a href="#about"    className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#reach"    className="hover:text-white transition-colors">Reach</a>
            <a href="#contact"  className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </footer>

    </div>
  )
}
