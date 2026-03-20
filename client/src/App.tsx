import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TextInputs from './pages/TextInputs';
import Buttons from './pages/Buttons';
import SelectionControls from './pages/SelectionControls';
import DateTimeControls from './pages/DateTimeControls';
import FileControls from './pages/FileControls';
import Tables from './pages/Tables';
import AlertsModals from './pages/AlertsModals';
import Iframes from './pages/Iframes';
import MouseActions from './pages/MouseActions';
import DragDrop from './pages/DragDrop';
import WindowsTabs from './pages/WindowsTabs';
import DynamicElements from './pages/DynamicElements';
import Scrolling from './pages/Scrolling';
import Dashboard from './pages/Dashboard';
import ApiPlayground from './pages/ApiPlayground';
import Documentation from './pages/Documentation';
import UserfacingLocators from './pages/UserfacingLocators';
import ShadowDom from './pages/ShadowDom';
import KeyboardControls from './pages/KeyboardControls';
import Login from './pages/Login';
import Articles from './pages/Articles';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-layout" data-testid="app-layout">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="app-body">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="main-content" data-testid="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/userfacing-locators" element={<UserfacingLocators />} />
              <Route path="/text-inputs" element={<TextInputs />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/selection-controls" element={<SelectionControls />} />
              <Route path="/date-time" element={<DateTimeControls />} />
              <Route path="/file-controls" element={<FileControls />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/alerts-modals" element={<AlertsModals />} />
              <Route path="/iframes" element={<Iframes />} />
              <Route path="/mouse-actions" element={<MouseActions />} />
              <Route path="/drag-drop" element={<DragDrop />} />
              <Route path="/windows-tabs" element={<WindowsTabs />} />
              <Route path="/dynamic-elements" element={<DynamicElements />} />
              <Route path="/scrolling" element={<Scrolling />} />
              <Route path="/shadow-dom" element={<ShadowDom />} />
              <Route path="/keyboard-controls" element={<KeyboardControls />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/api-playground" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/documentation" element={<Documentation />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
