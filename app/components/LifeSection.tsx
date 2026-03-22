"use client";

import { useState } from "react";

// Placeholder life moments with gradient covers (actual images can be swapped in later)
const moments = [
    { label: "大阪 · 夜晚的道顿堀", color: "#FFE4CC", emoji: "🏙️" },
    { label: "京都 · 清晨的樱花街道", color: "#FFD6E7", emoji: "🌸" },
    { label: "东京 · 电车窗外的城市光影", color: "#D6E8FF", emoji: "🚃" },
    { label: "香港 · 维多利亚港的夜景", color: "#D6FFE8", emoji: "🌃" },
    { label: "布拉格 · 老城区迷失的午后", color: "#E8D6FF", emoji: "🏰" },
    { label: "爱丁堡 · 城堡上的苏格兰风", color: "#FFF3D6", emoji: "🏔️" },
];
const scrollMoments = [...moments, ...moments];

export default function LifeSection() {
    const [paused, setPaused] = useState(false);
    const [lightbox, setLightbox] = useState<null | typeof moments[0]>(null);

    return (
        <section id="life" style={{ backgroundColor: "#FFFFFF", padding: "120px 0", overflow: "hidden" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px", marginBottom: "48px" }}>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "36px", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                        Life <span style={{ color: "#6366F1" }}>|</span> 生活切片
                    </h2>
                    <p style={{ fontFamily: "'Inter','PingFang SC',sans-serif", fontSize: "15px", color: "#64748B" }}>
                        记录那些让我短暂停下来的瞬间。
                    </p>
                </div>
            </div>

            {/* Auto-scroll photo strip */}
            <div
                style={{ overflow: "hidden" }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div style={{
                    display: "flex",
                    gap: "16px",
                    animation: "lifeScroll 18s linear infinite",
                    animationPlayState: paused ? "paused" : "running",
                    width: "max-content",
                    padding: "8px 0",
                }}>
                    {scrollMoments.map((m, i) => (
                        <LifeCard key={`${m.label}-${i}`} moment={m} onClick={() => setLightbox(m)} />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    onClick={() => setLightbox(null)}
                    style={{
                        position: "fixed", inset: 0, zIndex: 999,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <div style={{
                        backgroundColor: lightbox.color,
                        borderRadius: "20px",
                        width: "400px", height: "400px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: "16px",
                    }}>
                        <span style={{ fontSize: "80px" }}>{lightbox.emoji}</span>
                        <p style={{ fontFamily: "'PingFang SC',sans-serif", fontSize: "16px", color: "#0F172A", fontWeight: 600 }}>{lightbox.label}</p>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes lifeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
}

function LifeCard({ moment, onClick }: { moment: typeof moments[0]; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                flexShrink: 0,
                width: "260px",
                height: "200px",
                borderRadius: "14px",
                backgroundColor: moment.color,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                cursor: "pointer",
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.3s ease",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <span style={{ fontSize: "48px" }}>{moment.emoji}</span>
            <p style={{
                fontFamily: "'PingFang SC','Inter',sans-serif",
                fontSize: "13px", fontWeight: 500,
                color: "#334155",
                textAlign: "center",
                padding: "0 12px",
            }}>{moment.label}</p>
        </div>
    );
}
