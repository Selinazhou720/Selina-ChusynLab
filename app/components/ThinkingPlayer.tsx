"use client";

import { useState } from "react";

export default function ThinkingPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="thinking" className="bg-white py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black tracking-widest text-slate-400 uppercase mb-6">
                        Podcast & Thinking
                    </div>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-2">THINKING</h2>
                </div>

                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                    {/* Cover Image Placeholder */}
                    <div className="w-48 h-48 bg-slate-50 rounded-2xl flex-shrink-0 border border-slate-100 flex items-center justify-center relative overflow-hidden shadow-inner">
                        <div className="text-[10px] font-black text-slate-300 uppercase rotate-45">岩中花述</div>
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Controls & Progress */}
                    <div className="flex-grow w-full space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">岩中花述 / Podcast</h3>
                            <p className="text-sm text-slate-400 font-bold tracking-wide">Ep. Special - Designing AI Experiences</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-4">
                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                <div className="h-full w-[35%] bg-slate-900 rounded-full relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full shadow-lg" />
                                </div>
                            </div>
                            <div className="flex justify-between text-[11px] font-black text-slate-300 tabular-nums uppercase tracking-widest">
                                <span>12:45</span>
                                <span>48:30</span>
                            </div>
                        </div>

                        {/* Player Controls */}
                        <div className="flex items-center justify-center gap-12">
                            <button className="text-slate-300 hover:text-slate-900 transition-colors">
                                <span className="text-xl">⏮</span>
                            </button>
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-white hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10"
                            >
                                <span className="text-2xl translate-x-0.5">{isPlaying ? '⏸' : '▶️'}</span>
                            </button>
                            <button className="text-slate-300 hover:text-slate-900 transition-colors">
                                <span className="text-xl">⏭</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
