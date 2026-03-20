import { useEffect, useRef } from 'react';

export default function ShadowDom() {
  const openRef = useRef<HTMLDivElement>(null);
  const closedRef = useRef<HTMLDivElement>(null);
  const nestedRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Open Shadow DOM
    if (openRef.current && !openRef.current.shadowRoot) {
      const shadow = openRef.current.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          .shadow-container { padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa; }
          .shadow-title { font-size: 1rem; font-weight: 600; margin-bottom: 8px; color: #333; }
          .shadow-input { padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.95rem; width: 100%; box-sizing: border-box; margin-bottom: 8px; }
          .shadow-btn { padding: 8px 16px; border: none; border-radius: 4px; background: #1976d2; color: white; cursor: pointer; font-size: 0.9rem; }
          .shadow-btn:hover { background: #1565c0; }
          .shadow-output { margin-top: 8px; padding: 8px; background: #e3f2fd; border-radius: 4px; font-size: 0.85rem; min-height: 20px; }
        </style>
        <div class="shadow-container" data-testid="open-shadow-container" data-test="open-shadow-container">
          <p class="shadow-title">Open Shadow DOM Content</p>
          <input class="shadow-input" type="text" placeholder="Type inside shadow DOM" aria-label="Shadow Input" data-testid="shadow-input" data-test="shadow-input" title="Shadow Input" />
          <button class="shadow-btn" data-testid="shadow-button" data-test="shadow-button" aria-label="Shadow Button" title="Shadow Button">Click Me</button>
          <div class="shadow-output" data-testid="shadow-output" data-test="shadow-output"></div>
        </div>
      `;
      const btn = shadow.querySelector('.shadow-btn');
      const input = shadow.querySelector('.shadow-input') as HTMLInputElement;
      const output = shadow.querySelector('.shadow-output');
      btn?.addEventListener('click', () => {
        if (output) output.textContent = `You typed: ${input?.value || '(empty)'}`;
      });
    }

    // Closed Shadow DOM
    if (closedRef.current && !(closedRef.current as any).__closedShadow) {
      const shadow = closedRef.current.attachShadow({ mode: 'closed' });
      (closedRef.current as any).__closedShadow = true;
      shadow.innerHTML = `
        <style>
          .closed-container { padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fff3e0; }
          .closed-text { font-size: 0.95rem; color: #e65100; }
          .closed-btn { padding: 8px 16px; border: none; border-radius: 4px; background: #ff9800; color: white; cursor: pointer; font-size: 0.9rem; margin-top: 8px; }
          .closed-output { margin-top: 8px; padding: 8px; background: #ffe0b2; border-radius: 4px; font-size: 0.85rem; }
        </style>
        <div class="closed-container">
          <p class="closed-text"><strong>Closed Shadow DOM</strong> — shadowRoot is not accessible via JavaScript.</p>
          <button class="closed-btn" aria-label="Closed Shadow Button" title="Closed Shadow Button">Click Inside Closed Shadow</button>
          <div class="closed-output"></div>
        </div>
      `;
      const btn = shadow.querySelector('.closed-btn');
      const output = shadow.querySelector('.closed-output');
      btn?.addEventListener('click', () => {
        if (output) output.textContent = 'Button inside closed shadow DOM clicked!';
      });
    }

    // Nested Shadow DOM
    if (nestedRef.current && !nestedRef.current.shadowRoot) {
      const outerShadow = nestedRef.current.attachShadow({ mode: 'open' });
      outerShadow.innerHTML = `
        <style>
          .outer { padding: 16px; border: 2px solid #1976d2; border-radius: 8px; background: #e3f2fd; }
          .outer-title { font-weight: 600; margin-bottom: 8px; color: #1565c0; }
          .inner-host { margin-top: 12px; }
        </style>
        <div class="outer" data-testid="nested-outer" data-test="nested-outer">
          <p class="outer-title">Outer Shadow DOM</p>
          <p>This is the outer shadow. The inner shadow is below:</p>
          <div class="inner-host" data-testid="nested-inner-host"></div>
        </div>
      `;
      const innerHost = outerShadow.querySelector('.inner-host');
      if (innerHost) {
        const innerShadow = innerHost.attachShadow({ mode: 'open' });
        innerShadow.innerHTML = `
          <style>
            .inner { padding: 12px; border: 2px solid #4caf50; border-radius: 6px; background: #e8f5e9; }
            .inner-input { padding: 6px 10px; border: 1px solid #aaa; border-radius: 4px; font-size: 0.9rem; width: 100%; box-sizing: border-box; margin: 8px 0; }
            .inner-btn { padding: 6px 14px; border: none; border-radius: 4px; background: #4caf50; color: white; cursor: pointer; font-size: 0.85rem; }
            .inner-result { margin-top: 8px; padding: 6px; background: #c8e6c9; border-radius: 4px; font-size: 0.85rem; }
          </style>
          <div class="inner" data-testid="nested-inner" data-test="nested-inner">
            <p><strong>Inner Shadow DOM</strong></p>
            <input class="inner-input" type="text" placeholder="Type in nested shadow" aria-label="Nested Shadow Input" data-testid="nested-shadow-input" data-test="nested-shadow-input" title="Nested Shadow Input" />
            <button class="inner-btn" data-testid="nested-shadow-button" data-test="nested-shadow-button" aria-label="Nested Shadow Button" title="Nested Shadow Button">Submit</button>
            <div class="inner-result" data-testid="nested-shadow-output" data-test="nested-shadow-output"></div>
          </div>
        `;
        const innerBtn = innerShadow.querySelector('.inner-btn');
        const innerInput = innerShadow.querySelector('.inner-input') as HTMLInputElement;
        const innerOut = innerShadow.querySelector('.inner-result');
        innerBtn?.addEventListener('click', () => {
          if (innerOut) innerOut.textContent = `Nested value: ${innerInput?.value || '(empty)'}`;
        });
      }
    }

    // Shadow DOM with Form
    if (formRef.current && !formRef.current.shadowRoot) {
      const shadow = formRef.current.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          .form-container { padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; background: #f3e5f5; }
          .form-title { font-weight: 600; color: #7b1fa2; margin-bottom: 12px; }
          .form-group { margin-bottom: 10px; }
          .form-label { display: block; font-size: 0.85rem; font-weight: 500; margin-bottom: 4px; color: #555; }
          .form-input { padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.9rem; width: 100%; box-sizing: border-box; }
          .form-select { padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.9rem; width: 100%; box-sizing: border-box; }
          .form-checkbox { margin-right: 6px; }
          .form-btn { padding: 8px 20px; border: none; border-radius: 4px; background: #7b1fa2; color: white; cursor: pointer; font-size: 0.9rem; margin-top: 4px; }
          .form-btn:hover { background: #6a1b9a; }
          .form-result { margin-top: 10px; padding: 10px; background: #e1bee7; border-radius: 4px; font-size: 0.85rem; }
        </style>
        <div class="form-container" data-testid="shadow-form-container" data-test="shadow-form-container">
          <p class="form-title">Shadow DOM Form</p>
          <div class="form-group">
            <label class="form-label" for="shadow-name">Name</label>
            <input class="form-input" id="shadow-name" type="text" placeholder="Enter name" aria-label="Shadow Name" data-testid="shadow-form-name" data-test="shadow-form-name" title="Shadow Name" />
          </div>
          <div class="form-group">
            <label class="form-label" for="shadow-email">Email</label>
            <input class="form-input" id="shadow-email" type="email" placeholder="Enter email" aria-label="Shadow Email" data-testid="shadow-form-email" data-test="shadow-form-email" title="Shadow Email" />
          </div>
          <div class="form-group">
            <label class="form-label" for="shadow-role">Role</label>
            <select class="form-select" id="shadow-role" aria-label="Shadow Role" data-testid="shadow-form-role" data-test="shadow-form-role" title="Shadow Role">
              <option value="">Select role</option>
              <option value="Developer">Developer</option>
              <option value="Tester">Tester</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label"><input type="checkbox" class="form-checkbox" data-testid="shadow-form-agree" data-test="shadow-form-agree" aria-label="Agree to terms" title="Agree to terms" /> I agree to the terms</label>
          </div>
          <button class="form-btn" data-testid="shadow-form-submit" data-test="shadow-form-submit" aria-label="Submit Shadow Form" title="Submit Shadow Form">Submit</button>
          <div class="form-result" data-testid="shadow-form-result" data-test="shadow-form-result"></div>
        </div>
      `;
      const submitBtn = shadow.querySelector('.form-btn');
      const result = shadow.querySelector('.form-result');
      submitBtn?.addEventListener('click', () => {
        const name = (shadow.querySelector('#shadow-name') as HTMLInputElement)?.value;
        const email = (shadow.querySelector('#shadow-email') as HTMLInputElement)?.value;
        const role = (shadow.querySelector('#shadow-role') as HTMLSelectElement)?.value;
        const agreed = (shadow.querySelector('.form-checkbox') as HTMLInputElement)?.checked;
        if (result) {
          result.textContent = `Name: ${name || '-'}, Email: ${email || '-'}, Role: ${role || '-'}, Agreed: ${agreed ? 'Yes' : 'No'}`;
        }
      });
    }
  }, []);

  return (
    <div data-testid="shadow-dom-page">
      <h1 className="page-title" data-testid="page-title">Shadow DOM</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice interacting with Shadow DOM elements — open, closed, nested, and forms inside shadow roots.
      </p>

      <div className="grid-2">
        {/* Open Shadow DOM */}
        <div className="card" data-testid="open-shadow-card">
          <h3 className="card__title">Open Shadow DOM</h3>
          <p className="help-text mb-16">mode: 'open' — shadowRoot is accessible via element.shadowRoot</p>
          <div ref={openRef} data-testid="open-shadow-host" data-test="open-shadow-host" />
          <pre className="api-response mt-16"><code>{`// Playwright: pierce shadow DOM
const input = page.locator('#open-shadow-host >> input');
await input.fill('Hello Shadow');
await page.locator('#open-shadow-host >> button').click();`}</code></pre>
        </div>

        {/* Closed Shadow DOM */}
        <div className="card" data-testid="closed-shadow-card">
          <h3 className="card__title">Closed Shadow DOM</h3>
          <p className="help-text mb-16">mode: 'closed' — shadowRoot returns null, harder to automate</p>
          <div ref={closedRef} data-testid="closed-shadow-host" data-test="closed-shadow-host" />
          <pre className="api-response mt-16"><code>{`// Closed shadow DOM is not directly accessible
// Playwright can still pierce with CSS selectors:
await page.locator('[data-testid="closed-shadow-host"]')
  .evaluate(el => el.shadowRoot); // returns null`}</code></pre>
        </div>

        {/* Nested Shadow DOM */}
        <div className="card" data-testid="nested-shadow-card">
          <h3 className="card__title">Nested Shadow DOM</h3>
          <p className="help-text mb-16">Shadow DOM inside another Shadow DOM — two levels deep</p>
          <div ref={nestedRef} data-testid="nested-shadow-host" data-test="nested-shadow-host" />
          <pre className="api-response mt-16"><code>{`// Playwright: nested shadow piercing
const inner = page.locator('[data-testid="nested-shadow-host"]')
  .locator('internal:shadow=.inner-input');
await inner.fill('Nested value');`}</code></pre>
        </div>

        {/* Shadow DOM Form */}
        <div className="card" data-testid="shadow-form-card">
          <h3 className="card__title">Shadow DOM Form</h3>
          <p className="help-text mb-16">A complete form inside shadow DOM with inputs, select, and checkbox</p>
          <div ref={formRef} data-testid="shadow-form-host" data-test="shadow-form-host" />
          <pre className="api-response mt-16"><code>{`// Playwright: interact with shadow form
const host = page.locator('[data-testid="shadow-form-host"]');
await host.locator('input[data-testid="shadow-form-name"]')
  .fill('John');
await host.locator('select').selectOption('Tester');
await host.locator('input[type="checkbox"]').check();
await host.locator('button').click();`}</code></pre>
        </div>
      </div>
    </div>
  );
}
