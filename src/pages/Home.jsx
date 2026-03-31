import { useNavigate } from "react-router-dom";

export default function Home() {
  // useNavigate: programmatic navigation (e.g. after a button click)
  // Different from NavLink which is declarative in JSX
  const navigate = useNavigate();

  return (
    <main style={styles.page}>
      <div style={styles.hero}>
        <span style={styles.badge}>React Router + React Query</span>
        <h1 style={styles.title}>Welcome Home</h1>
        <p style={styles.subtitle}>
          This is the default tab. React Router redirects{" "}
          <code style={styles.code}>/</code> →{" "}
          <code style={styles.code}>/home</code> automatically so this tab is
          always selected on first load.
        </p>

        <button style={styles.ctaBtn} onClick={() => navigate("/list")}>
          Go to List →
        </button>
      </div>

      {/* Info cards explaining the setup */}
      <div style={styles.cards}>
        {INFO_CARDS.map((card) => (
          <div key={card.title} style={styles.card}>
            <div style={styles.cardIcon}>{card.icon}</div>
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardText}>{card.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

const INFO_CARDS = [
  {
    icon: "⬡",
    title: "BrowserRouter",
    text: "Wraps the entire app. Enables NavLink, useNavigate, useLocation, and useParams in every component.",
  },
  {
    icon: "⬡",
    title: "NavLink",
    text: "Like <Link> but knows if it's active. The className prop receives { isActive } — use it to style the selected tab.",
  },
  {
    icon: "⬡",
    title: "QueryClientProvider",
    text: "Wraps inside BrowserRouter. Gives every component access to useQuery, useMutation, and the global cache.",
  },
  {
    icon: "⬡",
    title: "Navigate (redirect)",
    text: 'The "/" route has <Navigate to="/home" replace /> so Home is always the default selected tab on first load.',
  },
];

const styles = {
  page: {
    minHeight: "calc(100vh - 57px)",
    background: "#0f1117",
    padding: "60px 32px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  hero: {
    textAlign: "center",
    marginBottom: 64,
  },
  badge: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: "#4f6ef7",
    background: "#1a2040",
    border: "1px solid #2a4080",
    borderRadius: 20,
    padding: "4px 14px",
    marginBottom: 24,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 48,
    fontWeight: 800,
    color: "#f0f2ff",
    margin: "0 0 16px",
    letterSpacing: "-1px",
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7a9e",
    maxWidth: 520,
    margin: "0 auto 32px",
    lineHeight: 1.7,
  },
  code: {
    fontFamily: "monospace",
    background: "#1a1f2e",
    border: "1px solid #2a2f3e",
    borderRadius: 4,
    padding: "1px 6px",
    color: "#60a5fa",
    fontSize: 13,
  },
  ctaBtn: {
    padding: "12px 28px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #4f6ef7, #6c4ff7)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#1a1f2e",
    border: "1px solid #2a2f3e",
    borderRadius: 14,
    padding: "24px 22px",
  },
  cardIcon: {
    fontSize: 22,
    color: "#4f6ef7",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#e8eaf0",
    margin: "0 0 8px",
  },
  cardText: {
    fontSize: 13,
    color: "#6b7a9e",
    lineHeight: 1.65,
    margin: 0,
  },
};
