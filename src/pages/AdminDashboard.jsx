import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --navy:#0a1628;--navy2:#0f2040;--saffron:#f97316;--saffron2:#fb923c;
    --gold:#fbbf24;--white:#fff;--gray:#94a3b8;--glass:rgba(255,255,255,0.06);
    --glassborder:rgba(255,255,255,0.12);--green:#22c55e;--red:#ef4444;--blue:#3b82f6;--purple:#a855f7;
  }
  body{font-family:'DM Sans',sans-serif;background:var(--navy);color:var(--white);overflow-x:hidden}
  .dash-layout{display:flex;min-height:100vh}

  /* SIDEBAR */
  .sidebar{width:240px;background:var(--navy2);border-right:1px solid var(--glassborder);padding:24px 0;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:50}
  .sidebar-logo{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;padding:0 24px 28px;border-bottom:1px solid var(--glassborder)}
  .sidebar-logo span{color:var(--purple)}
  .sidebar-section{padding:12px 24px 6px;font-size:.7rem;color:var(--gray);text-transform:uppercase;letter-spacing:1px;font-weight:600}
  .sidebar-nav{flex:1;padding:8px 12px;display:flex;flex-direction:column;gap:4px;overflow-y:auto}
  .nav-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:10px;cursor:pointer;color:var(--gray);font-size:.9rem;font-weight:500;transition:.2s;border:none;background:transparent;width:100%;text-align:left}
  .nav-item:hover{background:var(--glass);color:var(--white)}
  .nav-item.active{background:rgba(168,85,247,0.12);color:var(--purple);border:1px solid rgba(168,85,247,0.2)}
  .nav-icon{font-size:1.1rem;width:20px;text-align:center}
  .sidebar-bottom{padding:16px 12px;border-top:1px solid var(--glassborder)}
  .user-pill{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:var(--glass)}
  .user-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--blue));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;color:var(--white)}
  .user-name{font-size:.85rem;font-weight:600}
  .user-role{font-size:.72rem;color:var(--purple)}

  /* MAIN */
  .main{margin-left:240px;flex:1;padding:32px;min-height:100vh}
  .topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px}
  .page-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900}
  .page-sub{color:var(--gray);font-size:.9rem;margin-top:4px}
  .topbar-right{display:flex;align-items:center;gap:12px}
  .notif-btn{width:38px;height:38px;border-radius:50%;background:var(--glass);border:1px solid var(--glassborder);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;position:relative}
  .notif-dot{position:absolute;top:6px;right:6px;width:7px;height:7px;background:var(--red);border-radius:50%}
  .admin-badge{padding:6px 14px;border-radius:50px;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.3);color:var(--purple);font-size:.78rem;font-weight:600}

  /* STATS */
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
  .stat-card{background:var(--glass);border:1px solid var(--glassborder);border-radius:16px;padding:20px;transition:.3s;position:relative;overflow:hidden}
  .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
  .stat-card.purple::before{background:var(--purple)}
  .stat-card.green::before{background:var(--green)}
  .stat-card.orange::before{background:var(--saffron)}
  .stat-card.blue::before{background:var(--blue)}
  .stat-card:hover{transform:translateY(-2px)}
  .stat-label{font-size:.75rem;color:var(--gray);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px}
  .stat-value{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900}
  .stat-value.purple{color:var(--purple)}
  .stat-value.green{color:var(--green)}
  .stat-value.orange{color:var(--saffron)}
  .stat-value.blue{color:var(--blue)}
  .stat-change{font-size:.78rem;margin-top:6px;color:var(--green)}

  /* GRID */
  .dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
  .dash-grid-3{display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:20px}
  .card{background:var(--glass);border:1px solid var(--glassborder);border-radius:16px;padding:22px;margin-bottom:20px}
  .card-title{font-weight:700;font-size:1rem;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}
  .card-action{font-size:.78rem;color:var(--purple);font-weight:500;cursor:pointer}

  /* TABLE */
  .table{width:100%;border-collapse:collapse}
  .table th{font-size:.75rem;color:var(--gray);text-transform:uppercase;letter-spacing:.8px;padding:8px 12px;text-align:left;border-bottom:1px solid var(--glassborder)}
  .table td{padding:12px;font-size:.88rem;border-bottom:1px solid rgba(255,255,255,0.05)}
  .table tr:last-child td{border-bottom:none}
  .table tr:hover td{background:rgba(255,255,255,0.02)}
  .badge{font-size:.7rem;padding:3px 10px;border-radius:50px;font-weight:600;display:inline-block}
  .badge.active{background:rgba(34,197,94,0.15);color:var(--green)}
  .badge.pending{background:rgba(249,115,22,0.15);color:var(--saffron)}
  .badge.banned{background:rgba(239,68,68,0.15);color:var(--red)}
  .badge.mentor{background:rgba(251,191,36,0.15);color:var(--gold)}
  .badge.aspirant{background:rgba(59,130,246,0.15);color:var(--blue)}
  .badge.admin{background:rgba(168,85,247,0.15);color:var(--purple)}
  .badge.resolved{background:rgba(34,197,94,0.15);color:var(--green)}
  .badge.open{background:rgba(249,115,22,0.15);color:var(--saffron)}

  /* ACTION BTNS */
  .btn-sm{padding:4px 12px;border-radius:50px;font-size:.75rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;border:none;transition:.2s}
  .btn-approve{background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.3)}
  .btn-approve:hover{background:var(--green);color:var(--white)}
  .btn-ban{background:rgba(239,68,68,0.1);color:var(--red);border:1px solid rgba(239,68,68,0.2)}
  .btn-ban:hover{background:var(--red);color:var(--white)}
  .btn-view{background:var(--glass);color:var(--gray);border:1px solid var(--glassborder)}
  .btn-view:hover{color:var(--white)}
  .btn-delete{background:rgba(239,68,68,0.1);color:var(--red);border:1px solid rgba(239,68,68,0.2)}
  .btn-delete:hover{background:var(--red);color:var(--white)}

  /* SEARCH */
  .search-bar{display:flex;gap:10px;margin-bottom:16px}
  .search-input{flex:1;padding:10px 16px;background:rgba(255,255,255,0.05);border:1px solid var(--glassborder);border-radius:10px;color:var(--white);font-family:'DM Sans',sans-serif;font-size:.9rem;outline:none}
  .search-input:focus{border-color:var(--purple)}
  .search-input::placeholder{color:rgba(148,163,184,0.4)}
  .filter-btn{padding:10px 16px;background:var(--glass);border:1px solid var(--glassborder);border-radius:10px;color:var(--gray);font-family:'DM Sans',sans-serif;font-size:.85rem;cursor:pointer}

  /* ACTIVITY */
  .activity-item{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--glassborder)}
  .activity-item:last-child{border-bottom:none}
  .act-icon{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0}
  .act-icon.join{background:rgba(34,197,94,0.15)}
  .act-icon.question{background:rgba(59,130,246,0.15)}
  .act-icon.answer{background:rgba(251,191,36,0.15)}
  .act-icon.report{background:rgba(239,68,68,0.15)}
  .act-text{font-size:.85rem;line-height:1.5}
  .act-time{font-size:.75rem;color:var(--gray);margin-top:2px}

  /* CHART BARS */
  .chart-bars{display:flex;align-items:flex-end;gap:8px;height:100px;margin-top:8px}
  .bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px}
  .bar{width:100%;border-radius:4px 4px 0 0;background:linear-gradient(180deg,var(--purple),rgba(168,85,247,0.3));transition:.6s}
  .bar-label{font-size:.68rem;color:var(--gray)}

  /* TABS */
  .tabs{display:flex;gap:6px;margin-bottom:20px;background:rgba(255,255,255,0.04);border-radius:50px;padding:4px;width:fit-content}
  .tab{padding:7px 18px;border-radius:50px;border:none;background:transparent;color:var(--gray);font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;cursor:pointer;transition:.2s}
  .tab.active{background:var(--purple);color:var(--white);font-weight:600}

  /* MODAL */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center}
  .modal{background:var(--navy2);border:1px solid var(--glassborder);border-radius:20px;padding:32px;width:100%;max-width:440px;position:relative}
  .modal-close{position:absolute;top:14px;right:18px;background:transparent;border:none;color:var(--gray);font-size:1.4rem;cursor:pointer}
  .modal-close:hover{color:var(--white)}
  .modal-title{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:900;margin-bottom:6px}
  .modal-sub{color:var(--gray);font-size:.85rem;margin-bottom:20px}
  .form-group{margin-bottom:14px}
  .form-label{font-size:.78rem;font-weight:600;color:var(--gray);margin-bottom:5px;display:block;text-transform:uppercase;letter-spacing:.5px}
  .form-input{width:100%;padding:11px 14px;background:rgba(255,255,255,0.05);border:1px solid var(--glassborder);border-radius:10px;color:var(--white);font-family:'DM Sans',sans-serif;font-size:.9rem;outline:none;transition:.2s}
  .form-input:focus{border-color:var(--purple)}
  .form-input::placeholder{color:rgba(148,163,184,0.4)}
  .btn-submit{width:100%;padding:12px;border:none;border-radius:50px;background:var(--purple);color:var(--white);font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;margin-top:4px}
  .btn-submit:hover{filter:brightness(1.15)}

  /* OVERVIEW NUMBERS */
  .overview-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:12px}
  .ov-item{background:rgba(255,255,255,0.03);border:1px solid var(--glassborder);border-radius:10px;padding:14px;text-align:center}
  .ov-val{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900}
  .ov-label{font-size:.72rem;color:var(--gray);margin-top:2px}

  @media(max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr)}.dash-grid,.dash-grid-3{grid-template-columns:1fr}.sidebar{display:none}.main{margin-left:0}}
