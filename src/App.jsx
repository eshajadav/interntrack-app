import { useMemo, useState } from "react";
import "./App.css";

const initialRequests = [
  {
    id: "REQ-1001",
    student: "Somdutta",
    internshipId: "INT-2026-001",
    domain: "Web Development",
    institution: "XYZ Pvt Ltd",
    hours: 120,
    date: "10 Nov 2026",
  },
  {
    id: "REQ-1002",
    student: "Priya Roy",
    internshipId: "INT-2026-003",
    domain: "Frontend Development",
    institution: "Tech Solutions",
    hours: 145,
    date: "09 Nov 2026",
  },
];

const initialCertificates = [
  {
    id: "CERT-2026-001",
    student: "Ananya Das",
    domain: "UI/UX Design",
    institution: "Creative Studio",
    grade: "A+",
  },
  {
    id: "CERT-2026-002",
    student: "Rohan Sen",
    domain: "Web Development",
    institution: "Web Solutions",
    grade: "A",
  },
];

const initialLogs = [
  {
    date: "10 Nov 2026",
    student: "Somdutta",
    internshipId: "INT-2026-001",
    start: "09:00 AM",
    end: "05:00 PM",
    hours: "8.0",
  },
  {
    date: "10 Nov 2026",
    student: "Rahul Das",
    internshipId: "INT-2026-002",
    start: "10:00 AM",
    end: "04:00 PM",
    hours: "6.0",
  },
  {
    date: "09 Nov 2026",
    student: "Priya Roy",
    internshipId: "INT-2026-003",
    start: "09:30 AM",
    end: "05:30 PM",
    hours: "8.0",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [requests, setRequests] = useState(initialRequests);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [logSearch, setLogSearch] = useState("");
  const [certificateSearch, setCertificateSearch] = useState("");

  const totalRequests = requests.length;
  const totalCertificates = certificates.length;
  const totalHours = initialLogs.reduce(
    (total, log) => total + Number(log.hours),
    0
  );

  const filteredLogs = useMemo(() => {
    return initialLogs.filter((log) =>
      `${log.student} ${log.internshipId} ${log.date}`
        .toLowerCase()
        .includes(logSearch.toLowerCase())
    );
  }, [logSearch]);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) =>
      `${certificate.id} ${certificate.student} ${certificate.domain}`
        .toLowerCase()
        .includes(certificateSearch.toLowerCase())
    );
  }, [certificates, certificateSearch]);

  function issueCertificate(request) {
    const certificate = {
      id: `CERT-2026-${String(certificates.length + 1).padStart(3, "0")}`,
      student: request.student,
      domain: request.domain,
      institution: request.institution,
      grade: "A",
    };

    setCertificates((current) => [certificate, ...current]);

    setRequests((current) =>
      current.filter((item) => item.id !== request.id)
    );

    alert("Certificate issued successfully!");
  }

  function requestRevision(id) {
    setRequests((current) =>
      current.filter((request) => request.id !== id)
    );

    alert("Revision request submitted successfully!");
  }

  function exportData() {
    const data = {
      requests,
      certificates,
      timesheetLogs: initialLogs,
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "interntrack-records.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  const menu = [
    { name: "Dashboard", icon: "▦" },
    { name: "Certificate Approvals", icon: "✓" },
    { name: "Certificates", icon: "▤" },
    { name: "Timesheet Logs", icon: "◷" },
  ];

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <h2>InternTrack</h2>
            <span>ADMIN PORTAL</span>
          </div>
        </div>

        <p className="side-label">MAIN MENU</p>

        <nav className="sidebar-menu">
          {menu.map((item) => (
            <button
              key={item.name}
              className={`menu-item ${
                activeTab === item.name ? "selected" : ""
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-mini">
            <div className="avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <small>System Admin</small>
            </div>
          </div>
          <p>© 2026 InternTrack</p>
        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        <header className="topbar">
          <div>
            <h1>{activeTab}</h1>
            <p>Welcome to your internship management workspace.</p>
          </div>

          <div className="top-profile">
            <span className="notification">♧</span>
            <div className="avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <small>Online</small>
            </div>
          </div>
        </header>

        {/* DASHBOARD */}

        {activeTab === "Dashboard" && (
          <>
            <section className="welcome-banner">
              <div>
                <span className="section-kicker">ADMIN OVERVIEW</span>
                <h2>Welcome Back, Admin!</h2>
                <p>
                  Manage internship approvals, certificates and
                  student attendance records.
                </p>
              </div>
              <div className="banner-icon">✦</div>
            </section>

            <section className="stats-grid">

              <StatCard
                label="Pending Requests"
                value={totalRequests}
                note="Awaiting verification"
                icon="◷"
              />

              <StatCard
                label="Issued Certificates"
                value={totalCertificates}
                note="Successfully issued"
                icon="▤"
              />

              <StatCard
                label="Total Working Hours"
                value={`${totalHours}h`}
                note="Recorded attendance"
                icon="◴"
              />

              <StatCard
                label="Timesheet Entries"
                value={initialLogs.length}
                note="Daily attendance logs"
                icon="▦"
              />

            </section>

            <section className="content-card">
              <div className="section-heading">
                <div>
                  <span className="section-kicker">PENDING VERIFICATION</span>
                  <h2>Certificate Approval Requests</h2>
                  <p>Review and approve internship certificates.</p>
                </div>

                <button
                  className="text-btn"
                  onClick={() => setActiveTab("Certificate Approvals")}
                >
                  View all →
                </button>
              </div>

              <RequestCards
                requests={requests.slice(0, 3)}
                issueCertificate={issueCertificate}
                requestRevision={requestRevision}
              />
            </section>

            <section className="content-card">
              <div className="section-heading compact">
                <div>
                  <span className="section-kicker">VERIFICATION RECORDS</span>
                  <h2>Issued &amp; Verifiable Certificates</h2>
                </div>

                <button
                  className="text-btn"
                  onClick={() => setActiveTab("Certificates")}
                >
                  View all →
                </button>
              </div>

              <CertificateTable
                certificates={certificates.slice(0, 4)}
              />
            </section>

            <section className="content-card">
              <div className="section-heading compact">
                <div>
                  <span className="section-kicker">DAILY ATTENDANCE</span>
                  <h2>Daily Timesheet Logs</h2>
                </div>

                <button
                  className="text-btn"
                  onClick={() => setActiveTab("Timesheet Logs")}
                >
                  View all →
                </button>
              </div>

              <TimesheetTable logs={initialLogs.slice(0, 3)} />
            </section>
          </>
        )}

        {/* CERTIFICATE APPROVALS */}

        {activeTab === "Certificate Approvals" && (
          <section className="content-card page-card">
            <div className="section-heading">
              <div>
                <span className="section-kicker">REQUEST MANAGEMENT</span>
                <h2>Certificate Approval Requests</h2>
                <p>Verify internship details before issuing certificates.</p>
              </div>

              <span className="count-badge">
                {requests.length} Pending
              </span>
            </div>

            <RequestCards
              requests={requests}
              issueCertificate={issueCertificate}
              requestRevision={requestRevision}
            />
          </section>
        )}

        {/* CERTIFICATES */}

        {activeTab === "Certificates" && (
          <section className="content-card page-card">
            <div className="section-heading">
              <div>
                <span className="section-kicker">CERTIFICATE RECORDS</span>
                <h2>Issued Certificates</h2>
                <p>View all approved and issued certificates.</p>
              </div>

              <button className="btn btn-primary" onClick={exportData}>
                ↓ Export Records
              </button>
            </div>

            <div className="toolbar">
              <input
                className="search-input"
                placeholder="Search certificates..."
                value={certificateSearch}
                onChange={(e) => setCertificateSearch(e.target.value)}
              />
            </div>

            <CertificateTable certificates={filteredCertificates} />
          </section>
        )}

        {/* TIMESHEET LOGS */}

        {activeTab === "Timesheet Logs" && (
          <section className="content-card page-card">
            <div className="section-heading">
              <div>
                <span className="section-kicker">ATTENDANCE MONITORING</span>
                <h2>Daily Timesheet Logs</h2>
                <p>Monitor daily internship attendance records.</p>
              </div>
            </div>

            <div className="toolbar">
              <input
                className="search-input"
                placeholder="Search student or internship ID..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
              />
            </div>

            <TimesheetTable logs={filteredLogs} />
          </section>
        )}

        <footer className="footer">
          © 2026 InternTrack · Internship Management Portal
        </footer>

      </main>
    </div>
  );
}

/* STATISTICS CARD */

function StatCard({ label, value, note, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>

      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

/* REQUEST CARDS */

function RequestCards({
  requests,
  issueCertificate,
  requestRevision,
}) {
  if (!requests.length) {
    return (
      <EmptyState message="There are no pending certificate requests." />
    );
  }

  return (
    <div className="request-grid">
      {requests.map((request) => (
        <article className="request-card" key={request.id}>

          <div className="request-top">
            <span className="request-icon">▤</span>
            <span className="status pending">PENDING REVIEW</span>
          </div>

          <h3>{request.student}</h3>

          <p className="muted">
            {request.internshipId} · {request.date}
          </p>

          <div className="detail-grid">
            <div>
              <span>DOMAIN</span>
              <strong>{request.domain}</strong>
            </div>

            <div>
              <span>INSTITUTION</span>
              <strong>{request.institution}</strong>
            </div>

            <div>
              <span>VERIFIED HOURS</span>
              <strong>{request.hours} hrs</strong>
            </div>
          </div>

          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => issueCertificate(request)}
            >
              ✓ Endorse &amp; Issue
            </button>

            <button
              className="btn btn-soft"
              onClick={() => requestRevision(request.id)}
            >
              Request Revisions
            </button>
          </div>

        </article>
      ))}
    </div>
  );
}

/* CERTIFICATE TABLE */

function CertificateTable({ certificates }) {
  if (!certificates.length) {
    return <EmptyState message="No certificates have been issued yet." />;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>CERTIFICATE ID</th>
            <th>STUDENT</th>
            <th>DOMAIN</th>
            <th>INSTITUTION</th>
            <th>GRADE</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate.id}>
              <td className="id-text">{certificate.id}</td>
              <td><strong>{certificate.student}</strong></td>
              <td>{certificate.domain}</td>
              <td>{certificate.institution}</td>
              <td><span className="grade">{certificate.grade}</span></td>
              <td>
                <span className="status approved">ISSUED</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* TIMESHEET TABLE */

function TimesheetTable({ logs }) {
  if (!logs.length) {
    return <EmptyState message="No timesheet logs found." />;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>STUDENT</th>
            <th>INTERNSHIP ID</th>
            <th>SHIFT START</th>
            <th>SHIFT END</th>
            <th>HOURS</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr key={`${log.internshipId}-${index}`}>
              <td>{log.date}</td>
              <td><strong>{log.student}</strong></td>
              <td>{log.internshipId}</td>
              <td>{log.start}</td>
              <td>{log.end}</td>
              <td><strong>{log.hours}h</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* EMPTY STATE */

function EmptyState({ message }) {
  return <div className="empty-state">{message}</div>;
}

export default App;