"use client";

import { useState, useEffect } from "react";

const navItems = [
    { label: "Home", href: "#intro" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Awards", href: "#awards" },
    { label: "Life", href: "#life" },
    { label: "Thinking", href: "#thinking" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav style={{
            position: "fixed",
            top: "4px",
            left: 0, right: 0,
            zIndex: 100,
            height: "64px",
            backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "#FFFFFF",
            backdropFilter: scrolled ? "blur(10px)" : "none",
            borderBottom: scrolled ? "1px solid #F1F5F9" : "1px solid transparent",
            transition: "border-color 0.3s, background-color 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            fontFamily: "'Inter', sans-serif",
        }}>
            {/* Brand */}
            <div className="text-xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Selinazhou
                </span>
            </div>

            {/* Nav links */}
            <ul style={{ display: "flex", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}>
                {navItems.map((item) => (
                    <li key={item.label}>
                        <a href={item.href} style={{
                            fontSize: "13px", fontWeight: 500,
                            color: "#334155",
                            textDecoration: "none",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            transition: "color 0.2s",
                        }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#6366F1")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#334155")}
                        >{item.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