`;

const navGroups = [
  { section: "Overview", items: [{ icon: "🏠", label: "Dashboard", id: "dashboard" }] },
  { section: "Users", items: [{ icon: "👥", label: "All Users", id: "users" }, { icon: "🧑‍🏫", label: "Mentors", id: "mentors" }, { icon: "📖", label: "Aspirants", id: "aspirants" }] },
  { section: "Content", items: [{ icon: "💬", label: "All Questions", id: "questions" }, { icon: "📚", label: "Resources", id: "resources" }] },
  { section: "System", items: [{ icon: "⚙️", label: "Settings", id: "settings" }] },
];

const users = [
  { name: "Aarav Sharma", email: "aarav@gmail.com", role: "aspirant", status: "active", joined: "May 10, 2025" },
  { name: "Dr. Priya S.", email: "priya@gmail.com", role: "mentor", status: "active", joined: "Apr 22, 2025" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "aspirant", status: "active", joined: "May 1, 2025" },
  { name: "Prof. Arjun K.", email: "arjun@gmail.com", role: "mentor", status: "pending", joined: "May 14, 2025" },
  { name: "Sneha Tiwari", email: "sneha@gmail.com", role: "aspirant", status: "active", joined: "Apr 30, 2025" },
  { name: "Ms. Neha R.", email: "neha@gmail.com", role: "mentor", status: "active", joined: "Mar 15, 2025" },
  { name: "Karan Verma", email: "karan@gmail.com", role: "aspirant", status: "banned", joined: "May 5, 2025" },
];

const questions = [
  { subject: "Biology", text: "Role of telomerase in cancer cells?", aspirant: "Aarav S.", mentor: "Dr. Priya S.", status: "resolved" },
  { subject: "Chemistry", text: "SN1 vs SN2 reaction mechanisms?", aspirant: "Priya M.", mentor: "Prof. Arjun K.", status: "open" },
  { subject: "Physics", text: "Capacitor problems with dielectric slabs?", aspirant: "Sneha T.", mentor: "—", status: "open" },
  { subject: "Biology", text: "C3 and C4 plants photorespiration?", aspirant: "Rohit K.", mentor: "Dr. Priya S.", status: "resolved" },
];

const activity = [
  { type: "join", icon: "👤", text: "Prof. Arjun K. registered as a Mentor — pending approval", time: "10 min ago" },
  { type: "question", icon: "💬", text: "Aarav Sharma posted a new question in Biology", time: "1h ago" },
  { type: "answer", icon: "✅", text: "Dr. Priya S. answered Rohit Kumar's question", time: "3h ago" },
  { type: "report", icon: "🚨", text: "Question flagged for inappropriate content by Sneha T.", time: "5h ago" },
  { type: "join", icon: "👤", text: "Sneha Tiwari joined as an Aspirant", time: "6h ago" },
];

const barData = [
  { label: "Mon", h: 40 }, { label: "Tue", h: 65 }, { label: "Wed", h: 55 },
  { label: "Thu", h: 80 }, { label: "Fri", h: 70 }, { label: "Sat", h: 45 }, { label: "Sun", h: 30 },
];

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [userTab, setUserTab] = useState("all");
  const [addModal, setAddModal] = useState(false);

  const filteredUsers = userTab === "all" ? users : users.filter(u => u.role === userTab || u.status === userTab);

  return (
    <>
      <style>{styles}</style>
      <div className="dash-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">NEET<span>Admin</span></div>
          <nav className="sidebar-nav">
            {navGroups.map((group, gi) => (
              <div key={gi}>
                <div className="sidebar-section">{group.section}</div>
                {group.items.map(item => (
                  <button key={item.id} className={`nav-item${activePage === item.id ? " active" : ""}`} onClick={() => setActivePage(item.id)}>
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                    {item.id === "mentors" && <span style={{ marginLeft: "auto", background: "rgba(249,115,22,0.2)", color: "var(--saffron)", borderRadius: "50px", fontSize: ".68rem", padding: "1px 7px", fontWeight: 700 }}>1</span>}
                  </button>
                ))}
              </div>
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
                {activePage === "dashboard" && "Admin Dashboard 🛡️"}
                {activePage === "users" && "All Users"}
                {activePage === "mentors" && "Mentor Management"}
                {activePage === "aspirants" && "Aspirant Management"}
                {activePage === "questions" && "All Questions"}
                {activePage === "resources" && "Resource Management"}
                {activePage === "settings" && "Settings"}
              </div>
              <div className="page-sub">
                {activePage === "dashboard" && "Platform overview and recent activity."}
                {activePage === "users" && "Manage all users across the platform."}
                {activePage === "mentors" && "Approve, manage, and monitor mentors."}
                {activePage === "aspirants" && "View and manage aspirant accounts."}
                {activePage === "questions" && "Monitor all questions and answers."}
                {activePage === "resources" && "Manage uploaded study resources."}
                {activePage === "settings" && "Platform configuration and settings."}
              </div>
            </div>
            <div className="topbar-right">
              <span className="admin-badge">🛡️ Super Admin</span>
              <div className="notif-btn">🔔<div className="notif-dot" /></div>
            </div>
          </div>

          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <>
              <div className="stats-grid">
                <div className="stat-card purple">
                  <div className="stat-label">Total Users</div>
                  <div className="stat-value purple">1,284</div>
                  <div className="stat-change">↑ 48 this week</div>
                </div>
                <div className="stat-card green">
                  <div className="stat-label">Active Mentors</div>
                  <div className="stat-value green">87</div>
                  <div className="stat-change">↑ 3 pending approval</div>
                </div>
                <div className="stat-card orange">
                  <div className="stat-label">Questions Today</div>
                  <div className="stat-value orange">143</div>
                  <div className="stat-change">↑ 12% from yesterday</div>
                </div>
                <div className="stat-card blue">
                  <div className="stat-label">Answers Given</div>
                  <div className="stat-value blue">4.7K</div>
                  <div className="stat-change">↑ 94% response rate</div>
                </div>
              </div>

              <div className="dash-grid-3">
                <div className="card">
                  <div className="card-title">Weekly Activity <span className="card-action">Export →</span></div>
                  <div className="overview-grid">
                    <div className="ov-item"><div className="ov-val" style={{ color: "var(--purple)" }}>284</div><div className="ov-label">New Users</div></div>
                    <div className="ov-item"><div className="ov-val" style={{ color: "var(--blue)" }}>1.2K</div><div className="ov-label">Questions</div></div>
                    <div className="ov-item"><div className="ov-val" style={{ color: "var(--green)" }}>1.1K</div><div className="ov-label">Answers</div></div>
                  </div>
                  <div className="chart-bars">
                    {barData.map((b, i) => (
                      <div className="bar-col" key={i}>
                        <div className="bar" style={{ height: `${b.h}%` }} />
                        <div className="bar-label">{b.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <div className="card-title">Recent Activity</div>
                  {activity.slice(0, 4).map((a, i) => (
                    <div className="activity-item" key={i}>
                      <div className={`act-icon ${a.type}`}>{a.icon}</div>
                      <div>
                        <div className="act-text">{a.text}</div>
                        <div className="act-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-title">Pending Mentor Approvals <span className="card-action" onClick={() => setActivePage("mentors")}>View All →</span></div>
                <table className="table">
                  <thead><tr><th>Name</th><th>Email</th><th>Applied</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {users.filter(u => u.role === "mentor" && u.status === "pending").map((u, i) => (
                      <tr key={i}>
                        <td>{u.name}</td>
                        <td style={{ color: "var(--gray)" }}>{u.email}</td>
                        <td style={{ color: "var(--gray)" }}>{u.joined}</td>
                        <td><span className="badge pending">Pending</span></td>
                        <td><div style={{ display: "flex", gap: "6px" }}>
                          <button className="btn-sm btn-approve">✓ Approve</button>
                          <button className="btn-sm btn-ban">✕ Reject</button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* USERS */}
          {(activePage === "users" || activePage === "mentors" || activePage === "aspirants") && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div className="tabs">
                  {["all", "mentor", "aspirant", "banned"].map(t => (
                    <button key={t} className={`tab${userTab === t ? " active" : ""}`} onClick={() => setUserTab(t)}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
                <button className="btn-sm btn-approve" style={{ padding: "8px 16px", fontSize: ".85rem" }} onClick={() => setAddModal(true)}>+ Add User</button>
              </div>
              <div className="search-bar">
                <input className="search-input" placeholder="Search by name or email..." />
                <button className="filter-btn">Filter ▾</button>
              </div>
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="table">
                  <thead><tr><th style={{ paddingLeft: "22px" }}>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
                  <tbody>
                    {(activePage === "mentors" ? users.filter(u => u.role === "mentor") :
                      activePage === "aspirants" ? users.filter(u => u.role === "aspirant") :
                      filteredUsers).map((u, i) => (
                      <tr key={i}>
                        <td style={{ paddingLeft: "22px", fontWeight: 500 }}>{u.name}</td>
                        <td style={{ color: "var(--gray)" }}>{u.email}</td>
                        <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                        <td><span className={`badge ${u.status}`}>{u.status}</span></td>
                        <td style={{ color: "var(--gray)" }}>{u.joined}</td>
                        <td><div style={{ display: "flex", gap: "6px" }}>
                          <button className="btn-sm btn-view">View</button>
                          {u.status === "pending" && <button className="btn-sm btn-approve">Approve</button>}
                          {u.status !== "banned" && <button className="btn-sm btn-ban">Ban</button>}
                          {u.status === "banned" && <button className="btn-sm btn-approve">Unban</button>}
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* QUESTIONS */}
          {activePage === "questions" && (
            <>
              <div className="search-bar">
                <input className="search-input" placeholder="Search questions..." />
                <button className="filter-btn">Filter ▾</button>
              </div>
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="table">
                  <thead><tr><th style={{ paddingLeft: "22px" }}>Subject</th><th>Question</th><th>Aspirant</th><th>Mentor</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {questions.map((q, i) => (
                      <tr key={i}>
                        <td style={{ paddingLeft: "22px" }}><span className={`badge ${q.subject === "Biology" ? "active" : q.subject === "Chemistry" ? "aspirant" : "pending"}`}>{q.subject}</span></td>
                        <td style={{ maxWidth: "220px", color: "var(--gray)", fontSize: ".82rem" }}>{q.text}</td>
                        <td>{q.aspirant}</td>
                        <td style={{ color: "var(--gray)" }}>{q.mentor}</td>
                        <td><span className={`badge ${q.status}`}>{q.status}</span></td>
                        <td><div style={{ display: "flex", gap: "6px" }}>
                          <button className="btn-sm btn-view">View</button>
                          <button className="btn-sm btn-delete">Delete</button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* SETTINGS */}
          {activePage === "settings" && (
            <div className="card">
              <div className="card-title">Platform Settings</div>
              {[
                { label: "Platform Name", val: "NEETConnect" },
                { label: "Admin Email", val: "admin@neetconnect.in" },
                { label: "Max Questions Per Day (Aspirant)", val: "10" },
                { label: "Auto-assign Mentor", val: "Enabled" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--glassborder)" }}>
                  <div style={{ fontSize: ".9rem", fontWeight: 500 }}>{s.label}</div>
                  <div style={{ fontSize: ".88rem", color: "var(--gray)" }}>{s.val}</div>
                </div>
              ))}
            </div>
          )}

          {/* RESOURCES */}
          {activePage === "resources" && (
            <div className="card">
              <div className="card-title">All Resources <span className="card-action">+ Upload New</span></div>
              {[
                { title: "NCERT Biology Ch 1-10 Notes", subject: "Biology", uploader: "Dr. Priya S.", downloads: 342 },
                { title: "Organic Chemistry Reaction Map", subject: "Chemistry", uploader: "Prof. Arjun K.", downloads: 218 },
                { title: "Physics Formula Sheet", subject: "Physics", uploader: "Ms. Neha R.", downloads: 401 },
                { title: "NEET 2024 PYQs — Biology", subject: "Biology", uploader: "Admin", downloads: 587 },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--glassborder)" }}>
                  <div>
                    <div style={{ fontSize: ".9rem", fontWeight: 500 }}>{r.title}</div>
                    <div style={{ fontSize: ".75rem", color: "var(--gray)", marginTop: "3px" }}>By {r.uploader} • {r.downloads} downloads</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span className="badge aspirant">{r.subject}</span>
                    <button className="btn-sm btn-delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ADD USER MODAL */}
      {addModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setAddModal(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setAddModal(false)}>×</button>
            <div className="modal-title">Add New User</div>
            <div className="modal-sub">Manually add a user to the platform</div>
            <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" type="text" placeholder="Full name" /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="email@example.com" /></div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select className="form-input" style={{ background: "#0f2040" }}>
                <option>Aspirant</option>
                <option>Mentor</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Temporary Password</label><input className="form-input" type="password" placeholder="••••••••" /></div>
            <button className="btn-submit" onClick={() => setAddModal(false)}>Create User →</button>
          </div>
        </div>
      )}
    </>
  );
}