import { usePostsQuery } from "../api/posts.js";

export default function TrendList() {
  const {
    data: posts = [],
    isLoading, // true only on first fetch (no cache exists yet)
    isFetching, // true on every fetch including background poll
    isError,
    error,
    dataUpdatedAt,
    refetch,
  } = usePostsQuery();

  return (
    <main style={styles.page}>
      {/* Page header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Posts List</h1>
          <p style={styles.subtitle}>
            Fetched with <code style={styles.code}>useQuery</code> · staleTime
            30s · polling every 20s
          </p>
        </div>

        <div style={styles.headerRight}>
          {/* isFetching badge — shows on background polling, not just first load */}
          {isFetching && !isLoading && (
            <span style={styles.pollingBadge}>Polling…</span>
          )}

          {/* Last updated timestamp from React Query */}
          {dataUpdatedAt > 0 && (
            <span style={styles.timestamp}>
              Updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
            </span>
          )}

          {/* Manual refetch button */}
          <button
            style={styles.refetchBtn}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {/* ── States ───────────────────────────────────── */}

      {/* isLoading — only on first mount when cache is empty */}
      {isLoading && (
        <div style={styles.center}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Loading posts…</p>
        </div>
      )}

      {/* isError — queryFn threw an error */}
      {isError && (
        <div style={styles.errorBox}>
          <p style={styles.errorTitle}>Something went wrong</p>
          <p style={styles.errorMsg}>{error.message}</p>
          <button style={styles.retryBtn} onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {/* Data — rendered when posts are available */}
      {!isLoading && !isError && (
        <div style={styles.grid}>
          {posts.map((post, i) => (
            <div
              key={post.id}
              style={{
                ...styles.card,
                animationDelay: `${i * 40}ms`,
              }}
              className="post-card"
            >
              <div style={styles.cardTop}>
                <span style={styles.postNum}>#{post.id}</span>
                <span style={styles.userId}>User {post.userId}</span>
              </div>
              <h3 style={styles.cardTitle}>{post.title}</h3>
              <p style={styles.cardBody}>{post.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Cache info banner */}
      <div style={styles.infoBanner}>
        <span>
          <b style={{ color: "#fbbf24" }}>staleTime: 30s</b>
          <span style={{ color: "#4a5270" }}>
            {" "}
            — switching tabs and back within 30s = zero network request
          </span>
        </span>
        <span>
          <b style={{ color: "#a78bfa" }}>gcTime: 5min</b>
          <span style={{ color: "#4a5270" }}>
            {" "}
            — cache cleared from memory after 5 min unused
          </span>
        </span>
        <span>
          <b style={{ color: "#4ade80" }}>polling: 20s</b>
          <span style={{ color: "#4a5270" }}>
            {" "}
            — auto-refetches every 20 seconds in background
          </span>
        </span>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .post-card {
          animation: fadeUp 0.35s ease both;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 57px)",
    background: "#0f1117",
    padding: "40px 32px 80px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    flexWrap: "wrap",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#f0f2ff",
    margin: "0 0 6px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 13,
    color: "#4a5270",
    margin: 0,
  },
  code: {
    fontFamily: "monospace",
    background: "#1a1f2e",
    border: "1px solid #2a2f3e",
    borderRadius: 4,
    padding: "1px 6px",
    color: "#60a5fa",
    fontSize: 12,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  pollingBadge: {
    fontSize: 11,
    fontWeight: 600,
    background: "#1a2a4e",
    color: "#60a5fa",
    border: "1px solid #2a4080",
    borderRadius: 20,
    padding: "4px 12px",
  },
  timestamp: {
    fontSize: 12,
    color: "#4a5270",
    fontFamily: "monospace",
  },
  refetchBtn: {
    padding: "7px 16px",
    borderRadius: 8,
    border: "1px solid #2a2f3e",
    background: "#1a1f2e",
    color: "#9ba5c2",
    fontSize: 13,
    cursor: "pointer",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 60,
  },
  spinner: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "3px solid #1e2435",
    borderTopColor: "#4f6ef7",
    animation: "spin 0.7s linear infinite",
    marginBottom: 16,
  },
  loadingText: { color: "#4a5270", fontSize: 14, margin: 0 },
  errorBox: {
    background: "#2e0d12",
    border: "1px solid #5c1a22",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  errorTitle: { color: "#f87171", fontWeight: 600, margin: "0 0 6px" },
  errorMsg: { color: "#fca5a5", fontSize: 14, margin: "0 0 16px" },
  retryBtn: {
    padding: "8px 18px",
    borderRadius: 8,
    border: "none",
    background: "#f87171",
    color: "#fff",
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 16,
    marginBottom: 32,
  },
  card: {
    background: "#1a1f2e",
    border: "1px solid #2a2f3e",
    borderRadius: 12,
    padding: 20,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  postNum: {
    fontSize: 11,
    fontFamily: "monospace",
    color: "#4f6ef7",
    fontWeight: 600,
  },
  userId: {
    fontSize: 11,
    color: "#4a5270",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#e8eaf0",
    margin: "0 0 8px",
    lineHeight: 1.4,
    textTransform: "capitalize",
  },
  cardBody: {
    fontSize: 12,
    color: "#4a5270",
    lineHeight: 1.6,
    margin: 0,
  },
  infoBanner: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#1a1f2e",
    border: "1px solid #2a2f3e",
    borderRadius: 10,
    padding: "14px 20px",
    fontSize: 13,
  },
};
