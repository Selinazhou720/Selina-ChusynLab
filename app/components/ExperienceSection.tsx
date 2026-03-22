"use client";

import { useEffect, useRef, useState } from "react";

// ── Scroll-triggered fade-up hook ──────────────────────────────────────────
function useFadeIn(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setVisible(true);
        }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

// ── Skill tag component ────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
    return (
        <span style={{
            fontSize: "12px",
            fontWeight: 500,
            padding: "6px 12px",
            borderRadius: "999px",
            backgroundColor: "#EEF2FF",
            color: "#4338CA",
            display: "inline-block",
        }}>
            {label}
        </span>
    );
}

// ── 单个卡片（已支持点击跳转）────────────────────────────────────────────
interface ExpCardProps {
    company: string;
    role: string;
    period: string;
    tags: string[];
    items: { title: string; desc: string }[];
    result: string;
    link?: string; // ⭐ 新增
    delay?: number;
    visible: boolean;
}

function ExpCard({
    company,
    role,
    period,
    tags,
    items,
    result,
    link,
    delay = 0,
    visible
}: ExpCardProps) {

    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        if (link) {
            window.open(link, "_blank");
        }
    };

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                cursor: link ? "pointer" : "default",

                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "36px",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: hovered
                    ? "0 20px 40px rgba(0,0,0,0.08)"
                    : "0 8px 20px rgba(0,0,0,0.04)",
                transform: hovered ? "translateY(-8px)" : "translateY(0)",
                transition: "all 0.3s ease",

                opacity: visible ? 1 : 0,
                transitionDelay: visible ? `${delay}ms` : "0ms",
                transitionProperty: "transform, box-shadow, opacity",
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: "16px" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "4px"
                }}>
                    <span style={{
                        fontFamily: "'Inter','PingFang SC',sans-serif",
                        fontSize: "22px",
                        fontWeight: 600,
                        color: "#0F172A"
                    }}>
                        {company}
                    </span>

                    <span style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "13px",
                        color: "#94A3B8",
                        marginLeft: "12px",
                        flexShrink: 0,
                        marginTop: "4px"
                    }}>
                        {period}
                    </span>
                </div>

                <p style={{
                    fontFamily: "'Inter','PingFang SC',sans-serif",
                    fontSize: "15px",
                    color: "#64748B",
                    margin: 0
                }}>
                    {role}
                </p>
            </div>

            {/* Tags */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "24px"
            }}>
                {tags.map(t => <Tag key={t} label={t} />)}
            </div>

            {/* 内容 */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "24px"
            }}>
                {items.map((item) => (
                    <div key={item.title}>
                        <p style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#0F172A",
                            marginBottom: "4px"
                        }}>
                            {item.title}
                        </p>
                        <p style={{
                            fontSize: "14px",
                            color: "#334155",
                            lineHeight: 1.7,
                            margin: 0
                        }}>
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Result */}
            <div style={{
                borderTop: "1px solid #F1F5F9",
                paddingTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <p style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111827",
                    margin: 0
                }}>
                    📊 {result}
                </p>
                <div style={{
                    color: "#e879f9",
                    fontSize: "14px",
                    fontWeight: 600,
                    transition: "transform 0.2s ease",
                    transform: hovered ? "translateX(4px)" : "translateX(0)"
                }}>
                    View →
                </div>
            </div>
        </div>
    );
}

// ── 主组件 ─────────────────────────────────────────────────────────
export default function ExperienceSection() {
    const { ref, visible } = useFadeIn(0.1);

    return (
        <section
            id="experience"
            style={{
                background: "linear-gradient(180deg, #F3F6FF 0%, #EEF2FF 100%)",
                padding: "120px 0",
            }}
        >
            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

                {/* 标题 */}
                <div style={{ textAlign: "center", marginBottom: "56px" }}>
                    <h2 style={{
                        fontSize: "36px",
                        fontWeight: 700,
                        color: "#0F172A",
                        marginBottom: "8px"
                    }}>
                        Experience <span style={{ color: "#6366F1" }}>|</span> 商业实战
                    </h2>

                    <p style={{
                        fontSize: "15px",
                        color: "#64748B"
                    }}>
                        用产品思维和数据分析解决真实业务问题。
                    </p>
                </div>

                {/* 卡片 */}
                <div
                    ref={ref}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "36px",
                    }}
                >

                    <ExpCard
                        visible={visible}
                        company="SuperX"
                        role="AI 产品增长运营实习生"
                        period="2025 — Present"
                        link="https://autoae.online/blog"
                        tags={["AI Tools", "SEO", "Content Growth", "Community"]}
                        items={[
                            { title: "竞品分析体系", desc: "追踪 40+ AI 视频工具..." },
                            { title: "GEO 内容增长", desc: "策划 15+ 篇深度内容..." },
                            { title: "社区运营", desc: "搭建 Discord 社区..." },
                        ]}
                        result="提升产品自然曝光"
                    />

                    <ExpCard
                        visible={visible}
                        delay={150}
                        company="高顿教育"
                        role="新媒体运营实习生"
                        period="2024"
                        link="https://www.gaodun.com/"
                        tags={["Content", "User Growth"]}
                        items={[
                            { title: "内容增长", desc: "37+ 篇热点内容..." },
                            { title: "社群运营", desc: "500+ 用户..." },
                        ]}
                        result="累计成交 28W+"
                    />

                </div>
            </div>
        </section>
    );
}