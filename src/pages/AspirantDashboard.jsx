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

  /* LAYOUT */
  .dash-layout{display:flex;min-height:100vh}

  /* SIDEBAR */
  .sidebar{width:240px;background:var(--navy2);border-right:1px solid var(--glassborder);padding:24px 0;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:50}
  .sidebar-logo{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;padding:0 24px 28px;border-bottom:1px solid var(--glassborder)}
  .sidebar-logo span{color:var(--saffron)}
  .sidebar-nav{flex:1;padding:20px 12px;display:flex;flex-direction:column;gap:4px}
  .nav-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:10px;cursor:pointer;color:var(--gray);font-size:.9rem;font-weight:500;transition:.2s;border:none;background:transparent;width:100%;text-align:left}
  .nav-item:hover{background:var(--glass);color:var(--white)}
  .nav-item.active{background:rgba(249,115,22,0.15);color:var(--saffron);border:1px solid rgba(249,115,22,0.2)}
  .nav-icon{font-size:1.1rem;width:20px;text-align:center}
  .sidebar-bottom{padding:16px 12px;border-top:1px solid var(--glassborder)}
  .user-pill{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:var(--glass)}
  .user-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--saffron),var(--gold));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;color:var(--navy)}
  .user-name{font-size:.85rem;font-weight:600}
  .user-role{font-size:.72rem;color:var(--gray)}

  /* MAIN */
  .main{margin-left:240px;flex:1;padding:32px;min-height:100vh}
  .page-header{margin-bottom:28px}
  .page-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900}
  .page-sub{color:var(--gray);font-size:.9rem;margin-top:4px}

  /* CARDS */
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
  .stat-card{background:var(--glass);border:1px solid var(--glassborder);border-radius:16px;padding:20px;transition:.3s}
  .stat-card:hover{border-color:rgba(249,115,22,0.3);transform:translateY(-2px)}
  .stat-card-label{font-size:.75rem;color:var(--gray);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px}
  .stat-card-value{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:900}
  .stat-card-value.orange{color:var(--saffron)}
  .stat-card-value.green{color:var(--green)}
  .stat-card-value.gold{color:var(--gold)}
  .stat-card-value.blue{color:var(--blue)}
  .stat-card-change{font-size:.78rem;margin-top:6px}
  .stat-card-change.up{color:var(--green)}
  .stat-card-change.down{color:var(--red)}

  /* GRID LAYOUT */
  .dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
  .dash-grid-3{display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:20px}
  .card{background:var(--glass);border:1px solid var(--glassborder);border-radius:16px;padding:22px}
  .card-title{font-weight:700;font-size:1rem;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}
  .card-title span{font-size:.78rem;color:var(--saffron);font-weight:500;cursor:pointer}

  /* PROGRESS BARS */
  .subject-row{margin-bottom:14px}
  .subject-top{display:flex;justify-content:space-between;margin-bottom:6px;font-size:.85rem}
  .subject-name{font-weight:500}
  .subject-pct{color:var(--gray)}
  .progress-bar{height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden}
  .progress-fill{height:100%;border-radius:3px;transition:width .6s ease}
  .fill-green{background:linear-gradient(90deg,#22c55e,#4ade80)}
  .fill-orange{background:linear-gradient(90deg,var(--saffron),var(--gold))}
  .fill-blue{background:linear-gradient(90deg,#3b82f6,#60a5fa)}
  .fill-red{background:linear-gradient(90deg,#ef4444,#f87171)}

  /* QUESTIONS */
  .question-item{padding:14px 0;border-bottom:1px solid var(--glassborder)}
  .question-item:last-child{border-bottom:none}
  .q-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
  .q-subject{font-size:.72rem;padding:3px 10px;border-radius:50px;font-weight:600}
  .q-subject.bio{background:rgba(34,197,94,0.15);color:var(--green)}
  .q-subject.chem{background:rgba(59,130,246,0.15);color:var(--blue)}
  .q-subject.phy{background:rgba(249,115,22,0.15);color:var(--saffron)}
  .q-status{font-size:.72rem;color:var(--gray)}
  .q-status.answered{color:var(--green)}
  .q-text{font-size:.88rem;color:var(--white);margin-bottom:4px;font-weight:500}
  .q-meta{font-size:.75rem;color:var(--gray)}

  /* MENTORS */
  .mentor-item{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--glassborder)}
  .mentor-item:last-child{border-bottom:none}
  .mentor-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--navy2),var(--saffron));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
  .mentor-info{flex:1}
  .mentor-name{font-size:.9rem;font-weight:600}
  .mentor-spec{font-size:.75rem;color:var(--gray)}
  .mentor-score{font-size:.75rem;color:var(--gold);font-weight:600}
  .btn-ask{padding:6px 14px;border:1px solid var(--saffron);border-radius:50px;background:transparent;color:var(--saffron);font-size:.78rem;font-weight:600;cursor:pointer;transition:.2s;font-family:'DM Sans',sans-serif}
  .btn-ask:hover{background:var(--saffron);color:var(--white)}

  /* MOCK TESTS */
  .test-item{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--glassborder)}
  .test-item:last-child{border-bottom:none}
  .test-name{font-size:.88rem;font-weight:500}
  .test-date{font-size:.75rem;color:var(--gray);margin-top:2px}
  .test-score{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:900;color:var(--saffron)}
  .test-rank{font-size:.72rem;color:var(--gray);text-align:right}

  /* ASK MODAL */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center}
  .modal{background:var(--navy2);border:1px solid var(--glassborder);border-radius:20px;padding:32px;width:100%;max-width:480px;position:relative}
  .modal-close{position:absolute;top:14px;right:18px;background:transparent;border:none;color:var(--gray);font-size:1.4rem;cursor:pointer}
  .modal-close:hover{color:var(--white)}
  .modal-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;margin-bottom:6px}
  .modal-sub{color:var(--gray);font-size:.85rem;margin-bottom:20px}
  .form-group{margin-bottom:14px}
  .form-label{font-size:.78rem;font-weight:600;color:var(--gray);margin-bottom:5px;display:block;text-transform:uppercase;letter-spacing:.5px}
  .form-input{width:100%;padding:11px 14px;background:rgba(255,255,255,0.05);border:1px solid var(--glassborder);border-radius:10px;color:var(--white);font-family:'DM Sans',sans-serif;font-size:.9rem;outline:none;transition:.2s}
  .form-input:focus{border-color:var(--saffron)}
  .form-input::placeholder{color:rgba(148,163,184,0.4)}
  textarea.form-input{resize:vertical;min-height:100px}
  .btn-submit{width:100%;padding:12px;border:none;border-radius:50px;background:var(--saffron);color:var(--white);font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:600;cursor:pointer;margin-top:4px}
  .btn-submit:hover{background:var(--saffron2)}

  /* TABS */
  .tabs{display:flex;gap:6px;margin-bottom:20px;background:rgba(255,255,255,0.04);border-radius:50px;padding:4px;width:fit-content}
  .tab{padding:7px 18px;border-radius:50px;border:none;background:transparent;color:var(--gray);font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;cursor:pointer;transition:.2s}
  .tab.active{background:var(--saffron);color:var(--white);font-weight:600}

  /* TOPBAR */
  .topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px}
  .topbar-right{display:flex;align-items:center;gap:12px}
  .notif-btn{width:38px;height:38px;border-radius:50%;background:var(--glass);border:1px solid var(--glassborder);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;position:relative}
  .notif-dot{position:absolute;top:6px;right:6px;width:7px;height:7px;background:var(--saffron);border-radius:50%}
  .btn-new-q{padding:8px 18px;border:none;border-radius:50px;background:var(--saffron);color:var(--white);font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;cursor:pointer}
  .btn-new-q:hover{background:var(--saffron2)}

  @media(max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr)}.dash-grid,.dash-grid-3{grid-template-columns:1fr}.sidebar{display:none}.main{margin-left:0}}
