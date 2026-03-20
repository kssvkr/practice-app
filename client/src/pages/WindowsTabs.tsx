export default function WindowsTabs() {
  const openNewTab = () => {
    window.open('https://www.selenium.dev', '_blank');
  };

  const openNewWindow = () => {
    window.open('https://www.selenium.dev', 'popup', 'width=600,height=400,scrollbars=yes');
  };

  return (
    <div data-testid="windows-tabs-page">
      <h1 className="page-title" data-testid="page-title">Windows & Tabs</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice handling new tabs, popup windows, and external link navigation.
      </p>

      <div className="grid-2">
        {/* Open New Tab */}
        <div className="card" data-testid="new-tab-card">
          <h3 className="card__title">Open New Tab</h3>
          <button
            className="btn btn-primary"
            onClick={openNewTab}
            data-testid="open-new-tab-button"
            data-test="open-new-tab-button"
            role="button"
            title="Open New Tab"
            aria-label="Open New Tab"
          >
            Open New Tab
          </button>
          <p className="help-text mt-16">Opens selenium.dev in a new tab.</p>
        </div>

        {/* Open New Window */}
        <div className="card" data-testid="popup-card">
          <h3 className="card__title">Open New Window</h3>
          <button
            className="btn btn-secondary"
            onClick={openNewWindow}
            data-testid="open-popup-button"
            data-test="open-popup-button"
            role="button"
            title="Open New Window"
            aria-label="Open New Window"
          >
            Open New Window
          </button>
          <p className="help-text mt-16">Opens selenium.dev in a new window (600x400).</p>
        </div>

        {/* External Link */}
        <div className="card" data-testid="external-link-card">
          <h3 className="card__title">External Link Navigation</h3>
          <a
            href="https://playwright.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            data-testid="external-link-playwright"
            data-test="external-link-playwright"
            title="Visit Playwright Documentation"
            aria-label="Visit Playwright Documentation"
          >
            Visit Playwright Docs ↗
          </a>
          <br /><br />
          <a
            href="https://www.selenium.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            data-testid="external-link-selenium"
            data-test="external-link-selenium"
            title="Visit Selenium Documentation"
            aria-label="Visit Selenium Documentation"
          >
            Visit Selenium Docs ↗
          </a>
        </div>


      </div>
    </div>
  );
}
