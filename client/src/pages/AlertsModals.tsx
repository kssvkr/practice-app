import { useState } from 'react';

export default function AlertsModals() {
  const [toasts, setToasts] = useState<{ id: number; type: string; message: string }[]>([]);
  const [alertResult, setAlertResult] = useState('');
  const [confirmResult, setConfirmResult] = useState('');
  const [promptResult, setPromptResult] = useState('');

  let toastId = 0;
  const showToast = (type: string, message: string) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const handleAlert = () => {
    alert('This is an alert dialog!');
    setAlertResult('Alert was shown and closed.');
  };

  const handleConfirm = () => {
    const result = confirm('Do you want to proceed?');
    setConfirmResult(result ? 'User clicked OK' : 'User clicked Cancel');
  };

  const handlePrompt = () => {
    const result = prompt('Enter your name:', 'Tester');
    setPromptResult(result ? `User entered: ${result}` : 'User cancelled');
  };

  return (
    <div data-testid="alerts-modals-page">
      <h1 className="page-title" data-testid="page-title">Alerts & Modals</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice with browser dialogs and toast notifications.
      </p>

      <div className="grid-2">
        {/* Alert */}
        <div className="card" data-testid="alert-card">
          <h3 className="card__title">Alert Dialog</h3>
          <button
            className="btn btn-primary"
            onClick={handleAlert}
            data-testid="alert-button"
            data-test="alert-button"
            role="button"
            title="Show Alert"
            aria-label="Show Alert"
          >
            Show Alert
          </button>
          {alertResult && <p className="help-text mt-16" data-testid="alert-result">{alertResult}</p>}
        </div>

        {/* Confirm */}
        <div className="card" data-testid="confirm-card">
          <h3 className="card__title">Confirm Dialog</h3>
          <button
            className="btn btn-warning"
            onClick={handleConfirm}
            data-testid="confirm-button"
            data-test="confirm-button"
            role="button"
            title="Show Confirm"
            aria-label="Show Confirm"
          >
            Show Confirm
          </button>
          {confirmResult && <p className="help-text mt-16" data-testid="confirm-result">{confirmResult}</p>}
        </div>

        {/* Prompt */}
        <div className="card" data-testid="prompt-card">
          <h3 className="card__title">Prompt Dialog</h3>
          <button
            className="btn btn-success"
            onClick={handlePrompt}
            data-testid="prompt-button"
            data-test="prompt-button"
            role="button"
            title="Show Prompt"
            aria-label="Show Prompt"
          >
            Show Prompt
          </button>
          {promptResult && <p className="help-text mt-16" data-testid="prompt-result">{promptResult}</p>}
        </div>

        {/* Toast Notifications */}
        <div className="card" data-testid="toast-card">
          <h3 className="card__title">Toast Notifications</h3>
          <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
            <button className="btn btn-success btn-sm" onClick={() => showToast('success', 'Operation successful!')} data-testid="toast-success-btn" title="Success Toast" aria-label="Show success toast">Success</button>
            <button className="btn btn-danger btn-sm" onClick={() => showToast('error', 'Something went wrong!')} data-testid="toast-error-btn" title="Error Toast" aria-label="Show error toast">Error</button>
            <button className="btn btn-warning btn-sm" onClick={() => showToast('warning', 'Please check your input.')} data-testid="toast-warning-btn" title="Warning Toast" aria-label="Show warning toast">Warning</button>
            <button className="btn btn-primary btn-sm" onClick={() => showToast('info', 'New update available!')} data-testid="toast-info-btn" title="Info Toast" aria-label="Show info toast">Info</button>
          </div>
        </div>


      </div>

      {/* Toast Container */}
      {toasts.length > 0 && (
        <div className="toast-container" data-testid="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast toast-${toast.type}`} data-testid={`toast-${toast.type}`} role="alert">
              {toast.message}
            </div>
          ))}
        </div>
      )}


    </div>
  );
}