`;

const navItems = [
  { icon: "🏠", label: "Dashboard", id: "dashboard" },
  { icon: "💬", label: "My Questions", id: "questions" },
  { icon: "🧑‍🏫", label: "Mentors", id: "mentors" },
  { icon: "📝", label: "Mock Tests", id: "tests" },
  { icon: "📚", label: "Resources", id: "resources" },
  { icon: "📊", label: "Progress", id: "progress" },
];

const subjects = [
  { name: "Biology", pct: 78, fill: "fill-green" },
  { name: "Chemistry", pct: 61, fill: "fill-blue" },
  { name: "Physics", pct: 54, fill: "fill-orange" },
  { name: "Botany", pct: 43, fill: "fill-red" },
];

const questions = [
  { subject: "Biology", subClass: "bio", text: "What is the role of telomerase in cancer cells?", mentor: "Dr. Priya S.", time: "2h ago", answered: true },
  { subject: "Chemistry", subClass: "chem", text: "Explain SN1 vs SN2 reaction mechanisms with examples.", mentor: "Prof. Arjun K.", time: "5h ago", answered: true },
  { subject: "Physics", subClass: "phy", text: "How does capacitance change in series vs parallel?", mentor: null, time: "1d ago", answered: false },
  { subject: "Biology", subClass: "bio", text: "Difference between mitosis and meiosis in germ cells?", mentor: "Dr. Priya S.", time: "2d ago", answered: true },
];

const mentors = [
  { name: "Dr. Priya S.", spec: "Biology & Botany", score: "NEET 2021 — 698/720", initials: "PS" },
  { name: "Prof. Arjun K.", spec: "Organic Chemistry", score: "NEET 2020 — 685/720", initials: "AK" },
  { name: "Ms. Neha R.", spec: "Physics", score: "NEET 2022 — 672/720", initials: "NR" },
  { name: "Dr. Rohit M.", spec: "Zoology & Biology", score: "NEET 2019 — 710/720", initials: "RM" },
];

const tests = [
  { name: "Full Mock Test #4", date: "May 15, 2025", score: "624/720", rank: "~3,200 AIR" },
  { name: "Chemistry Chapter Test", date: "May 10, 2025", score: "88/120", rank: "—" },
  { name: "Full Mock Test #3", date: "May 3, 2025", score: "598/720", rank: "~5,800 AIR" },
  { name: "Biology PYQ Test", date: "Apr 27, 2025", score: "102/120", rank: "—" },
];

export default function AspirantDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [askModal, setAskModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [qTab, setQTab] = useState("all");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const openAsk = (mentor = null) => { setSelectedMentor(mentor); setAskModal(true); };

  const filteredQ = qTab === "all" ? questions : qTab === "answered" ? questions.filter(q => q.answered) : questions.filter(q => !q.answered);

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
                {activePage === "dashboard" && `Welcome back, ${user.name?.split(" ")[0] || "Aspirant"} 👋`}
                {activePage === "questions" && "My Questions"}
                {activePage === "mentors" && "Find a Mentor"}
                {activePage === "tests" && "Mock Tests"}
                {activePage === "resources" && "Resource Library"}
                {activePage === "progress" && "My Progress"}
              </div>
              <div className="page-sub">
                {activePage === "dashboard" && "Here's your NEET prep summary for today."}
                {activePage === "questions" && "Track all your doubts and mentor responses."}
                {activePage === "mentors" && "Connect with verified NEET qualifiers and teachers."}
                {activePage === "tests" && "Review your mock test performance."}
                {activePage === "resources" && "Curated notes, PYQs, and revision material."}
                {activePage === "progress" && "Subject-wise performance and improvement trends."}
              </div>
            </div>
            <div className="topbar-right">
              <div className="notif-btn">🔔<div className="notif-dot"/></div>
              <button className="btn-new-q" onClick={() => openAsk()}>+ Ask a Mentor</button>
            </div>
          </div>

          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-label">Latest Mock Score</div>
                  <div className="stat-card-value orange">624<span style={{fontSize:"1rem"}}>/720</span></div>
                  <div className="stat-card-change up">↑ 26 pts from last test</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-label">Questions Asked</div>
                  <div className="stat-card-value blue">18</div>
                  <div className="stat-card-change up">3 pending reply</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-label">Study Streak</div>
                  <div className="stat-card-value green">12<span style={{fontSize:"1rem"}}> days</span></div>
                  <div className="stat-card-change up">↑ Keep it up!</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-label">Est. AIR</div>
                  <div className="stat-card-value gold">~3.2K</div>
                  <div className="stat-card-change up">↑ Improved by 2,600</div>
                </div>
              </div>

              <div className="dash-grid-3">
                <div className="card">
                  <div className="card-title">Subject Progress <span onClick={() => setActivePage("progress")}>View All →</span></div>
                  {subjects.map((s, i) => (
                    <div className="subject-row" key={i}>
                      <div className="subject-top"><span className="subject-name">{s.name}</span><span className="subject-pct">{s.pct}%</span></div>
                      <div className="progress-bar"><div className={`progress-fill ${s.fill}`} style={{ width: `${s.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div className="card-title">Recent Questions <span onClick={() => setActivePage("questions")}>View All →</span></div>
                  {questions.slice(0, 3).map((q, i) => (
                    <div className="question-item" key={i}>
                      <div className="q-top">
                        <span className={`q-subject ${q.subClass}`}>{q.subject}</span>
                        <span className={`q-status${q.answered ? " answered" : ""}`}>{q.answered ? "✓ Answered" : "Pending"}</span>
                      </div>
                      <div className="q-text">{q.text}</div>
                      <div className="q-meta">{q.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dash-grid">
                <div className="card">
                  <div className="card-title">Your Mentors <span onClick={() => setActivePage("mentors")}>View All →</span></div>
                  {mentors.slice(0, 3).map((m, i) => (
                    <div className="mentor-item" key={i}>
                      <div className="mentor-avatar">{m.initials}</div>
                      <div className="mentor-info">
                        <div className="mentor-name">{m.name}</div>
                        <div className="mentor-spec">{m.spec}</div>
                        <div className="mentor-score">{m.score}</div>
                      </div>
                      <button className="btn-ask" onClick={() => openAsk(m)}>Ask</button>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div className="card-title">Mock Test History <span onClick={() => setActivePage("tests")}>View All →</span></div>
                  {tests.slice(0, 3).map((t, i) => (
                    <div className="test-item" key={i}>
                      <div>
                        <div className="test-name">{t.name}</div>
                        <div className="test-date">{t.date}</div>
                      </div>
                      <div>
                        <div className="test-score">{t.score}</div>
                        <div className="test-rank">{t.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* QUESTIONS PAGE */}
          {activePage === "questions" && (
            <div className="card">
              <div className="tabs">
                {["all", "answered", "pending"].map(t => (
                  <button key={t} className={`tab${qTab === t ? " active" : ""}`} onClick={() => setQTab(t)}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              {filteredQ.map((q, i) => (
                <div className="question-item" key={i}>
                  <div className="q-top">
                    <span className={`q-subject ${q.subClass}`}>{q.subject}</span>
                    <span className={`q-status${q.answered ? " answered" : ""}`}>{q.answered ? "✓ Answered" : "⏳ Pending"}</span>
                  </div>
                  <div className="q-text">{q.text}</div>
                  <div className="q-meta">{q.answered ? `Answered by ${q.mentor}` : "Awaiting mentor reply"} • {q.time}</div>
                </div>
              ))}
            </div>
          )}

          {/* MENTORS PAGE */}
          {activePage === "mentors" && (
            <div className="card">
              {mentors.map((m, i) => (
                <div className="mentor-item" key={i}>
                  <div className="mentor-avatar">{m.initials}</div>
                  <div className="mentor-info">
                    <div className="mentor-name">{m.name}</div>
                    <div className="mentor-spec">{m.spec}</div>
                    <div className="mentor-score">{m.score}</div>
                  </div>
                  <button className="btn-ask" onClick={() => openAsk(m)}>Ask Question</button>
                </div>
              ))}
            </div>
          )}

          {/* TESTS PAGE */}
          {activePage === "tests" && (
            <div className="card">
              <div className="card-title">All Mock Tests</div>
              {tests.map((t, i) => (
                <div className="test-item" key={i}>
                  <div>
                    <div className="test-name">{t.name}</div>
                    <div className="test-date">{t.date}</div>
                  </div>
                  <div>
                    <div className="test-score">{t.score}</div>
                    <div className="test-rank">{t.rank}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROGRESS PAGE */}
          {activePage === "progress" && (
            <div className="card">
              <div className="card-title">Subject-wise Progress</div>
              {subjects.map((s, i) => (
                <div className="subject-row" key={i} style={{ marginBottom: "22px" }}>
                  <div className="subject-top"><span className="subject-name" style={{ fontSize: "1rem" }}>{s.name}</span><span className="subject-pct" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--white)" }}>{s.pct}%</span></div>
                  <div className="progress-bar" style={{ height: "10px" }}><div className={`progress-fill ${s.fill}`} style={{ width: `${s.pct}%` }} /></div>
                </div>
              ))}
            </div>
          )}

          {/* RESOURCES PAGE */}
          {activePage === "resources" && (
            <div className="card">
              <div className="card-title">Resource Library</div>
              {[
                { title: "NCERT Biology Ch 1-10 Notes", type: "PDF", subject: "bio" },
                { title: "Organic Chemistry Reaction Map", type: "PDF", subject: "chem" },
                { title: "Physics Formula Sheet", type: "PDF", subject: "phy" },
                { title: "NEET 2024 PYQs — Biology", type: "PDF", subject: "bio" },
                { title: "Inorganic Chemistry Quick Revision", type: "PDF", subject: "chem" },
              ].map((r, i) => (
                <div className="question-item" key={i}>
                  <div className="q-top">
                    <span className={`q-subject ${r.subject}`}>{r.subject === "bio" ? "Biology" : r.subject === "chem" ? "Chemistry" : "Physics"}</span>
                    <span style={{ fontSize: ".72rem", color: "var(--gray)" }}>{r.type}</span>
                  </div>
                  <div className="q-text">{r.title}</div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ASK MODAL */}
      {askModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setAskModal(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setAskModal(false)}>×</button>
            <div className="modal-title">Ask a Question</div>
            <div className="modal-sub">{selectedMentor ? `Asking ${selectedMentor.name}` : "Your question will be sent to available mentors"}</div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <select className="form-input" style={{ background: "#0f2040" }}>
                <option>Biology</option>
                <option>Chemistry</option>
                <option>Physics</option>
                <option>Botany</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Your Question</label>
              <textarea className="form-input" placeholder="Type your doubt clearly..." />
            </div>
            <button className="btn-submit">Submit Question →</button>
          </div>
        </div>
      )}
    </>
  );
}