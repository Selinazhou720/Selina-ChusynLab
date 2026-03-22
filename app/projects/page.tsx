"use client";

import { useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  highlight: string;
  metrics?: string;
  tags: string[];
  context: string;
  problem: string;
  solution: string;
  contribution: string[];
  outcome: string | string[];
  isFeatured?: boolean;
  link?: string;
  linkLabel?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "featured",
    isFeatured: true,
    title: "Personal Content IP (Xiaohongshu & Douyin)",
    highlight: "Built a scalable content growth system from scratch",
    metrics: "2.7M+ Views · 4 Accounts · 10+ Brand Collaborations",
    tags: ["Content", "Growth", "Strategy"],
    context: "Self-initiated content project focused on student lifestyle and education",
    problem: "Content lacks structured positioning and scalable growth",
    solution: "Built a repeatable growth system using trend analysis and user resonance",
    contribution: [
      "Managed 4 content accounts",
      "Used AI tools for topic discovery",
      "Iterated content based on performance"
    ],
    outcome: [
      "2.7M+ total views",
      "1.8M+ single video views",
      "600+ followers gained in one day",
      "10+ brand collaboration opportunities"
    ]
  },
  {
    id: "waotea",
    title: "WAOTEA – AI-Driven Smart Beverage System",
    highlight: "Bridged AI systems and real-world operations in an intelligent retail setup",
    tags: ["AI", "System Design", "Growth"],
    context: "AI-powered smart beverage project integrating large language models and robotic systems",
    problem: "Automated beverage systems struggle with cost, scalability, and personalization",
    solution: "Contributed to an AI-driven workflow connecting user input, AI decision-making, and automated execution",
    contribution: [
      "Participated in market promotion and commercialization strategy",
      "Translated technical capabilities into user-facing value",
      "Supported go-to-market and user acquisition strategies",
      "Aligned product capabilities with user needs"
    ],
    outcome: [
      "Successfully deployed in offline retail environments",
      "Supported high-efficiency automated operations",
      "Improved product visibility and adoption"
    ],
    link: "#小程序://WAO校茶/IRSVE2mSOakssrj",
    linkLabel: "View Demo (Mini Program) →"
  },
  {
    id: "mengniu",
    title: "Mengniu YoyiC Campus Innovation Competition",
    highlight: "Built a dual-value positioning based on Gen Z sleep needs",
    tags: ["Strategy", "User Insight", "Marketing"],
    context: "Mengniu YoyiC Campus Innovation Competition · Team Leader",
    problem: "Gen Z lacks emotional connection with functional drinks",
    solution: "Developed a “function + emotion” positioning strategy",
    contribution: [
      "Led user research",
      "Defined product strategy",
      "Conducted market analysis"
    ],
    outcome: "Top 50 nationwide"
  },
  {
    id: "national-ad",
    title: "National College Advertising Art Competition",
    highlight: "Translated technical features into emotional storytelling",
    tags: ["Creative", "Branding", "Strategy"],
    context: "National College Advertising Art Competition · Core Member",
    problem: "Technical product features are difficult to communicate",
    solution: "Built a “technology + emotion” communication strategy",
    contribution: [
      "Conducted market and user analysis",
      "Developed campaign messaging",
      "Created core slogan"
    ],
    outcome: [
      "National Honorable Mention",
      "Selected into brand asset pool"
    ]
  },
  {
    id: "business-challenge",
    title: "Business Elite Challenge – Accounting & Business Case Competition",
    highlight: "Applied business frameworks to analyze financial performance and strategy",
    tags: ["Strategy", "Finance", "Data Analysis"],
    context: "National Business Elite Challenge · First Prize",
    problem: "Evaluate financial performance and competitive positioning",
    solution: "Applied SWOT, Porter’s Five Forces, and DuPont analysis",
    contribution: [
      "Analyzed financial data from annual reports",
      "Built forecasting and budgeting models",
      "Designed data visualization for presentation"
    ],
    outcome: "National First Prize"
  }
];

export default function ProjectsPage() {
  const [expandedId, setExpandedId] = useState<string | null>("featured");

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6 md:px-12 selection:bg-pink-100 selection:text-pink-900">
      <div className="max-w-2xl mx-auto space-y-12">
        
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="text-[32px] font-black tracking-tight text-slate-900">Projects</h1>
          <p className="text-slate-500 text-[14px] font-medium leading-[1.6]">A selection of my recent works across growth, products, and strategy.</p>
        </div>

        {/* Project List */}
        <div className="space-y-4">
          {PROJECTS_DATA.map((project) => {
            const isExpanded = expandedId === project.id;
            
            return (
              <div 
                key={project.id}
                onClick={() => toggleAccordion(project.id)}
                className={`
                  group relative border border-black/[0.05] rounded-xl overflow-hidden cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${isExpanded ? 'bg-white shadow-xl shadow-pink-100/10 ring-1 ring-black/[0.02]' : 'hover:bg-slate-50 hover:-translate-y-[2px] bg-white'}
                `}
              >
                {/* Header (Always Visible) */}
                <div className={`
                  ${project.isFeatured ? 'p-[18px] lg:p-[20px]' : 'p-4'}
                  flex flex-col gap-1 transition-all
                `}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {project.isFeatured && (
                          <span className="bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Featured</span>
                        )}
                        <h2 className="text-[16px] md:text-[18px] font-bold text-slate-900 tracking-tight">{project.title}</h2>
                      </div>
                      <p className="text-[13px] md:text-[14px] text-slate-500 font-medium leading-snug">{project.highlight}</p>
                    </div>
                    {/* Accordion Icon */}
                    <div className={`mt-1 text-slate-300 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Metrics & Tags Strip */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                    {project.metrics && (
                      <span className="text-[12px] font-bold text-pink-600/80">{project.metrics}</span>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[11px] font-bold uppercase tracking-tight">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={`
                  transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] 
                  ${isExpanded ? 'max-h-[1200px] opacity-100 py-6 px-4 lg:px-6 border-t border-black/[0.03]' : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'}
                `}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[13px] md:text-[14px] leading-relaxed">
                    
                    {/* Left: Background & Strategy */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Context & Problem</h3>
                        <p className="text-slate-500 font-medium pb-1">{project.context}</p>
                        <p className="text-slate-800 font-black leading-[1.6]">{project.problem}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">The Solution</h3>
                        <p className="text-slate-800 font-bold bg-[#FFF0F3] p-4 rounded-xl border border-pink-100/50 leading-[1.7]">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Right: Contribution & Outcome */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">My Contributions</h3>
                        <ul className="space-y-2 text-slate-600 font-medium">
                          {project.contribution.map((c, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h3 className="text-[11px] font-black text-[#FF69B4] uppercase tracking-widest">Results & Outcome</h3>
                        {Array.isArray(project.outcome) ? (
                          <div className="flex flex-col gap-1.5">
                            {project.outcome.map((o, i) => (
                              <p key={i} className="text-slate-900 font-black">{o}</p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-900 font-black text-[16px]">{project.outcome}</p>
                        )}
                      </div>

                      {/* Mini Program Button for WAOTEA */}
                      {project.link && (
                        <div className="pt-6">
                          <a 
                            href={project.link}
                            className="inline-flex items-center px-5 py-2.5 rounded-full bg-slate-900 text-white text-[13px] font-black shadow-lg hover:bg-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                          >
                            {project.linkLabel}
                          </a>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="pt-12 border-t border-slate-100 flex justify-center">
          <Link href="/" className="group flex items-center gap-2 text-[14px] text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
