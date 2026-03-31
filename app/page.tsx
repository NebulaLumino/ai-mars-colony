"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const APP_NAME = "Mars Colony Scenario Planner";
const TAGLINE = "AI-powered terraforming models & long-term colonization scenario planning";
const ACCENT = "hsl(165, 70%, 45%)";
const ACCENT_MID = "hsl(165, 60%, 35%)";

export default function MarsColonyPage() {
  const [colonyConcept, setColonyConcept] = useState("");
  const [timeline, setTimeline] = useState("");
  const [colonySize, setColonySize] = useState("");
  const [terraformingGoal, setTerraformingGoal] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!colonyConcept) { setOutput("Please describe the colony concept."); return; }
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert planetary scientist, space systems engineer, and mission architect specializing in Mars exploration and colonization. Generate a comprehensive Mars colony scenario plan.

**Colony Parameters:**
- Colony Concept: ${colonyConcept} (e.g., First crewed outpost, commercial mining base, 1000-person research city, self-sufficient colony)
- Development Timeline: ${timeline || "Not specified"} (e.g., 2035 initial landing, 2040 first permanent base, 2100 terraformation start)
- Target Colony Size: ${colonySize || "Not specified"}
- Terraforming Goal: ${terraformingGoal || "Not specified"} (e.g., no terraforming, pressurized domes only, partial terraformation, full terraformation)

Please provide:

## 🌍 Site Selection
Recommend optimal Mars landing/settlement sites:
- Acidalia Planitia (northern lowlands)
- Hellas Basin (deep, high pressure)
- Tharsis plateau (volcanic activity warmth)
- Polar locations (water ice)
- Trade-offs between sites (resources, climate, radiation)

## 🏗️ Colony Architecture
Design the settlement:
- Initial habitat design (SpaceX Starship cargo, inflatable modules, 3D-printed regolith)
- Expansion architecture (domes, tunnels, subsurface)
- Radiation protection strategies
- Pressurization approach
- Life support (closed-loop ECLSS)
- Power (solar, nuclear, wind)
- Food production (hydroponics, aeroponics, in-situ agriculture)

## 💧 Resource Planning (ISRU)
Map critical resources:
- Water ice deposits (confirmed at mid-latitudes by MRO)
- Atmospheric water extraction
- Regolith oxygen extraction (Sabatier process, electrolysis)
- Building materials from regolith
- CO2 processing for fuel production (SpaceX ISRU concept)
- Nitrogen extraction for agriculture

## 🗺️ Terraforming Scenario (if applicable)
If terraforming is the goal, outline:
- Phase 1: Atmospheric thickening (greenhouse gases, imported volatiles)
- Phase 2: Warming (artificial greenhouse effect, orbital mirrors)
- Phase 3: Oxygen production (photosynthetic organisms)
- Phase 4: Magnetic field question (Martian magnetosphere is weak)
- Timeline: 100-1000 year scales
- Feasibility assessment and energy requirements

## 🚀 Transportation Architecture
Design the Earth-Mars transport system:
- Launch window frequency (26-month synodic period)
- Cycler orbits (Aldrin cyclers for regular crew transport)
- Cargo vs. crew trajectories
- In-orbit assembly considerations
- Return mission architecture

## 🏥 Crew Health & Medical
Address health challenges:
- Radiation exposure (GCR and SPE)
- Microgravity effects (reduced vs. Mars gravity ~0.38g)
- Psychological challenges (communication delay up to 24 min)
- Medical emergencies in remote setting
- In-situ medical manufacturing

## 🗓️ Phased Development Timeline
Provide a realistic phased plan:
- Phase 0 (now-2035): Robotic precursor, InSight-like missions
- Phase 1 (2035-2045): First crewed landing, initial base establishment
- Phase 2 (2045-2060): Growing colony, first ISRU systems
- Phase 3 (2060-2100): Self-sufficient colony, possible terraformation initiation
- Key decision gates and failure modes

