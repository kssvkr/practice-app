import { useState } from 'react';

const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Germany', 'France', 'Japan', 'Brazil', 'South Korea'];
const programmingLangs = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'Ruby', 'Swift', 'Kotlin'];

export default function SelectionControls() {
  // Checkboxes
  const [checkboxes, setCheckboxes] = useState({ terms: false, newsletter: false, notifications: false });
  // Radio
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  // Dropdown
  const [selectedCountry, setSelectedCountry] = useState('');
  // Multi-select
  const [multiOpen, setMultiOpen] = useState(false);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  // Autocomplete
  const [autoValue, setAutoValue] = useState('');
  const [autoOpen, setAutoOpen] = useState(false);
  // Tags
  const [tags, setTags] = useState<string[]>(['React', 'Playwright']);
  const [tagInput, setTagInput] = useState('');

  const filteredCountries = countries.filter(c =>
    c.toLowerCase().includes(autoValue.toLowerCase())
  );

  const toggleLang = (lang: string) => {
    setSelectedLangs(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div data-testid="selection-controls-page">
      <h1 className="page-title" data-testid="page-title">Selection Controls</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Checkboxes, radio buttons, dropdowns, multi-select, autocomplete, and tag selectors.
      </p>

      <div className="grid-2">
        {/* Checkboxes */}
        <div className="card" data-testid="checkbox-card">
          <h3 className="card__title">Checkboxes</h3>
          <div className="checkbox-group">
            <label className="checkbox-label" data-testid="checkbox-terms-label">
              <input
                type="checkbox"
                checked={checkboxes.terms}
                onChange={(e) => setCheckboxes({ ...checkboxes, terms: e.target.checked })}
                data-testid="checkbox-terms"
                data-test="checkbox-terms"
                aria-label="Accept Terms and Conditions"
                title="Accept Terms and Conditions"
              />
              Accept Terms and Conditions
            </label>
            <label className="checkbox-label" data-testid="checkbox-newsletter-label">
              <input
                type="checkbox"
                checked={checkboxes.newsletter}
                onChange={(e) => setCheckboxes({ ...checkboxes, newsletter: e.target.checked })}
                data-testid="checkbox-newsletter"
                data-test="checkbox-newsletter"
                aria-label="Subscribe to Newsletter"
                title="Subscribe to Newsletter"
              />
              Subscribe to Newsletter
            </label>
            <label className="checkbox-label" data-testid="checkbox-notifications-label">
              <input
                type="checkbox"
                checked={checkboxes.notifications}
                onChange={(e) => setCheckboxes({ ...checkboxes, notifications: e.target.checked })}
                data-testid="checkbox-notifications"
                data-test="checkbox-notifications"
                aria-label="Enable Notifications"
                title="Enable Notifications"
              />
              Enable Notifications
            </label>
          </div>
          <p className="help-text mt-16" data-testid="checkbox-result">
            Selected: {Object.entries(checkboxes).filter(([, v]) => v).map(([k]) => k).join(', ') || 'None'}
          </p>
        </div>

        {/* Radio Buttons - Gender */}
        <div className="card" data-testid="radio-gender-card">
          <h3 className="card__title">Radio Buttons - Gender</h3>
          <div className="radio-group">
            {['Male', 'Female', 'Other', 'Prefer not to say'].map(option => (
              <label key={option} className="radio-label" data-testid={`radio-label-${option.toLowerCase().replace(/\s+/g, '-')}`}>
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={selectedGender === option}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  data-testid={`radio-${option.toLowerCase().replace(/\s+/g, '-')}`}
                  data-test={`radio-${option.toLowerCase().replace(/\s+/g, '-')}`}
                  aria-label={option}
                  title={option}
                />
                {option}
              </label>
            ))}
          </div>
          <p className="help-text mt-16" data-testid="radio-gender-result">
            Selected: {selectedGender || 'None'}
          </p>
        </div>

        {/* Radio Buttons - Color */}
        <div className="card" data-testid="radio-color-card">
          <h3 className="card__title">Radio Buttons - Favorite Color</h3>
          <div className="radio-group">
            {['Red', 'Blue', 'Green', 'Yellow', 'Purple'].map(color => (
              <label key={color} className="radio-label" data-testid={`radio-label-${color.toLowerCase()}`}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={selectedColor === color}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  data-testid={`radio-color-${color.toLowerCase()}`}
                  data-test={`radio-color-${color.toLowerCase()}`}
                  aria-label={color}
                  title={color}
                />
                <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: color.toLowerCase(), border: '1px solid #ccc' }} />
                {color}
              </label>
            ))}
          </div>
          <p className="help-text mt-16" data-testid="radio-color-result">
            Selected: {selectedColor || 'None'}
          </p>
        </div>

        {/* Single Select Dropdown */}
        <div className="card" data-testid="dropdown-card">
          <h3 className="card__title">Single Select Dropdown</h3>
          <div className="form-group">
            <label htmlFor="country" data-testid="country-label">Country</label>
            <select
              id="country"
              className="select-control"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              data-testid="country-dropdown"
              data-test="country-dropdown"
              aria-label="Country"
              title="Select Country"
            >
              <option value="">Select a country</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <p className="help-text" data-testid="dropdown-result">
              Selected: {selectedCountry || 'None'}
            </p>
          </div>
        </div>

        {/* Multi Select Dropdown */}
        <div className="card" data-testid="multi-select-card">
          <h3 className="card__title">Multi Select Dropdown</h3>
          <div className="form-group">
            <label data-testid="languages-label">Programming Languages</label>
            <div className="multi-select">
              <div
                className="multi-select__selected"
                onClick={() => setMultiOpen(!multiOpen)}
                data-testid="multi-select-trigger"
                data-test="multi-select-trigger"
                role="combobox"
                aria-expanded={multiOpen}
                aria-label="Programming Languages"
                title="Select programming languages"
              >
                {selectedLangs.length === 0 && <span style={{ color: '#999' }}>Select languages...</span>}
                {selectedLangs.map(lang => (
                  <span key={lang} className="tag tag-primary" data-testid={`selected-lang-${lang.toLowerCase()}`}>
                    {lang}
                    <button onClick={(e) => { e.stopPropagation(); toggleLang(lang); }} aria-label={`Remove ${lang}`} title={`Remove ${lang}`}>×</button>
                  </span>
                ))}
              </div>
              {multiOpen && (
                <div className="multi-select__dropdown" data-testid="multi-select-dropdown" role="listbox">
                  {programmingLangs.map(lang => (
                    <div
                      key={lang}
                      className="multi-select__option"
                      onClick={() => toggleLang(lang)}
                      data-testid={`multi-option-${lang.toLowerCase()}`}
                      role="option"
                      aria-selected={selectedLangs.includes(lang)}
                      title={lang}
                    >
                      <input type="checkbox" checked={selectedLangs.includes(lang)} readOnly />
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="help-text" data-testid="multi-select-result">
              Selected: {selectedLangs.join(', ') || 'None'}
            </p>
          </div>
        </div>

        {/* Autocomplete Dropdown */}
        <div className="card" data-testid="autocomplete-card">
          <h3 className="card__title">Autocomplete Dropdown</h3>
          <div className="form-group">
            <label htmlFor="autocomplete-country" data-testid="autocomplete-label">Search Country</label>
            <div className="autocomplete-wrapper">
              <input
                id="autocomplete-country"
                type="text"
                className="form-control"
                placeholder="Type to search countries..."
                value={autoValue}
                onChange={(e) => { setAutoValue(e.target.value); setAutoOpen(true); }}
                onFocus={() => setAutoOpen(true)}
                onBlur={() => setTimeout(() => setAutoOpen(false), 200)}
                aria-label="Search Country"
                data-testid="autocomplete-input"
                data-test="autocomplete-input"
                title="Search Country"
                role="combobox"
                aria-expanded={autoOpen}
                autoComplete="off"
              />
              {autoOpen && autoValue && filteredCountries.length > 0 && (
                <div className="autocomplete-list" data-testid="autocomplete-list" role="listbox">
                  {filteredCountries.map(country => (
                    <div
                      key={country}
                      className="autocomplete-item"
                      onClick={() => { setAutoValue(country); setAutoOpen(false); }}
                      data-testid={`autocomplete-option-${country.toLowerCase().replace(/\s+/g, '-')}`}
                      role="option"
                      title={country}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="help-text" data-testid="autocomplete-result">
              Selected: {autoValue || 'None'}
            </p>
          </div>
        </div>

        {/* Tag Selector */}
        <div className="card" data-testid="tag-selector-card">
          <h3 className="card__title">Tag Selector</h3>
          <div className="form-group">
            <label data-testid="tags-label">Tags</label>
            <div className="tag-selector" data-testid="tag-selector" data-test="tag-selector" aria-label="Tags" title="Add tags">
              {tags.map(tag => (
                <span key={tag} className="tag tag-primary" data-testid={`tag-${tag.toLowerCase()}`}>
                  {tag}
                  <button onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`} title={`Remove ${tag}`}>×</button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add tag..."
                data-testid="tag-input"
                data-test="tag-input"
                aria-label="Add new tag"
                title="Add new tag"
              />
            </div>
            <p className="help-text" data-testid="tags-result">
              Tags: {tags.join(', ') || 'None'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
