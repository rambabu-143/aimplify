"use client";

import { Fragment, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bot, Zap, MessageSquare, ExternalLink,
  ArrowRight, CheckCircle2, Phone, Sparkles, X,
} from "lucide-react";

// Aceternity UI
import {
  Navbar, NavBody, NavItems, NavbarButton,
  MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { FlipWords } from "@/components/ui/flip-words";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

// Magic UI
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Marquee } from "@/components/ui/marquee";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BorderBeam } from "@/components/ui/border-beam";

// shadcn
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

// Custom
import FlowDiagram from "@/components/FlowDiagram";
import { cn } from "@/lib/utils";

/* ── animation presets ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeIn  = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } };

/* ── data ──────────────────────────────────────────────────────── */
const navItems = [
  { name: "Services", link: "#services" },
  { name: "Process",  link: "#process"  },
  { name: "Why Us",   link: "#why"      },
  { name: "FAQ",      link: "#faq"      },
  { name: "About",    link: "/about"    },
];

const stats = [
  { value: "1",      label: "Happy Client"      },
  { value: "Free",   label: "Discovery Call"    },
  { value: "0",      label: "Lock-in Contracts" },
  { value: "1-on-1", label: "Dedicated Support" },
];

const services = [
  {
    icon: Bot,
    color: "#6366f1",
    title: "AI Workflow Automation",
    desc: "Map every manual task in your business: lead follow-ups, invoicing, CRM updates, notifications. Automate it end-to-end so your team stops doing the same thing twice.",
  },
  {
    icon: MessageSquare,
    color: "#10b981",
    title: "AI Chatbots",
    desc: "WhatsApp and web chatbots that handle customer inquiries, qualify leads, and book appointments around the clock. Built for your exact workflow, not a generic template.",
  },
  {
    icon: Zap,
    color: "#f59e0b",
    title: "Agency Workflow Automation",
    desc: "Client onboarding, reporting, project updates, invoice chasing. We automate the ops layer of your agency so your team spends time on actual work, not admin.",
  },
];

const comparison = [
  { before: "40 hrs/week on manual tasks",          after: "2 hrs/week oversight"               },
  { before: "Customer inquiries pile up overnight", after: "AI chatbot handles them 24/7"        },
  { before: "Client onboarding takes days",         after: "Automated and done in under an hour" },
  { before: "Leads slip through after hours",       after: "Instant AI follow-up, every time"   },
  { before: "Team stuck on repetitive admin",       after: "Team focused on growth"             },
  { before: "Manual marketing follow-ups",          after: "Fully automated sequences"          },
];

const steps = [
  { n: "01", title: "Discovery Call",   desc: "You walk us through your business. What runs well, what doesn't, what's eating time and money. We ask questions. No pitch." },
  { n: "02", title: "Audit & Roadmap",  desc: "We map every automation opportunity: manual workflows, chatbot gaps, agency ops. Prioritised by business impact." },
  { n: "03", title: "Build & Maintain", desc: "We build everything, then stay on as your dedicated tech partner with monthly maintenance, monitoring, and ongoing improvement." },
];

const founder = {
  name: "Rambabu Arabandi",
  title: "GenAI Engineer & Founder",
  linkedin: "https://linkedin.com/in/rambabu-arabandi",
  bio: "I'm a GenAI engineer who builds automation systems for small businesses and agencies. I've shipped AI tools used by real teams. Now I do the same for yours, personally, one client at a time.",
};

const faqs = [
  {
    q: "How long does the initial setup take?",
    a: "Depends on scope. A simple chatbot or automation can be live in 3 to 7 days. A full workflow audit and build typically takes 2 to 4 weeks. We give you a clear timeline after the discovery call.",
  },
  {
    q: "Do we need to be technical to work with you?",
    a: "Not at all. We explain everything in plain English. You tell us the business problem, we figure out the technical solution. You approve it, we build it.",
  },
  {
    q: "How does the monthly maintenance work?",
    a: "After the initial build, we stay on as your tech partner. This includes monitoring, updates, bug fixes, and ongoing improvements. All for a flat monthly fee. No surprise invoices.",
  },
  {
    q: "What if we already have some automation in place?",
    a: "Even better. We audit what you have, keep what's working, replace or fix what isn't, and fill the gaps. We're not here to rip things out, just to make everything better.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes. Everything is done remotely. Calls, updates, and deliveries all happen async or via scheduled video calls. Timezone is not a blocker.",
  },
  {
    q: "What's a realistic ROI?",
    a: "Most clients see measurable ROI within the first month. Saved hours or new revenue from better follow-up. We track it together and show you the numbers.",
  },
];

