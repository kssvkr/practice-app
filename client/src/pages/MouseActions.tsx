import { useState } from 'react';

export default function MouseActions() {
  const [hoverVisible, setHoverVisible] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [doubleClickMsg, setDoubleClickMsg] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [hoverCount, setHoverCount] = useState(0);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  return (
    <div data-testid="mouse-actions-page" onClick={closeContextMenu}>
      <h1 className="page-title" data-testid="page-title">Mouse Actions</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Hover menus, right-click context menu, double click, slider, and resizable components.
      </p>

      <div className="grid-2">
        {/* Hover Menu */}
        <div className="card" data-testid="hover-menu-card">
          <h3 className="card__title">Hover Menu</h3>
          <div
            className="hover-menu-trigger"
            onMouseEnter={() => { setHoverVisible(true); setHoverCount(c => c + 1); }}
            onMouseLeave={() => setHoverVisible(false)}
          >
            <button
              className="btn btn-primary"
              data-testid="hover-trigger"
              data-test="hover-trigger"
              title="Hover over me"
              aria-label="Hover to show menu"
              aria-haspopup="true"
              aria-expanded={hoverVisible}
            >
              Hover Over Me
            </button>
            {hoverVisible && (
              <div className="hover-menu" style={{ display: 'block' }} data-testid="hover-menu" role="menu">
                <div className="hover-menu__item" data-testid="hover-item-profile" role="menuitem" title="Profile">👤 Profile</div>
                <div className="hover-menu__item" data-testid="hover-item-settings" role="menuitem" title="Settings">⚙️ Settings</div>
                <div className="hover-menu__item" data-testid="hover-item-logout" role="menuitem" title="Logout">🚪 Logout</div>
              </div>
            )}
          </div>
          <p className="help-text mt-16" data-testid="hover-count">Hovered {hoverCount} times</p>
        </div>

        {/* Right Click */}
        <div className="card" data-testid="right-click-card">
          <h3 className="card__title">Right Click Context Menu</h3>
          <div
            style={{ padding: 40, background: '#f5f5f5', borderRadius: 8, textAlign: 'center', border: '2px dashed #ccc' }}
            onContextMenu={handleContextMenu}
            data-testid="right-click-area"
            data-test="right-click-area"
            role="application"
            aria-label="Right click area"
            title="Right click here"
          >
            <p>Right-click anywhere in this area</p>
          </div>
        </div>

        {/* Double Click */}
        <div className="card" data-testid="double-click-card">
          <h3 className="card__title">Double Click</h3>
          <button
            className="btn btn-success"
            onDoubleClick={() => setDoubleClickMsg('Double click detected! ✅')}
            data-testid="double-click-button"
            data-test="double-click-button"
            role="button"
            title="Double click me"
            aria-label="Double click me"
          >
            Double Click Me
          </button>
          {doubleClickMsg && <p className="help-text mt-16" data-testid="double-click-result">{doubleClickMsg}</p>}
        </div>

        {/* Slider */}
        <div className="card" data-testid="slider-card">
          <h3 className="card__title">Slider Control</h3>
          <div className="form-group">
            <label htmlFor="slider" data-testid="slider-label">Volume: {sliderValue}%</label>
            <input
              id="slider"
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              aria-label="Volume"
              data-testid="slider-input"
              data-test="slider-input"
              title="Volume slider"
              aria-valuenow={sliderValue}
              aria-valuemin={0}
              aria-valuemax={100}
            />
            <p className="help-text" data-testid="slider-value">Current value: {sliderValue}</p>
          </div>
        </div>

      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          data-testid="context-menu"
          role="menu"
          aria-label="Context menu"
        >
          <div className="context-menu__item" data-testid="ctx-cut" role="menuitem" title="Cut" onClick={closeContextMenu}>✂️ Cut</div>
          <div className="context-menu__item" data-testid="ctx-copy" role="menuitem" title="Copy" onClick={closeContextMenu}>📋 Copy</div>
          <div className="context-menu__item" data-testid="ctx-paste" role="menuitem" title="Paste" onClick={closeContextMenu}>📌 Paste</div>
          <div className="context-menu__item" data-testid="ctx-delete" role="menuitem" title="Delete" onClick={closeContextMenu}>🗑️ Delete</div>
        </div>
      )}
    </div>
  );
}
