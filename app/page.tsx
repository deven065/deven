"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Code2, Database, LineChart, Lock, Mail, Terminal } from "lucide-react";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./components/Hero3D"), { ssr: false });
const Background3D = dynamic(() => import("./components/Background3D"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-amber-500/30 font-sans overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-60 pointer-events-none">
        <Background3D />
      </div>
      
      {/* Glow Effect */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 sm:px-12 md:pt-48 md:pb-32">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-12 md:gap-8 mb-40 pt-8">
          <div className="flex flex-col items-start gap-8 flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for new opportunities
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-5xl sm:text-7xl font-semibold tracking-tight text-white max-w-4xl"
            >
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">High-Performance</span> Systems for Modern Finance.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed"
            >
              I build robust, scalable, and secure software solutions tailored for the fintech industry. Bridging the gap between complex financial logic and exceptional user experiences.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition-colors">
                Contact Me <ArrowRight size={18} />
              </a>
              <a href="#projects" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">
                View Architecture
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full h-[400px] sm:w-[500px] sm:h-[500px] shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* The glow effect behind the image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
            <div className="absolute inset-0 z-20 overflow-hidden rounded-3xl">
              <Hero3D />
            </div>
          </motion.div>
        </section>

        {/* Expertise Section */}
        <section className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4 mb-12"
          >
            <h2 className="text-3xl font-medium text-white">Core Competencies</h2>
            <p className="text-zinc-400">Specialized skills for the financial technology sector.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: LineChart, title: "Trading Systems", desc: "Low-latency execution and real-time market data processing." },
              { icon: Lock, title: "Security & Compliance", desc: "Bank-grade encryption, KYC/AML workflows, and strict audit trails." },
              { icon: Database, title: "Data Architecture", desc: "High-throughput transactional databases and distributed ledgers." },
              { icon: Terminal, title: "Robust APIs", desc: "Idempotent, rate-limited, and scalable service integrations." }
            ].map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <skill.icon className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">{skill.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4 mb-12"
          >
            <h2 className="text-3xl font-medium text-white">Selected Systems</h2>
            <p className="text-zinc-400">Recent architectural designs and implementations.</p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {[
              {
                title: "MT-5 Trading Algorithm",
                desc: "An algorithmic trading bot engineered for the MetaTrader 5 platform. Features automated trade execution, real-time market data analysis, and strict risk-management protocols.",
                tags: ["Python", "MQL5", "MetaTrader API", "Algorithmic Trading"],
                metrics: "Automated low-latency execution",
                repo: "deven065/MT-5-trading-bot"
              },
              {
                title: "BMG Interiors CRM",
                desc: "A comprehensive enterprise resource planning and client relationship management system built for an interior design firm. Handles project tracking, client portals, and workflow automation.",
                tags: ["Next.js", "React", "PostgreSQL", "TailwindCSS"],
                metrics: "Streamlined firm operations",
                repo: "deven065/bmginteriors-crm"
              },
              {
                title: "Chef AI",
                desc: "An artificial intelligence application that generates personalized recipes and meal plans based on user ingredients, dietary restrictions, and nutritional goals.",
                tags: ["AI/LLM", "TypeScript", "React", "Node.js"],
                metrics: "Intelligent recipe generation",
                repo: "deven065/chef-ai"
              },
              {
                title: "SocietiQ",
                desc: "A modern social platform designed to facilitate community engagement and intelligent networking. Built with a focus on real-time interactions and scalable architecture.",
                tags: ["WebSockets", "React", "Express", "MongoDB"],
                metrics: "Real-time community platform",
                repo: "deven065/SocietiQ"
              },
              {
                title: "FlatMate",
                desc: "A matching platform that connects individuals looking for shared housing. Features advanced filtering, secure messaging, and user verification systems.",
                tags: ["Full Stack", "Authentication", "Real Estate", "API Integration"],
                metrics: "Optimized roommate matching",
                repo: "deven065/FlatMate"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-amber-500/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl" />
                <div className="relative h-full p-8 rounded-xl bg-[#0a0a0a] border border-white/5 overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                        <div className="flex gap-2">
                          <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Code size={20} /></a>
                        </div>
                      </div>
                      <p className="text-zinc-400 leading-relaxed mb-6 max-w-3xl">
                        {project.desc}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                        <Code2 size={16} />
                        {project.metrics}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 text-zinc-300 bg-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Ready to build the future of finance?</h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-8">
              I am actively seeking roles where I can contribute to complex financial systems, trading platforms, or banking infrastructure. Let&apos;s discuss how my engineering background aligns with your institutional goals.
            </p>
            <a href="mailto:contact@example.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
              <Mail size={20} />
              Initiate Secure Connection
            </a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Software Engineer. All systems operational.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Resume</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