const techItems = [
  "OpenAI", "n8n", "Zapier", "Make.com", "Next.js", "AWS",
  "Vercel", "Stripe", "HubSpot", "Supabase", "Cloudflare",
  "React", "Python", "TypeScript", "Tailwind",
];

/* ── page ──────────────────────────────────────────────────────── */
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <Navbar>
          <NavBody>
            <a href="/" className="relative z-20 font-bold text-base text-black">
              orch<span className="text-neutral-400">ops</span>
            </a>
            <NavItems items={navItems} />
            <NavbarButton href="#contact" variant="dark">Book a Call</NavbarButton>
          </NavBody>
          <MobileNav>
            <MobileNavHeader>
              <a href="/" className="font-bold text-base text-black">
                orch<span className="text-neutral-400">ops</span>
              </a>
              <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
            </MobileNavHeader>
            <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
              {navItems.map((item) => (
                <a key={item.name} href={item.link} onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">
                  {item.name}
                </a>
              ))}
              <NavbarButton href="#contact" variant="dark" className="w-full text-center mt-2">
                Book a Call
              </NavbarButton>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <AnimatedGridPattern
          numSquares={28} maxOpacity={0.035} duration={5}
          className="absolute inset-0 text-neutral-900"
        />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,transparent_30%,white_90%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col">
            <motion.div variants={fadeUp}>
              <div className={cn(
                "inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 mb-7",
                "hover:bg-neutral-100 transition-colors"
              )}>
                <Sparkles size={12} className="text-neutral-400" />
                <AnimatedShinyText className="text-xs font-medium text-neutral-500">
                  AI Automation  Chatbots  Agency Workflows
                </AnimatedShinyText>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-black tracking-tight leading-[1.06] text-neutral-900"
            >
              Your business
              <br />
              runs on effort.
              <br />
              <span className="text-neutral-300">Let tech handle</span>
              <br />
              <FlipWords
                words={["the automation.", "the chatbot.", "the workflows.", "the heavy lifting."]}
                className="text-neutral-900 px-0"
                duration={2600}
              />
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-lg text-neutral-500"
            >
              We sit with you, map your business, and automate the work that&apos;s eating your time.
              Workflows, chatbots, and agency ops. Built personally by a GenAI engineer, not outsourced.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-start gap-3">
              <MovingBorderButton
                as="a" href="#contact"
                borderRadius="2rem" duration={2800}
                containerClassName="h-12 w-auto"
                borderClassName="bg-[radial-gradient(#0a0a0a_40%,transparent_60%)]"
                className="bg-black text-white text-sm font-semibold border-neutral-900 px-6 h-12"
              >
                Book a Free Call <ArrowRight size={14} className="inline ml-1.5" />
              </MovingBorderButton>

              <a href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-sm font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                See What We Do
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-400">
              {["No long-term contracts", "Free discovery call", "Results-first"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-500" /> {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — flow diagram (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block w-full"
          >
            <FlowDiagram />
          </motion.div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="border-y border-neutral-100 bg-neutral-950 py-10 px-4">
        <motion.div
          variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
        >
          {stats.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center text-center py-2"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight whitespace-nowrap">{value}</span>
              <span className="mt-2 text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-widest">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────────────── */}
      <div className="border-b border-neutral-100 py-4 bg-neutral-50/80">
        <Marquee pauseOnHover repeat={4} className="[--duration:28s] [--gap:1.5rem]">
          {techItems.map((tech) => (
            <span key={tech} className="inline-flex items-center gap-3 text-sm font-medium text-neutral-400 px-4">
              {tech}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
              What We Do
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
              Three things, done right
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-base text-neutral-500 max-w-md mx-auto">
              We don&apos;t try to do everything. We automate workflows, build AI chatbots, and streamline agency ops. We do each one properly.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {services.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div key={title} variants={fadeUp}>
                <FollowerPointerCard
                  title={
                    <span className="flex items-center gap-1 text-xs font-semibold">
                      <Icon size={10} /> {title}
                    </span>
                  }
                  className="h-full"
                >
                  <div className={cn(
                    "relative h-full p-6 rounded-2xl border border-neutral-100 bg-white group",
                    "hover:shadow-[0_8px_40px_rgba(0,0,0,0.07)] transition-all duration-300",
                    i === 0 && "overflow-hidden",
                  )}>
                    {i === 0 && <BorderBeam size={140} duration={7} colorFrom="#6366f1" colorTo="#8b5cf6" />}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: `${color}14` }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 mb-2">{title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-500">{desc}</p>
                  </div>
                </FollowerPointerCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ─────────────────────────────────────── */}
      <section className="py-28 px-6 bg-neutral-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3">
              The Transformation
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Before → After
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/[0.06]">
            {/* Headers */}
            <div className="bg-white/[0.04] px-6 py-4 flex items-center gap-2">
              <X size={14} className="text-red-400" />
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Before</span>
            </div>
            <div className="bg-white/[0.07] px-6 py-4 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">After</span>
            </div>

            {/* Rows */}
            {comparison.map(({ before, after }, i) => (
              <Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
                  className="bg-white/[0.02] border-t border-white/[0.04] px-6 py-4 text-sm text-neutral-500 flex items-center"
                >
                  {before}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.05, duration: 0.45, ease: "easeOut" }}
                  className="bg-white/[0.04] border-t border-white/[0.04] px-6 py-4 text-sm text-white font-medium flex items-center"
                >
                  {after}
                </motion.div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────── */}
      <section id="process" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
              Three steps. Real results.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                className="relative p-7 rounded-2xl border border-neutral-100 bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-shadow duration-300"
              >
                <span
                  className="text-6xl font-black leading-none mb-5 block"
                  style={{ color: i === 0 ? "#0a0a0a" : "#ebebeb" }}
                >
                  {step.n}
                </span>
                <h3 className="text-base font-bold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{step.desc}</p>
                {i === 0 && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent rounded-b-2xl opacity-10" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────── */}
      <section id="why" className="py-28 px-6 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Founder card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-sm p-7 rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-lg tracking-tight">RA</span>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-sm">{founder.name}</p>
                    <p className="text-xs text-neutral-500">{founder.title}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 mb-5">
                  &ldquo;{founder.bio}&rdquo;
                </p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <ExternalLink size={14} /> Connect on LinkedIn
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={stagger} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
                Why Orchops
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 mb-5 leading-tight">
                We grow your business,<br />not our portfolio.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-neutral-500 mb-8 leading-relaxed">
                When agencies get too big, you become a ticket number. We stay deliberately small. One client, full attention, real accountability.
              </motion.p>

              <motion.div variants={stagger} className="flex flex-col gap-3">
                {[
                  "We listen first, pitch never",
                  "Every solution custom-built for your business",
                  "One dedicated point of contact. No relay race.",
                  "Plain English. Zero jargon or buzzwords.",
                  "Initial build + flat-rate monthly maintenance",
                  "Open to clients worldwide. Everything is remote.",
                ].map((point) => (
                  <motion.div key={point} variants={fadeUp} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-neutral-600 leading-relaxed">{point}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="faq" className="py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
              Common questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Accordion className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-neutral-100 rounded-xl px-5 data-[state=open]:border-neutral-200 transition-colors"
                >
                  <AccordionTrigger className="text-sm font-semibold text-left text-neutral-800 hover:no-underline py-5">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-500 leading-relaxed pb-5">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6 bg-neutral-950">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mx-auto mb-6">
                <Phone size={22} className="text-white" />
              </div>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Ready to grow smarter?
            </motion.h2>

            <motion.p variants={fadeUp} className="text-base text-neutral-400 mb-10 leading-relaxed">
              Book a free discovery call. No pitch, no pressure. Just a real conversation about your business and where we can add value.
            </motion.p>

            <motion.div variants={fadeUp} className="flex justify-center">
              <ShimmerButton
                shimmerColor="rgba(255,255,255,0.6)"
                background="rgba(255,255,255,1)"
                className="text-sm font-bold gap-2 px-8 py-3.5 !text-black"
                onClick={() => window.open("https://calendly.com/rambabuarabandi2001/ai-meet", "_blank")}
              >
                Book a Free Call <ArrowRight size={15} />
              </ShimmerButton>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-xs text-neutral-600">
              Usually responds within a few hours &nbsp; 100% free &nbsp; No commitment required
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-neutral-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold text-base text-black">
          orch<span className="text-neutral-400">ops</span>
        </span>
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} Orchops
        </p>
        <a
          href="https://linkedin.com/in/rambabu-arabandi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <ExternalLink size={12} /> LinkedIn
        </a>
      </footer>

    </main>
  );
}
