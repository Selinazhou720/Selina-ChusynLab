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

const awards = [
    { icon: "🏆", title: "会计与商业管理案例分析大赛", level: "全国一等奖", desc: "国家级商业案例赛事最高奖项，从市场分析到战略落地全流程独立输出。" },
    { icon: "🔬", title: "大学生创新创业训练计划（大创）", level: "多次国家级立项", desc: "多个项目获国家级立项，主导研究选题、方案设计与成果产出。" },
    { icon: "🎬", title: "「深技大与你过新年」视频大赛", level: "蝉联两届第一名", desc: "连续两届蝉联第一名，累计播放量 180W+，从选题策划到拍摄剪辑全流程独立完成。" },
    { icon: "🏅", title: "全国大学生广告艺术大赛", level: "全国优等奖", desc: "创意策略与内容设计全程独立完成，获全国级别认可。" },
    { icon: "🎙️", title: "高校辩论联赛", level: "最佳辩手", desc: "代表学院出征，在逻辑构建与现场表达上均获评委高度肯定。" },
    { icon: "🌟", title: "优秀学生干部 / 优秀志愿者", level: "校级荣誉", desc: "连续两年获校级优秀学生荣誉称号，兼顾学业与校园及社会服务。" },
];

export default function AwardsSection() {
    const { ref, visible } = useFadeIn();

    return (
        <section id="awards" style={{ background: "linear-gradient(180deg, #F3F6FF 0%, #EEF2FF 100%)", padding: "120px 0" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "56px" }}>
                    <h2 style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "36px", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                        Awards <span style={{ color: "#6366F1" }}>|</span> 荣誉陈列
                    </h2>
                    <p style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "15px", color: "#64748B" }}>
                        一些阶段性的肯定。
                    </p>
                </div>

                {/* Grid */}
                <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                    {awards.map((a, i) => (
                        <AwardCard key={a.title} award={a} delay={i * 80} visible={visible} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AwardCard({ award, delay, visible }: { award: (typeof awards)[0]; delay: number; visible: boolean }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: "#F9FAFB",
                borderRadius: "14px",
                padding: "20px",
                border: "1px solid #F1F5F9",
                boxShadow: hovered ? "0 12px 24px rgba(0,0,0,0.06)" : "0 4px 12px rgba(0,0,0,0.03)",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.25s ease",
                opacity: visible ? 1 : 0,
                transitionDelay: `${delay}ms`,
            }}
        >
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>{award.icon}</div>
            <p style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "4px", lineHeight: 1.4 }}>{award.title}</p>
            <span style={{ display: "inline-block", fontSize: "12px", fontWeight: 600, color: "#6366F1", backgroundColor: "#EEF2FF", padding: "3px 10px", borderRadius: "999px", marginBottom: "8px" }}>{award.level}</span>
            <p style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "13px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>{award.desc}</p>
        </div>
    );
}
