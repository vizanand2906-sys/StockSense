"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    if ((cleanUser === "phulkari" || cleanUser === "admin") && (cleanPass === "phulkari" || cleanPass === "admin")) {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/dashboard/executive");
      }, 1200);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1E2B1A 0%, #2E3B27 50%, #3B4A33 100%)" }}
    >
      {/* Decorative background orbs */}
      <div
        style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,75,49,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "-10%", left: "-5%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,168,83,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative embroidery dots top */}
      <div style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", alignItems: "center" }}>
        {["#C84B31","#D4A853","#F0EAD6","#D4A853","#C84B31"].map((c, i) => (
          <div key={i} style={{ width: i===2?12:8, height: i===2?12:8, borderRadius:"50%", background: c, opacity: 0.7 }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-4 flex rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid #4F5E44" }}>

        {/* Left panel — Square logo */}
        <div
          className="hidden md:flex flex-col items-center justify-center w-5/12 p-8 relative"
          style={{ background: "linear-gradient(160deg, #1E2B1A 0%, #2E3B27 100%)" }}
        >
          {/* Embroidery border on the right edge */}
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "3px",
            background: "repeating-linear-gradient(180deg, #C84B31 0px, #C84B31 8px, #D4A853 8px, #D4A853 16px, transparent 16px, transparent 20px)"
          }} />

          <div className="relative w-64 h-64 mb-6">
            <Image
              src="/phulkari_square.jpg"
              alt="Phulkari by Preeth Design Studios"
              fill
              style={{ objectFit: "cover", borderRadius: "16px" }}
              priority
            />
          </div>

          <p style={{ color: "#A8B89A", fontSize: "13px", textAlign: "center", letterSpacing: "0.05em", lineHeight: 1.8 }}>
            Golden Enclave #756<br />
            10th Main Road, 4th Block<br />
            Jayanagar, Bangalore 560011
          </p>

          {/* Decorative dots bottom */}
          <div style={{ position: "absolute", bottom: "24px", display: "flex", gap: "6px" }}>
            {["#C84B31","#D4A853","#C84B31"].map((c, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
            ))}
          </div>
        </div>

        {/* Right panel — Login form */}
        <div
          className="flex-1 flex flex-col justify-center p-10"
          style={{ background: "#364430" }}
        >
          {/* Mobile: show square logo */}
          <div className="flex justify-center mb-6 md:hidden">
            <div className="relative w-24 h-24">
              <Image src="/phulkari_square.jpg" alt="Phulkari" fill style={{ objectFit: "cover", borderRadius: "12px" }} />
            </div>
          </div>

          <div className="mb-8">
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "36px", fontWeight: 700,
                color: "#F0EAD6", marginBottom: "6px", lineHeight: 1.2
              }}
            >
              Welcome Back
            </h1>
            <p style={{ color: "#A8B89A", fontSize: "14px" }}>
              Sign in to your Phulkari dashboard
            </p>
            {/* Gold underline */}
            <div style={{ height: "2px", width: "48px", background: "linear-gradient(90deg, #C84B31, #D4A853)", marginTop: "12px", borderRadius: "2px" }} />
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Username */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#A8B89A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                Username
              </label>
              <div style={{ position: "relative" }}>
                <User style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#A8B89A" }} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  style={{
                    width: "100%", paddingLeft: "44px", paddingRight: "16px",
                    paddingTop: "12px", paddingBottom: "12px",
                    background: "#2E3B27", border: "1px solid #4F5E44",
                    borderRadius: "8px", color: "#F0EAD6", fontSize: "14px",
                    outline: "none", transition: "border-color 0.2s",
                    boxSizing: "border-box"
                  }}
                  onFocus={e => e.target.style.borderColor = "#C84B31"}
                  onBlur={e => e.target.style.borderColor = "#4F5E44"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#A8B89A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#A8B89A" }} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  style={{
                    width: "100%", paddingLeft: "44px", paddingRight: "48px",
                    paddingTop: "12px", paddingBottom: "12px",
                    background: "#2E3B27", border: "1px solid #4F5E44",
                    borderRadius: "8px", color: "#F0EAD6", fontSize: "14px",
                    outline: "none", transition: "border-color 0.2s",
                    boxSizing: "border-box"
                  }}
                  onFocus={e => e.target.style.borderColor = "#C84B31"}
                  onBlur={e => e.target.style.borderColor = "#4F5E44"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#A8B89A" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: "8px", padding: "10px 14px", color: "#f87171", fontSize: "13px" }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-btn"
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%", padding: "13px",
                background: isLoading ? "#4F5E44" : "linear-gradient(135deg, #C84B31 0%, #7B3F2B 100%)",
                border: "none", borderRadius: "8px",
                color: "#F0EAD6", fontSize: "15px", fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                letterSpacing: "0.05em",
                transition: "all 0.2s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
              }}
              onMouseEnter={e => { if (!isLoading) (e.target as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; }}
            >
              {isLoading ? (
                <>
                  <div style={{ width: 16, height: 16, border: "2px solid rgba(240,234,214,0.3)", borderTopColor: "#F0EAD6", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer hint */}
          <p style={{ color: "#4F5E44", fontSize: "12px", textAlign: "center", marginTop: "24px" }}>
            Phulkari by Preeth Design Studios · Boutique Intelligence Platform
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #4F5E44; }
      `}</style>
    </div>
  );
}
