"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Typewriter Hook (60ms/char, 1.5s pause) ───────────────────────────────────
function useLoopTypewriter(text: string, typeSpeed = 60, pauseMs = 1500, clearSpeed = 30) {
    const [displayed, setDisplayed] = useState("");
    const [phase, setPhase] = useState<"typing" | "pausing" | "clearing">("typing");

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (phase === "typing") {
            if (displayed.length < text.length) {
                timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), typeSpeed);
            } else {
                timer = setTimeout(() => setPhase("pausing"), pauseMs);
            }
        } else if (phase === "pausing") {
            timer = setTimeout(() => setPhase("clearing"), 0);
        } else {
            if (displayed.length > 0) {
                timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), clearSpeed);
            } else {
                timer = setTimeout(() => setPhase("typing"), 300);
            }
        }
        return () => clearTimeout(timer);
    }, [displayed, phase, text, typeSpeed, pauseMs, clearSpeed]);

    return displayed;
}

// ── AI Assistant 双语数据 ──────────────────────────────────────────────────────
const AI_CHATBOT_DATA = [
    {
        q: "What breakthroughs did she find in 40+ AIGC tools?",
        a: "在 Super X 实习期间，我系统拆解了 40+ 款全球 AIGC 视频产品。相比单点能力的对比，我更关注它们在真实创作链路中的位置。我发现一个关键共性：大多数产品在“生成效率”上持续内卷，但对“创作者完整工作流”的支持是割裂的。这也意味着，真正的破局点不在模型本身，而在于如何嵌入并重构创作者的生产流程。这个洞察后来也直接影响了我对产品差异化定位的判断。",
    },
    {
        q: "How does she tackle an entirely new domain?",
        a: "首先，我会先快速建立对领域的“认知框架”，包括产品的目标用户、核心价值 and 所处阶段。其次从外部视角入手，通过拆解它的社交媒体和内容分发，最后去反推它的用户结构 and 核心使用场景。而在方法上，我会先做一轮广泛扫描（拉高信息覆盖面），再筛选重点方向深入拆解，并逐步落到具体场景。过程中会借助插件抓取产品数据 and 结构，下载好md版本，用 AI 做横向对比，持续扩展竞品样本。最后再回到自己的判断，做一次“去工具化”的总结输出，确保结论是我真正理解过的，而不是简单的信息拼接。",
    },
    {
        q: "Care for a Deep Talk? (Warning: Super chatty 🎙️)",
        a: (
            <>
                Wechat: 19047067347<br />
                📮 zhoucss@yeah.net
            </>
        ),
    }
];

// ── Experience Section 数据 ──────────────────────────────────────────────────
const EXPERIENCE_DATA = [
    {
        company: "SuperX",
        role: "AI Product Growth",
        period: "2025.12 — 2026.4",
        url: "https://autoae.online/blog",
        tags: ["AI Tools", "Growth", "Community"],
        items: [
            { title: "Competitor Analysis", desc: <>Built a scoring model for <span className="font-black text-slate-900">40+</span> AI video tools tracking <span className="font-black text-slate-900">6</span> core metrics.</> },
            { title: "Content Growth SEO", desc: <>Authored <span className="font-black text-slate-900">15+</span> deep-dive blogs optimized for generative search engines.</> },
            { title: "Community Ops", desc: <>Built Discord community from <span className="font-black text-slate-900">0</span> to scale through expert tutorials.</> },
        ],
    },
    {
        company: "Gaodun Education",
        role: "Growth Marketing Intern",
        period: "2025.7 — 2025.10",
        url: "https://www.gaodun.com/",
        tags: ["Content", "Data Analysis", "Stratified"],
        items: [
            { title: "Stratified Data Profiling", desc: <>Managed <span className="font-black text-slate-900">500+</span> premium community members with stratified data profiling.</> },
            { title: "Viral Marketing", desc: <>Authored <span className="font-black text-slate-900">37+</span> viral marketing campaigns with optimized CTR metrics.</> },
            { title: "Conversion Optimization", desc: <>Generated <span className="font-black text-slate-900">28W+</span> in conversion value through precise targeting.</> },
        ],
    },
];

