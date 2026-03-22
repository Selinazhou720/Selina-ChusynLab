"use client";

import { useState, useEffect } from "react";

export default function HeroSection() {
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const [showQuestions, setShowQuestions] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowQuestions(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const AI_CHATBOT_DATA = [
        {
            q: "What breakthroughs did she find in 40+ AIGC tools?",
            a: "在 Super X 实习期间，我系统拆解了 40+ 款全球 AIGC 视频产品。相比单点能力的对比，我更关注它们在真实创作链路中的位置。我发现一个关键共性：大多数产品在“生成效率”上持续内卷，但对“创作者完整工作流”的支持是割裂的。这也意味着，真正的破局点不在模型本身，而在于如何嵌入并重构创作者的生产流程。这个洞察后来也直接影响了我对产品差异化定位的判断。",
        },
        {
            q: "How does she tackle an entirely new domain?",
            a: "首先，我会先快速建立对领域的“认知框架”，包括产品的目标用户、核心价值和所处阶段。其次从外部视角入手，通过拆解它的社交媒体和内容分发，最后去反推它的用户结构和核心使用场景。而在方法上，我会先做一轮广泛扫描（拉高信息覆盖面），再筛选重点方向深入拆解，并逐步落到具体场景。过程中会借助插件抓取产品数据和结构，下载好md版本，用 AI 做横向对比，持续扩展竞品样本。最后再回到自己的判断，做一次“去工具化”的总结输出，确保结论是我真正理解过的，而不是简单的信息拼接。",
        },
        {
            q: "Care for a Deep Talk? (Warning: Super chatty 🎙️)",
            a: (
                <>
                    Wechat：19047067347<br />
                    📮 zhoucss@yeah.net
                </>
            ),
        }
    ];

    return (
        <section id="home" className="w-full max-w-7xl mx-auto px-6 pt-24 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-[10%] items-start">

                {/* 左侧：粉色高亮绝美排版 */}
                <div className="space-y-6">
                    <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">
                        Welcome to my channel 🐰
                    </p>

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

                {/* 右侧：横屏夜景 + 极简英文助手 */}
                <div className="w-full max-w-[500px] ml-auto space-y-4">

                    {/* 照片 */}
                    <div className="w-full aspect-video rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
                        <img
                            src="/images/me.jpg"
                            alt="Selina Zhou"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* AI 助手 */}
                    <div className="relative space-y-2 pt-10">
                        <div className="py-3 px-4 bg-[#FFF0F3] text-pink-700 text-sm font-medium rounded-2xl shadow-sm border border-pink-100">
                            Hi 💖 I'm Selina's AI Assistant.<br />Want to know more? Click below:
                        </div>

                        <div className={`transition-all duration-700 ease-out transform ${showQuestions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} space-y-2`}>
                            {AI_CHATBOT_DATA.map((item, i) => (
                                <div key={i} className="flex flex-col">
                                    <button
                                        onClick={() => setActiveChat(activeChat === i ? null : i)}
                                        className={`w-full text-left py-3 px-4 rounded-2xl text-sm font-bold transition-all duration-300 border ${activeChat === i
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
                                        <div className="mt-2 p-4 bg-white border border-slate-100 rounded-2xl text-sm text-slate-600 leading-relaxed font-medium shadow-sm animate-in fade-in slide-in-from-top-1">
                                            {item.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="absolute -bottom-8 right-2 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-105 transition-transform z-10">
                            <span className="text-xl font-light">×</span>
                            <div className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-pink-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">1</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}