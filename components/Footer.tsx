export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: "var(--void-black)",
        borderTop: "1px solid rgba(92, 61, 40, 0.2)",
        padding: "40px 0",
      }}
    >
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="text-label"
          style={{ color: "var(--caramel)", letterSpacing: "0.3em" }}
        >
          AURA
        </span>

        <p
          className="text-label"
          style={{ color: "var(--walnut-brown)" }}
        >
          © 2025 Tahel Creative AI. כל הזכויות שמורות.
        </p>

        <p
          className="text-label"
          style={{ color: "var(--walnut-brown)" }}
        >
          by Tahel Kornfeld
        </p>
      </div>
    </footer>
  );
}
