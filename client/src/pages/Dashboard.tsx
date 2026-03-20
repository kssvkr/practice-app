import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Filler, Title, Tooltip, Legend);

const statsCards = [
  { label: 'Total Tests', value: '1,247', change: '+12%', icon: '🧪', color: '#e3f2fd' },
  { label: 'Passed', value: '1,180', change: '+8%', icon: '✅', color: '#e8f5e9' },
  { label: 'Failed', value: '67', change: '-5%', icon: '❌', color: '#ffebee' },
  { label: 'Duration', value: '4m 32s', change: '-15%', icon: '⏱️', color: '#fff3e0' },
];

const activities = [
  { time: '2 min ago', text: 'Test suite "Login Flow" completed - 15/15 passed', color: '#4caf50' },
  { time: '5 min ago', text: 'New test added: "Drag and Drop validation"', color: '#2196f3' },
  { time: '12 min ago', text: 'Test "File Upload" failed - timeout error', color: '#f44336' },
  { time: '30 min ago', text: 'Dashboard API endpoint updated', color: '#ff9800' },
  { time: '1 hour ago', text: 'Test environment reset', color: '#9c27b0' },
  { time: '2 hours ago', text: 'New build deployed v2.1.0', color: '#4caf50' },
];

const notifications = [
  { title: 'Build Completed', text: 'Build #1247 completed successfully.', time: '3 min ago', unread: true },
  { title: 'Test Failure', text: 'API integration test failed on staging.', time: '15 min ago', unread: true },
  { title: 'New Feature', text: 'Drag & Drop components have been updated.', time: '1 hour ago', unread: false },
  { title: 'Maintenance', text: 'Scheduled maintenance tonight at 2 AM.', time: '3 hours ago', unread: false },
];

const testTrendData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Passed',
      data: [180, 195, 210, 185, 225, 190, 200],
      borderColor: '#4caf50',
      backgroundColor: 'rgba(76,175,80,0.1)',
      fill: true,
      tension: 0.3,
    },
    {
      label: 'Failed',
      data: [12, 8, 15, 10, 5, 9, 7],
      borderColor: '#f44336',
      backgroundColor: 'rgba(244,67,54,0.1)',
      fill: true,
      tension: 0.3,
    },
  ],
};

const coverageData = {
  labels: ['UI Tests', 'API Tests', 'E2E Tests', 'Unit Tests'],
  datasets: [{
    data: [35, 25, 20, 20],
    backgroundColor: ['#1976d2', '#4caf50', '#ff9800', '#9c27b0'],
  }],
};

const performanceData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [{
    label: 'Avg Duration (s)',
    data: [12, 15, 10, 14, 11],
    backgroundColor: 'rgba(25,118,210,0.7)',
    borderColor: '#1976d2',
    borderWidth: 1,
  }],
};

export default function Dashboard() {
  return (
    <div data-testid="dashboard-page">
      <h1 className="page-title" data-testid="page-title">Dashboard</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        IoT-style dashboard with statistics, charts, notifications, and activity feed.
      </p>

      {/* Stats Cards */}
      <div className="grid-4 mb-24" data-testid="stats-grid">
        {statsCards.map((stat, i) => (
          <div key={i} className="stat-card" data-testid={`stat-card-${i}`} title={stat.label} aria-label={`${stat.label}: ${stat.value}`}>
            <div className="stat-card__icon" style={{ background: stat.color }} data-testid={`stat-icon-${i}`}>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
            </div>
            <div className="stat-card__value" data-testid={`stat-value-${i}`}>{stat.value}</div>
            <div className="stat-card__label" data-testid={`stat-label-${i}`}>{stat.label}</div>
            <span className={`tag ${stat.change.startsWith('+') ? 'tag-success' : stat.change.startsWith('-') ? 'tag-error' : 'tag-primary'}`} data-testid={`stat-change-${i}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid-2 mb-24">
        <div className="card" data-testid="trend-chart-card">
          <h3 className="card__title">Test Trends (This Week)</h3>
          <div className="chart-container" data-testid="trend-chart" role="img" aria-label="Test trends line chart" title="Test Trends Chart">
            <Line data={testTrendData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        <div className="card" data-testid="performance-chart-card">
          <h3 className="card__title">Performance (Avg Duration)</h3>
          <div className="chart-container" data-testid="performance-chart" role="img" aria-label="Performance bar chart" title="Performance Chart">
            <Bar data={performanceData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Coverage Doughnut */}
        <div className="card" data-testid="coverage-chart-card">
          <h3 className="card__title">Test Coverage Distribution</h3>
          <div className="chart-container" data-testid="coverage-chart" role="img" aria-label="Test coverage doughnut chart" title="Coverage Chart">
            <Doughnut data={coverageData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />
          </div>
        </div>

        {/* Notifications */}
        <div className="card" data-testid="notifications-card">
          <h3 className="card__title">Notifications</h3>
          <div className="flex flex-col gap-8">
            {notifications.map((n, i) => (
              <div key={i} className={`notification-card ${n.unread ? 'unread' : ''}`} data-testid={`notification-${i}`} role="article" aria-label={n.title} title={n.title}>
                <div style={{ flex: 1 }}>
                  <strong data-testid={`notification-title-${i}`}>{n.title}</strong>
                  <p style={{ fontSize: '0.85rem', color: '#666', marginTop: 4 }} data-testid={`notification-text-${i}`}>{n.text}</p>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#999', whiteSpace: 'nowrap' }} data-testid={`notification-time-${i}`}>{n.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card" data-testid="activity-feed-card" style={{ gridColumn: '1 / -1' }}>
          <h3 className="card__title">Activity Feed</h3>
          <div className="activity-feed" data-testid="activity-feed" role="feed" aria-label="Activity feed">
            {activities.map((a, i) => (
              <div key={i} className="activity-item" data-testid={`activity-item-${i}`} role="article" aria-label={a.text}>
                <div className="activity-dot" style={{ background: a.color }} data-testid={`activity-dot-${i}`}></div>
                <div>
                  <p style={{ fontSize: '0.9rem' }} data-testid={`activity-text-${i}`}>{a.text}</p>
                  <p style={{ fontSize: '0.75rem', color: '#999' }} data-testid={`activity-time-${i}`}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
