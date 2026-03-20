import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer-section" role="contentinfo" aria-label="Site footer">
      <div className="footer__grid">
        {/* Branding */}
        <section className="footer__brand" data-testid="footer-brand">
          <h3 className="footer__title">Automation Practice Hub</h3>
          <p className="footer__desc">
            Practice UI and API automation using Playwright, Selenium, and modern testing tools.
          </p>
        </section>

        {/* Learning Resources */}
        <nav className="footer__links" data-testid="footer-links" aria-label="Learning Resources">
          <h3 className="footer__title">Learning Resources</h3>
          <ul>
            <li>
              <a
                href="https://onlinetestinghelp.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-onlinetestinghelp-link"
                title="Online Testing Help"
              >
                Online Testing Help
              </a>
            </li>
            <li>
              <Link to="/userfacing-locators" data-testid="footer-ui-automation-link" title="UI Automation Practice">
                UI Automation Practice
              </Link>
            </li>
            <li>
              <Link to="/api-playground" data-testid="footer-api-automation-link" title="API Automation Practice">
                API Automation Practice
              </Link>
            </li>
            <li>
              <Link to="/keyboard-controls" data-testid="footer-keyboard-link" title="Keyboard Actions Lab">
                Keyboard Actions Lab
              </Link>
            </li>
          </ul>
        </nav>

        {/* Practice Info */}
        <section className="footer__info" data-testid="footer-info">
          <h3 className="footer__title">Practice Application</h3>
          <p className="footer__desc">
            🧪 This application is built for practicing automation testing using tools like Playwright, Selenium, and Cypress.
          </p>
          <a
            href="https://onlinetestinghelp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__highlight-link"
            data-testid="footer-info-link"
            title="onlinetestinghelp.com"
          >
            onlinetestinghelp.com
          </a>
        </section>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom" data-testid="footer-bottom">
        <p data-testid="footer-copyright">
          © 2026 Automation Practice App | Powered by{' '}
          <a
            href="https://onlinetestinghelp.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-powered-link"
            title="onlinetestinghelp.com"
          >
            onlinetestinghelp.com
          </a>
        </p>
        <p className="footer__promo" data-testid="footer-promo">
          🎓 Learn Playwright Automation with Real Projects – Visit{' '}
          <a
            href="https://onlinetestinghelp.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-promo-link"
            title="onlinetestinghelp.com"
          >
            onlinetestinghelp.com
          </a>
        </p>
      </div>
    </footer>
  );
}
