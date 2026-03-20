import { useState } from 'react';

export default function TextInputs() {
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [maskedValue, setMaskedValue] = useState('');
  const [showMasked, setShowMasked] = useState(false);

  return (
    <div data-testid="text-inputs-page">
      <h1 className="page-title" data-testid="page-title">Text Input Controls</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice with various text input types. All inputs support Playwright locators.
      </p>

      <div className="grid-2">
        {/* Text Input */}
        <div className="card" data-testid="text-input-card">
          <h3 className="card__title">Text Input</h3>
          <div className="form-group">
            <label htmlFor="fullname" data-testid="fullname-label">Full Name</label>
            <input
              id="fullname"
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              aria-label="Full Name"
              data-testid="fullname-input"
              data-test="fullname-input"
              title="Full Name"
            />
            {textValue && <p className="help-text" data-testid="fullname-output">You typed: {textValue}</p>}
          </div>
        </div>

        {/* Email Input */}
        <div className="card" data-testid="email-input-card">
          <h3 className="card__title">Email Input</h3>
          <div className="form-group">
            <label htmlFor="email" data-testid="email-label">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              aria-label="Email Address"
              data-testid="email-input"
              data-test="email-input"
              title="Email Address"
            />
            {emailValue && <p className="help-text" data-testid="email-output">Email: {emailValue}</p>}
          </div>
        </div>

        {/* Password Input */}
        <div className="card" data-testid="password-input-card">
          <h3 className="card__title">Password Input</h3>
          <div className="form-group">
            <label htmlFor="password" data-testid="password-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              aria-label="Password"
              data-testid="password-input"
              data-test="password-input"
              title="Password"
            />
            {passwordValue && <p className="help-text" data-testid="password-output">Length: {passwordValue.length} characters</p>}
          </div>
        </div>

        {/* Number Input */}
        <div className="card" data-testid="number-input-card">
          <h3 className="card__title">Number Input</h3>
          <div className="form-group">
            <label htmlFor="age" data-testid="age-label">Age</label>
            <input
              id="age"
              type="number"
              className="form-control"
              placeholder="Enter your age"
              min="0"
              max="150"
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
              aria-label="Age"
              data-testid="age-input"
              data-test="age-input"
              title="Age"
            />
            {numberValue && <p className="help-text" data-testid="age-output">Age: {numberValue}</p>}
          </div>
        </div>

        {/* Phone Input */}
        <div className="card" data-testid="phone-input-card">
          <h3 className="card__title">Phone Input</h3>
          <div className="form-group">
            <label htmlFor="phone" data-testid="phone-label">Phone Number</label>
            <input
              id="phone"
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              value={phoneValue}
              onChange={(e) => setPhoneValue(e.target.value)}
              aria-label="Phone Number"
              data-testid="phone-input"
              data-test="phone-input"
              title="Phone Number"
            />
            {phoneValue && <p className="help-text" data-testid="phone-output">Phone: {phoneValue}</p>}
          </div>
        </div>

        {/* Search Input */}
        <div className="card" data-testid="search-input-card">
          <h3 className="card__title">Search Input</h3>
          <div className="form-group">
            <label htmlFor="search" data-testid="search-label">Search</label>
            <input
              id="search"
              type="search"
              className="form-control"
              placeholder="Search something..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Search"
              data-testid="search-field"
              data-test="search-field"
              title="Search"
            />
            {searchValue && <p className="help-text" data-testid="search-output">Searching for: {searchValue}</p>}
          </div>
        </div>

        {/* Textarea */}
        <div className="card" data-testid="textarea-card">
          <h3 className="card__title">Textarea</h3>
          <div className="form-group">
            <label htmlFor="message" data-testid="message-label">Message</label>
            <textarea
              id="message"
              className="form-control"
              placeholder="Enter your message here..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              aria-label="Message"
              data-testid="message-textarea"
              data-test="message-textarea"
              title="Message"
              rows={4}
            />
            {textareaValue && (
              <p className="help-text" data-testid="textarea-output">
                Characters: {textareaValue.length} | Words: {textareaValue.trim().split(/\s+/).filter(Boolean).length}
              </p>
            )}
          </div>
        </div>

        {/* Masked Input */}
        <div className="card" data-testid="masked-input-card">
          <h3 className="card__title">Masked Input</h3>
          <div className="form-group">
            <label htmlFor="ssn" data-testid="ssn-label">SSN / Secret Code</label>
            <div className="masked-input-wrapper">
              <input
                id="ssn"
                type={showMasked ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter secret code"
                value={maskedValue}
                onChange={(e) => setMaskedValue(e.target.value)}
                aria-label="SSN or Secret Code"
                data-testid="masked-input"
                data-test="masked-input"
                title="SSN / Secret Code"
              />
              <button
                className="toggle-mask"
                onClick={() => setShowMasked(!showMasked)}
                data-testid="toggle-mask-btn"
                type="button"
                aria-label={showMasked ? 'Hide value' : 'Show value'}
                title={showMasked ? 'Hide value' : 'Show value'}
              >
                {showMasked ? '🙈' : '👁️'}
              </button>
            </div>
            {maskedValue && <p className="help-text" data-testid="masked-output">Value entered ({maskedValue.length} chars)</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
