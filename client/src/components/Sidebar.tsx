import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { path: '/userfacing-locators', label: 'Userfacing Locators', icon: '🎯' },
  { path: '/text-inputs', label: 'Text Inputs', icon: '✏️' },
  { path: '/buttons', label: 'Buttons', icon: '🔘' },
  { path: '/selection-controls', label: 'Checkbox & Radio', icon: '☑️' },
  { path: '/selection-controls', label: 'Dropdowns', icon: '📋' },
  { path: '/date-time', label: 'Date Controls', icon: '📅' },
  { path: '/file-controls', label: 'File Upload', icon: '📁' },
  { path: '/tables', label: 'Tables', icon: '📊' },
  { path: '/alerts-modals', label: 'Alerts & Modals', icon: '⚠️' },
  { path: '/drag-drop', label: 'Drag and Drop', icon: '🔀' },
  { path: '/mouse-actions', label: 'Mouse Actions', icon: '🖱️' },
  { path: '/iframes', label: 'Frames', icon: '🖼️' },
  { path: '/windows-tabs', label: 'Windows & Tabs', icon: '🪟' },
  { path: '/dynamic-elements', label: 'Dynamic Elements', icon: '⚡' },
  { path: '/scrolling', label: 'Scrolling', icon: '📜' },
  { path: '/shadow-dom', label: 'Shadow DOM', icon: '👻' },
  { path: '/keyboard-controls', label: 'Keyboard Controls', icon: '⌨️' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} data-testid="sidebar-overlay" />}
      <aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
        data-testid="sidebar"
        role="complementary"
        aria-label="Control categories"
      >
        <div className="sidebar__title" data-testid="sidebar-title">Automation Testing</div>
        {menuItems.map((item, index) => (
          <NavLink
            key={`${item.path}-${index}`}
            to={item.path}
            className={({ isActive }) => `sidebar__item ${isActive ? 'active' : ''}`}
            onClick={onClose}
            data-testid={`sidebar-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            title={item.label}
          >
            <span role="img" aria-label={item.label}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </aside>
    </>
  );
}
