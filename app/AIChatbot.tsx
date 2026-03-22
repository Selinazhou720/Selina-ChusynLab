"use client";

import { useState } from "react";

const GRADIENT = "linear-gradient(to right, #FFCEE3, #678EC9)";

const questions = [
    "深度拆解 40+ 全球 AIGC 竞品，她发现了什么破局点？",
    "丢给她一个完全陌生的新领域，她的第一步会做什么？",
    "一个人跑去国外 Solo Trip？听听她的奇妙经历 🌍",
    "想和她来一场 Deep Talk 吗？（‼️：她超级能聊 🎙️）",
];

const answers: Record<number, string> = {
    0: "在 Super X 期间，我深度拆解了 40+ 款全球 AIGC 视频工具，发现核心破局点在于：大多数工具在「生成效率」上内卷，却忽略了「创作者工作流集成」这个真正的痛点。这个洞察直接影响了产品的差异化定位策略。",
    1: "先问「这个领域的第一性原理是什么」——我会先用3天时间做密集研究：找行业报告、拆解头部产品、和真实用户聊天。然后用结构化框架搭出一张认知地图，再找到可以快速验证的最小切入点。",
    2: "一个人跑去爱丁堡、布拉格、维也纳……每次 Solo Trip 都是一场和陌生环境的谈判。迷失在布拉格老城区的那个下午，我意识到：不确定性才是生命最有趣的底色。",
    3: "我真的超级能聊！从 AI 产品趋势到人生哲学，从用户心理到旅行故事。如果你想深聊某个话题，AI 助手功能即将接入，到时候见！",
};

export default function AIChatbot() {
    const [open, setOpen] = useState(true);
    const [showBadge, setShowBadge] = useState(true);
    const [activeAnswer, setActiveAnswer] = useState<number | null>(null);

    const handleFabClick = () => {
        setOpen((v) => !v);
        setShowBadge(false);
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: "32px",
                right: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "10px",
                zIndex: 300,
                transform: "scale(0.9)",
                transformOrigin: "bottom right",
            }}
        >
            {open && (
                <>
                    {/* Greeting card */}
                    <div
                        style={{
                            width: "288px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "16px",
                            padding: "16px 18px",
                            boxShadow: "0 12px 40px rgba(103,142,201,0.12)",
                            border: "1px solid rgba(103,142,201,0.15)",
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "'Inter','PingFang SC',sans-serif",
                                fontSize: "14px",
                                color: "#262377",
                                lineHeight: 1.7,
                                margin: 0,
                            }}
                        >
                            Hi 💖 我是周楚珊的 AI 助手。
                            <br />
                            想了解她？直接点击下方问题开始哦：
                        </p>
                    </div>

                    {/* Question bubbles */}
                    {questions.map((q, i) => (
                        <div key={i} style={{ width: "288px" }}>
                            <button
                                onClick={() => setActiveAnswer(activeAnswer === i ? null : i)}
                                style={{
                                    width: "100%",
                                    textAlign: "left",
                                    backgroundColor:
                                        activeAnswer === i ? "rgba(255,206,227,0.22)" : "#FFFFFF",
                                    border: "1px solid #678EC9",
                                    borderRadius: "14px",
                                    padding: "10px 16px",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: "#262377",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                    transition: "background-color 0.2s ease",
                                    fontFamily: "'Inter','PingFang SC',sans-serif",
                                    lineHeight: 1.5,
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.backgroundColor =
                                        "rgba(255,206,227,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    if (activeAnswer !== i) {
                                        (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF";
                                    }
                                }}
                            >
                                <span>{q}</span>
                                <span style={{ flexShrink: 0, opacity: 0.45, fontSize: "14px", marginTop: "2px" }}>
                                    {activeAnswer === i ? "−" : "+"}
                                </span>
                            </button>

                            {activeAnswer === i && (
                                <div
                                    style={{
                                        marginTop: "6px",
                                        padding: "12px 14px",
                                        backgroundColor: "rgba(255,206,227,0.08)",
                                        border: "1px solid rgba(103,142,201,0.2)",
                                        borderRadius: "14px",
                                        fontSize: "12.5px",
                                        color: "#262377",
                                        lineHeight: 1.85,
                                        fontFamily: "'Inter','PingFang SC',sans-serif",
                                    }}
                                >
                                    {answers[i]}
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}

            {/* FAB */}
            <div style={{ position: "relative" }}>
                {showBadge && (
                    <div
                        style={{
                            position: "absolute",
                            top: "-4px",
                            right: "-4px",
                            width: "20px",
                            height: "20px",
                            backgroundColor: "#EF4444",
                            borderRadius: "50%",
                            border: "2px solid #FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            zIndex: 1,
                            fontFamily: "'Inter',sans-serif",
                        }}
                    >
                        1
                    </div>
                )}
                <button
                    onClick={handleFabClick}
                    aria-label="AI assistant"
                    style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: GRADIENT,
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        boxShadow: "0 6px 24px rgba(103,142,201,0.4)",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.transform = "scale(1.08)";
                        el.style.boxShadow = "0 8px 32px rgba(103,142,201,0.55)";
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.transform = "scale(1)";
                        el.style.boxShadow = "0 6px 24px rgba(103,142,201,0.4)";
                    }}
                >
                    {open ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
