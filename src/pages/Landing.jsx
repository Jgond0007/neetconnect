import { useState } from "react";
import { login, signup } from "../api";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --navy:#0a1628;--navy2:#0f2040;--saffron:#f97316;--saffron2:#fb923c;
    --gold:#fbbf24;--white:#fff;--gray:#94a3b8;--light:#f1f5f9;
    --glass:rgba(255,255,255,0.06);--glassborder:rgba(255,255,255,0.12);
  }
  html{scroll-behavior:smooth}
  body{font-family:'DM Sans',sans-serif;background:var(--navy);color:var(--white);overflow-x:hidden}
  nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:18px 6%;display:flex;align-items:center;justify-content:space-between;background:rgba(10,22,40,0.85);backdrop-filter:blur(16px);border-bottom:1px solid var(--glassborder)}
  .logo{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:900;color:var(--white)}
  .logo span{color:var(--saffron)}
  .nav-links{display:flex;gap:2rem;list-style:none}
  .nav-links a{text-decoration:none;color:var(--gray);font-size:.9rem;font-weight:500;transition:.2s}
  .nav-links a:hover{color:var(--white)}
  .nav-btns{display:flex;gap:10px}
  .btn-ghost{padding:8px 20px;border:1px solid var(--glassborder);border-radius:50px;background:transparent;color:var(--white);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:500;transition:.2s}
  .btn-ghost:hover{border-color:var(--saffron);color:var(--saffron)}
  .btn-primary{padding:8px 22px;border:none;border-radius:50px;background:var(--saffron);color:var(--white);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;transition:.2s}
  .btn-primary:hover{background:var(--saffron2);transform:translateY(-1px)}
  .hero{min-height:100vh;display:flex;align-items:center;padding:0 6%;position:relative;overflow:hidden}
  .hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 70% 50%,rgba(249,115,22,0.12) 0%,transparent 70%),radial-gradient(ellipse 50% 80% at 20% 80%,rgba(251,191,36,0.06) 0%,transparent 60%)}
  .hero-orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.15),transparent 70%);right:-100px;top:50%;transform:translateY(-50%);animation:pulse 4s ease-in-out infinite}
  @keyframes pulse{0%,100%{transform:translateY(-50%) scale(1)}50%{transform:translateY(-50%) scale(1.08)}}
  .hero-content{max-width:600px;position:relative;z-index:1;animation:fadeUp .8s ease both}
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.3);border-radius:50px;padding:6px 16px;font-size:.8rem;color:var(--saffron);font-weight:600;margin-bottom:1.5rem;letter-spacing:.5px}
  .hero-badge::before{content:'';width:7px;height:7px;background:var(--saffron);border-radius:50%;animation:blink 1.5s infinite}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
  h1{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,5vw,4.2rem);font-weight:900;line-height:1.1;margin-bottom:1.2rem}
  h1 em{font-style:normal;color:var(--saffron)}
  .hero-sub{color:var(--gray);font-size:1.1rem;line-height:1.7;margin-bottom:2rem;font-weight:300;max-width:480px}
  .hero-ctas{display:flex;gap:12px;flex-wrap:wrap}
  .btn-lg{padding:14px 32px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:600;cursor:pointer;transition:.25s}
  .btn-orange{background:var(--saffron);border:none;color:var(--white)}
  .btn-orange:hover{background:var(--saffron2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(249,115,22,0.35)}
  .btn-outline{background:transparent;border:1.5px solid var(--glassborder);color:var(--white)}
  .btn-outline:hover{border-color:var(--saffron);color:var(--saffron)}
  .hero-stats{display:flex;gap:2.5rem;margin-top:3rem;animation:fadeUp .8s .3s ease both}
  .stat-num{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;color:var(--white)}
  .stat-num span{color:var(--saffron)}
  .stat-label{font-size:.8rem;color:var(--gray);margin-top:2px}
  .hero-visual{position:absolute;right:6%;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:14px;z-index:1}
  .float-card{background:var(--glass);border:1px solid var(--glassborder);border-radius:16px;padding:16px 20px;backdrop-filter:blur(10px);min-width:220px}
  .fc-label{font-size:.7rem;color:var(--gray);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px}
  .fc-value{font-size:1.1rem;font-weight:600;color:var(--white)}
  .fc-sub{font-size:.75rem;color:var(--saffron);margin-top:3px}
  .fc-bar{height:4px;background:rgba(255,255,255,0.1);border-radius:2px;margin-top:10px;overflow:hidden}
  .fc-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--saffron),var(--gold))}
  .section{padding:90px 6%}
  .section-label{font-size:.8rem;color:var(--saffron);font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:.8rem}
  .section-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,3.5vw,2.8rem);font-weight:900;margin-bottom:1rem}
  .section-sub{color:var(--gray);font-size:1rem;max-width:500px;line-height:1.7;margin-bottom:3.5rem}
  .features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
  .feat-card{background:var(--glass);border:1px solid var(--glassborder);border-radius:20px;padding:28px;transition:.3s;cursor:default}
  .feat-card:hover{border-color:rgba(249,115,22,0.4);background:rgba(249,115,22,0.06);transform:translateY(-4px)}
  .feat-icon{width:48px;height:48px;background:rgba(249,115,22,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:1rem}
  .feat-title{font-weight:600;font-size:1.05rem;margin-bottom:.5rem}
  .feat-desc{color:var(--gray);font-size:.88rem;line-height:1.6}
  .how-section{padding:90px 6%;background:linear-gradient(180deg,var(--navy) 0%,var(--navy2) 50%,var(--navy) 100%)}
  .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0;position:relative}
  .step{text-align:center;padding:0 20px;position:relative;z-index:1}
  .step-num{width:72px;height:72px;border-radius:50%;background:var(--navy);border:2px solid var(--glassborder);display:flex;align-items:center;justify-content:center;margin:0 auto 1.2rem;font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;color:var(--saffron);transition:.3s}
  .step:hover .step-num{border-color:var(--saffron);background:rgba(249,115,22,0.1)}
  .step-title{font-weight:600;margin-bottom:.5rem}
  .step-desc{color:var(--gray);font-size:.85rem;line-height:1.6}
  .roles-section{padding:90px 6%}
  .roles-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;margin:0 auto}
  .role-card{background:var(--glass);border:1.5px solid var(--glassborder);border-radius:24px;padding:36px 28px;text-align:center;transition:.3s;cursor:pointer}
  .role-card:hover{transform:translateY(-6px)}
  .role-card.aspirant:hover{border-color:rgba(249,115,22,0.5);background:rgba(249,115,22,0.07)}
  .role-card.mentor:hover{border-color:rgba(251,191,36,0.5);background:rgba(251,191,36,0.07)}
  .role-card.admin:hover{border-color:rgba(148,163,184,0.5);background:rgba(148,163,184,0.07)}
  .role-emoji{font-size:2.5rem;margin-bottom:1rem}
  .role-title{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;margin-bottom:.6rem}
  .role-desc{color:var(--gray);font-size:.85rem;line-height:1.6;margin-bottom:1.5rem}
  .role-btn{width:100%;padding:10px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:600;cursor:pointer;border:none;transition:.2s}
  .aspirant .role-btn{background:var(--saffron);color:var(--white)}
  .aspirant .role-btn:hover{background:var(--saffron2)}
  .mentor .role-btn{background:var(--gold);color:var(--navy)}
  .mentor .role-btn:hover{filter:brightness(1.1)}
  .admin .role-btn{background:var(--glass);color:var(--white);border:1px solid var(--glassborder)}
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center;transition:.3s}
  .modal{background:var(--navy2);border:1px solid var(--glassborder);border-radius:24px;padding:40px;width:100%;max-width:420px;position:relative}
  .modal-close{position:absolute;top:16px;right:20px;background:transparent;border:none;color:var(--gray);font-size:1.4rem;cursor:pointer;line-height:1}
  .modal-close:hover{color:var(--white)}
  .modal-role-tabs{display:flex;gap:6px;margin-bottom:28px;background:rgba(255,255,255,0.04);border-radius:50px;padding:4px}
  .role-tab{flex:1;padding:8px;border-radius:50px;border:none;background:transparent;color:var(--gray);font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;cursor:pointer;transition:.2s}
  .role-tab.active{background:var(--saffron);color:var(--white);font-weight:600}
  .modal h2{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:900;margin-bottom:.3rem}
  .modal-sub{color:var(--gray);font-size:.88rem;margin-bottom:1.8rem}
  .form-group{margin-bottom:14px}
  .form-label{font-size:.8rem;font-weight:600;color:var(--gray);margin-bottom:5px;display:block;text-transform:uppercase;letter-spacing:.5px}
  .form-input{width:100%;padding:12px 16px;background:rgba(255,255,255,0.05);border:1px solid var(--glassborder);border-radius:10px;color:var(--white);font-family:'DM Sans',sans-serif;font-size:.95rem;outline:none;transition:.2s}
  .form-input:focus{border-color:var(--saffron);background:rgba(249,115,22,0.06)}
  .form-input::placeholder{color:rgba(148,163,184,0.5)}
  .form-submit{width:100%;padding:13px;border:none;border-radius:50px;background:var(--saffron);color:var(--white);font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:600;cursor:pointer;transition:.2s;margin-top:6px}
  .form-submit:hover{background:var(--saffron2);transform:translateY(-1px)}
  .form-footer{text-align:center;margin-top:16px;font-size:.85rem;color:var(--gray)}
  .form-footer a{color:var(--saffron);text-decoration:none;font-weight:500}
  .signup-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  footer{padding:40px 6%;border-top:1px solid var(--glassborder);display:flex;align-items:center;justify-content:space-between}
  .footer-logo{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:900}
  .footer-logo span{color:var(--saffron)}
  .footer-copy{color:var(--gray);font-size:.82rem}
  @media(max-width:768px){.hero-visual{display:none}.roles-grid{grid-template-columns:1fr}.nav-links{display:none}.signup-grid{grid-template-columns:1fr}}
