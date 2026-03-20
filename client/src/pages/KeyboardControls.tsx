import { useState, useRef, useEffect, useCallback } from 'react';

interface KeyEvent {
  id: number;
  type: string;
  key: string;
  code: string;
  time: string;
}

export default function KeyboardControls() {
  // Keyboard Input Tester
  const [lastKey, setLastKey] = useState('');
  const [lastCode, setLastCode] = useState('');
  const [lastEvent, setLastEvent] = useState('');

  // Key Combination Tester
  const [combo, setCombo] = useState('');

  // Shortcut Playground
  const [shortcutResult, setShortcutResult] = useState('');

  // Focus Navigation
  const [focusedField, setFocusedField] = useState('');

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Table Navigation
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const tableRef = useRef<HTMLTableElement>(null);

  // Event Log
  const [eventLog, setEventLog] = useState<KeyEvent[]>([]);
  const logIdRef = useRef(0);

  // Keyboard Input handler
  const handleKeyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(e.key);
    setLastCode(e.code);
    setLastEvent(e.type);
  };

  // Key Combination handler
  const handleCombo = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const parts: string[] = [];
    if (e.ctrlKey) parts.push('CTRL');
    if (e.shiftKey) parts.push('SHIFT');
    if (e.altKey) parts.push('ALT');
    if (e.metaKey) parts.push('META');
    if (!['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
      parts.push(e.key.toUpperCase());
    }
    setCombo(parts.join(' + '));
  };

  // Keyboard Shortcuts
  const handleShortcuts = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); setShortcutResult('Saved Successfully ✅'); }
    else if (e.ctrlKey && e.key === 'n') { e.preventDefault(); setShortcutResult('New Article Created 📄'); }
    else if (e.ctrlKey && e.key === 'd') { e.preventDefault(); setShortcutResult('Item Deleted 🗑️'); }
    else if (e.ctrlKey && e.key === 'l') { e.preventDefault(); setShortcutResult('Input Cleared 🧹'); }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleShortcuts);
    return () => document.removeEventListener('keydown', handleShortcuts);
  }, [handleShortcuts]);

  // Modal keyboard
  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setModalOpen(false); setModalResult('Modal closed via ESC'); }
      else if (e.key === 'Enter') { setModalOpen(false); setModalResult('Confirmed via ENTER'); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen && modalRef.current) {
      const firstInput = modalRef.current.querySelector('input');
      firstInput?.focus();
    }
  }, [modalOpen]);

  // Table keyboard navigation
  const tableData = [
    ['Alice', 'Engineering', '$95,000', 'Active'],
    ['Bob', 'Marketing', '$72,000', 'Active'],
    ['Charlie', 'Sales', '$68,000', 'Inactive'],
    ['Diana', 'Engineering', '$110,000', 'Active'],
  ];

  const handleTableKey = (e: React.KeyboardEvent<HTMLTableElement>) => {
    const { row, col } = activeCell;
    switch (e.key) {
      case 'ArrowUp': e.preventDefault(); setActiveCell({ row: Math.max(0, row - 1), col }); break;
      case 'ArrowDown': e.preventDefault(); setActiveCell({ row: Math.min(tableData.length - 1, row + 1), col }); break;
      case 'ArrowLeft': e.preventDefault(); setActiveCell({ row, col: Math.max(0, col - 1) }); break;
      case 'ArrowRight': e.preventDefault(); setActiveCell({ row, col: Math.min(tableData[0].length - 1, col + 1) }); break;
      case 'Enter': e.preventDefault(); break;
    }
  };

  // Event Log
  const handleLogKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newEvent: KeyEvent = {
      id: ++logIdRef.current,
      type: e.type,
      key: e.key,
      code: e.code,
      time: new Date().toLocaleTimeString(),
    };
    setEventLog(prev => [newEvent, ...prev].slice(0, 30));
  };

  return (
    <div data-testid="keyboard-controls-page">
      <h1 className="page-title" data-testid="page-title">Keyboard Controls</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice keyboard events, shortcuts, focus navigation, and key combinations for automation testing.
      </p>

      <div className="grid-2">
        {/* Keyboard Input Tester */}
        <div className="card" data-testid="keyboard-input-card">
          <h3 className="card__title">Keyboard Input Tester</h3>
          <p className="help-text mb-16">Press any key in the input field to see details.</p>
          <div className="form-group">
            <label htmlFor="keyboardInput" data-testid="keyboard-input-label">Press any key</label>
            <input
              id="keyboardInput"
              className="form-control"
              type="text"
              placeholder="Press any key here"
              onKeyDown={handleKeyInput}
              onKeyUp={handleKeyInput}
              aria-label="Keyboard input test"
              data-testid="keyboard-input"
              data-test="keyboard-input"
              title="Keyboard input test"
              tabIndex={0}
            />
          </div>
          {lastKey && (
            <div className="mt-16" style={{ padding: 12, background: '#e3f2fd', borderRadius: 8 }} data-testid="keyboard-input-result">
              <p><strong>Key pressed:</strong> <span data-testid="key-pressed">{lastKey}</span></p>
              <p><strong>Key code:</strong> <span data-testid="key-code">{lastCode}</span></p>
              <p><strong>Event type:</strong> <span data-testid="event-type">{lastEvent}</span></p>
            </div>
          )}
        </div>

        {/* Key Combination Tester */}
        <div className="card" data-testid="key-combo-card">
          <h3 className="card__title">Key Combination Tester</h3>
          <p className="help-text mb-16">Press key combinations like Ctrl+A, Ctrl+Shift+K, Alt+Enter.</p>
          <div
            tabIndex={0}
            className="form-control"
            style={{ padding: 16, textAlign: 'center', cursor: 'text', minHeight: 48 }}
            onKeyDown={handleCombo}
            role="textbox"
            aria-label="Key combination input"
            data-testid="key-combo-input"
            data-test="key-combo-input"
            title="Press a key combination"
          >
            {combo ? '' : 'Click here and press a key combination'}
          </div>
          {combo && (
            <div className="mt-16" style={{ padding: 12, background: '#e8f5e9', borderRadius: 8 }} data-testid="key-combo-result">
              <p><strong>Detected Combination:</strong></p>
              <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2e7d32' }} data-testid="combo-display">{combo}</p>
            </div>
          )}
        </div>

        {/* Keyboard Shortcut Playground */}
        <div className="card" data-testid="shortcut-card">
          <h3 className="card__title">Keyboard Shortcut Playground</h3>
          <p className="help-text mb-16">These shortcuts work anywhere on the page:</p>
          <div className="table-container">
            <table role="table" aria-label="Keyboard shortcuts" data-testid="shortcut-table">
              <thead><tr><th>Shortcut</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td><kbd>Ctrl + S</kbd></td><td>Save action</td></tr>
                <tr><td><kbd>Ctrl + N</kbd></td><td>New article</td></tr>
                <tr><td><kbd>Ctrl + D</kbd></td><td>Delete item</td></tr>
                <tr><td><kbd>Ctrl + L</kbd></td><td>Clear input</td></tr>
              </tbody>
            </table>
          </div>
          {shortcutResult && (
            <div className="mt-16" style={{ padding: 12, background: '#e3f2fd', borderRadius: 8 }} data-testid="shortcut-result" role="alert">
              <strong>Result:</strong> <span data-testid="shortcut-result-text">{shortcutResult}</span>
            </div>
          )}
        </div>

        {/* Focus Navigation Playground */}
        <div className="card" data-testid="focus-nav-card">
          <h3 className="card__title">Focus Navigation Playground</h3>
          <p className="help-text mb-16">Use TAB, SHIFT+TAB, ENTER, and ESC to navigate.</p>
          <div className="form-group">
            <label htmlFor="focus-name" data-testid="focus-name-label">Name</label>
            <input id="focus-name" className="form-control" type="text" placeholder="Enter name" aria-label="Name" data-testid="focus-name-input" data-test="focus-name-input" title="Name" tabIndex={0} onFocus={() => setFocusedField('Name')} />
          </div>
          <div className="form-group">
            <label htmlFor="focus-email" data-testid="focus-email-label">Email</label>
            <input id="focus-email" className="form-control" type="email" placeholder="Enter email" aria-label="Email" data-testid="focus-email-input" data-test="focus-email-input" title="Email" tabIndex={0} onFocus={() => setFocusedField('Email')} />
          </div>
          <div className="form-group">
            <label htmlFor="focus-password" data-testid="focus-password-label">Password</label>
            <input id="focus-password" className="form-control" type="password" placeholder="Enter password" aria-label="Password" data-testid="focus-password-input" data-test="focus-password-input" title="Password" tabIndex={0} onFocus={() => setFocusedField('Password')} />
          </div>
          <div className="form-group">
            <label htmlFor="focus-country" data-testid="focus-country-label">Country</label>
            <select id="focus-country" className="form-control" aria-label="Country" data-testid="focus-country-select" data-test="focus-country-select" title="Country" tabIndex={0} onFocus={() => setFocusedField('Country')}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
          <button className="btn btn-primary" data-testid="focus-submit-btn" data-test="focus-submit-btn" aria-label="Submit" title="Submit" tabIndex={0} onFocus={() => setFocusedField('Submit Button')}>Submit</button>
          {focusedField && <p className="help-text mt-16" data-testid="focus-current">Currently focused: <strong>{focusedField}</strong></p>}
        </div>

        {/* Modal Keyboard Interaction */}
        <div className="card" data-testid="modal-keyboard-card">
          <h3 className="card__title">Modal Keyboard Interaction</h3>
          <p className="help-text mb-16">ESC to close, TAB to move focus, ENTER to confirm.</p>
          <button
            className="btn btn-primary"
            onClick={() => { setModalOpen(true); setModalResult(''); }}
            data-testid="open-keyboard-modal-btn"
            data-test="open-keyboard-modal-btn"
            aria-label="Open Keyboard Modal"
            title="Open Keyboard Modal"
          >
            Open Modal
          </button>
          {modalResult && <p className="help-text mt-16" data-testid="modal-keyboard-result" role="alert">{modalResult}</p>}
        </div>

        {/* Table Navigation */}
        <div className="card" data-testid="table-nav-card">
          <h3 className="card__title">Table Navigation With Keyboard</h3>
          <p className="help-text mb-16">Click a cell, then use Arrow Keys to navigate. Enter to select.</p>
          <div className="table-container">
            <table
              ref={tableRef}
              className="data-table"
              role="grid"
              aria-label="Keyboard navigable table"
              data-testid="keyboard-nav-table"
              data-test="keyboard-nav-table"
              tabIndex={0}
              onKeyDown={handleTableKey}
              style={{ userSelect: 'none' }}
            >
              <thead><tr><th>Name</th><th>Department</th><th>Salary</th><th>Status</th></tr></thead>
              <tbody>
                {tableData.map((row, ri) => (
                  <tr key={ri} data-testid={`nav-row-${ri}`}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        data-testid={`nav-cell-${ri}-${ci}`}
                        onClick={() => setActiveCell({ row: ri, col: ci })}
                        style={{
                          background: activeCell.row === ri && activeCell.col === ci ? '#bbdefb' : undefined,
                          outline: activeCell.row === ri && activeCell.col === ci ? '2px solid #1976d2' : undefined,
                          cursor: 'pointer',
                        }}
                        role="gridcell"
                        aria-selected={activeCell.row === ri && activeCell.col === ci}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="help-text mt-16" data-testid="active-cell-display">
            Active cell: Row {activeCell.row + 1}, Col {activeCell.col + 1} — <strong>{tableData[activeCell.row][activeCell.col]}</strong>
          </p>
        </div>

        {/* Keyboard Event Log */}
        <div className="card" data-testid="event-log-card">
          <h3 className="card__title">Keyboard Events Log</h3>
          <p className="help-text mb-16">Type in the field to see live keyboard events.</p>
          <div className="form-group">
            <label htmlFor="event-log-input" data-testid="event-log-input-label">Type here</label>
            <input
              id="event-log-input"
              className="form-control"
              type="text"
              placeholder="Type to generate events..."
              onKeyDown={handleLogKey}
              onKeyUp={handleLogKey}
              aria-label="Event log input"
              data-testid="event-log-input"
              data-test="event-log-input"
              title="Event log input"
              tabIndex={0}
            />
          </div>
          <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 6, padding: 8, background: '#fafafa', fontSize: '0.82rem', fontFamily: 'monospace' }} data-testid="event-log-panel">
            {eventLog.length === 0 && <p className="help-text">No events yet...</p>}
            {eventLog.map(evt => (
              <div key={evt.id} data-testid={`log-entry-${evt.id}`} style={{ padding: '2px 0', borderBottom: '1px solid #eee' }}>
                <span style={{ color: evt.type === 'keydown' ? '#1976d2' : '#4caf50' }}>{evt.type}</span>
                {' → '}
                <strong>{evt.key}</strong>
                {' '}({evt.code})
                {' '}
                <span style={{ color: '#999' }}>{evt.time}</span>
              </div>
            ))}
          </div>
          {eventLog.length > 0 && (
            <button className="btn btn-sm btn-outline mt-16" onClick={() => setEventLog([])} data-testid="clear-log-btn" aria-label="Clear event log" title="Clear event log">
              Clear Log
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" data-testid="keyboard-modal-overlay" onClick={() => setModalOpen(false)}>
          <div
            ref={modalRef}
            className="modal"
            data-testid="keyboard-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard Modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal__header">
              <h3 className="modal__title" data-testid="keyboard-modal-title">Keyboard Modal</h3>
              <button className="modal__close" onClick={() => setModalOpen(false)} data-testid="keyboard-modal-close" aria-label="Close modal" title="Close">×</button>
            </div>
            <div>
              <p>Use keyboard to interact:</p>
              <ul style={{ paddingLeft: 20, listStyle: 'disc', margin: '8px 0' }}>
                <li><kbd>ESC</kbd> — Close this modal</li>
                <li><kbd>TAB</kbd> — Navigate between fields</li>
                <li><kbd>ENTER</kbd> — Confirm and close</li>
              </ul>
              <div className="form-group mt-16">
                <label htmlFor="modal-kb-input">Type something</label>
                <input id="modal-kb-input" className="form-control" type="text" placeholder="Focus here with Tab" aria-label="Modal keyboard input" data-testid="modal-kb-input" data-test="modal-kb-input" title="Modal keyboard input" tabIndex={0} />
              </div>
              <div className="flex gap-8 mt-16">
                <button className="btn btn-primary" onClick={() => { setModalOpen(false); setModalResult('Confirmed via button'); }} data-testid="modal-kb-confirm" aria-label="Confirm" title="Confirm" tabIndex={0}>Confirm</button>
                <button className="btn btn-secondary" onClick={() => { setModalOpen(false); setModalResult('Cancelled via button'); }} data-testid="modal-kb-cancel" aria-label="Cancel" title="Cancel" tabIndex={0}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
