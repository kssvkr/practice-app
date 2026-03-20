import { NavLink } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header" data-testid="header" role="banner">
      <button
        className="hamburger"
        onClick={onMenuClick}
        aria-label="Toggle menu"
        data-testid="hamburger-menu"
        title="Toggle menu"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="header__logo" data-testid="header-logo">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        Automation Practice
      </div>

      <nav className="header__nav" data-testid="header-nav" role="navigation" aria-label="Main navigation">
        <NavLink to="/" data-testid="nav-home" title="Home">Home</NavLink>
        <NavLink to="/api-playground" data-testid="nav-api-practice" title="API-Practice">API-Practice</NavLink>
      </nav>

      <div className="header__spacer" />
    </header>
  );
}
