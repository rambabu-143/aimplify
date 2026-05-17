"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink, ArrowRight, CheckCircle2, Sparkles, Phone,
} from "lucide-react";

import {
  Navbar, NavBody, NavItems, NavbarButton,
  MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const navItems = [
  { name: "Services", link: "/#services" },
  { name: "Process",  link: "/#process"  },
  { name: "Why Us",   link: "/#why"      },
  { name: "FAQ",      link: "/#faq"      },
];

const values = [
  {
    title: "No Outsourcing",
    desc: "Every line of code, every automation, every chatbot — built by us directly. Not handed to a freelancer you'll never meet.",
  },
  {
    title: "No Lock-in",
    desc: "Month-to-month. Cancel anytime. We stay because the work is good, not because a contract forces you.",
  },
  {
    title: "No Jargon",
    desc: "Plain English from day one. You tell us the business problem, we figure out the tech. You always know what's happening and why.",
  },
  {
    title: "No Guesswork",
    desc: "We audit before we build. Every decision is tied to a real business outcome you can measure.",
  },
];

const timeline = [
  {
    year: "The problem",
    desc: "Small businesses and agencies were getting burned by big agencies: slow timelines, generic templates, and a different person every call. The automation space was no different.",
  },
  {
    year: "The idea",
    desc: "One engineer. Full attention. Real accountability. Build only what a business actually needs, stay on to maintain it, and be reachable when something breaks.",
  },
  {
    year: "Today",
    desc: "Orchops works with a small number of clients at a time — deliberately. Each one gets the same attention, the same quality, and the same engineer from day one.",
  },
];

export default function About() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* NAVBAR */}
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <Navbar>
          <NavBody>
            <a href="/" className="relative z-20 font-bold text-base text-black">
              orch<span className="text-neutral-400">ops</span>
            </a>
            <NavItems items={navItems} />
            <NavbarButton href="/#contact" variant="dark">Book a Call</NavbarButton>
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
              <NavbarButton href="/#contact" variant="dark" className="w-full text-center mt-2">
                Book a Call
              </NavbarButton>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center pt-36 pb-20 px-6 overflow-hidden">
        <AnimatedGridPattern
          numSquares={24} maxOpacity={0.03} duration={5}
          className="absolute inset-0 text-neutral-900"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,transparent_30%,white_90%)] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto w-full">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center text-center">
            <motion.div variants={fadeUp}>
              <div className={cn(
                "inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 mb-7",
              )}>
                <Sparkles size={12} className="text-neutral-400" />
                <AnimatedShinyText className="text-xs font-medium text-neutral-500">
                  About Orchops
                </AnimatedShinyText>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.06] text-neutral-900"
            >
              Built personal.
              <br />
              <span className="text-neutral-300">Kept small.</span>
              <br />
              On purpose.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl text-neutral-500"
            >
              Orchops is a one-person AI automation practice. No account managers,
              no relay races, no outsourcing. Just one engineer who knows your business
              and stays accountable for the work.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <MovingBorderButton
                as="a" href="/#contact"
                borderRadius="2rem" duration={2800}
                containerClassName="h-12 w-auto"
                borderClassName="bg-[radial-gradient(#0a0a0a_40%,transparent_60%)]"
                className="bg-black text-white text-sm font-semibold border-neutral-900 px-6 h-12"
              >
                Book a Free Call <ArrowRight size={14} className="inline ml-1.5" />
              </MovingBorderButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3">
              The Story
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Why Orchops exists
            </motion.h2>
          </motion.div>

          <div className="flex flex-col gap-px">
            {timeline.map(({ year, desc }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-8 py-8 border-t border-white/[0.06]"
              >
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest pt-0.5">{year}</span>
                <p className="text-base text-neutral-300 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
              The Founder
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
              One engineer. Your problem.
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-neutral-100 bg-white p-8 sm:p-10 overflow-hidden"
          >
            <BorderBeam size={200} duration={8} colorFrom="#6366f1" colorTo="#8b5cf6" />

            <div className="relative flex flex-col sm:flex-row gap-8 items-start">
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-neutral-900 flex items-center justify-center">
                  <span className="text-white font-black text-2xl tracking-tight">RA</span>
                </div>
              </div>

              <div className="flex-1">
                <p className="font-black text-neutral-900 text-xl mb-0.5">Rambabu Arabandi</p>
                <p className="text-sm text-neutral-500 mb-6">GenAI Engineer & Founder</p>

                <div className="space-y-4 text-sm leading-relaxed text-neutral-600">
                  <p>
                    I&apos;m a GenAI engineer who builds automation systems for real teams. I&apos;ve shipped AI tools
                    that handle lead follow-ups, client onboarding, chatbots, and internal workflows — and I&apos;ve
                    seen first-hand what happens when businesses try to patch these problems with generic SaaS
                    tools that almost fit.
                  </p>
                  <p>
                    Orchops is the practice I wished existed when I was consulting. Small client list, full
                    attention, no handoffs. You get me on every call, I write every line, I&apos;m the one
                    monitoring things after launch.
                  </p>
                  <p>
                    I work with small businesses and agencies that are ready to stop doing the same things twice.
                    If that&apos;s you, let&apos;s talk.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-4">
                  <a
                    href="https://linkedin.com/in/rambabu-arabandi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    <ExternalLink size={14} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 px-6 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
              How We Work
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
              Four rules we don&apos;t break
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {values.map(({ title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-neutral-900 mb-1.5">{title}</p>
                    <p className="text-sm leading-relaxed text-neutral-500">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-neutral-950">
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
              Ready to work together?
            </motion.h2>

            <motion.p variants={fadeUp} className="text-base text-neutral-400 mb-10 leading-relaxed">
              Book a free call. No pitch, no pressure — just a real conversation about your
              business and what we can automate.
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
              Usually responds within a few hours  &nbsp; 100% free  &nbsp; No commitment required
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-neutral-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/" className="font-bold text-base text-black">
          orch<span className="text-neutral-400">ops</span>
        </a>
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
