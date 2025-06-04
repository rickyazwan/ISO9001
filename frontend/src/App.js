import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  AlertTriangle,
  BarChart3,
  Shield,
  Calendar,
  BookOpen,
  FileText,
  Settings,
  Menu,
  X,
  Building2,
  TrendingUp,
  Users,
  Activity,
  PieChart,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Bell,
  Globe,
  User
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import clsx from 'clsx';
import './App.css';

// Language Context
const LanguageContext = createContext();

const translations = {
  en: {
    title: 'ISO 9001 Healthcare QMS',
    dashboard: 'Dashboard',
    audits: 'Audit Management',
    capa: 'CAPA Management',
    reports: 'Reports & Analytics',
    safety: 'Patient Safety',
    calendar: 'Calendar',
    reference: 'ISO 9001 Guide',
    documents: 'Quality Documents',
    settings: 'Settings',
    totalFacilities: 'Total Facilities',
    complianceRate: 'Compliance Rate',
    nonConformances: 'Non-Conformances',
    safetyIncidents: 'Safety Incidents',
    welcomeMessage: 'Welcome to Healthcare Quality Management System',
    overview: 'System Overview',
    recentActivity: 'Recent Activity',
    upcomingAudits: 'Upcoming Audits',
    openCAPAs: 'Open CAPAs',
    riskAnalysis: 'Risk Analysis',
    performanceMetrics: 'Performance Metrics'
  },
  ms: {
    title: 'Sistem Pengurusan Kualiti Kesihatan ISO 9001',
    dashboard: 'Papan Pemuka',
    audits: 'Pengurusan Audit',
    capa: 'Pengurusan CAPA',
    reports: 'Laporan & Analitik',
    safety: 'Keselamatan Pesakit',
    calendar: 'Kalendar',
    reference: 'Panduan ISO 9001',
    documents: 'Dokumen Kualiti',
    settings: 'Tetapan',
    totalFacilities: 'Jumlah Kemudahan',
    complianceRate: 'Kadar Pematuhan',
    nonConformances: 'Ketidakakuran',
    safetyIncidents: 'Insiden Keselamatan',
    welcomeMessage: 'Selamat Datang ke Sistem Pengurusan Kualiti Kesihatan',
    overview: 'Gambaran Keseluruhan Sistem',
    recentActivity: 'Aktiviti Terkini',
    upcomingAudits: 'Audit Akan Datang',
    openCAPAs: 'CAPA Terbuka',
    riskAnalysis: 'Analisis Risiko',
    performanceMetrics: 'Metrik Prestasi'
  }
};

