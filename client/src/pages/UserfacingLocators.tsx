import { useState } from 'react';

export default function UserfacingLocators() {
  const [roleOutput, setRoleOutput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [labelOutput, setLabelOutput] = useState('');
  const [placeholderOutput, setPlaceholderOutput] = useState('');
  const [altOutput, setAltOutput] = useState('');
  const [titleOutput, setTitleOutput] = useState('');
  const [testIdOutput, setTestIdOutput] = useState('');

  return (
    <div data-testid="userfacing-locators-page">
      <h1 className="page-title" data-testid="page-title">Userfacing Locators</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice Playwright user-facing locators. Each section has live elements and the corresponding locator code.
      </p>

      <div className="grid-2">

        {/* ===== getByRole ===== */}
        <div className="card" data-testid="getbyrole-card">
          <h3 className="card__title">page.getByRole()</h3>
          <p className="help-text mb-16">Locate elements by their ARIA role, button, heading, checkbox, link, etc.</p>

          <div className="form-group">
            <button
              className="btn btn-primary"
              role="button"
              data-testid="role-submit-btn"
              data-test="role-submit-btn"
              aria-label="Submit Order"
              title="Submit Order"
              onClick={() => setRoleOutput('Submit Order clicked!')}
            >
              Submit Order
            </button>
          </div>

          <div className="form-group">
            <button
              className="btn btn-danger"
              role="button"
              data-testid="role-cancel-btn"
              data-test="role-cancel-btn"
              aria-label="Cancel Order"
              title="Cancel Order"
              onClick={() => setRoleOutput('Cancel Order clicked!')}
            >
              Cancel Order
            </button>
          </div>

          <div className="form-group">
            <a href="#getbyrole" role="link" data-testid="role-nav-link" data-test="role-nav-link" aria-label="Navigate to Dashboard" title="Navigate to Dashboard" onClick={e => { e.preventDefault(); setRoleOutput('Dashboard link clicked!'); }}>
              Navigate to Dashboard
            </a>
          </div>

          <div className="form-group">
            <label>
              <input type="checkbox" role="checkbox" data-testid="role-agree-checkbox" data-test="role-agree-checkbox" aria-label="Agree to Terms" title="Agree to Terms" onChange={e => setRoleOutput(e.target.checked ? 'Agreed to terms' : 'Unchecked terms')} />
              {' '}Agree to Terms
            </label>
          </div>

          <div className="form-group">
            <h4 role="heading" aria-level={4} data-testid="role-section-heading" data-test="role-section-heading">Section Heading</h4>
          </div>

          {roleOutput && <div className="mt-16" style={{ padding: 8, background: '#e3f2fd', borderRadius: 6 }} data-testid="role-output" role="alert">{roleOutput}</div>}

          <pre className="api-response mt-16" data-testid="role-code-example"><code>{`// getByRole examples:
await page.getByRole('button', { name: 'Submit Order' }).click();
await page.getByRole('button', { name: 'Cancel Order' }).click();
await page.getByRole('link', { name: 'Navigate to Dashboard' }).click();
await page.getByRole('checkbox', { name: 'Agree to Terms' }).check();
await page.getByRole('heading', { name: 'Section Heading' });`}</code></pre>
        </div>

        {/* ===== getByText ===== */}
        <div className="card" data-testid="getbytext-card">
          <h3 className="card__title">page.getByText()</h3>
          <p className="help-text mb-16">Locate elements by their visible text content.</p>

          <div className="form-group">
            <p data-testid="text-welcome" data-test="text-welcome">Welcome to our platform!</p>
          </div>

          <div className="form-group">
            <span data-testid="text-status" data-test="text-status" style={{ padding: '4px 12px', background: '#e8f5e9', borderRadius: 4, color: '#2e7d32' }}>Status: Active</span>
          </div>

          <div className="form-group">
            <p data-testid="text-error-msg" data-test="text-error-msg" style={{ color: '#f44336' }}>Error: Invalid credentials</p>
          </div>

          <div className="form-group">
            <button className="btn btn-success" data-testid="text-proceed-btn" data-test="text-proceed-btn" onClick={() => setTextOutput('Proceed clicked!')} aria-label="Proceed to Checkout" title="Proceed to Checkout">
              Proceed to Checkout
            </button>
          </div>

          <div className="form-group">
            <span data-testid="text-item-count" data-test="text-item-count">Items in cart: 5</span>
          </div>

          {textOutput && <div className="mt-16" style={{ padding: 8, background: '#e3f2fd', borderRadius: 6 }} data-testid="text-output" role="alert">{textOutput}</div>}

          <pre className="api-response mt-16" data-testid="text-code-example"><code>{`// getByText examples:
await page.getByText('Welcome to our platform!').isVisible();
await page.getByText('Status: Active').isVisible();
await page.getByText('Error: Invalid credentials').isVisible();
await page.getByText('Proceed to Checkout').click();
await page.getByText('Items in cart: 5').isVisible();
// Partial match:
await page.getByText('Invalid', { exact: false });`}</code></pre>
        </div>

        {/* ===== getByLabel ===== */}
        <div className="card" data-testid="getbylabel-card">
          <h3 className="card__title">page.getByLabel()</h3>
          <p className="help-text mb-16">Locate form elements by their associated label text.</p>

          <div className="form-group">
            <label htmlFor="label-username" data-testid="label-username-label">Username</label>
            <input id="label-username" className="form-control" type="text" data-testid="label-username-input" data-test="label-username-input" aria-label="Username" title="Username" placeholder="Enter username" onChange={e => setLabelOutput(`Username: ${e.target.value}`)} />
          </div>

          <div className="form-group">
            <label htmlFor="label-email" data-testid="label-email-label">Email Address</label>
            <input id="label-email" className="form-control" type="email" data-testid="label-email-input" data-test="label-email-input" aria-label="Email Address" title="Email Address" placeholder="user@example.com" onChange={e => setLabelOutput(`Email: ${e.target.value}`)} />
          </div>

          <div className="form-group">
            <label htmlFor="label-password" data-testid="label-password-label">Password</label>
            <input id="label-password" className="form-control" type="password" data-testid="label-password-input" data-test="label-password-input" aria-label="Password" title="Password" placeholder="Enter password" onChange={e => setLabelOutput(`Password entered (${e.target.value.length} chars)`)} />
          </div>

          <div className="form-group">
            <label htmlFor="label-country" data-testid="label-country-label">Country</label>
            <select id="label-country" className="form-control" data-testid="label-country-select" data-test="label-country-select" aria-label="Country" title="Country" onChange={e => setLabelOutput(`Country: ${e.target.value}`)}>
              <option value="">Select country</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="label-bio" data-testid="label-bio-label">Bio</label>
            <textarea id="label-bio" className="form-control" rows={2} data-testid="label-bio-textarea" data-test="label-bio-textarea" aria-label="Bio" title="Bio" placeholder="Tell us about yourself" onChange={e => setLabelOutput(`Bio: ${e.target.value}`)} />
          </div>

          {labelOutput && <div className="mt-16" style={{ padding: 8, background: '#e3f2fd', borderRadius: 6 }} data-testid="label-output" role="alert">{labelOutput}</div>}

          <pre className="api-response mt-16" data-testid="label-code-example"><code>{`// getByLabel examples:
await page.getByLabel('Username').fill('john_doe');
await page.getByLabel('Email Address').fill('john@test.com');
await page.getByLabel('Password').fill('secret123');
await page.getByLabel('Country').selectOption('India');
await page.getByLabel('Bio').fill('I am a tester');`}</code></pre>
        </div>

        {/* ===== getByPlaceholder ===== */}
        <div className="card" data-testid="getbyplaceholder-card">
          <h3 className="card__title">page.getByPlaceholder()</h3>
          <p className="help-text mb-16">Locate input elements by their placeholder text.</p>

          <div className="form-group">
            <input className="form-control" type="text" placeholder="Enter your full name" data-testid="ph-name-input" data-test="ph-name-input" aria-label="Full Name" title="Full Name" onChange={e => setPlaceholderOutput(`Name: ${e.target.value}`)} />
          </div>

          <div className="form-group">
            <input className="form-control" type="email" placeholder="you@company.com" data-testid="ph-email-input" data-test="ph-email-input" aria-label="Company Email" title="Company Email" onChange={e => setPlaceholderOutput(`Email: ${e.target.value}`)} />
          </div>

          <div className="form-group">
            <input className="form-control" type="tel" placeholder="+1 (555) 000-0000" data-testid="ph-phone-input" data-test="ph-phone-input" aria-label="Phone Number" title="Phone Number" onChange={e => setPlaceholderOutput(`Phone: ${e.target.value}`)} />
          </div>

          <div className="form-group">
            <input className="form-control" type="text" placeholder="Search products..." data-testid="ph-search-input" data-test="ph-search-input" aria-label="Search Products" title="Search Products" onChange={e => setPlaceholderOutput(`Search: ${e.target.value}`)} />
          </div>

          <div className="form-group">
            <textarea className="form-control" rows={2} placeholder="Write your feedback here..." data-testid="ph-feedback-input" data-test="ph-feedback-input" aria-label="Feedback" title="Feedback" onChange={e => setPlaceholderOutput(`Feedback: ${e.target.value}`)} />
          </div>

          {placeholderOutput && <div className="mt-16" style={{ padding: 8, background: '#e3f2fd', borderRadius: 6 }} data-testid="placeholder-output" role="alert">{placeholderOutput}</div>}

          <pre className="api-response mt-16" data-testid="placeholder-code-example"><code>{`// getByPlaceholder examples:
await page.getByPlaceholder('Enter your full name').fill('John Doe');
await page.getByPlaceholder('you@company.com').fill('john@acme.com');
await page.getByPlaceholder('+1 (555) 000-0000').fill('+1 (555) 123-4567');
await page.getByPlaceholder('Search products...').fill('laptop');
await page.getByPlaceholder('Write your feedback here...').fill('Great!');`}</code></pre>
        </div>

        {/* ===== getByAltText ===== */}
        <div className="card" data-testid="getbyalttext-card">
          <h3 className="card__title">page.getByAltText()</h3>
          <p className="help-text mb-16">Locate elements (usually images) by their alt text attribute.</p>

          <div className="form-group flex gap-12" style={{ flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80' fill='%231976d2'%3E%3Crect width='120' height='80' rx='8'/%3E%3Ctext x='50%25' y='55%25' fill='white' text-anchor='middle' font-size='12'%3EProfile%3C/text%3E%3C/svg%3E"
                alt="User Profile Picture"
                data-testid="alt-profile-img"
                data-test="alt-profile-img"
                title="User Profile Picture"
                onClick={() => setAltOutput('Profile picture clicked!')}
                style={{ cursor: 'pointer', borderRadius: 8 }}
              />
              <p className="help-text">User Profile Picture</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80' fill='%234caf50'%3E%3Crect width='120' height='80' rx='8'/%3E%3Ctext x='50%25' y='55%25' fill='white' text-anchor='middle' font-size='12'%3ELogo%3C/text%3E%3C/svg%3E"
                alt="Company Logo"
                data-testid="alt-logo-img"
                data-test="alt-logo-img"
                title="Company Logo"
                onClick={() => setAltOutput('Company logo clicked!')}
                style={{ cursor: 'pointer', borderRadius: 8 }}
              />
              <p className="help-text">Company Logo</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80' fill='%23ff9800'%3E%3Crect width='120' height='80' rx='8'/%3E%3Ctext x='50%25' y='55%25' fill='white' text-anchor='middle' font-size='12'%3EBanner%3C/text%3E%3C/svg%3E"
                alt="Promotional Banner"
                data-testid="alt-banner-img"
                data-test="alt-banner-img"
                title="Promotional Banner"
                onClick={() => setAltOutput('Promotional banner clicked!')}
                style={{ cursor: 'pointer', borderRadius: 8 }}
              />
              <p className="help-text">Promotional Banner</p>
            </div>
          </div>

          <div className="form-group">
            <input type="image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='32' fill='%231976d2'%3E%3Crect width='100' height='32' rx='4'/%3E%3Ctext x='50%25' y='65%25' fill='white' text-anchor='middle' font-size='11'%3ESubmit%3C/text%3E%3C/svg%3E" alt="Submit Form" data-testid="alt-submit-img" data-test="alt-submit-img" title="Submit Form" onClick={e => { e.preventDefault(); setAltOutput('Submit image button clicked!'); }} />
          </div>

          {altOutput && <div className="mt-16" style={{ padding: 8, background: '#e3f2fd', borderRadius: 6 }} data-testid="alt-output" role="alert">{altOutput}</div>}

          <pre className="api-response mt-16" data-testid="alt-code-example"><code>{`// getByAltText examples:
await page.getByAltText('User Profile Picture').click();
await page.getByAltText('Company Logo').isVisible();
await page.getByAltText('Promotional Banner').click();
await page.getByAltText('Submit Form').click();`}</code></pre>
        </div>

        {/* ===== getByTitle ===== */}
        <div className="card" data-testid="getbytitle-card">
          <h3 className="card__title">page.getByTitle()</h3>
          <p className="help-text mb-16">Locate elements by their title attribute (tooltip text).</p>

          <div className="form-group">
            <button className="btn btn-primary" title="Save Document" data-testid="title-save-btn" data-test="title-save-btn" aria-label="Save Document" onClick={() => setTitleOutput('Save Document clicked!')}>
              💾 Save
            </button>
          </div>

          <div className="form-group">
            <button className="btn btn-danger" title="Delete Record" data-testid="title-delete-btn" data-test="title-delete-btn" aria-label="Delete Record" onClick={() => setTitleOutput('Delete Record clicked!')}>
              🗑️ Delete
            </button>
          </div>

          <div className="form-group">
            <button className="btn btn-warning" title="Edit Profile" data-testid="title-edit-btn" data-test="title-edit-btn" aria-label="Edit Profile" onClick={() => setTitleOutput('Edit Profile clicked!')}>
              ✏️ Edit
            </button>
          </div>

          <div className="form-group">
            <span title="Total Revenue" data-testid="title-revenue-span" data-test="title-revenue-span" style={{ padding: '6px 12px', background: '#e8f5e9', borderRadius: 6, fontWeight: 600 }}>
              $12,450.00
            </span>
          </div>

          <div className="form-group">
            <abbr title="Application Programming Interface" data-testid="title-abbr" data-test="title-abbr" style={{ fontWeight: 600, textDecoration: 'underline dotted' }}>
              API
            </abbr>
          </div>

          {titleOutput && <div className="mt-16" style={{ padding: 8, background: '#e3f2fd', borderRadius: 6 }} data-testid="title-output" role="alert">{titleOutput}</div>}

          <pre className="api-response mt-16" data-testid="title-code-example"><code>{`// getByTitle examples:
await page.getByTitle('Save Document').click();
await page.getByTitle('Delete Record').click();
await page.getByTitle('Edit Profile').click();
await page.getByTitle('Total Revenue').isVisible();
await page.getByTitle('Application Programming Interface').isVisible();`}</code></pre>
        </div>

        {/* ===== getByTestId ===== */}
        <div className="card" data-testid="getbytestid-card">
          <h3 className="card__title">page.getByTestId()</h3>
          <p className="help-text mb-16">Locate elements by their data-testid attribute. Use as a last resort when other locators aren't suitable.</p>

          <div className="form-group">
            <button className="btn btn-primary" data-testid="testid-add-to-cart" data-test="testid-add-to-cart" aria-label="Add to Cart" title="Add to Cart" onClick={() => setTestIdOutput('Added to cart!')}>
              🛒 Add to Cart
            </button>
          </div>

          <div className="form-group">
            <div data-testid="testid-notification-badge" data-test="testid-notification-badge" style={{ display: 'inline-block', padding: '4px 12px', background: '#f44336', color: 'white', borderRadius: 12, fontWeight: 600, fontSize: '0.85rem' }}>
              3 Notifications
            </div>
          </div>

          <div className="form-group">
            <input className="form-control" type="text" data-testid="testid-coupon-input" data-test="testid-coupon-input" aria-label="Coupon Code" title="Coupon Code" placeholder="Enter coupon code" onChange={e => setTestIdOutput(`Coupon: ${e.target.value}`)} />
          </div>

          <div className="form-group">
            <div data-testid="testid-loading-bar" data-test="testid-loading-bar" style={{ height: 8, background: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: 4, transition: 'width 0.3s' }} />
            </div>
            <span className="help-text">Progress: 65%</span>
          </div>

          <div className="form-group">
            <table data-testid="testid-mini-table" data-test="testid-mini-table" role="table" aria-label="Mini Data Table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead><tr><th style={{ textAlign: 'left', padding: '4px 8px', borderBottom: '1px solid #e0e0e0' }}>Item</th><th style={{ textAlign: 'right', padding: '4px 8px', borderBottom: '1px solid #e0e0e0' }}>Price</th></tr></thead>
              <tbody>
                <tr data-testid="testid-row-1"><td style={{ padding: '4px 8px' }}>Widget A</td><td style={{ textAlign: 'right', padding: '4px 8px' }}>$9.99</td></tr>
                <tr data-testid="testid-row-2"><td style={{ padding: '4px 8px' }}>Widget B</td><td style={{ textAlign: 'right', padding: '4px 8px' }}>$19.99</td></tr>
              </tbody>
            </table>
          </div>

          {testIdOutput && <div className="mt-16" style={{ padding: 8, background: '#e3f2fd', borderRadius: 6 }} data-testid="testid-output" role="alert">{testIdOutput}</div>}

          <pre className="api-response mt-16" data-testid="testid-code-example"><code>{`// getByTestId examples:
await page.getByTestId('testid-add-to-cart').click();
await page.getByTestId('testid-notification-badge').isVisible();
await page.getByTestId('testid-coupon-input').fill('SAVE20');
await page.getByTestId('testid-loading-bar').isVisible();
await page.getByTestId('testid-mini-table').isVisible();
await page.getByTestId('testid-row-1').isVisible();`}</code></pre>
        </div>

      </div>
    </div>
  );
}
