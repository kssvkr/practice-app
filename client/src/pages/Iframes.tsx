export default function Iframes() {
  return (
    <div data-testid="iframes-page">
      <h1 className="page-title" data-testid="page-title">Iframe Testing</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice switching between frames and interacting with content inside iframes.
      </p>

      <div className="grid-2">
        {/* Single Iframe */}
        <div className="card" data-testid="single-iframe-card">
          <h3 className="card__title">Single Iframe</h3>
          <div className="iframe-container">
            <iframe
              src="/iframe-content.html"
              title="Single Iframe"
              data-testid="single-iframe"
              data-test="single-iframe"
              width="100%"
              height="250"
              aria-label="Single iframe for testing"
            />
          </div>
        </div>

        {/* Nested Iframe */}
        <div className="card" data-testid="nested-iframe-card">
          <h3 className="card__title">Nested Iframe</h3>
          <div className="iframe-container">
            <iframe
              src="/nested-iframe-outer.html"
              title="Nested Iframe (Outer)"
              data-testid="nested-iframe"
              data-test="nested-iframe"
              width="100%"
              height="350"
              aria-label="Nested iframe for testing"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
