"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

const projects = [
    {
        emoji: "📱",
        name: "个人 IP 内容实验",
        desc: "大学生生活教育领域自媒体账号，从 0 到爆款的内容增长实验。",
        tags: ["内容增长", "AI工具", "个人品牌"],
        stats: "累计播放量 270W+",
        bg: "#F5F7FF",
    },
    {
        emoji: "🏆",
        name: "商业案例竞赛项目",
        desc: "国家级大学生商业计划书比赛，从市场分析到产品战略的完整输出。",
        tags: ["产品战略", "数据分析", "商业洞察"],
        stats: "全国一等奖",
        bg: "#FFF8F0",
    },
    {
        emoji: "🤖",
        name: "AI 竞品研究系统",
        desc: "对 40+ 全球 AIGC 工具进行系统评测，建立 6 维量化评分模型。",
        tags: ["竞品分析", "AI Tools", "产品研究"],
        stats: "完整评测数据库",
        bg: "#F0FFF8",
    },
    {
        emoji: "📊",
        name: "社群用户增长实验",
        desc: "500+ 人品牌社群的搭建与精细化运营，用户分层与转化漏斗优化。",
        tags: ["用户运营", "数据驱动", "社群增长"],
        stats: "成交额 28W+",
        bg: "#FDF4FF",
    },
];

export default function ProjectsSection() {
    const { ref, visible } = useFadeIn();

    return (
        <section id="projects" style={{ backgroundColor: "#FFFFFF", padding: "120px 0" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "56px" }}>
                    <h2 style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "36px", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                        Projects <span style={{ color: "#6366F1" }}>|</span> 项目实验室
                    </h2>
                    <p style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "15px", color: "#64748B" }}>
                        用实验与创意验证增长可能性。
                    </p>
                </div>

                {/* Grid */}
                <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }}>
                    {projects.map((p, i) => (
                        <ProjectCard key={p.name} project={p} delay={i * 100} visible={visible} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, delay, visible }: { project: (typeof projects)[0]; delay: number; visible: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #F1F1F1",
                overflow: "hidden",
                boxShadow: hovered ? "0 16px 32px rgba(0,0,0,0.08)" : "0 8px 20px rgba(0,0,0,0.04)",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "all 0.3s ease",
                opacity: visible ? 1 : 0,
                transitionDelay: `${delay}ms`,
                cursor: "default",
            }}
        >
            {/* Cover area */}
            <div style={{
                height: "120px",
                backgroundColor: project.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
            }}>
                {project.emoji}
            </div>

            {/* Content */}
            <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h3 style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "18px", fontWeight: 600, color: "#0F172A", margin: 0 }}>
                        {project.name}
                    </h3>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 600, color: "#6366F1", backgroundColor: "#EEF2FF", padding: "4px 10px", borderRadius: "999px", flexShrink: 0, marginLeft: "8px" }}>
                        {project.stats}
                    </span>
                </div>
                <p style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "14px", color: "#64748B", lineHeight: 1.7, marginBottom: "16px" }}>
                    {project.desc}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {project.tags.map(t => (
                        <span key={t} style={{ fontSize: "12px", fontWeight: 500, padding: "4px 10px", borderRadius: "999px", backgroundColor: "#F5F7FF", color: "#4338CA" }}>{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