// Language Provider
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Modal Context
const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({});

  const openModal = (id, content) => {
    setModals(prev => ({ ...prev, [id]: content }));
  };

  const closeModal = (id) => {
    setModals(prev => {
      const newModals = { ...prev };
      delete newModals[id];
      return newModals;
    });
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
      {Object.entries(modals).map(([id, content]) => (
        <Modal key={id} id={id} onClose={() => closeModal(id)}>
          {content}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

// Modal Component
const Modal = ({ id, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Modal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Sample Data
const dashboardData = {
  kpis: {
    totalFacilities: 24,
    complianceRate: 94.2,
    nonConformances: 8,
    safetyIncidents: 3
  },
  complianceTrend: [
    { month: 'Jan', compliance: 92 },
    { month: 'Feb', compliance: 93 },
    { month: 'Mar', compliance: 91 },
    { month: 'Apr', compliance: 94 },
    { month: 'May', compliance: 95 },
    { month: 'Jun', compliance: 94 }
  ],
  riskHeatmap: [
    { name: 'High Risk', value: 12, color: '#ef4444' },
    { name: 'Medium Risk', value: 28, color: '#f59e0b' },
    { name: 'Low Risk', value: 60, color: '#10b981' }
  ],
  recentAudits: [
    { id: 1, facility: 'General Hospital', date: '2024-06-15', status: 'Completed', score: 94 },
    { id: 2, facility: 'Clinic A', date: '2024-06-10', status: 'In Progress', score: null },
    { id: 3, facility: 'Emergency Center', date: '2024-06-08', status: 'Scheduled', score: null }
  ],
  capas: [
    { id: 1, title: 'Patient Record Security', priority: 'High', status: 'Open', dueDate: '2024-07-01' },
    { id: 2, title: 'Equipment Calibration', priority: 'Medium', status: 'In Progress', dueDate: '2024-06-25' },
    { id: 3, title: 'Staff Training Update', priority: 'Low', status: 'Completed', dueDate: '2024-06-20' }
  ]
};

// Navigation Component
const Navigation = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'audits', label: t.audits, icon: ClipboardCheck },
    { id: 'capa', label: t.capa, icon: AlertTriangle },
    { id: 'reports', label: t.reports, icon: BarChart3 },
    { id: 'safety', label: t.safety, icon: Shield },
    { id: 'calendar', label: t.calendar, icon: Calendar },
    { id: 'reference', label: t.reference, icon: BookOpen },
    { id: 'documents', label: t.documents, icon: FileText },
    { id: 'settings', label: t.settings, icon: Settings }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-6 border-b">
            <div className="text-center">
              <h1 className="text-xl font-bold text-blue-600">{t.title}</h1>
              <p className="text-sm text-gray-500">Quality Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={clsx(
                    'w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors',
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { t } = useLanguage();
  const { openModal } = useModal();

  const KPICard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={clsx("text-sm", trend > 0 ? "text-green-600" : "text-red-600")}>
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">{t.welcomeMessage}</h1>
        <p className="text-blue-100">Monitor and manage healthcare quality across all facilities</p>
        <div className="mt-6 flex items-center space-x-4">
          <button 
            onClick={() => openModal('addFacility', <div>Add Facility Form</div>)}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <Plus size={16} className="inline mr-2" />
            Add Facility
          </button>
          <button 
            onClick={() => openModal('scheduleAudit', <div>Schedule Audit Form</div>)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-400 transition-colors"
          >
            <Calendar size={16} className="inline mr-2" />
            Schedule Audit
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t.totalFacilities}
          value={dashboardData.kpis.totalFacilities}
          icon={Building2}
          color="#3b82f6"
          trend={2.5}
        />
        <KPICard
          title={t.complianceRate}
          value={`${dashboardData.kpis.complianceRate}%`}
          icon={TrendingUp}
          color="#10b981"
          trend={1.2}
        />
        <KPICard
          title={t.nonConformances}
          value={dashboardData.kpis.nonConformances}
          icon={AlertTriangle}
          color="#f59e0b"
          trend={-0.8}
        />
        <KPICard
          title={t.safetyIncidents}
          value={dashboardData.kpis.safetyIncidents}
          icon={Shield}
          color="#ef4444"
          trend={-1.5}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Trend Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Compliance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.complianceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="compliance" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Heat Map */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={dashboardData.riskHeatmap}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
              >
                {dashboardData.riskHeatmap.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Audits */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">{t.upcomingAudits}</h3>
          <div className="space-y-3">
            {dashboardData.recentAudits.map((audit) => (
              <div key={audit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{audit.facility}</p>
                  <p className="text-sm text-gray-500">{audit.date}</p>
                </div>
                <div className="text-right">
                  <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    audit.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  )}>
                    {audit.status}
                  </span>
                  {audit.score && (
                    <p className="text-sm text-gray-500 mt-1">{audit.score}%</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open CAPAs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">{t.openCAPAs}</h3>
          <div className="space-y-3">
            {dashboardData.capas.map((capa) => (
              <div key={capa.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{capa.title}</p>
                  <p className="text-sm text-gray-500">Due: {capa.dueDate}</p>
                </div>
                <div className="text-right">
                  <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    capa.priority === 'High' ? 'bg-red-100 text-red-800' :
                    capa.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  )}>
                    {capa.priority}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{capa.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Audit Management Component
const AuditManagement = () => {
  const { openModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const audits = [
    { id: 1, facility: 'General Hospital', type: 'Internal', date: '2024-06-15', status: 'Completed', auditor: 'Dr. Smith', score: 94, findings: 2 },
    { id: 2, facility: 'Clinic A', type: 'External', date: '2024-06-10', status: 'In Progress', auditor: 'Jane Doe', score: null, findings: 0 },
    { id: 3, facility: 'Emergency Center', type: 'Internal', date: '2024-06-08', status: 'Scheduled', auditor: 'Dr. Johnson', score: null, findings: 0 },
    { id: 4, facility: 'Pediatric Ward', type: 'External', date: '2024-06-05', status: 'Completed', auditor: 'Mike Brown', score: 87, findings: 4 }
  ];

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.auditor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || audit.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Management</h1>
          <p className="text-gray-600">Track and manage quality audits across facilities</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => openModal('scheduleAudit', <div>Schedule New Audit Form</div>)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="inline mr-2" />
            Schedule Audit
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
            <Download size={16} className="inline mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">AI Risk Analysis Insights</h3>
        <p className="text-purple-100 mb-4">Based on historical data and current trends, here are key recommendations:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <p className="font-medium">High Risk Facilities</p>
            <p>Emergency Center requires immediate attention - 3 consecutive missed audits</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <p className="font-medium">Trending Issues</p>
            <p>Patient record security non-conformances increased 15% this quarter</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <p className="font-medium">Recommendations</p>
            <p>Schedule additional training for staff at 4 facilities showing declining scores</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search audits by facility or auditor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Audits Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Facility</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Auditor</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Findings</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAudits.map((audit) => (
                <tr key={audit.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{audit.facility}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      audit.type === 'Internal' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    )}>
                      {audit.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{audit.date}</td>
                  <td className="px-6 py-4">{audit.auditor}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      audit.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    )}>
                      {audit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {audit.score ? (
                      <span className={clsx(
                        "font-medium",
                        audit.score >= 90 ? 'text-green-600' :
                        audit.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                      )}>
                        {audit.score}%
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4">{audit.findings}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// CAPA Management Component
const CAPAManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { openModal } = useModal();

  const capaStats = {
    total: 45,
    open: 12,
    inProgress: 18,
    completed: 15,
    overdue: 3
  };

  const capas = [
    { id: 1, title: 'Patient Record Security Enhancement', category: 'Information Security', priority: 'High', status: 'Open', assignee: 'IT Team', dueDate: '2024-07-01', progress: 0 },
    { id: 2, title: 'Equipment Calibration Protocol', category: 'Equipment', priority: 'Medium', status: 'In Progress', assignee: 'Maintenance', dueDate: '2024-06-25', progress: 65 },
    { id: 3, title: 'Staff Training Compliance', category: 'Training', priority: 'High', status: 'In Progress', assignee: 'HR Department', dueDate: '2024-06-30', progress: 80 },
    { id: 4, title: 'Medication Storage Temperature', category: 'Safety', priority: 'Critical', status: 'Open', assignee: 'Pharmacy', dueDate: '2024-06-22', progress: 0 }
  ];

  const StatCard = ({ title, value, color, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CAPA Management</h1>
          <p className="text-gray-600">Corrective & Preventive Actions tracking and management</p>
        </div>
        <button 
          onClick={() => openModal('createCAPA', <div>Create New CAPA Form</div>)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="inline mr-2" />
          Create CAPA
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total CAPAs" value={capaStats.total} color="#3b82f6" icon={Activity} />
        <StatCard title="Open" value={capaStats.open} color="#ef4444" icon={XCircle} />
        <StatCard title="In Progress" value={capaStats.inProgress} color="#f59e0b" icon={Clock} />
        <StatCard title="Completed" value={capaStats.completed} color="#10b981" icon={CheckCircle} />
        <StatCard title="Overdue" value={capaStats.overdue} color="#dc2626" icon={AlertTriangle} />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'list', label: 'CAPA List' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">CAPA Overview</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Priority Distribution */}
                <div>
                  <h4 className="font-medium mb-4">Priority Distribution</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { name: 'Critical', value: 4 },
                      { name: 'High', value: 8 },
                      { name: 'Medium', value: 15 },
                      { name: 'Low', value: 18 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Status Distribution */}
                <div>
                  <h4 className="font-medium mb-4">Status Distribution</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: 'Open', value: capaStats.open, color: '#ef4444' },
                          { name: 'In Progress', value: capaStats.inProgress, color: '#f59e0b' },
                          { name: 'Completed', value: capaStats.completed, color: '#10b981' }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {[
                          { name: 'Open', value: capaStats.open, color: '#ef4444' },
                          { name: 'In Progress', value: capaStats.inProgress, color: '#f59e0b' },
                          { name: 'Completed', value: capaStats.completed, color: '#10b981' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">All CAPAs</h3>
                <div className="flex gap-2">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download size={16} className="mr-2" />
                    Export
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {capas.map((capa) => (
                  <div key={capa.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{capa.title}</h4>
                          <span className={clsx(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            capa.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                            capa.priority === 'High' ? 'bg-red-100 text-red-800' :
                            capa.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          )}>
                            {capa.priority}
                          </span>
                          <span className={clsx(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            capa.status === 'Open' ? 'bg-red-100 text-red-800' :
                            capa.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          )}>
                            {capa.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>Category: {capa.category}</p>
                          <p>Assignee: {capa.assignee}</p>
                          <p>Due Date: {capa.dueDate}</p>
                        </div>
                        {capa.status === 'In Progress' && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{capa.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${capa.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">CAPA Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Completion Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { month: 'Jan', completed: 5, created: 8 },
                      { month: 'Feb', completed: 7, created: 6 },
                      { month: 'Mar', completed: 4, created: 9 },
                      { month: 'Apr', completed: 8, created: 7 },
                      { month: 'May', completed: 6, created: 5 },
                      { month: 'Jun', completed: 9, created: 8 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="completed" stroke="#10b981" name="Completed" />
                      <Line type="monotone" dataKey="created" stroke="#3b82f6" name="Created" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Category Breakdown</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { category: 'Safety', count: 12 },
                      { category: 'Equipment', count: 8 },
                      { category: 'Training', count: 10 },
                      { category: 'Documentation', count: 6 },
                      { category: 'Process', count: 9 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Settings Component
const SystemSettings = () => {
  const { language, setLanguage, t } = useLanguage();
  const [districtName, setDistrictName] = useState('Metro Health District');
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@health.gov', role: 'Administrator', status: 'Active' },
    { id: 2, name: 'Mike Chen', email: 'mike.chen@health.gov', role: 'Auditor', status: 'Active' },
    { id: 3, name: 'Lisa Rodriguez', email: 'lisa.rodriguez@health.gov', role: 'Quality Manager', status: 'Inactive' }
  ]);

  const { openModal } = useModal();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t.settings}</h1>
        <p className="text-gray-600">Configure system settings and manage users</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">District Name</label>
            <input
              type="text"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="ms">Bahasa Malaysia</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">User Management</h3>
          <button 
            onClick={() => openModal('addUser', <div>Add User Form</div>)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="inline mr-2" />
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { id: 'email_audits', label: 'Email notifications for audit schedules', checked: true },
            { id: 'email_capas', label: 'Email notifications for CAPA deadlines', checked: true },
            { id: 'email_incidents', label: 'Email notifications for safety incidents', checked: false },
            { id: 'sms_urgent', label: 'SMS notifications for urgent matters', checked: true }
          ].map((setting) => (
            <div key={setting.id} className="flex items-center">
              <input
                type="checkbox"
                id={setting.id}
                defaultChecked={setting.checked}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={setting.id} className="ml-2 text-sm text-gray-700">
                {setting.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Placeholder Components for other modules
const PlaceholderComponent = ({ title, description, features }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
    
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-blue-50 rounded-full p-4 w-16 h-16 mx-auto mb-4">
          <FileText size={32} className="text-blue-600 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Module Under Development</h3>
        <p className="text-gray-600 mb-6">This module is being developed with the following features:</p>
        
        <div className="text-left space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              {feature}
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This module will be fully functional in the next update
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'audits':
        return <AuditManagement />;
      case 'capa':
        return <CAPAManagement />;
      case 'reports':
        return <PlaceholderComponent 
          title="Reports & Analytics" 
          description="Generate comprehensive reports and analytics"
          features={[
            'Compliance reports with date range filtering',
            'Patient safety incident reports',
            'Performance metrics and KPI dashboards',
            'Custom report generation',
            'Export functionality (PDF, Excel, CSV)',
            'Automated report scheduling'
          ]}
        />;
      case 'safety':
        return <PlaceholderComponent 
          title="Patient Safety" 
          description="Manage patient safety incidents and reporting"
          features={[
            'Incident reporting and tracking',
            'Safety metrics and analytics',
            'Root cause analysis tools',
            'Incident categorization and severity levels',
            'Investigation workflow management',
            'Safety trend analysis and alerts'
          ]}
        />;
      case 'calendar':
        return <PlaceholderComponent 
          title="Calendar & Scheduling" 
          description="Schedule and manage audit activities and events"
          features={[
            'Interactive calendar view',
            'Audit scheduling and management',
            'Event notifications and reminders',
            'Resource allocation tracking',
            'Multi-facility calendar coordination',
            'Integration with audit management'
          ]}
        />;
      case 'reference':
        return <PlaceholderComponent 
          title="ISO 9001 Reference Guide" 
          description="Comprehensive ISO 9001 healthcare implementation guide"
          features={[
            'Searchable ISO 9001 clauses with healthcare examples',
            'Common non-conformances (NCRs) database',
            'Audit questions and checklists',
            'Best practices and implementation guides',
            'Healthcare-specific interpretations',
            'Regulatory compliance mapping'
          ]}
        />;
      case 'documents':
        return <PlaceholderComponent 
          title="Quality Documents" 
          description="Manage quality manuals, SOPs, and reports"
          features={[
            'Document upload and storage',
            'Version control and approval workflows',
            'Document categorization and tagging',
            'Search and retrieval functionality',
            'Access control and permissions',
            'Document expiry and review notifications'
          ]}
        />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <ModalProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          <div className="lg:ml-64 min-h-screen">
            <main className="p-4 lg:p-8 pt-16 lg:pt-8">
              {renderContent()}
            </main>
          </div>
        </div>
      </ModalProvider>
    </LanguageProvider>
  );
}

export default App;