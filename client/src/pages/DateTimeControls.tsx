import { useState } from 'react';

export default function DateTimeControls() {
  const [dateValue, setDateValue] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  return (
    <div data-testid="date-time-page">
      <h1 className="page-title" data-testid="page-title">Date & Time Controls</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice with date pickers, time pickers, and calendar controls.
      </p>

      <div className="grid-2">
        {/* Date Picker */}
        <div className="card" data-testid="date-picker-card">
          <h3 className="card__title">Date Picker</h3>
          <div className="form-group">
            <label htmlFor="date-picker" data-testid="date-picker-label">Select Date</label>
            <input
              id="date-picker"
              type="date"
              className="form-control"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              aria-label="Select Date"
              data-testid="date-picker-input"
              data-test="date-picker-input"
              title="Select Date"
            />
            <p className="help-text" data-testid="date-picker-result">
              Selected: {dateValue || 'None'}
            </p>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="card" data-testid="date-range-card">
          <h3 className="card__title">Date Range Picker</h3>
          <div className="form-group">
            <label htmlFor="date-start" data-testid="date-start-label">Start Date</label>
            <input
              id="date-start"
              type="date"
              className="form-control"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              aria-label="Start Date"
              data-testid="date-start-input"
              data-test="date-start-input"
              title="Start Date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date-end" data-testid="date-end-label">End Date</label>
            <input
              id="date-end"
              type="date"
              className="form-control"
              value={dateEnd}
              min={dateStart}
              onChange={(e) => setDateEnd(e.target.value)}
              aria-label="End Date"
              data-testid="date-end-input"
              data-test="date-end-input"
              title="End Date"
            />
          </div>
          <p className="help-text" data-testid="date-range-result">
            Range: {dateStart || '...'} to {dateEnd || '...'}
          </p>
        </div>
      </div>
    </div>
  );
}
