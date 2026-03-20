export default function Documentation() {
  return (
    <div data-testid="documentation-page">
      <h1 className="page-title" data-testid="page-title">Documentation</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Setup guide, available controls, API reference, and Playwright locator examples.
      </p>

      {/* Quick Start */}
      <div className="card" data-testid="quickstart-card">
        <h2 className="card__title">Quick Start</h2>
        <ol data-testid="quickstart-steps">
          <li><strong>Backend:</strong> <code>cd server &amp;&amp; npm install &amp;&amp; npm run dev</code></li>
          <li><strong>Frontend:</strong> <code>cd client &amp;&amp; npm install &amp;&amp; npm run dev</code></li>
          <li>Open <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" data-testid="app-link">http://localhost:5173</a> in your browser</li>
          <li>Backend API runs on <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer" data-testid="api-link">http://localhost:5000</a></li>
        </ol>
      </div>

      {/* Available Practice Areas */}
      <div className="card" data-testid="practice-areas-card">
        <h2 className="card__title">Practice Areas</h2>
        <div className="table-container">
          <table data-testid="practice-areas-table" role="table" aria-label="Practice areas overview">
            <thead>
              <tr>
                <th>Area</th>
                <th>Description</th>
                <th>Key Elements</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Text Inputs</td><td>Various input types with validation</td><td>Text, email, password, number, phone, search, textarea, masked input</td></tr>
              <tr><td>Buttons</td><td>Button variants and interactions</td><td>Primary, secondary, icon, toggle, loading, disabled, sizes, outline</td></tr>
              <tr><td>Selection Controls</td><td>Checkboxes, radios, dropdowns</td><td>Checkbox group, radio group, single/multi select, autocomplete, tags</td></tr>
              <tr><td>Date &amp; Time</td><td>Date and time pickers</td><td>Date, date range, time, datetime, month, week</td></tr>
              <tr><td>File Controls</td><td>File upload interactions</td><td>Single file, multiple files, drag &amp; drop, image preview</td></tr>
              <tr><td>Tables</td><td>Table interactions and data</td><td>Static, dynamic (sort/search/paginate), editable, expandable rows</td></tr>
              <tr><td>Alerts &amp; Modals</td><td>Dialog and notification testing</td><td>Alert, confirm, prompt, toast, snackbar, modal</td></tr>
              <tr><td>Iframes</td><td>Cross-frame interactions</td><td>Single iframe, nested iframes</td></tr>
              <tr><td>Mouse Actions</td><td>Advanced mouse interactions</td><td>Hover, right-click context menu, double-click, slider, resize</td></tr>
              <tr><td>Drag &amp; Drop</td><td>Draggable elements</td><td>Sortable list, cross-container drag</td></tr>
              <tr><td>Windows &amp; Tabs</td><td>Multi-window handling</td><td>New tab, popup window, external links</td></tr>
              <tr><td>Dynamic Elements</td><td>Waiting and timing</td><td>Spinner, delayed element, progress bar, skeleton, auto-disappear</td></tr>
              <tr><td>Scrolling</td><td>Scroll interactions</td><td>Infinite scroll, scroll-to-element, sticky headers</td></tr>
              <tr><td>Charts</td><td>Chart.js visualizations</td><td>Bar, line, pie, area charts</td></tr>
              <tr><td>Dashboard</td><td>Complex layout testing</td><td>Stat cards, charts, notifications, activity feed</td></tr>
              <tr><td>API Playground</td><td>REST API testing</td><td>Register, login, CRUD articles, JWT auth</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* API Reference */}
      <div className="card" data-testid="api-reference-card">
        <h2 className="card__title">API Endpoints</h2>

        <h3>Authentication</h3>
        <div className="table-container">
          <table role="table" aria-label="Authentication endpoints" data-testid="auth-endpoints-table">
            <thead><tr><th>Method</th><th>Endpoint</th><th>Auth</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><span className="api-method-badge post">POST</span></td><td>/api/auth/register</td><td>No</td><td>Register a new user. Body: name, email, password</td></tr>
              <tr><td><span className="api-method-badge post">POST</span></td><td>/api/auth/login</td><td>No</td><td>Login and receive JWT token. Body: email, password</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Articles</h3>
        <div className="table-container">
          <table role="table" aria-label="Article endpoints" data-testid="article-endpoints-table">
            <thead><tr><th>Method</th><th>Endpoint</th><th>Auth</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><span className="api-method-badge get">GET</span></td><td>/api/articles</td><td>No</td><td>Get all articles</td></tr>
              <tr><td><span className="api-method-badge get">GET</span></td><td>/api/articles/:id</td><td>No</td><td>Get single article by ID</td></tr>
              <tr><td><span className="api-method-badge post">POST</span></td><td>/api/articles</td><td>Yes</td><td>Create article. Body: title, content, tags[]</td></tr>
              <tr><td><span className="api-method-badge put">PUT</span></td><td>/api/articles/:id</td><td>Yes</td><td>Update article. Body: title, content</td></tr>
              <tr><td><span className="api-method-badge delete">DELETE</span></td><td>/api/articles/:id</td><td>Yes</td><td>Delete article</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Upload</h3>
        <div className="table-container">
          <table role="table" aria-label="Upload endpoints" data-testid="upload-endpoints-table">
            <thead><tr><th>Method</th><th>Endpoint</th><th>Auth</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><span className="api-method-badge post">POST</span></td><td>/api/upload/single</td><td>No</td><td>Upload single file (field: file, max 10MB)</td></tr>
              <tr><td><span className="api-method-badge post">POST</span></td><td>/api/upload/multiple</td><td>No</td><td>Upload multiple files (field: files, max 10MB each)</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Health</h3>
        <div className="table-container">
          <table role="table" aria-label="Health endpoints" data-testid="health-endpoints-table">
            <thead><tr><th>Method</th><th>Endpoint</th><th>Auth</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><span className="api-method-badge get">GET</span></td><td>/api/health</td><td>No</td><td>Server health check</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Playwright Locator Examples */}
      <div className="card" data-testid="playwright-examples-card">
        <h2 className="card__title">Playwright Locator Examples</h2>
        <p>All elements in this application support multiple Playwright locator strategies:</p>

        <h3>getByRole</h3>
        <pre className="api-response" data-testid="example-getbyrole"><code>{`// Buttons
await page.getByRole('button', { name: 'Submit' }).click();

// Text inputs
await page.getByRole('textbox', { name: 'Full Name' }).fill('John');

// Checkboxes
await page.getByRole('checkbox', { name: 'Accept Terms' }).check();

// Radio buttons
await page.getByRole('radio', { name: 'Male' }).check();

// Links
await page.getByRole('link', { name: 'Home' }).click();

// Tables
await page.getByRole('table', { name: 'Employee Data' });

// Headings
await page.getByRole('heading', { name: 'Text Inputs' });`}</code></pre>

        <h3>getByLabel</h3>
        <pre className="api-response" data-testid="example-getbylabel"><code>{`// Form inputs
await page.getByLabel('Full Name').fill('John Doe');
await page.getByLabel('Email Address').fill('john@test.com');
await page.getByLabel('Password').fill('secret');

// Select dropdowns
await page.getByLabel('Country').selectOption('USA');

// Checkboxes
await page.getByLabel('Accept Terms').check();`}</code></pre>

        <h3>getByPlaceholder</h3>
        <pre className="api-response" data-testid="example-getbyplaceholder"><code>{`await page.getByPlaceholder('Enter your name').fill('John');
await page.getByPlaceholder('you@example.com').fill('test@test.com');
await page.getByPlaceholder('Search...').fill('query');`}</code></pre>

        <h3>getByText</h3>
        <pre className="api-response" data-testid="example-getbytext"><code>{`// Click text content
await page.getByText('Submit').click();
await page.getByText('Welcome to the Playground').isVisible();

// Partial match
await page.getByText('Submit', { exact: false });`}</code></pre>

        <h3>getByTestId</h3>
        <pre className="api-response" data-testid="example-getbytestid"><code>{`// All elements have data-testid attributes
await page.getByTestId('submit-btn').click();
await page.getByTestId('name-input').fill('John');
await page.getByTestId('email-input').fill('john@test.com');
await page.getByTestId('dynamic-table').isVisible();`}</code></pre>

        <h3>getByTitle</h3>
        <pre className="api-response" data-testid="example-getbytitle"><code>{`// Elements with title attributes
await page.getByTitle('Submit Form').click();
await page.getByTitle('Full Name').fill('John');`}</code></pre>
      </div>

      {/* Common Patterns */}
      <div className="card" data-testid="common-patterns-card">
        <h2 className="card__title">Common Test Patterns</h2>

        <h3>Waiting for Elements</h3>
        <pre className="api-response" data-testid="example-waiting"><code>{`// Wait for spinner to disappear
await page.getByTestId('loading-spinner').waitFor({ state: 'hidden' });

// Wait for element to appear
await page.getByTestId('delayed-element').waitFor({ state: 'visible' });

// Wait for text to appear
await page.getByText('Data loaded').waitFor();`}</code></pre>

        <h3>Drag and Drop</h3>
        <pre className="api-response" data-testid="example-dragdrop"><code>{`// Drag and drop
const source = page.getByTestId('drag-item-1');
const target = page.getByTestId('done-list');
await source.dragTo(target);`}</code></pre>

        <h3>Iframes</h3>
        <pre className="api-response" data-testid="example-iframes"><code>{`// Access iframe content
const frame = page.frameLocator('#simple-iframe');
await frame.getByRole('textbox').fill('Hello');
await frame.getByRole('button', { name: 'Submit' }).click();

// Nested iframes
const outer = page.frameLocator('#outer-iframe');
const inner = outer.frameLocator('#nested-inner');
await inner.getByRole('textbox').fill('Nested!');`}</code></pre>

        <h3>API Testing</h3>
        <pre className="api-response" data-testid="example-api"><code>{`// Register a user
const registerRes = await request.post('/api/auth/register', {
  data: { name: 'John', email: 'john@test.com', password: 'pass123' }
});
expect(registerRes.ok()).toBeTruthy();

// Login & get token
const loginRes = await request.post('/api/auth/login', {
  data: { email: 'john@test.com', password: 'pass123' }
});
const { token } = await loginRes.json();

// Create article with auth
const articleRes = await request.post('/api/articles', {
  headers: { Authorization: \`Bearer \${token}\` },
  data: { title: 'Test', content: 'Content', tags: ['test'] }
});
expect(articleRes.status()).toBe(201);`}</code></pre>
      </div>

      {/* Attribute Naming Convention */}
      <div className="card" data-testid="naming-convention-card">
        <h2 className="card__title">Attribute Naming Conventions</h2>
        <div className="table-container">
          <table role="table" aria-label="Naming conventions" data-testid="naming-conventions-table">
            <thead><tr><th>Attribute</th><th>Pattern</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><code>data-testid</code></td><td>kebab-case descriptive name</td><td><code>data-testid="submit-btn"</code></td></tr>
              <tr><td><code>data-test</code></td><td>Same as data-testid</td><td><code>data-test="submit-btn"</code></td></tr>
              <tr><td><code>aria-label</code></td><td>Human-readable description</td><td><code>aria-label="Submit Form"</code></td></tr>
              <tr><td><code>title</code></td><td>Tooltip text</td><td><code>title="Click to submit"</code></td></tr>
              <tr><td><code>id</code></td><td>kebab-case unique identifier</td><td><code>id="name-input"</code></td></tr>
              <tr><td><code>role</code></td><td>ARIA role (implicit or explicit)</td><td><code>role="table"</code></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
