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

const thoughts = [
    {
        title: "最近在听：岩中花述让我想通了一件事",
        body: "许知远的《岩中花述》里，他采访了很多「不按常规出牌」的人。我发现真正有趣的人，不是「赢得更多」，而是「敢于定义自己的游戏规则」。",
        date: "2025.12",
    },
    {
        title: "4月 Solo Trip 的真实期待",
        body: "4 月计划独自前往大阪、京都、东京——不排满行程，只定一个方向。去感受那种「克制的美好」。布拉格的迷路给了我信心：不确定性才是旅行最有趣的底色。",
        date: "2026.03",
    },
    {
        title: "播客推荐清单 | 每次通勤都在偷偷充电",
        body: "《岩中花述》（人物访谈深度）、《自我进化论》（个人成长与认知升级）、《凹凸电波》（真实有趣的年轻人对话）——每次通勤都在偷偷充电。",
        date: "持续更新",
    },
    {
        title: "关于「跨界」这件事",
        body: "辩论思维 × 产品运营 = 更强的用户说服力。辩论教了我「如何在 2 分钟内让对方理解并接受一个复杂观点」——这不就是产品增长最核心的能力吗？",
        date: "2025.09",
    },
    {
        title: "数据驱动的边界在哪里",
        body: "数据告诉你「发生了什么」，但永远不会告诉你「为什么」。后者需要的不是更多数据，而是更好的洞察力——这才是 AI 时代真正难被替代的能力。",
        date: "2025.11",
    },
    {
        title: "Solo Trip 与产品增长有什么共同点",
        body: "都需要在信息不完全的情况下快速做决策，都需要在失败后快速迭代，都需要在「没有人告诉你该怎么做」时找到自己的方向。",
        date: "2026.01",
    },
];

export default function ThinkingSection() {
    const { ref, visible } = useFadeIn();

    return (
        <section id="thinking" style={{ background: "linear-gradient(180deg, #FAFBFF 0%, #F3F6FF 100%)", padding: "120px 0" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "56px" }}>
                    <h2 style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "36px", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                        Thinking <span style={{ color: "#6366F1" }}>|</span> 思考记录
                    </h2>
                    <p style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "15px", color: "#64748B" }}>
                        一些零散但真实的观察。
                    </p>
                </div>

                {/* Grid */}
                <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                    {thoughts.map((t, i) => (
                        <ThoughtCard key={t.title} thought={t} delay={i * 80} visible={visible} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ThoughtCard({ thought, delay, visible }: { thought: (typeof thoughts)[0]; delay: number; visible: boolean }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: "#FAFAFA",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid #F1F1F1",
                boxShadow: hovered ? "0 12px 24px rgba(0,0,0,0.06)" : "0 8px 20px rgba(0,0,0,0.04)",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "all 0.25s ease",
                opacity: visible ? 1 : 0,
                transitionDelay: `${delay}ms`,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}
        >
            <h3 style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "15px", fontWeight: 600, color: "#0F172A", margin: 0, lineHeight: 1.5 }}>
                {thought.title}
            </h3>
            <p style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "14px", color: "#334155", lineHeight: 1.8, margin: 0, flex: 1 }}>
                {thought.body}
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "#94A3B8", margin: 0 }}>
                {thought.date}
            </p>
        </div>
    );
}
