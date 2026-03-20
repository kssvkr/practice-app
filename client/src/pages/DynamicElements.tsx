import { useState, useEffect } from 'react';

export default function DynamicElements() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerCountdown, setSpinnerCountdown] = useState(15);
  const [delayedVisible, setDelayedVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressRunning, setProgressRunning] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [skeletonLoaded, setSkeletonLoaded] = useState(false);
  const [dynamicText, setDynamicText] = useState('');

  const startSpinner = () => {
    setShowSpinner(true);
    setSpinnerCountdown(15);
  };

  useEffect(() => {
    if (!showSpinner) return;
    if (spinnerCountdown <= 0) { setShowSpinner(false); return; }
    const timer = setTimeout(() => setSpinnerCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [showSpinner, spinnerCountdown]);

  const showDelayed = () => {
    setDelayedVisible(false);
    setTimeout(() => setDelayedVisible(true), 10000);
  };

  const startProgress = () => {
    setProgress(0);
    setProgressRunning(true);
  };

  useEffect(() => {
    if (!progressRunning) return;
    if (progress >= 100) { setProgressRunning(false); return; }
    const timer = setTimeout(() => setProgress(p => Math.min(p + 5, 100)), 100);
    return () => clearTimeout(timer);
  }, [progress, progressRunning]);

  const showSkeletonLoader = () => {
    setShowSkeleton(true);
    setSkeletonLoaded(false);
    setTimeout(() => {
      setShowSkeleton(false);
      setSkeletonLoaded(true);
    }, 3000);
  };

  // Changing text
  useEffect(() => {
    const messages = ['Loading...', 'Processing...', 'Almost done...', 'Complete!'];
    let index = 0;
    const interval = setInterval(() => {
      setDynamicText(messages[index % messages.length]);
      index++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div data-testid="dynamic-elements-page">
      <h1 className="page-title" data-testid="page-title">Dynamic Elements</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice waiting for elements, handling loading states, and dynamic content.
      </p>

      <div className="grid-2">
        {/* Loading Spinner */}
        <div className="card" data-testid="spinner-card">
          <h3 className="card__title">Loading Spinner</h3>
          <button
            className="btn btn-primary"
            onClick={startSpinner}
            data-testid="show-spinner-button"
            data-test="show-spinner-button"
            role="button"
            title="Show Spinner"
            aria-label="Show Spinner"
          >
            Show Spinner (15s)
          </button>
          {showSpinner && (
            <div className="mt-16 flex items-center gap-12" data-testid="spinner-container">
              <div className="spinner" data-testid="spinner" role="status" aria-label="Loading"></div>
              <span data-testid="spinner-text">Loading, please wait... ({spinnerCountdown}s)</span>
            </div>
          )}
          {!showSpinner && (
            <p className="help-text mt-16" data-testid="spinner-status">Spinner is hidden</p>
          )}
        </div>

        {/* Delayed Element */}
        <div className="card" data-testid="delayed-card">
          <h3 className="card__title">Delayed Element (10s)</h3>
          <button
            className="btn btn-success"
            onClick={showDelayed}
            data-testid="show-delayed-button"
            data-test="show-delayed-button"
            role="button"
            title="Show Delayed Element"
            aria-label="Show Delayed Element"
          >
            Show Element After 10s
          </button>
          {delayedVisible && (
            <div
              className="mt-16"
              style={{ padding: 12, background: '#e8f5e9', borderRadius: 8, border: '1px solid #4caf50' }}
              data-testid="delayed-element"
              data-test="delayed-element"
              role="alert"
            >
              ✅ I appeared after 10 seconds!
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="card" data-testid="progress-card">
          <h3 className="card__title">Progress Bar</h3>
          <button
            className="btn btn-warning"
            onClick={startProgress}
            disabled={progressRunning}
            data-testid="start-progress-button"
            data-test="start-progress-button"
            role="button"
            title="Start Progress"
            aria-label="Start Progress"
          >
            Start Progress
          </button>
          <div className="mt-16">
            <div className="progress-bar" data-testid="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Download progress">
              <div className="progress-bar__fill" style={{ width: `${progress}%` }} data-testid="progress-fill"></div>
            </div>
            <p className="help-text" data-testid="progress-value">{progress}%</p>
          </div>
        </div>

        {/* Skeleton Loader */}
        <div className="card" data-testid="skeleton-card">
          <h3 className="card__title">Skeleton Loader</h3>
          <button
            className="btn btn-secondary"
            onClick={showSkeletonLoader}
            data-testid="show-skeleton-button"
            data-test="show-skeleton-button"
            role="button"
            title="Load Content"
            aria-label="Load Content"
          >
            Load Content (3s)
          </button>
          {showSkeleton && (
            <div className="mt-16" data-testid="skeleton-container">
              <div className="skeleton skeleton-title" data-testid="skeleton-title"></div>
              <div className="skeleton skeleton-text" style={{ width: '90%' }} data-testid="skeleton-text-1"></div>
              <div className="skeleton skeleton-text" style={{ width: '75%' }} data-testid="skeleton-text-2"></div>
              <div className="skeleton skeleton-text" style={{ width: '85%' }} data-testid="skeleton-text-3"></div>
            </div>
          )}
          {skeletonLoaded && (
            <div className="mt-16" data-testid="skeleton-loaded-content">
              <h4 data-testid="loaded-title">Content Loaded!</h4>
              <p data-testid="loaded-text">This content appeared after the skeleton loader completed its loading animation.</p>
            </div>
          )}
        </div>

        {/* Dynamic Text */}
        <div className="card" data-testid="dynamic-text-card">
          <h3 className="card__title">Dynamic Changing Text</h3>
          <div
            style={{ padding: 16, background: '#fff3e0', borderRadius: 8, textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}
            data-testid="dynamic-text"
            data-test="dynamic-text"
            role="status"
            aria-live="polite"
            aria-label="Dynamic text"
            title="Dynamic changing text"
          >
            {dynamicText}
          </div>
          <p className="help-text mt-16">This text changes every 2 seconds automatically.</p>
        </div>

        {/* Disappearing Element */}
        <div className="card" data-testid="disappearing-card">
          <h3 className="card__title">Auto-Disappearing Element</h3>
          <AutoDisappear />
        </div>
      </div>
    </div>
  );
}

function AutoDisappear() {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  return (
    <>
      <button
        className="btn btn-danger"
        onClick={show}
        data-testid="show-disappearing-button"
        data-test="show-disappearing-button"
        role="button"
        title="Show temporary element"
        aria-label="Show temporary element"
      >
        Show for 3 seconds
      </button>
      {visible && (
        <div
          className="mt-16"
          style={{ padding: 12, background: '#ffebee', borderRadius: 8, border: '1px solid #f44336' }}
          data-testid="disappearing-element"
          role="alert"
          aria-label="Temporary element"
        >
          ⏱️ I will disappear in 3 seconds...
        </div>
      )}
    </>
  );
}
