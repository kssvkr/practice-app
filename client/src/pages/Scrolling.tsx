import { useState, useRef, useCallback } from 'react';

export default function Scrolling() {
  // Infinite scroll
  const [items, setItems] = useState<number[]>(Array.from({ length: 20 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems(prev => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)]);
      setLoading(false);
    }, 1000);
  }, [loading]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      loadMore();
    }
  };

  // Scroll to element
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div data-testid="scrolling-page">
      <h1 className="page-title" data-testid="page-title">Scrolling Components</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Infinite scroll, scroll to element, and sticky elements.
      </p>

      <div className="grid-2">
        {/* Infinite Scroll */}
        <div className="card" data-testid="infinite-scroll-card">
          <h3 className="card__title">Infinite Scroll</h3>
          <p className="help-text mb-16">Scroll down to load more items.</p>
          <div
            className="infinite-scroll-container"
            ref={scrollRef}
            onScroll={handleScroll}
            data-testid="infinite-scroll-container"
            data-test="infinite-scroll-container"
            role="feed"
            aria-label="Infinite scroll list"
            title="Scroll to load more"
          >
            {items.map(item => (
              <div
                key={item}
                className="infinite-scroll-item"
                data-testid={`scroll-item-${item}`}
                role="article"
                aria-label={`Item ${item}`}
              >
                <strong>Item #{item}</strong>
                <p className="help-text">This is scroll item number {item}</p>
              </div>
            ))}
            {loading && (
              <div className="infinite-scroll-item text-center" data-testid="scroll-loading">
                <div className="spinner" style={{ margin: '0 auto', width: 24, height: 24, borderWidth: 3 }}></div>
                <p className="help-text">Loading more items...</p>
              </div>
            )}
          </div>
          <p className="help-text mt-16" data-testid="scroll-count">Total items loaded: {items.length}</p>
        </div>

        {/* Scroll To Element */}
        <div className="card" data-testid="scroll-to-card">
          <h3 className="card__title">Scroll To Element</h3>
          <button
            className="btn btn-primary"
            onClick={scrollToTarget}
            data-testid="scroll-to-button"
            data-test="scroll-to-button"
            role="button"
            title="Scroll to Target"
            aria-label="Scroll to Target Element"
          >
            Scroll to Target Element
          </button>
          <div style={{ height: 400, overflowY: 'auto', marginTop: 16, border: '1px solid var(--border)', borderRadius: 8 }} data-testid="scroll-area">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ padding: 16, borderBottom: '1px solid #eee' }}>
                <p>Section {i + 1} - Regular content</p>
              </div>
            ))}
            <div
              ref={targetRef}
              style={{ padding: 16, background: '#e8f5e9', borderBottom: '1px solid #eee', border: '2px solid #4caf50', borderRadius: 8, margin: 8 }}
              data-testid="scroll-target"
              data-test="scroll-target"
              role="region"
              aria-label="Target element"
              title="Target Element"
            >
              <strong>🎯 Target Element</strong>
              <p>This is the target element to scroll to!</p>
            </div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ padding: 16, borderBottom: '1px solid #eee' }}>
                <p>Section {i + 9} - More content</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Elements */}
        <div className="card" data-testid="sticky-card" style={{ gridColumn: '1 / -1' }}>
          <h3 className="card__title">Sticky Elements</h3>
          <p className="help-text mb-16">Scroll inside this container - the headers stick to the top.</p>
          <div style={{ maxHeight: 350, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 8 }} data-testid="sticky-container" aria-label="Sticky elements container">
            {['Section A', 'Section B', 'Section C'].map((section, sIdx) => (
              <div key={section}>
                <div className="sticky-element" data-testid={`sticky-header-${sIdx}`} role="heading" aria-level={3} title={section}>
                  {section}
                </div>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ padding: 12, borderBottom: '1px solid #eee' }} data-testid={`sticky-item-${sIdx}-${i}`}>
                    {section} - Item {i + 1}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
