import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Home", to: "/home" },
  // { label: "Basic", to: "/basic" },
  { label: "List", to: "/list" },
  { label: "Pagination", to: "/pagination" },
  { label: "Infinite Query", to: "/infinite" },
  { label: "Parallel", to: "/parallel" },
  { label: "Dependent", to: "/dependent" },
  // { label: "Optimistic UI", to: "/optimistic" },
  { label: "Mutation", to: "/mutation" },
];

export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        {/* Brand */}
        <span style={styles.brand}>Welcome Shivani</span>

        {/* Nav tabs */}
        <nav style={styles.nav}>
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              // className as a function — NavLink passes { isActive } automatically
              // isActive = true when current URL matches this NavLink's "to" prop
              className={({ isActive }) =>
                isActive ? "nav-tab nav-tab--active" : "nav-tab"
              }
              // end prop: only mark active on exact match
              // (important if parent routes could also partially match)
              end
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Inline styles for the active/inactive tab states */}
      <style>{`
        .nav-tab {
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: black;
          text-decoration: none;
          transition: all 0.18s ease;
          border: 1px solid transparent;
          letter-spacing: 0.01em;
        }
        .nav-tab:hover {
          color: #c9d1e0;
          background: #1e2435;
        }
        .nav-tab--active {
          color: #e8eaf0;
          background: #1e2d50;
          border-color: #2a4080;
        }
      `}</style>
    </header>
  );
}

const styles = {
  header: {
    background: "white",
    borderBottom: "1px solid #1e2435",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "14px 32px",
    display: "flex",
    alignItems: "center",
    gap: 32,
  },
  brand: {
    fontSize: 18,
    fontWeight: 700,
    color: "black",
    letterSpacing: "-0.3px",
    marginRight: "auto",
  },
  nav: {
    display: "flex",
    gap: 8,
  },
};