// ── Projects Section 数据 ──────────────────────────────────────────────────
interface ProjectContent {
  title: string;
  subtitle: string;
  context: string;
  problem: string;
  solution: string;
  contribution: string[];
  outcome: string[];
}

interface Project {
  featured?: boolean;
  stats?: string;
  tags: string[];
  link?: { text: string; url: string };
  en: ProjectContent;
  zh: ProjectContent;
}

const PROJECTS_DATA: Project[] = [
  {
    featured: true, stats: "2.7M+ Views · 4 Accounts · 10+ Brands", tags: ["Content", "Growth", "Strategy"],
    en: {
      title: "Personal Content IP (Xiaohongshu & Douyin)", subtitle: "Built a scalable content growth system from scratch",
      context: "Operated multiple content accounts focusing on college life and personal growth, exploring content growth and user resonance mechanisms.",
      problem: "The niche is highly homogenized, lacking clear positioning and sustainable growth paths.",
      solution: "Treated content as a 'product', building a sustainable growth mechanism through topic modeling, user feedback, and data review.",
      contribution: ["Independently operated and managed 4 content accounts", "Built topic strategies based on trend analysis", "Continuously optimized content structure based on data feedback", "Introduced AI tools to assist in topic selection and optimization"],
      outcome: ["2.7M+ total views across platforms", "1.8M+ highest views on a single video", "600+ new followers in a single day", "Secured 10+ brand collaborations"]
    },
    zh: {
      title: "个人内容 IP 孵化（小红书 & 抖音）", subtitle: "从 0 到 1 搭建可复用的内容增长体系",
      context: "围绕大学生生活与成长方向，自主运营多个内容账号，探索内容增长与用户共鸣机制",
      problem: "该赛道内容同质化严重，缺乏清晰定位与可持续增长路径",
      solution: "将内容视为“产品”进行运营，通过选题建模、用户反馈与数据复盘，构建可持续增长机制",
      contribution: ["独立运营并管理 4 个内容账号", "基于趋势分析构建选题策略", "根据数据反馈持续优化内容结构与表达方式", "引入AI工具辅助选题与内容优化"],
      outcome: ["全平台累计播放量 270 万+", "单条视频最高播放量 180 万+", "单日涨粉 600+", "获得 10+ 品牌合作机会"]
    }
  },
  {
    tags: ["AI", "System Design", "Growth"], link: { text: "View Demo →", url: "#小程序://WAO校茶/IRSVE2mSOakssrj" },
    en: {
      title: "WAOTEA – AI-Driven Smart Tea System", subtitle: "Bridged AI systems and real-world operations in an intelligent retail setup",
      context: "Smart tea project based on LLMs and automated equipment, realizing an automated workflow from user request to drink production.",
      problem: "Complex technical capabilities made it hard for users to understand its value, affecting product conversion.",
      solution: "Productized the technical capabilities around user experience, establishing a conversion path from tech to user value.",
      contribution: ["Participated in market promotion and communication strategy", "Translated AI capabilities into understandable user value", "Introduced AI tools (Prompt tuning) to improve efficiency", "Controlled content revision rate to under 1% through multiple optimizations"],
      outcome: ["Successfully launched in physical stores with stable operations", "Improved product awareness and communication effectiveness", "Promoted the application of AI in real business scenarios"]
    },
    zh: {
      title: "WAOTEA — AI驱动的智慧茶饮系统", subtitle: "将 AI 系统与线下零售场景深度链接",
      context: "基于大模型与自动化设备的智慧茶饮项目，实现从用户需求到饮品制作的自动化流程",
      problem: "技术能力复杂，用户难以理解其价值，影响产品传播与转化",
      solution: "围绕用户体验对技术进行产品化表达，建立从技术能力到用户价值的转化路径",
      contribution: ["参与市场推广与产品传播策略制定", "将AI能力转化为用户可理解的产品价值", "在内容与方案中引入AI工具（Prompt调优）提升效率", "通过多轮优化将内容修改率控制在约1%以内"],
      outcome: ["项目成功落地线下门店并稳定运营", "提升产品认知度与传播效果", "推动AI在真实商业场景中的应用"]
    }
  },
  {
    tags: ["Strategy", "User Insight", "Marketing"],
    en: {
      title: "Mengniu Yoyi C Campus Innovation Competition", subtitle: "Built a dual-value positioning based on Gen Z sleep needs",
      context: "Designed strategies around the market competition of functional drinks among young demographics.",
      problem: "Functional products lack emotional connection, making it difficult to establish user identity.",
      solution: "Proposed a 'functional value + emotional value' dual positioning, and designed communication paths combined with life scenarios.",
      contribution: ["Participated in user needs analysis and industry research", "Built product positioning and strategic frameworks", "Completed competitor analysis and market teardowns"],
      outcome: ["Reached National Top 50", "Delivered complete strategy and market analysis proposals"]
    },
    zh: {
      title: "蒙牛优益C校园创新大赛", subtitle: "针对 Gen Z 睡眠痛点的双重价值定位",
      context: "围绕功能型饮品在年轻群体中的市场竞争进行策略设计",
      problem: "功能型产品缺乏情感连接，难以建立用户认同",
      solution: "提出“功能价值 + 情感价值”双重定位，并结合生活场景设计传播路径",
      contribution: ["参与用户需求分析与行业研究", "构建产品定位与策略框架", "完成竞品分析与市场拆解"],
      outcome: ["项目进入全国前 50", "输出完整策略与市场分析方案"]
    }
  },
  {
    tags: ["Creative", "Branding", "Strategy"],
    en: {
      title: "National Student Advertising Art Competition", subtitle: "Translated technical features into emotional storytelling",
      context: "Designed a communication plan around the technical selling point of '0.3s instant smoothness + 2 hours continuous smoothness'.",
      problem: "Technical selling points are rational but lack emotional appeal.",
      solution: "Built a 'technology + emotion' communication path, translating functions into user experience expressions.",
      contribution: ["Completed market trend analysis and user insights", "Participated in creative strategy and communication direction design", "Delivered core advertising slogans and expression logic"],
      outcome: ["Won National Excellence Award", "Slogan included in the brand's alternative asset library"]
    },
    zh: {
      title: "全国大学生广告艺术大赛", subtitle: "将技术参数转化为情感化的品牌表达",
      context: "围绕“0.3秒瞬滑 + 2小时持续滑”技术卖点设计传播方案",
      problem: "技术卖点理性但缺乏感染力",
      solution: "构建“科技 + 情感”的传播路径，将功能转化为用户体验表达",
      contribution: ["完成市场趋势分析与用户洞察", "参与创意策略与传播方向设计", "输出核心广告语与表达逻辑"],
      outcome: ["获得全国优等奖", "广告语纳入品牌备选素材库"]
    }
  },
  {
    tags: ["Strategy", "Finance", "Data Analysis"],
    en: {
      title: "National Business Elite Challenge", subtitle: "Applied business frameworks to analyze financial performance",
      context: "Analyzed Midea Group's financial performance and industry competitive strategy.",
      problem: "Complex financial data is difficult to directly support decision-making.",
      solution: "Combined financial analysis with strategic frameworks for structured breakdowns.",
      contribution: ["Collected and analyzed years of corporate financial data", "Built budgeting and forecasting models", "Applied SWOT, Porter's Five Forces, and DuPont analysis"],
      outcome: ["Won National First Prize", "Improved information expression efficiency by ~30%"]
    },
    zh: {
      title: "全国高校商业精英挑战赛（商务案头分析）", subtitle: "企业财务表现与战略竞争力的深度分析",
      context: "以美的集团为研究对象，分析其财务表现与行业竞争策略",
      problem: "财务数据复杂，难以直接支撑决策",
      solution: "结合财务分析与战略框架进行结构化拆解",
      contribution: ["收集并分析企业历年财务数据", "构建预算与预测模型", "运用SWOT、五力模型、杜邦分析", "设计答辩结构与数据可视化"],
      outcome: ["获得全国一等奖", "提升信息表达效率约30%"]
    }
  }
];

