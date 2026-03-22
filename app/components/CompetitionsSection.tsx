"use client";

import { useState } from "react";

interface ProjectItem {
  id: string;
  title: string;
  highlight: string;
  tags: string[];
  context: string;
  problem: string;
  solution: string;
  myContribution: string[];
  outcome: string;
}

const projects: ProjectItem[] = [
  {
    id: "yogurt",
    title: "Yogurt Drink Marketing Strategy (Mengniu)",
    highlight: "Built a dual-value positioning based on Gen Z sleep needs",
    tags: ["Strategy", "User Insight", "Marketing"],
    context: "National Innovation Competition · Team Leader",
    problem: "Gen Z faces increasing sleep issues but lacks emotional connection with functional drinks",
    solution: "Developed a dual-value positioning combining functional benefits and emotional resonance. Proposed the campaign concept: “Say Goodnight to Yourself”",
    myContribution: [
      "Led user research based on industry reports",
      "Defined product positioning and campaign strategy",
      "Delivered a 3000-word market and competitor analysis",
    ],
    outcome: "Top 50 nationwide",
  },
  {
    id: "creative",
    title: "Creative Campaign for Functional Product",
    highlight: "Translated technical features into emotional storytelling",
    tags: ["Creative", "Branding", "Strategy"],
    context: "Marketing Case Study · Brand Strategist",
    problem: "Functional features are often too technical and fail to resonate emotionally with consumers.",
    solution: "Humanized the technology through relatable daily scenarios and metaphors that connect with core user pain points.",
    myContribution: [
      "Crafted emotional storytelling framework",
      "Designed visual narrative and copy direction",
      "Collaborated with creative team for cross-channel execution",
    ],
    outcome: "Increased brand sentiment index among targeted demographics",
  },
];

function CompetitionCard({ 
  project, 
  isExpanded, 
  onToggle 
}: { 
  project: ProjectItem; 
  isExpanded: boolean; 
  onToggle: () => void;
}) {
  return (
    <div 
      onClick={onToggle}
      className="group"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        border: `1px solid ${isExpanded ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)"}`,
        marginBottom: "16px",
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: !isExpanded ? "translateY(0)" : "translateY(0)",
        boxShadow: isExpanded ? "0 10px 30px rgba(0,0,0,0.05)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!isExpanded) e.currentTarget.style.transform = "translateY(-2px)";
        if (!isExpanded) e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        if (!isExpanded) e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ 
              fontSize: "12px", 
              color: "#94A3B8", 
              transition: "transform 0.3s ease",
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)"
             }}>
              ▶
            </span>
            <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1E293B" }}>
              {project.title}
            </h3>
          </div>
          <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "12px" }}>
            {project.highlight}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: "12px",
                padding: "3px 10px",
                borderRadius: "99px",
                backgroundColor: "#F1F5F9",
                color: "#64748B",
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ 
          fontSize: "20px", 
          color: "#CBD5E1", 
          transition: "transform 0.3s ease",
          transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)"
        }}>
          →
        </div>
      </div>

      {/* Expanded Content */}
      <div style={{
        maxHeight: isExpanded ? "800px" : "0",
        opacity: isExpanded ? 1 : 0,
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: "6px" }}>
                  Context
                </h4>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>{project.context}</p>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: "6px" }}>
                  Problem
                </h4>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>{project.problem}</p>
              </div>
              <div>
                <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: "6px" }}>
                  Solution
                </h4>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>{project.solution}</p>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: "6px" }}>
                  My Contribution
                </h4>
                <ul style={{ margin: 0, paddingLeft: "18px", listStyleType: "disc", fontSize: "14px", color: "#475569" }}>
                  {project.myContribution.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: "6px" }}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: "6px" }}>
                  Outcome
                </h4>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#1E293B" }}>{project.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompetitionsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="competitions" style={{ backgroundColor: "#FFFFFF", padding: "100px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#0F172A", marginBottom: "8px", letterSpacing: "-0.025em" }}>
            Competitions & Case Studies
          </h2>
          <p style={{ fontSize: "16px", color: "#64748B" }}>
            Selected strategy and marketing projects from competitions
          </p>
        </div>

        <div style={{ maxWidth: "800px" }}>
          {projects.map(project => (
            <CompetitionCard 
              key={project.id} 
              project={project} 
              isExpanded={expandedId === project.id}
              onToggle={() => toggleCard(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