## 💰 Economic Drivers
Identify the primary economic motivations:
- Space tourism and high-net-worth settlement
- Rare earth mining
- Mars as backup for humanity (existential risk mitigation)
- Scientific research
- Media and entertainment rights

## 📋 Plain-Language Summary`,
        }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No response received.");
    } catch { setOutput("Error generating Mars colony plan. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #111 0%, #0a0a0a 50%, #111 100%)", color: "#e5e7eb", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <header style={{ borderBottom: `1px solid ${ACCENT}33`, padding: "1.5rem 2rem", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
            <span style={{ color: ACCENT, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>AI x Astronomy</span>
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.5rem", color: "#f9fafb", letterSpacing: "-0.02em" }}>{APP_NAME}</h1>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "0.25rem" }}>{TAGLINE}</p>
        </div>
      </header>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
        <div style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${ACCENT_MID}, ${ACCENT}, ${ACCENT_MID})`, marginBottom: "2rem" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f3f4f6", marginBottom: "1.25rem" }}>Colony Concept</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Colony Concept *</label>
                  <input type="text" value={colonyConcept} onChange={(e) => setColonyConcept(e.target.value)} placeholder="e.g., First permanent crewed outpost, 1000-person research city" style={inputStyle} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>Development Timeline</label>
                    <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="e.g., 2035-2100" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Target Colony Size</label>
                    <input type="text" value={colonySize} onChange={(e) => setColonySize(e.target.value)} placeholder="e.g., 100, 1000, 100000" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Terraforming Goal</label>
                  <select value={terraformingGoal} onChange={(e) => setTerraformingGoal(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select...</option>
                    <option value="none">No terraforming (surface habitats only)</option>
                    <option value="partial">Partial terraforming (outdoor suits required)</option>
                    <option value="full">Full terraforming (open atmosphere)</option>
                    <option value="orbital">Orbital colony (O Neill style)</option>
                  </select>
                </div>
                <button onClick={handleGenerate} disabled={loading} style={{ ...buttonStyle, background: loading ? "rgba(0,120,100,0.3)" : ACCENT, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : `0 0 20px ${ACCENT}55` }}>
                  {loading ? "Planning..." : "Plan Mars Colony"}
                </button>
              </div>
            </div>
            <div style={{ marginTop: "1rem", background: "rgba(0,120,100,0.05)", border: `1px solid ${ACCENT}22`, borderRadius: 12, padding: "1rem 1.25rem" }}>
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", lineHeight: 1.6 }}>
                <span style={{ color: ACCENT, fontWeight: 600 }}>Mars Facts:</span> Mars surface gravity is 0.38g. Atmospheric pressure is ~0.6% of Earth. Average temperature is -60 C. A day (sol) is 24h 37m. Mars has no global magnetic field but patchy crustal fields exist. The lowest elevation (Hellas Planitia) has the highest surface pressure ~12 mbar.
              </p>
            </div>
          </div>
          <div>
            {output ? (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.75rem", minHeight: 400 }}>
                <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#d1d5db", marginBottom: "1.25rem" }}>Colony Scenario</h2>
                <div style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.75, overflowY: "auto", maxHeight: "calc(100vh - 380px)" }}>
                  <ReactMarkdown>{output}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.75rem", minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${ACCENT}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🔴</div>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", textAlign: "center" }}>Enter colony concept and parameters<br /><strong style={{ color: "#9ca3af" }}>for a colony scenario plan</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer style={{ borderTop: `1px solid ${ACCENT}22`, padding: "1.25rem 2rem", textAlign: "center", color: "#4b5563", fontSize: "0.75rem", marginTop: "2rem" }}>AI x Astronomy · Cycle 67 · Powered by DeepSeek · For educational and research purposes</footer>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#9ca3af", marginBottom: "0.35rem", letterSpacing: "0.04em", textTransform: "uppercase" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.85rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f3f4f6", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" };
const buttonStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "none", color: "#fff", fontSize: "0.875rem", fontWeight: 700, transition: "all 0.2s", marginTop: "0.5rem" };
