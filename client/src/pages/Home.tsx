import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div data-testid="home-page">
      <div className="home-hero" data-testid="home-hero">
        <h1 data-testid="hero-title">Automation Testing Playground</h1>
        <p data-testid="hero-subtitle">
          A complete platform for practicing UI automation, API testing, and modern locator strategies
          with Playwright, Selenium, and more.
        </p>
      </div>

      <h2 className="page-title" data-testid="features-title">Practice Areas</h2>
      <p className="page-subtitle">Click any category to start practicing</p>

      <div className="grid-3" data-testid="feature-grid">
        <Link to="/text-inputs" className="feature-card" data-testid="feature-text-inputs" title="Text Inputs">
          <div className="feature-card__icon" style={{ background: '#e3f2fd' }}>✏️</div>
          <h3>Text Inputs</h3>
          <p>Practice with text, email, password, number, phone, search, and textarea inputs</p>
        </Link>

        <Link to="/buttons" className="feature-card" data-testid="feature-buttons" title="Buttons">
          <div className="feature-card__icon" style={{ background: '#f3e5f5' }}>🔘</div>
          <h3>Buttons</h3>
          <p>Primary, secondary, icon, toggle, loading, and disabled buttons</p>
        </Link>

        <Link to="/selection-controls" className="feature-card" data-testid="feature-selection" title="Selection Controls">
          <div className="feature-card__icon" style={{ background: '#e8f5e9' }}>☑️</div>
          <h3>Selection Controls</h3>
          <p>Checkboxes, radio buttons, dropdowns, multi-select, autocomplete</p>
        </Link>

        <Link to="/date-time" className="feature-card" data-testid="feature-datetime" title="Date & Time">
          <div className="feature-card__icon" style={{ background: '#fff3e0' }}>📅</div>
          <h3>Date & Time</h3>
          <p>Date picker, date range, time picker, and calendar controls</p>
        </Link>

        <Link to="/file-controls" className="feature-card" data-testid="feature-files" title="File Upload">
          <div className="feature-card__icon" style={{ background: '#fce4ec' }}>📁</div>
          <h3>File Upload</h3>
          <p>Single file, multiple files, drag & drop, and image preview uploads</p>
        </Link>

        <Link to="/tables" className="feature-card" data-testid="feature-tables" title="Tables">
          <div className="feature-card__icon" style={{ background: '#e0f2f1' }}>📊</div>
          <h3>Tables</h3>
          <p>Static, dynamic, sortable, searchable, pagination, editable tables</p>
        </Link>

        <Link to="/alerts-modals" className="feature-card" data-testid="feature-alerts" title="Alerts & Modals">
          <div className="feature-card__icon" style={{ background: '#fff8e1' }}>⚠️</div>
          <h3>Alerts & Modals</h3>
          <p>Alert, confirm, prompt dialogs, toast notifications, modal popups</p>
        </Link>

        <Link to="/drag-drop" className="feature-card" data-testid="feature-dragdrop" title="Drag & Drop">
          <div className="feature-card__icon" style={{ background: '#ede7f6' }}>🔀</div>
          <h3>Drag & Drop</h3>
          <p>Drag list items, drag cards between containers, sortable lists</p>
        </Link>

        <Link to="/mouse-actions" className="feature-card" data-testid="feature-mouse" title="Mouse Actions">
          <div className="feature-card__icon" style={{ background: '#e8eaf6' }}>🖱️</div>
          <h3>Mouse Actions</h3>
          <p>Hover menus, right-click context menu, double-click, slider, resize</p>
        </Link>

        <Link to="/iframes" className="feature-card" data-testid="feature-iframes" title="Frames">
          <div className="feature-card__icon" style={{ background: '#efebe9' }}>🖼️</div>
          <h3>Frames</h3>
          <p>Single iframe and nested iframe testing</p>
        </Link>

        <Link to="/windows-tabs" className="feature-card" data-testid="feature-windows" title="Windows & Tabs">
          <div className="feature-card__icon" style={{ background: '#e0f7fa' }}>🪟</div>
          <h3>Windows & Tabs</h3>
          <p>New tab, popup window, and external link navigation</p>
        </Link>

        <Link to="/dynamic-elements" className="feature-card" data-testid="feature-dynamic" title="Dynamic Elements">
          <div className="feature-card__icon" style={{ background: '#f1f8e9' }}>⚡</div>
          <h3>Dynamic Elements</h3>
          <p>Loading spinners, delayed elements, progress bars, skeleton loaders</p>
        </Link>

        <Link to="/scrolling" className="feature-card" data-testid="feature-scrolling" title="Scrolling">
          <div className="feature-card__icon" style={{ background: '#fce4ec' }}>📜</div>
          <h3>Scrolling</h3>
          <p>Infinite scroll, scroll to element, sticky elements</p>
        </Link>

        <Link to="/shadow-dom" className="feature-card" data-testid="feature-shadow-dom" title="Shadow DOM">
          <div className="feature-card__icon" style={{ background: '#e8f5e9' }}>👻</div>
          <h3>Shadow DOM</h3>
          <p>Open, closed, nested shadow roots and shadow DOM forms</p>
        </Link>

        <Link to="/keyboard-controls" className="feature-card" data-testid="feature-keyboard" title="Keyboard Controls">
          <div className="feature-card__icon" style={{ background: '#e3f2fd' }}>⌨️</div>
          <h3>Keyboard Controls</h3>
          <p>Key events, combinations, shortcuts, focus navigation, and table keyboard control</p>
        </Link>
      </div>
    </div>
  );
}
