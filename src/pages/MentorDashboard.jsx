import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --navy:#0a1628;--navy2:#0f2040;--saffron:#f97316;--saffron2:#fb923c;
    --gold:#fbbf24;--white:#fff;--gray:#94a3b8;--glass:rgba(255,255,255,0.06);
    --glassborder:rgba(255,255,255,0.12);--green:#22c55e;--red:#ef4444;--blue:#3b82f6;
  }
  body{font-family:'DM Sans',sans-serif;background:var(--navy);color:var(--white);overflow-x:hidden}
  .dash-layout{display:flex;min-height:100vh}

  /* SIDEBAR */
  .sidebar{width:240px;background:var(--navy2);border-right:1px solid var(--glassborder);padding:24px 0;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:50}
  .sidebar-logo{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;padding:0 24px 28px;border-bottom:1px solid var(--glassborder)}
  .sidebar-logo span{color:var(--gold)}
  .sidebar-nav{flex:1;padding:20px 12px;display:flex;flex-direction:column;gap:4px}
  .nav-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:10px;cursor:pointer;color:var(--gray);font-size:.9rem;font-weight:500;transition:.2s;border:none;background:transparent;width:100%;text-align:left}
  .nav-item:hover{background:var(--glass);color:var(--white)}
  .nav-item.active{background:rgba(251,191,36,0.12);color:var(--gold);border:1px solid rgba(251,191,36,0.2)}
  .nav-icon{font-size:1.1rem;width:20px;text-align:center}
  .sidebar-bottom{padding:16px 12px;border-top:1px solid var(--glassborder)}
  .user-pill{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:var(--glass)}
  .user-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--saffron));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;color:var(--navy)}
  .user-name{font-size:.85rem;font-weight:600}
  .user-role{font-size:.72rem;color:var(--gray)}

  /* MAIN */
  .main{margin-left:240px;flex:1;padding:32px;min-height:100vh}
  .topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px}
  .page-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900}
  .page-sub{color:var(--gray);font-size:.9rem;margin-top:4px}
  .topbar-right{display:flex;align-items:center;gap:12px}
  .notif-btn{width:38px;height:38px;border-radius:50%;background:var(--glass);border:1px solid var(--glassborder);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;position:relative}
  .notif-dot{position:absolute;top:6px;right:6px;width:7px;height:7px;background:var(--saffron);border-radius:50%}

  /* STATS */
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
  .stat-card{background:var(--glass);border:1px solid var(--glassborder);border-radius:16px;padding:20px;transition:.3s}
  .stat-card:hover{transform:translateY(-2px);border-color:rgba(251,191,36,0.3)}
  .stat-label{font-size:.75rem;color:var(--gray);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px}
  .stat-value{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:900}
  .stat-value.gold{color:var(--gold)}
  .stat-value.green{color:var(--green)}
  .stat-value.blue{color:var(--blue)}
  .stat-value.orange{color:var(--saffron)}
  .stat-change{font-size:.78rem;margin-top:6px;color:var(--green)}

  /* GRID */
  .dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
  .dash-grid-3{display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:20px}
  .card{background:var(--glass);border:1px solid var(--glassborder);border-radius:16px;padding:22px;margin-bottom:20px}
  .card-title{font-weight:700;font-size:1rem;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}
  .card-title-badge{font-size:.72rem;background:rgba(249,115,22,0.15);color:var(--saffron);padding:3px 10px;border-radius:50px;font-weight:600}

  /* QUESTION ITEMS */
  .q-item{padding:16px;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid var(--glassborder);margin-bottom:12px;transition:.2s}
  .q-item:hover{border-color:rgba(251,191,36,0.25);background:rgba(251,191,36,0.04)}
  .q-item:last-child{margin-bottom:0}
  .q-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
  .q-left{display:flex;align-items:center;gap:8px}
  .q-subject{font-size:.72rem;padding:3px 10px;border-radius:50px;font-weight:600}
  .q-subject.bio{background:rgba(34,197,94,0.15);color:var(--green)}
  .q-subject.chem{background:rgba(59,130,246,0.15);color:var(--blue)}
  .q-subject.phy{background:rgba(249,115,22,0.15);color:var(--saffron)}
  .q-urgency{font-size:.7rem;padding:2px 8px;border-radius:50px;font-weight:600}
  .q-urgency.high{background:rgba(239,68,68,0.15);color:var(--red)}
  .q-urgency.normal{background:rgba(148,163,184,0.1);color:var(--gray)}
  .q-time{font-size:.75rem;color:var(--gray)}
  .q-text{font-size:.9rem;font-weight:500;margin-bottom:6px}
  .q-aspirant{font-size:.78rem;color:var(--gray);display:flex;align-items:center;gap:6px}
  .q-aspirant-avatar{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,var(--saffron),var(--gold));display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:700;color:var(--navy)}
  .q-actions{display:flex;gap:8px;margin-top:12px}
  .btn-reply{padding:7px 16px;border:none;border-radius:50px;background:var(--gold);color:var(--navy);font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:600;cursor:pointer;transition:.2s}
  .btn-reply:hover{filter:brightness(1.1)}
  .btn-skip{padding:7px 16px;border:1px solid var(--glassborder);border-radius:50px;background:transparent;color:var(--gray);font-family:'DM Sans',sans-serif;font-size:.8rem;cursor:pointer;transition:.2s}
  .btn-skip:hover{border-color:var(--gray);color:var(--white)}

  /* ASPIRANTS */
  .aspirant-item{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--glassborder)}
  .aspirant-item:last-child{border-bottom:none}
  .asp-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--navy2),var(--blue));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;flex-shrink:0}
  .asp-info{flex:1}
  .asp-name{font-size:.9rem;font-weight:600}
  .asp-meta{font-size:.75rem;color:var(--gray)}
  .asp-score{font-size:.78rem;color:var(--gold);font-weight:600}
  .asp-badge{font-size:.7rem;padding:2px 8px;border-radius:50px;font-weight:600}
  .asp-badge.active{background:rgba(34,197,94,0.15);color:var(--green)}
  .asp-badge.inactive{background:rgba(148,163,184,0.1);color:var(--gray)}

  /* REPLY MODAL */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center}
  .modal{background:var(--navy2);border:1px solid var(--glassborder);border-radius:20px;padding:32px;width:100%;max-width:520px;position:relative}
  .modal-close{position:absolute;top:14px;right:18px;background:transparent;border:none;color:var(--gray);font-size:1.4rem;cursor:pointer}
  .modal-close:hover{color:var(--white)}
  .modal-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;margin-bottom:6px}
  .modal-sub{color:var(--gray);font-size:.85rem;margin-bottom:20px}
  .q-bubble{background:rgba(255,255,255,0.04);border:1px solid var(--glassborder);border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:.88rem;line-height:1.6;color:var(--white)}
  .form-label{font-size:.78rem;font-weight:600;color:var(--gray);margin-bottom:5px;display:block;text-transform:uppercase;letter-spacing:.5px}
  .form-input{width:100%;padding:11px 14px;background:rgba(255,255,255,0.05);border:1px solid var(--glassborder);border-radius:10px;color:var(--white);font-family:'DM Sans',sans-serif;font-size:.9rem;outline:none;transition:.2s;margin-bottom:14px}
  .form-input:focus{border-color:var(--gold)}
  .form-input::placeholder{color:rgba(148,163,184,0.4)}
  textarea.form-input{resize:vertical;min-height:120px}
  .btn-submit{width:100%;padding:12px;border:none;border-radius:50px;background:var(--gold);color:var(--navy);font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:700;cursor:pointer}
  .btn-submit:hover{filter:brightness(1.1)}

  /* TABS */
  .tabs{display:flex;gap:6px;margin-bottom:20px;background:rgba(255,255,255,0.04);border-radius:50px;padding:4px;width:fit-content}
  .tab{padding:7px 18px;border-radius:50px;border:none;background:transparent;color:var(--gray);font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;cursor:pointer;transition:.2s}
  .tab.active{background:var(--gold);color:var(--navy);font-weight:600}

  /* PROFILE CARD */
  .profile-card{background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(249,115,22,0.08));border:1px solid rgba(251,191,36,0.2);border-radius:16px;padding:24px;display:flex;align-items:center;gap:20px;margin-bottom:20px}
  .profile-avatar-lg{width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--saffron));display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:900;color:var(--navy);flex-shrink:0}
  .profile-name{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900}
  .profile-spec{color:var(--gray);font-size:.88rem;margin:3px 0}
  .profile-score{color:var(--gold);font-size:.88rem;font-weight:600}
  .profile-stats{display:flex;gap:24px;margin-top:10px}
  .ps-item{text-align:center}
  .ps-val{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:900;color:var(--white)}
  .ps-label{font-size:.72rem;color:var(--gray)}

  @media(max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr)}.dash-grid,.dash-grid-3{grid-template-columns:1fr}.sidebar{display:none}.main{margin-left:0}}