`;

const features = [
  { icon: "💬", title: "1-on-1 Mentor Chat", desc: "Ask questions directly to verified NEET qualifiers and experienced teachers. Get answers within hours." },
  { icon: "📊", title: "Progress Tracking", desc: "Visual dashboards tracking subject-wise performance, weak areas, and improvement trends over time." },
  { icon: "📝", title: "Mock Tests & Analysis", desc: "Chapter-wise and full-length mock tests with detailed solutions and AIR estimation." },
  { icon: "🎓", title: "College Counselling", desc: "Get guidance on college selection, cutoffs, state vs central quota, and admission processes." },
  { icon: "📚", title: "Resource Library", desc: "Curated notes, PYQs, revision sheets, and video links — all organised by chapter and topic." },
  { icon: "🔔", title: "Smart Reminders", desc: "Scheduled study reminders, session alerts, and personalised revision nudges to keep you on track." },
];

const steps = [
  { num: "01", title: "Create Your Profile", desc: "Sign up as an aspirant, enter your current prep level and target year." },
  { num: "02", title: "Match with a Mentor", desc: "Browse verified mentors by subject expertise, score, and availability." },
  { num: "03", title: "Ask & Learn", desc: "Post doubts, book sessions, and get personalised guidance on weak topics." },
  { num: "04", title: "Track & Improve", desc: "Monitor your growth with analytics and adjust your strategy with mentor feedback." },
];

export default function Landing() {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const openModal = (mode, role = "Aspirant") => setModal({ mode, role });
  const closeModal = () => setModal(null);

  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", targetYear: "", neetScore: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!modal) return;
    setError("");
    setLoading(true);
    try {
      const { role, mode } = modal;
      let res;
      if (mode === "login") {
        res = await login({ email: formData.email, password: formData.password });
      } else {
        res = await signup({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
          role: role.toLowerCase(),
          targetYear: formData.targetYear,
          neetScore: formData.neetScore,
        });
      }
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        closeModal();
        if (res.user.role === "aspirant") navigate("/aspirant");
        else if (res.user.role === "mentor") {
          if (res.user.status === "pending") { setError("Your mentor account is pending admin approval."); setLoading(false); return; }
          navigate("/mentor");
        }
        else if (res.user.role === "admin") navigate("/admin");
      } else {
        setError(res.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav>
        <div className="logo">NEET<span>Connect</span></div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How it Works</a></li>
          <li><a href="#roles">Join As</a></li>
        </ul>
        <div className="nav-btns">
          <button className="btn-ghost" onClick={() => openModal("login")}>Log In</button>
          <button className="btn-primary" onClick={() => openModal("signup")}>Sign Up Free</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-orb" />
        <div className="hero-content">
          <div className="hero-badge">🎯 India's #1 NEET Guidance Platform</div>
          <h1>Crack NEET with the Right <em>Mentor</em> by Your Side</h1>
          <p className="hero-sub">Connect with verified NEET toppers and experienced counsellors. Get personalised guidance, clear your doubts, and track your progress — all in one place.</p>
          <div className="hero-ctas">
            <button className="btn-lg btn-orange" onClick={() => openModal("signup")}>Start for Free →</button>
            <button className="btn-lg btn-outline" onClick={() => document.getElementById("how").scrollIntoView({ behavior: "smooth" })}>See How It Works</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="stat-num">12<span>K+</span></div><div className="stat-label">Aspirants Guided</div></div>
            <div className="stat"><div className="stat-num">340<span>+</span></div><div className="stat-label">Expert Mentors</div></div>
            <div className="stat"><div className="stat-num">96<span>%</span></div><div className="stat-label">Success Rate</div></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="float-card">
            <div className="fc-label">Your Progress</div>
            <div className="fc-value">Biology — 78%</div>
            <div className="fc-sub">↑ 12% this week</div>
            <div className="fc-bar"><div className="fc-fill" style={{ width: "78%" }} /></div>
          </div>
          <div className="float-card">
            <div className="fc-label">Mentor Session</div>
            <div className="fc-value">Dr. Priya S.</div>
            <div className="fc-sub">Today at 5:00 PM • Organic Chemistry</div>
          </div>
          <div className="float-card">
            <div className="fc-label">Mock Test Score</div>
            <div className="fc-value">624 / 720</div>
            <div className="fc-sub">All India Rank: ~3,200</div>
            <div className="fc-bar"><div className="fc-fill" style={{ width: "86%" }} /></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-label">Why NEETConnect</div>
        <div className="section-title">Everything You Need to Succeed</div>
        <p className="section-sub">From doubt-clearing to college counselling — we've built every tool an aspirant needs.</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feat-card" key={i}>
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="section-label" style={{ textAlign: "center" }}>Simple Process</div>
          <div className="section-title">How NEETConnect Works</div>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ROLES */}
      <section className="roles-section" id="roles">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-label" style={{ textAlign: "center" }}>Choose Your Role</div>
          <div className="section-title">Join As</div>
        </div>
        <div className="roles-grid">
          <div className="role-card aspirant">
            <div className="role-emoji">📖</div>
            <div className="role-title">Aspirant</div>
            <div className="role-desc">You're preparing for NEET and want expert guidance, doubt-clearing, and a structured path to success.</div>
            <button className="role-btn" onClick={() => openModal("signup", "Aspirant")}>Join as Aspirant</button>
          </div>
          <div className="role-card mentor">
            <div className="role-emoji">🧑‍🏫</div>
            <div className="role-title">Mentor</div>
            <div className="role-desc">You're a NEET qualifier or experienced teacher who wants to guide the next generation of doctors.</div>
            <button className="role-btn" onClick={() => openModal("signup", "Mentor")}>Join as Mentor</button>
          </div>
          <div className="role-card admin">
            <div className="role-emoji">🛡️</div>
            <div className="role-title">Admin</div>
            <div className="role-desc">Platform administrator access to manage users, content, queries, and platform analytics.</div>
            <button className="role-btn" onClick={() => openModal("login", "Admin")}>Admin Login</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">NEET<span>Connect</span></div>
        <div className="footer-copy">© 2025 NEETConnect. Built for India's future doctors.</div>
      </footer>

      {/* MODAL */}
      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-role-tabs">
              {["Aspirant", "Mentor", "Admin"].map(r => (
                <button key={r} className={`role-tab${modal.role === r ? " active" : ""}`} onClick={() => setModal({ ...modal, role: r })}>{r}</button>
              ))}
            </div>
            <h2>{modal.mode === "login" ? "Welcome Back" : `Join as ${modal.role}`}</h2>
            <p className="modal-sub">{modal.mode === "login" ? `Log in to your ${modal.role} account` : `Create your free ${modal.role} account`}</p>

            {modal.mode === "signup" && (
              <div className="signup-grid">
                <div className="form-group"><label className="form-label">First Name</label><input className="form-input" type="text" name="firstName" placeholder="Aarav" value={formData.firstName} onChange={handleInput} /></div>
                <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" type="text" name="lastName" placeholder="Sharma" value={formData.lastName} onChange={handleInput} /></div>
              </div>
            )}
            {modal.mode === "signup" && modal.role === "Aspirant" && (
              <div className="form-group">
                <label className="form-label">Target Year</label>
                <select className="form-input" name="targetYear" style={{ background: "#0f2040" }} value={formData.targetYear} onChange={handleInput}>
                  <option value="">Select Year</option>
                  <option>NEET 2025</option>
                  <option>NEET 2026</option>
                  <option>NEET 2027</option>
                </select>
              </div>
            )}
            {modal.mode === "signup" && modal.role === "Mentor" && (
              <div className="form-group"><label className="form-label">NEET Score / Qualification</label><input className="form-input" type="text" name="neetScore" placeholder="e.g. 680/720 — NEET 2023" value={formData.neetScore} onChange={handleInput} /></div>
            )}
            <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleInput} /></div>
            <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleInput} /></div>
            {error && <div style={{color:"#ef4444",fontSize:".85rem",marginBottom:"8px",textAlign:"center"}}>{error}</div>}
            <button className="form-submit" onClick={handleSubmit} disabled={loading}>{loading ? "Please wait..." : modal.mode === "login" ? "Log In" : "Create Account"} {!loading && "→"}</button>
            <div className="form-footer">
              {modal.mode === "login"
                ? <>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setModal({ ...modal, mode: "signup" }); }}>Sign Up Free</a></>
                : <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setModal({ ...modal, mode: "login" }); }}>Log In</a></>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}