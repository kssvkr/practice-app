import { useState } from 'react';

export default function Buttons() {
  const [clickCount, setClickCount] = useState(0);
  const [toggleState, setToggleState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [doubleClicked, setDoubleClicked] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div data-testid="buttons-page">
      <h1 className="page-title" data-testid="page-title">Button Controls</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice with various button types and states.
      </p>

      <div className="grid-2">
        {/* Primary Button */}
        <div className="card" data-testid="primary-button-card">
          <h3 className="card__title">Primary Button</h3>
          <button
            className="btn btn-primary"
            onClick={() => setClickCount(c => c + 1)}
            data-testid="primary-button"
            data-test="primary-button"
            role="button"
            title="Click me"
          >
            Click Me
          </button>
          <p className="help-text mt-16" data-testid="click-count">
            Clicked {clickCount} times
          </p>
        </div>

        {/* Secondary Button */}
        <div className="card" data-testid="secondary-button-card">
          <h3 className="card__title">Secondary Button</h3>
          <button
            className="btn btn-secondary"
            onClick={() => setClickCount(0)}
            data-testid="secondary-button"
            data-test="secondary-button"
            role="button"
            title="Reset Counter"
          >
            Reset Counter
          </button>
        </div>

        {/* Icon Button */}
        <div className="card" data-testid="icon-button-card">
          <h3 className="card__title">Icon Buttons</h3>
          <div className="flex gap-12">
            <button
              className="btn btn-icon btn-primary"
              data-testid="icon-button-add"
              data-test="icon-button-add"
              aria-label="Add item"
              title="Add item"
            >
              ➕
            </button>
            <button
              className="btn btn-icon btn-danger"
              data-testid="icon-button-delete"
              data-test="icon-button-delete"
              aria-label="Delete item"
              title="Delete item"
            >
              🗑️
            </button>
            <button
              className="btn btn-icon btn-success"
              data-testid="icon-button-check"
              data-test="icon-button-check"
              aria-label="Confirm"
              title="Confirm"
            >
              ✅
            </button>
            <button
              className="btn btn-icon btn-warning"
              data-testid="icon-button-edit"
              data-test="icon-button-edit"
              aria-label="Edit item"
              title="Edit item"
            >
              ✏️
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="card" data-testid="toggle-button-card">
          <h3 className="card__title">Toggle Button</h3>
          <div className="flex items-center gap-12">
            <button
              className={`toggle-btn ${toggleState ? 'active' : ''}`}
              onClick={() => setToggleState(!toggleState)}
              data-testid="toggle-button"
              data-test="toggle-button"
              role="switch"
              aria-checked={toggleState}
              aria-label="Toggle setting"
              title="Toggle setting"
            />
            <span data-testid="toggle-status">
              {toggleState ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        {/* Loading Button */}
        <div className="card" data-testid="loading-button-card">
          <h3 className="card__title">Loading Button</h3>
          <button
            className={`btn btn-primary ${isLoading ? 'btn-loading' : ''}`}
            onClick={handleLoadingClick}
            disabled={isLoading}
            data-testid="loading-button"
            data-test="loading-button"
            role="button"
            title="Submit form"
            aria-label="Submit form"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
          {isLoading && <p className="help-text mt-16" data-testid="loading-text">Processing...</p>}
        </div>

        {/* Disabled Button */}
        <div className="card" data-testid="disabled-button-card">
          <h3 className="card__title">Disabled Button</h3>
          <button
            className="btn btn-primary"
            disabled
            data-testid="disabled-button"
            data-test="disabled-button"
            role="button"
            title="Disabled button"
            aria-label="Disabled button"
          >
            Disabled Button
          </button>
          <p className="help-text mt-16">This button is always disabled</p>
        </div>

        {/* Button Variants */}
        <div className="card" data-testid="button-variants-card">
          <h3 className="card__title">Button Variants</h3>
          <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" data-testid="btn-small" title="Small button" role="button">Small</button>
            <button className="btn btn-primary" data-testid="btn-medium" title="Medium button" role="button">Medium</button>
            <button className="btn btn-primary btn-lg" data-testid="btn-large" title="Large button" role="button">Large</button>
            <button className="btn btn-outline" data-testid="btn-outline" title="Outline button" role="button">Outline</button>
            <button className="btn btn-success" data-testid="btn-success" title="Success button" role="button">Success</button>
            <button className="btn btn-danger" data-testid="btn-danger" title="Danger button" role="button">Danger</button>
            <button className="btn btn-warning" data-testid="btn-warning" title="Warning button" role="button">Warning</button>
          </div>
        </div>

        {/* Double Click Button */}
        <div className="card" data-testid="double-click-card">
          <h3 className="card__title">Double Click Button</h3>
          <button
            className="btn btn-primary"
            onDoubleClick={() => setDoubleClicked(true)}
            data-testid="double-click-button"
            data-test="double-click-button"
            role="button"
            title="Double click me"
            aria-label="Double click me"
          >
            Double Click Me
          </button>
          {doubleClicked && (
            <p className="help-text mt-16" data-testid="double-click-result">
              ✅ Double click detected!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