const TOOLS_DATA = [
  { name: 'Cursor', url: 'https://cursor.com/' },
  { name: 'Kling AI', url: 'https://klingai.kuaishou.com/' },
  { name: 'Runway', url: 'https://runwayml.com/' },
  { name: 'Gemini', url: 'https://gemini.google.com/' },
  { name: 'ChatGPT', url: 'https://chat.openai.com/' },
  { name: 'Claude', url: 'https://claude.ai/' },
  { name: 'Notion', url: 'https://www.notion.so/' },
  { name: 'NotebookLM', url: 'https://notebooklm.google.com/?icid=home_maincta' },
];

const MAP_NETWORK_DATA = [
    { name: "Xi’an", x: 120, y: 240 },
    { name: "Shenzhen", x: 300, y: 200 },
    { name: "Hong Kong", x: 470, y: 210 },
    { name: "Australia", x: 700, y: 140 },
];

const PODCASTS_DATA = [
    { title: "岩中花述", host: "陈鲁豫", img: "/images/1.jpg" },
    { title: "自我进化论", host: "颜怡 颜悦", img: "/images/2.jpg" },
];

// ── Components ─────────────────────────────────────────────────────────────
function SectionHeader({ title, label }: { title: string, label?: string }) {
    return (
        <div className="mb-16 flex flex-col items-start text-left">
            {label && (
                <div className="inline-flex gap-2 items-center px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-black tracking-widest text-slate-400 uppercase mb-4 shadow-inner">
                    <span className="w-1 h-1 bg-indigo-500 rounded-full" />
                    {label}
                </div>
            )}
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">{title}</h2>
        </div>
    );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function Page() {
    const typewriter = useLoopTypewriter("WELCOME TO MY CHANNEL 🐰", 60, 1500);
    const [projLang, setProjLang] = useState<'en' | 'zh'>('en');
    const [expandedProject, setExpandedProject] = useState<string | null>("Personal Content IP (Xiaohongshu & Douyin)");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);

    // ── Auto-Loop Footprints logic ──────────────────────────────────────────────
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % MAP_NETWORK_DATA.length);
        }, 2500); 
        return () => clearInterval(timer);
    }, [isHovered]);
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const [showChat, setShowChat] = useState(false);
    const [aiAssistantOpen, setAiAssistantOpen] = useState(false); 
    const [showQuestions, setShowQuestions] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowChat(true), 400);
        const timer2 = setTimeout(() => setAiAssistantOpen(true), 500);
        const timer3 = setTimeout(() => setShowQuestions(true), 600);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-pink-100 selection:text-pink-900 relative overflow-x-hidden">
            {/* Root Container ensuring pure white background */}

            {/* Navbar (Fixed, 64px, Gradient Brand) */}
            <header className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-white/60 backdrop-blur-xl border-b border-[#F1F5F9]">
                <div className="max-w-[1100px] mx-auto h-full px-10 flex justify-between items-center">
                    <div className="text-[18px] font-semibold tracking-tight bg-gradient-to-r from-[#FF9BCF] to-[#6366F1] bg-clip-text text-transparent">
                        SelinaZhou
                    </div>
                    <nav className="flex gap-8">
                        {[
                            { name: 'Intro', href: '#intro' },
                            { name: 'Experience', href: '#experience' },
                            { name: 'Project', href: '#projects' },
                            { name: 'AI Tools', href: '#ai-tools' },
                            { name: 'Footprints', href: '#footprints' },
                        ].map((item) => (
                            <a key={item.name} href={item.href} className="text-[14px] text-[#475569] hover:text-[#6366F1] transition-colors font-medium">
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            {/* 1. HERO SECTION (Satisfied 19:09 Version) ─────────────────────────────────── */}
            <section id="intro" className="relative z-[45] w-full min-h-screen flex justify-center pt-[120px] pb-12 bg-white">
                <div className="max-w-[1100px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-[10%] items-start">
                    
                    {/* Left content (Pink Highlight Version) */}
                    <div className="space-y-6 relative h-full">
                        {/* Typewriter moved to absolute to allow H1 to align with Photo top */}
                        <div className="absolute -top-10 left-0 w-full mb-4">
                            <p className="text-[13px] text-[#94A3B8] font-medium tracking-[0.12em] h-6 uppercase font-bold">
                                {typewriter}
                                <span className="inline-block w-[1.5px] h-[1em] bg-[#6366F1] ml-1 animate-pulse align-middle" />
                            </p>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
                            Hi, I'm Selina
                            <br />
                            <span className="inline-block bg-[#FFF0F3] px-3 py-1 mt-3">AI Product</span>
                            <br />
                            <span className="inline-block bg-[#FFF0F3] px-3 py-1 mt-3">Operation & Growth</span>
                            <br />
                            <span className="inline-block bg-[#FFF0F3] px-3 py-1 mt-3">Strategist</span>
                        </h1>

                        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg pt-4">
                            From <span className="font-black text-slate-900">0 to 1</span> scaling, I leverage data-driven insights and AI tools to build high-growth products. Previously generated <span className="font-black text-slate-900">2.7M+ views</span> across content experiments.
                        </p>
                    </div>

                    {/* Right content (Landscape Photo + Integrated AI Assistant) */}
                    <div className="w-full max-w-[500px] ml-auto space-y-8">
                        {/* Profile Photo */}
                        <div className="w-full aspect-video rounded-[2.5rem] shadow-xl shadow-pink-100/20 overflow-hidden border border-slate-50 relative z-[46]">
                            <img 
                                src="/images/me.jpg" 
                                alt="Selina Zhou" 
                                className="w-full h-full object-cover object-center" 
                            />
                        </div>

                        {/* AI Assistant (Integrated Column Flow) */}
                        <div className={`relative w-full transition-all duration-700 ease-out transform ${aiAssistantOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} space-y-2 pt-8`}>
                            <div className="py-3 px-4 bg-[#FFF0F3] text-pink-700 text-sm font-medium rounded-2xl shadow-sm border border-pink-100">
                                Hi 💖 I&apos;m Selina&apos;s AI Assistant.<br />Want to know more? Click below:
                            </div>

                            <div className={`transition-all duration-700 ease-out transform ${showQuestions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} space-y-2`}>
                                {AI_CHATBOT_DATA.map((item, i) => (
                                    <div key={i} className="flex flex-col">
                                        <button
                                            onClick={() => setActiveChat(activeChat === i ? null : i)}
                                            className={`w-full text-left py-3 px-4 rounded-2xl text-[13px] font-bold transition-all duration-300 border ${activeChat === i 
                                                ? 'bg-pink-50 border-pink-200 text-pink-700' 
                                                : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex justify-between items-center gap-3">
                                                <span>{item.q}</span>
                                                <span className="text-lg opacity-40">{activeChat === i ? '−' : '+'}</span>
                                            </div>
                                        </button>
                                        {activeChat === i && (
                                            <div className="mt-2 p-4 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl text-[13px] text-slate-600 leading-relaxed font-normal shadow-sm animate-in fade-in slide-in-from-top-2">
                                                {item.a}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI Toggle Button */}
                    <div className="fixed bottom-10 right-10 z-[100] chatbot-bubbles mt-1">
                        <button 
                            onClick={() => setAiAssistantOpen(prev => !prev)}
                            className="w-14 h-14 bg-pink-400 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-105 transition-transform relative"
                        >
                            <span className="text-2xl font-black">{aiAssistantOpen ? "×" : "1"}</span>
                            {!aiAssistantOpen && (
                                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center text-[11px] font-black border-2 border-white shadow-sm">1</div>
                            )}
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. EXPERIENCE SECTION */}
            <section id="experience" className="relative z-10 py-32 bg-white border-t border-slate-50">
                <div className="max-w-[1100px] mx-auto px-10">
                    <SectionHeader title="Career Path" label="Experience" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {EXPERIENCE_DATA.map((exp) => (
                            <a href={exp.url} key={exp.company} target="_blank" rel="noopener noreferrer" className="block group relative p-[2px] rounded-[2.5rem] overflow-hidden">
                                <div className="h-full p-10 bg-white border border-slate-100 rounded-[2.5rem] transition-all group-hover:shadow-2xl overflow-hidden group-hover:border-pink-100">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 mb-1">{exp.company}</h3>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{exp.role}</p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 tabular-nums">{exp.period}</span>
                                    </div>
                                    <div className="space-y-6">
                                        {exp.items.map((item) => (
                                            <div key={item.title}>
                                                <p className="text-[14px] font-bold text-slate-800 mb-1">{item.title}</p>
                                                <p className="text-[14px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <span className="text-pink-600 text-sm font-bold group-hover:translate-x-1 transition-transform">
                                            View →
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. PROJECTS SECTION (Final Bilingual Version) */}
            <section id="projects" className="relative z-10 py-32 bg-white">
                <div className="max-w-[1100px] mx-auto px-10">
                    {/* Integrated Header with Toggle */}
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight">Projects</h2>
                        <button 
                            onClick={() => setProjLang(projLang === 'en' ? 'zh' : 'en')}
                            className="flex items-center gap-2 bg-slate-100 p-1 rounded-full text-sm font-bold text-slate-500 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        >
                            <span className={`px-3 py-1 rounded-full transition-colors ${projLang === 'en' ? 'bg-white text-slate-900 shadow-sm' : ''}`}>EN</span>
                            <span className={`px-3 py-1 rounded-full transition-colors ${projLang === 'zh' ? 'bg-white text-slate-900 shadow-sm' : ''}`}>中</span>
                        </button>
                    </div>

                    <div className="space-y-4 max-w-[900px]">
                        {PROJECTS_DATA.map((p, idx) => {
                            const data = p[projLang];
                            return (
                                <div 
                                    key={p.en.title}
                                    onClick={() => setExpandedProject(p.en.title === expandedProject ? null : p.en.title)}
                                    className={`bg-white border transition-all duration-300 rounded-[12px] overflow-hidden cursor-pointer hover:-translate-y-[2px] ${
                                        expandedProject === p.en.title ? 'border-pink-100 shadow-xl shadow-pink-100/10' : 'border-black/[0.05]'
                                    }`}
                                    style={{ padding: p.featured ? '20px' : '16px' }}
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">
                                                        {data.title}
                                                    </h3>
                                                    {p.featured && (
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF69B4] bg-[#FFF0F3] px-2 py-0.5 rounded">
                                                            {projLang === 'en' ? 'FEATURED' : '精选项目'}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[14px] font-medium text-slate-400">
                                                    {data.subtitle}
                                                </p>
                                            </div>
                                            <div className={`text-slate-200 transition-transform duration-300 mt-2 ${expandedProject === p.en.title ? 'rotate-180' : ''}`}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>

                                        {p.stats && (
                                            <div className={`text-[13px] font-bold ml-0 ${idx === 0 ? 'text-[#FF69B4]/80' : 'text-slate-400'}`}>
                                                {p.stats}
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {p.tags.map(tag => (
                                                <span key={tag} className="text-[11px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-100/50 uppercase tracking-tight">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    <div 
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                            expandedProject === p.en.title ? 'max-h-[1500px] opacity-100 mt-6 pt-6 border-t border-black/[0.03]' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pb-4">
                                            <div className="space-y-6">
                                                <div className="space-y-1.5">
                                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{projLang === 'en' ? 'Context' : '项目背景'}</h4>
                                                    <p className="text-[13.5px] text-slate-600 leading-relaxed font-medium">{data.context}</p>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{projLang === 'en' ? 'Problem' : '面临挑战'}</h4>
                                                    <p className="text-[13.5px] text-slate-600 leading-relaxed font-medium">{data.problem}</p>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{projLang === 'en' ? 'Solution' : '解决方案'}</h4>
                                                    <p className="text-[13.5px] leading-relaxed font-bold bg-[#FFF0F3] p-4 rounded-xl border border-pink-100/30 text-slate-800">
                                                        {data.solution}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="space-y-1.5">
                                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{projLang === 'en' ? 'My Contribution' : '我的职责'}</h4>
                                                    <ul className="space-y-2">
                                                        {data.contribution.map((item, i) => (
                                                            <li key={i} className="flex gap-2 text-[13.5px] text-slate-600 leading-relaxed font-medium">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 text-[#FF69B4]">{projLang === 'en' ? 'Outcome' : '成果/奖项'}</h4>
                                                    <ul className="space-y-2">
                                                        {data.outcome.map((item, i) => (
                                                            <li key={i} className="flex gap-2 text-[13.5px] text-slate-900 leading-relaxed font-black">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Link */}
                                                {p.link && (
                                                    <div className="pt-4">
                                                        <a 
                                                            href={p.link.url}
                                                            className="inline-flex items-center text-pink-600 text-sm font-bold hover:translate-x-1 transition-transform"
                                                        >
                                                            {p.link.text}
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
                </div>
            </section>

            {/* 4. AI TOOLS SECTION (Refactored Tag Cloud) */}
            <section id="ai-tools" className="relative z-10 py-32 bg-white">
                <div className="max-w-[1100px] mx-auto px-10">
                    <div className="flex flex-col items-start mb-16 text-left">
                        <SectionHeader title="AI Tools I Like" label="AI Toolkit" />
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-start max-w-[900px]">
                        {TOOLS_DATA.map((tool) => (
                            <a 
                                key={tool.name} 
                                href={tool.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="px-6 py-3 rounded-full border border-slate-200 bg-transparent text-slate-700 font-medium text-sm hover:border-indigo-300 hover:bg-slate-50/50 transition-all flex items-center gap-2 group"
                            >
                                {tool.name}
                                <span className="font-black -mt-0.5 opacity-40 group-hover:opacity-100 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 transition-opacity duration-300">↗</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. FOOTPRINTS SECTION (Final Polished Light Version) */}
            <section id="footprints" className="relative z-10 py-32 bg-white">
                <div className="max-w-[820px] mx-auto px-6">
                    <div className="flex flex-col items-center mb-8 text-center">
                        <h2 className="text-[22px] font-semibold text-[#0f172a] mb-2 font-inter">Footprints</h2>
                        <p className="text-sm text-[#64748b] font-inter">My Way, My World</p>
                    </div>

                    <div 
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="relative w-full aspect-[2.2/1] bg-white/70 backdrop-blur-md rounded-[20px] border-[1.5px] border-[#0f172a]/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden group p-8"
                    >
                        <svg viewBox="0 0 800 300" className="absolute inset-0 w-full h-full overflow-visible z-10 p-12">
                            {/* Base Path (Grey Line) */}
                            <path 
                                d="M 120,240 C 200,220 250,210 300,200 S 400,220 470,210 S 620,160 700,140" 
                                fill="none" 
                                stroke="#f1f5f9" 
                                strokeWidth="2.5" 
                                strokeLinecap="round" 
                            />

                            {/* Active Path (Framer Motion) */}
                            <motion.path 
                                d="M 120,240 C 200,220 250,210 300,200 S 400,220 470,210 S 620,160 700,140" 
                                fill="none" 
                                stroke="#fbbf24" 
                                strokeWidth="2.5" 
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ 
                                    pathLength: (activeIndex) / (MAP_NETWORK_DATA.length - 1) 
                                }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                            />
                            
                            {/* Future Extension (Dashed) */}
                            <path d="M 700,140 C 730,132 760,128 780,125" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" className="opacity-20" />

                            {/* Nodes & Labels */}
                            {MAP_NETWORK_DATA.map((city, idx) => {
                                const isActive = idx <= activeIndex;
                                const isCurrent = idx === activeIndex;
                                
                                return (
                                    <g 
                                        key={city.name}
                                        onMouseEnter={() => setHoveredCity(city.name)}
                                        onMouseLeave={() => setHoveredCity(null)}
                                        className="cursor-pointer"
                                    >
                                        <motion.circle 
                                            cx={city.x} 
                                            cy={city.y} 
                                            initial={{ r: 5, fill: '#e2e8f0' }}
                                            animate={{ 
                                                r: isCurrent ? 8 : (isActive ? 6 : 5),
                                                fill: isActive ? '#fbbf24' : '#e2e8f0',
                                                scale: isCurrent ? [1, 1.2, 1] : 1
                                            }}
                                            transition={{ 
                                                duration: isCurrent ? 1 : 0.4,
                                                repeat: isCurrent ? Infinity : 0
                                            }}
                                            className={isActive ? 'drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]' : ''}
                                        />
                                        
                                        <motion.text 
                                            x={city.x + 15} 
                                            y={city.y + 5} 
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ 
                                                opacity: isActive ? 1 : 0.3,
                                                x: isActive ? 0 : -5,
                                                fill: isCurrent ? '#fbbf24' : (isActive ? '#334155' : '#94a3b8'),
                                                fontWeight: isCurrent ? 800 : (isActive ? 600 : 400)
                                            }}
                                            className="text-base tracking-tight pointer-events-none"
                                        >
                                            {city.name}
                                        </motion.text>

                                        <AnimatePresence>
                                            {city.name.includes("Australia") && (hoveredCity === city.name || isCurrent) && (
                                                <motion.g 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transform={`translate(${city.x - 70}, ${city.y - 45})`}
                                                >
                                                    <rect width="140" height="22" rx="11" fill="white" className="shadow-lg border border-slate-100" />
                                                    <text x="70" y="14" textAnchor="middle" className="text-[10px] font-bold fill-amber-500 uppercase tracking-tighter">
                                                        Remote · SuperX
                                                    </text>
                                                </motion.g>
                                            )}
                                        </AnimatePresence>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    <div className="flex justify-center mt-7">
                        <p className="text-sm text-[#64748b] font-inter">From here, I can go anywhere.</p>
                    </div>
                </div>
            </section>

            {/* 6. FINAL SLOGAN (Polished White Card - Double Line) */}
            <section className="w-full bg-transparent mt-32 mb-40 px-6">
                <div className="max-w-4xl mx-auto bg-[#FFF0F3] border border-pink-100 rounded-[40px] p-16 md:p-24 text-center shadow-sm">
                    {/* Primary Title */}
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 font-inter underline-offset-8">
                        Let's build <br className="md:hidden" /> something interesting
                    </h2>
                    
                    {/* Subtitle (Email) */}
                    <a 
                        href="mailto:Zhoucss@yeah.net" 
                        className="text-xl md:text-2xl font-bold text-pink-500 hover:text-pink-600 transition-colors tracking-wide font-inter"
                    >
                        Zhoucss@yeah.net
                    </a>
                </div>
            </section>

            <footer className="relative z-10 text-center py-20 bg-white border-t border-slate-50">
                <p className="text-[16px] text-slate-400 font-medium tracking-[0.02em] font-sans">
                    © 2026 Selina (周楚珊) ｜ To win the world.
                </p>
            </footer>

            {/* global Selection Style */}
            <style jsx global>{`
                ::selection {
                    background: #FBCFE8;
                    color: #BE185D;
                }
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </main>
    );
}

function Section({ label, content, isBold = false }: { label: string, content: string, isBold?: boolean }) {
    return (
        <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{label}</h4>
            <p className={`text-[13.5px] leading-relaxed font-medium ${isBold ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                {content}
            </p>
        </div>
    );
}