`;

const navItems = [
  { icon: "🏠", label: "Dashboard", id: "dashboard" },
  { icon: "📬", label: "Pending Questions", id: "pending" },
  { icon: "✅", label: "Answered", id: "answered" },
  { icon: "👥", label: "My Aspirants", id: "aspirants" },
  { icon: "👤", label: "My Profile", id: "profile" },
];

const pendingQuestions = [
  { subject: "Biology", subClass: "bio", text: "What is the role of telomerase in cancer cells and how does it differ from normal somatic cells?", aspirant: "Aarav S.", initials: "AS", time: "2h ago", urgency: "high" },
  { subject: "Chemistry", subClass: "chem", text: "Can you explain the mechanism of SN1 vs SN2 reactions with real NEET examples?", aspirant: "Priya M.", initials: "PM", time: "4h ago", urgency: "normal" },
  { subject: "Biology", subClass: "bio", text: "Difference between C3 and C4 plants in terms of photorespiration?", aspirant: "Rohit K.", initials: "RK", time: "6h ago", urgency: "normal" },
  { subject: "Physics", subClass: "phy", text: "How to approach capacitor problems with dielectric slabs?", aspirant: "Sneha T.", initials: "ST", time: "1d ago", urgency: "normal" },
];

const answeredQuestions = [
  { subject: "Chemistry", subClass: "chem", text: "What is the difference between sigma and pi bonds in organic molecules?", aspirant: "Aarav S.", initials: "AS", time: "2d ago" },
  { subject: "Biology", subClass: "bio", text: "Explain the lac operon model with diagram.", aspirant: "Priya M.", initials: "PM", time: "3d ago" },
  { subject: "Physics", subClass: "phy", text: "What is Lenz's law and how is it applied in EMF problems?", aspirant: "Rohit K.", initials: "RK", time: "4d ago" },
];

const aspirants = [
  { name: "Aarav Sharma", initials: "AS", meta: "NEET 2026 • 3 questions", score: "Mock: 612/720", active: true },
  { name: "Priya Mehta", initials: "PM", meta: "NEET 2026 • 2 questions", score: "Mock: 588/720", active: true },
  { name: "Rohit Kumar", initials: "RK", meta: "NEET 2027 • 1 question", score: "Mock: 544/720", active: false },
  { name: "Sneha Tiwari", initials: "ST", meta: "NEET 2026 • 1 question", score: "Mock: 634/720", active: true },
];

export default function MentorDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [replyModal, setReplyModal] = useState(null);
  const [qTab, setQTab] = useState("pending");

  return (
    <>
      <style>{styles}</style>
      <div className="dash-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">NEET<span>Connect</span></div>
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <button key={item.id} className={`nav-item${activePage === item.id ? " active" : ""}`} onClick={() => setActivePage(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.id === "pending" && <span style={{ marginLeft: "auto", background: "var(--saffron)", color: "var(--white)", borderRadius: "50px", fontSize: ".7rem", padding: "1px 7px", fontWeight: 700 }}>{pendingQuestions.length}</span>}
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="user-pill">
              <div className="user-avatar">{user.name?.charAt(0) || "U"}</div>
              <div>
                <div className="user-name">{user.name || "Aspirant"}</div>
                <div className="user-role">Aspirant • NEET 2026</div>
              </div>
            </div>
            <button
              onClick={() => { localStorage.clear(); window.location.href = "/"; }}
              style={{width:"100%",marginTop:"8px",padding:"9px",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"50px",background:"transparent",color:"#ef4444",cursor:"pointer",fontSize:".85rem",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>
              🚪 Logout
            </button>
          </div>
          </aside>

        {/* MAIN */}
        <main className="main">
          <div className="topbar">
            <div>
              <div className="page-title">
                {activePage === "dashboard" && "Mentor Dashboard 🧑‍🏫"}
                {activePage === "pending" && "Pending Questions"}
                {activePage === "answered" && "Answered Questions"}
                {activePage === "aspirants" && "My Aspirants"}
                {activePage === "profile" && "My Profile"}
              </div>
              <div className="page-sub">
                {activePage === "dashboard" && "Here's an overview of your mentoring activity."}
                {activePage === "pending" && "Questions waiting for your response."}
                {activePage === "answered" && "Questions you've already responded to."}
                {activePage === "aspirants" && "Aspirants who have connected with you."}
                {activePage === "profile" && "Your public mentor profile."}
              </div>
            </div>
            <div className="topbar-right">
              <div className="notif-btn">🔔<div className="notif-dot" /></div>
            </div>
          </div>

          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Pending Questions</div>
                  <div className="stat-value orange">{pendingQuestions.length}</div>
                  <div className="stat-change" style={{ color: "var(--red)" }}>Needs your attention</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Total Answered</div>
                  <div className="stat-value green">47</div>
                  <div className="stat-change">↑ 6 this week</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Active Aspirants</div>
                  <div className="stat-value blue">{aspirants.filter(a => a.active).length}</div>
                  <div className="stat-change">of {aspirants.length} total</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg. Response Time</div>
                  <div className="stat-value gold">3.2h</div>
                  <div className="stat-change">↑ Faster than last week</div>
                </div>
              </div>

              <div className="dash-grid-3">
                <div className="card">
                  <div className="card-title">Pending Questions <span className="card-title-badge">{pendingQuestions.length} new</span></div>
                  {pendingQuestions.slice(0, 3).map((q, i) => (
                    <div className="q-item" key={i}>
                      <div className="q-top">
                        <div className="q-left">
                          <span className={`q-subject ${q.subClass}`}>{q.subject}</span>
                          <span className={`q-urgency ${q.urgency}`}>{q.urgency === "high" ? "🔴 Urgent" : "Normal"}</span>
                        </div>
                        <span className="q-time">{q.time}</span>
                      </div>
                      <div className="q-text">{q.text}</div>
                      <div className="q-aspirant">
                        <div className="q-aspirant-avatar">{q.initials}</div>
                        {q.aspirant}
                      </div>
                      <div className="q-actions">
                        <button className="btn-reply" onClick={() => setReplyModal(q)}>Reply →</button>
                        <button className="btn-skip">Skip for now</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div className="card-title">My Aspirants</div>
                  {aspirants.map((a, i) => (
                    <div className="aspirant-item" key={i}>
                      <div className="asp-avatar">{a.initials}</div>
                      <div className="asp-info">
                        <div className="asp-name">{a.name}</div>
                        <div className="asp-meta">{a.meta}</div>
                        <div className="asp-score">{a.score}</div>
                      </div>
                      <span className={`asp-badge ${a.active ? "active" : "inactive"}`}>{a.active ? "Active" : "Inactive"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* PENDING/ANSWERED QUESTIONS */}
          {(activePage === "pending" || activePage === "answered") && (
            <>
              <div className="tabs">
                <button className={`tab${qTab === "pending" ? " active" : ""}`} onClick={() => { setQTab("pending"); setActivePage("pending"); }}>Pending ({pendingQuestions.length})</button>
                <button className={`tab${qTab === "answered" ? " active" : ""}`} onClick={() => { setQTab("answered"); setActivePage("answered"); }}>Answered ({answeredQuestions.length})</button>
              </div>
              {(activePage === "pending" ? pendingQuestions : answeredQuestions).map((q, i) => (
                <div className="q-item" key={i}>
                  <div className="q-top">
                    <div className="q-left">
                      <span className={`q-subject ${q.subClass}`}>{q.subject}</span>
                      {q.urgency && <span className={`q-urgency ${q.urgency}`}>{q.urgency === "high" ? "🔴 Urgent" : "Normal"}</span>}
                    </div>
                    <span className="q-time">{q.time}</span>
                  </div>
                  <div className="q-text">{q.text}</div>
                  <div className="q-aspirant">
                    <div className="q-aspirant-avatar">{q.initials}</div>
                    {q.aspirant}
                  </div>
                  {activePage === "pending" && (
                    <div className="q-actions">
                      <button className="btn-reply" onClick={() => setReplyModal(q)}>Reply →</button>
                      <button className="btn-skip">Skip for now</button>
                    </div>
                  )}
                  {activePage === "answered" && (
                    <div style={{ marginTop: "10px", fontSize: ".78rem", color: "var(--green)" }}>✓ Answered</div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* ASPIRANTS */}
          {activePage === "aspirants" && (
            <div className="card">
              <div className="card-title">All Aspirants</div>
              {aspirants.map((a, i) => (
                <div className="aspirant-item" key={i}>
                  <div className="asp-avatar">{a.initials}</div>
                  <div className="asp-info">
                    <div className="asp-name">{a.name}</div>
                    <div className="asp-meta">{a.meta}</div>
                    <div className="asp-score">{a.score}</div>
                  </div>
                  <span className={`asp-badge ${a.active ? "active" : "inactive"}`}>{a.active ? "Active" : "Inactive"}</span>
                </div>
              ))}
            </div>
          )}

          {/* PROFILE */}
          {activePage === "profile" && (
            <>
              <div className="profile-card">
                <div className="profile-avatar-lg">PS</div>
                <div>
                  <div className="profile-name">Dr. Priya Sharma</div>
                  <div className="profile-spec">Biology & Botany Specialist</div>
                  <div className="profile-score">NEET 2021 — 698/720</div>
                  <div className="profile-stats">
                    <div className="ps-item"><div className="ps-val">47</div><div className="ps-label">Answered</div></div>
                    <div className="ps-item"><div className="ps-val">4</div><div className="ps-label">Aspirants</div></div>
                    <div className="ps-item"><div className="ps-val">3.2h</div><div className="ps-label">Avg Reply</div></div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Subjects I Teach</div>
                {["Biology", "Botany", "Zoology"].map((s, i) => (
                  <span key={i} style={{ display: "inline-block", marginRight: "8px", marginBottom: "8px", padding: "5px 14px", borderRadius: "50px", background: "rgba(34,197,94,0.12)", color: "var(--green)", fontSize: ".85rem", fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* REPLY MODAL */}
      {replyModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setReplyModal(null)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setReplyModal(null)}>×</button>
            <div className="modal-title">Reply to Question</div>
            <div className="modal-sub">Answering {replyModal.aspirant}'s doubt in {replyModal.subject}</div>
            <div className="q-bubble">{replyModal.text}</div>
            <label className="form-label">Your Answer</label>
            <textarea className="form-input" placeholder="Write a clear, detailed answer..." />
            <label className="form-label">Attach Resource Link (optional)</label>
            <input className="form-input" type="text" placeholder="https://..." />
            <button className="btn-submit" onClick={() => setReplyModal(null)}>Send Reply →</button>
          </div>
        </div>
      )}
    </>
  );
}