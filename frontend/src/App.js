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
  Pie,
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
import { 
  UserRoleProvider, 
  useUserRole, 
  RoleSwitcher, 
  RoleBasedActionButtons, 
  EnhancedRecentReports, 
  TemplateManagement, 
  AuditTableRow, 
  CAPAListItem, 
  sampleData 
} from './RoleBasedEnhancements';

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

  const openModal = (id, content, title = 'Modal') => {
    setModals(prev => ({ ...prev, [id]: { content, title } }));
  };

  const closeModal = (id) => {
    setModals(prev => {
      const newModals = { ...prev };
      delete newModals[id];
      return newModals;
    });
  };

  const getModalContent = (id, modalData) => {
    switch (id) {
      case 'addFacility':
        return <AddFacilityForm onClose={() => closeModal(id)} />;
      case 'scheduleAudit':
        return <ScheduleAuditForm onClose={() => closeModal(id)} />;
      case 'createCAPA':
        return <CreateCAPAForm onClose={() => closeModal(id)} />;
      case 'generateReport':
        return <GenerateReportForm onClose={() => closeModal(id)} />;
      case 'advancedFilter':
        return <AdvancedFilter onApplyFilters={(filters) => console.log('Applied filters:', filters)} onClose={() => closeModal(id)} />;
      case 'reportIncident':
        return <ReportIncidentForm onClose={() => closeModal(id)} />;
      case 'safetyAdvancedFilter':
        return <div>Safety Advanced Filter has been removed</div>;
      case 'scheduleEvent':
        return <ScheduleEventForm onClose={() => closeModal(id)} />;
      case 'exportCalendar':
        return <ExportCalendarForm onClose={() => closeModal(id)} />;
      default:
        return modalData.content;
    }
  };

  const getModalTitle = (id, modalData) => {
    switch (id) {
      case 'addFacility':
        return 'Add New Facility';
      case 'scheduleAudit':
        return 'Schedule New Audit';
      case 'createCAPA':
        return 'Create New CAPA';
      case 'generateReport':
        return 'Generate Custom Report';
      case 'advancedFilter':
        return 'Advanced Filters';
      case 'reportIncident':
        return 'Report Patient Safety Incident';
      case 'safetyAdvancedFilter':
        return 'Safety Advanced Filter (Removed)';
      case 'scheduleEvent':
        return 'Schedule New Event';
      case 'exportCalendar':
        return 'Export Calendar';
      default:
        return modalData.title;
    }
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
      {Object.entries(modals).map(([id, modalData]) => (
        <Modal 
          key={id} 
          id={id} 
          title={getModalTitle(id, modalData)}
          onClose={() => closeModal(id)}
        >
          {getModalContent(id, modalData)}
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

// Enhanced Modal Component
const Modal = ({ id, children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Export Functions
const exportData = (data, filename, format = 'csv') => {
  if (format === 'csv') {
    const csvContent = convertToCSV(data);
    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  } else if (format === 'excel') {
    // Simulate Excel export
    setTimeout(() => {
      alert(`Excel file "${filename}.xlsx" has been downloaded successfully!`);
    }, 1000);
  } else if (format === 'pdf') {
    // Simulate PDF export
    setTimeout(() => {
      alert(`PDF file "${filename}.pdf" has been downloaded successfully!`);
    }, 1000);
  }
};

const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => 
    Object.values(row).map(value => 
      typeof value === 'string' && value.includes(',') ? `"${value}"` : value
    ).join(',')
  );
  
  return [headers, ...rows].join('\n');
};

const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};

// Enhanced Filter Component
const AdvancedFilter = ({ onApplyFilters, onClose }) => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    startDate: '',
    endDate: '',
    facility: 'all',
    status: 'all',
    priority: 'all',
    category: 'all',
    assignee: 'all'
  });

  const facilities = ['All Facilities', 'General Hospital', 'Emergency Center', 'Pediatric Ward', 'Outpatient Clinic'];
  const statusOptions = ['All Status', 'Open', 'In Progress', 'Completed', 'Overdue', 'Cancelled'];
  const priorityOptions = ['All Priority', 'Critical', 'High', 'Medium', 'Low'];
  const categoryOptions = ['All Categories', 'Safety', 'Quality', 'Equipment', 'Process', 'Training', 'Documentation'];
  const assigneeOptions = ['All Assignees', 'Quality Team', 'Safety Officer', 'IT Team', 'Maintenance', 'HR Department'];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facility</label>
          <select
            value={filters.facility}
            onChange={(e) => setFilters(prev => ({ ...prev, facility: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {facilities.map(facility => (
              <option key={facility} value={facility.toLowerCase()}>{facility}</option>
            ))}
          </select>
        </div>
      </div>

      {filters.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map(status => (
              <option key={status} value={status.toLowerCase()}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priorityOptions.map(priority => (
              <option key={priority} value={priority.toLowerCase()}>{priority}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categoryOptions.map(category => (
              <option key={category} value={category.toLowerCase()}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
          <select
            value={filters.assignee}
            onChange={(e) => setFilters(prev => ({ ...prev, assignee: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {assigneeOptions.map(assignee => (
              <option key={assignee} value={assignee.toLowerCase()}>{assignee}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => setFilters({
            dateRange: 'all',
            startDate: '',
            endDate: '',
            facility: 'all',
            status: 'all',
            priority: 'all',
            category: 'all',
            assignee: 'all'
          })}
          className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

// Safety Advanced Filter Component  
const SafetyAdvancedFilter = ({ onApplyFilters, onClose }) => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    startDate: '',
    endDate: '',
    facility: 'all',
    incidentType: 'all',
    severity: 'all',
    status: 'all',
    injuryLevel: 'all',
    reporter: 'all'
  });

  const facilities = ['All Facilities', 'General Hospital', 'Emergency Center', 'Pediatric Ward', 'Outpatient Clinic'];
  const incidentTypes = ['All Types', 'Medication Error', 'Patient Fall', 'Equipment Malfunction', 'Hospital Acquired Infection', 'Other'];
  const severityOptions = ['All Severity', 'Critical', 'High', 'Medium', 'Low'];
  const statusOptions = ['All Status', 'Open', 'Under Investigation', 'Closed', 'Cancelled'];
  const injuryOptions = ['All Injury Levels', 'No Injury', 'Minor Injury', 'Moderate Injury', 'Major Injury', 'Death'];
  const reporterOptions = ['All Reporters', 'Physician', 'Nurse', 'Pharmacist', 'Technician', 'Administrator'];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facility</label>
          <select
            value={filters.facility}
            onChange={(e) => setFilters(prev => ({ ...prev, facility: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {facilities.map(facility => (
              <option key={facility} value={facility.toLowerCase()}>{facility}</option>
            ))}
          </select>
        </div>
      </div>

      {filters.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type</label>
          <select
            value={filters.incidentType}
            onChange={(e) => setFilters(prev => ({ ...prev, incidentType: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {incidentTypes.map(type => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
          <select
            value={filters.severity}
            onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {severityOptions.map(severity => (
              <option key={severity} value={severity.toLowerCase()}>{severity}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {statusOptions.map(status => (
              <option key={status} value={status.toLowerCase()}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Injury Level</label>
          <select
            value={filters.injuryLevel}
            onChange={(e) => setFilters(prev => ({ ...prev, injuryLevel: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {injuryOptions.map(injury => (
              <option key={injury} value={injury.toLowerCase()}>{injury}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Reporter Role</label>
        <select
          value={filters.reporter}
          onChange={(e) => setFilters(prev => ({ ...prev, reporter: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          {reporterOptions.map(reporter => (
            <option key={reporter} value={reporter.toLowerCase()}>{reporter}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => setFilters({
            dateRange: 'all',
            startDate: '',
            endDate: '',
            facility: 'all',
            incidentType: 'all',
            severity: 'all',
            status: 'all',
            injuryLevel: 'all',
            reporter: 'all'
          })}
          className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

// Add Facility Form
const AddFacilityForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'hospital',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    manager: '',
    capacity: '',
    services: [],
    certifications: []
  });

  const facilityTypes = ['Hospital', 'Clinic', 'Emergency Center', 'Specialty Center', 'Outpatient Facility'];
  const serviceOptions = ['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics', 'ICU', 'Radiology', 'Laboratory'];
  const certificationOptions = ['Joint Commission', 'ISO 9001', 'ISO 14001', 'OSHA', 'HIPAA', 'CLIA'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      alert(`Facility "${formData.name}" has been successfully added to the system!`);
      onClose();
    }, 1000);
  };

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter facility name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facility Type *</label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {facilityTypes.map(type => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
        <input
          type="text"
          required
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Street address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <input
            type="text"
            required
            value={formData.state}
            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
          <input
            type="text"
            required
            value={formData.zipCode}
            onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="facility@hospital.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facility Manager *</label>
          <input
            type="text"
            required
            value={formData.manager}
            onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Manager name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bed Capacity</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Number of beds"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {serviceOptions.map(service => (
            <label key={service} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => handleServiceChange(service)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Certifications</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {certificationOptions.map(cert => (
            <label key={cert} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.certifications.includes(cert)}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  certifications: prev.certifications.includes(cert)
                    ? prev.certifications.filter(c => c !== cert)
                    : [...prev.certifications, cert]
                }))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{cert}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Facility
        </button>
      </div>
    </form>
  );
};

// Schedule Audit Form
const ScheduleAuditForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    facility: '',
    auditType: 'internal',
    auditScope: '',
    startDate: '',
    endDate: '',
    leadAuditor: '',
    auditTeam: [],
    objectives: '',
    standards: [],
    priority: 'medium',
    notifications: true
  });

  const facilities = ['General Hospital', 'Emergency Center', 'Pediatric Ward', 'Outpatient Clinic', 'Surgical Center'];
  const auditors = ['Dr. Smith', 'Dr. Johnson', 'Jane Doe', 'Mike Brown', 'Sarah Wilson'];
  const standardOptions = ['ISO 9001', 'Joint Commission', 'OSHA', 'HIPAA', 'CMS', 'State Regulations'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      alert(`Audit for "${formData.facility}" has been scheduled successfully!`);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facility *</label>
          <select
            required
            value={formData.facility}
            onChange={(e) => setFormData(prev => ({ ...prev, facility: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select facility</option>
            {facilities.map(facility => (
              <option key={facility} value={facility}>{facility}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Audit Type *</label>
          <select
            required
            value={formData.auditType}
            onChange={(e) => setFormData(prev => ({ ...prev, auditType: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="internal">Internal Audit</option>
            <option value="external">External Audit</option>
            <option value="surveillance">Surveillance Audit</option>
            <option value="certification">Certification Audit</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Audit Scope *</label>
        <textarea
          required
          value={formData.auditScope}
          onChange={(e) => setFormData(prev => ({ ...prev, auditScope: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Describe the scope and areas to be audited..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
          <input
            type="date"
            required
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
          <input
            type="date"
            required
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lead Auditor *</label>
          <select
            required
            value={formData.leadAuditor}
            onChange={(e) => setFormData(prev => ({ ...prev, leadAuditor: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select lead auditor</option>
            {auditors.map(auditor => (
              <option key={auditor} value={auditor}>{auditor}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Standards to Audit</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {standardOptions.map(standard => (
            <label key={standard} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.standards.includes(standard)}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  standards: prev.standards.includes(standard)
                    ? prev.standards.filter(s => s !== standard)
                    : [...prev.standards, standard]
                }))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{standard}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Audit Objectives</label>
        <textarea
          value={formData.objectives}
          onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Define the specific objectives and goals for this audit..."
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.notifications}
            onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Send notifications to audit team and facility manager</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Schedule Audit
        </button>
      </div>
    </form>
  );
};

// Create CAPA Form
const CreateCAPAForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'safety',
    priority: 'medium',
    description: '',
    rootCause: '',
    correctiveAction: '',
    preventiveAction: '',
    assignee: '',
    dueDate: '',
    facility: '',
    relatedIncident: '',
    riskLevel: 'medium',
    approver: '',
    resources: ''
  });

  const categories = ['Safety', 'Quality', 'Equipment', 'Process', 'Training', 'Documentation', 'Compliance'];
  const assignees = ['Quality Team', 'Safety Officer', 'IT Team', 'Maintenance', 'HR Department', 'Clinical Staff'];
  const facilities = ['General Hospital', 'Emergency Center', 'Pediatric Ward', 'Outpatient Clinic', 'All Facilities'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      alert(`CAPA "${formData.title}" has been created successfully!`);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">CAPA Title *</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter descriptive title for the CAPA"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase()}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
          <select
            required
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
          <select
            value={formData.riskLevel}
            onChange={(e) => setFormData(prev => ({ ...prev, riskLevel: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="critical">Critical Risk</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Problem Description *</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Describe the problem or non-conformance that requires CAPA..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Root Cause Analysis *</label>
        <textarea
          required
          value={formData.rootCause}
          onChange={(e) => setFormData(prev => ({ ...prev, rootCause: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Identify and describe the root cause(s) of the problem..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Corrective Action *</label>
          <textarea
            required
            value={formData.correctiveAction}
            onChange={(e) => setFormData(prev => ({ ...prev, correctiveAction: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Actions to fix the immediate problem..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preventive Action *</label>
          <textarea
            required
            value={formData.preventiveAction}
            onChange={(e) => setFormData(prev => ({ ...prev, preventiveAction: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Actions to prevent recurrence..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To *</label>
          <select
            required
            value={formData.assignee}
            onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select assignee</option>
            {assignees.map(assignee => (
              <option key={assignee} value={assignee}>{assignee}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
          <input
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Affected Facility</label>
          <select
            value={formData.facility}
            onChange={(e) => setFormData(prev => ({ ...prev, facility: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select facility</option>
            {facilities.map(facility => (
              <option key={facility} value={facility}>{facility}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Resources Required</label>
        <textarea
          value={formData.resources}
          onChange={(e) => setFormData(prev => ({ ...prev, resources: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="2"
          placeholder="List any resources, budget, or support needed..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create CAPA
        </button>
      </div>
    </form>
  );
};

// Report Incident Form
const ReportIncidentForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    incidentType: 'medication_error',
    severity: 'medium',
    facility: '',
    location: '',
    dateOccurred: '',
    timeOccurred: '',
    description: '',
    immediateAction: '',
    patientInvolved: true,
    patientId: '',
    patientAge: '',
    patientGender: '',
    staffInvolved: [],
    witnesses: '',
    equipmentInvolved: '',
    medications: '',
    factors: [],
    injuries: 'none',
    injuryDescription: '',
    reportedBy: '',
    reporterRole: '',
    reporterContact: '',
    supervisorNotified: false,
    familyNotified: false,
    riskLevel: 'medium',
    followUpRequired: true,
    attachments: []
  });

  const incidentTypes = [
    { value: 'medication_error', label: 'Medication Error' },
    { value: 'patient_fall', label: 'Patient Fall' },
    { value: 'equipment_malfunction', label: 'Equipment Malfunction' },
    { value: 'hospital_acquired_infection', label: 'Hospital Acquired Infection' },
    { value: 'surgical_complication', label: 'Surgical Complication' },
    { value: 'diagnostic_error', label: 'Diagnostic Error' },
    { value: 'communication_failure', label: 'Communication Failure' },
    { value: 'security_incident', label: 'Security Incident' },
    { value: 'fire_safety', label: 'Fire/Safety Incident' },
    { value: 'other', label: 'Other' }
  ];

  const facilities = ['General Hospital', 'Emergency Center', 'Pediatric Ward', 'Outpatient Clinic', 'Surgical Center'];
  const staffRoles = ['Physician', 'Nurse', 'Pharmacist', 'Technician', 'Administrator', 'Support Staff'];
  const contributingFactors = [
    'Staffing Issues', 'Communication Problems', 'Equipment Issues', 'Training Deficiency',
    'Policy/Procedure Issues', 'Environmental Factors', 'Patient Condition', 'Time Pressure'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const incidentId = 'INC-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
      alert(`Incident "${incidentId}" has been reported successfully! Investigation team will be notified.`);
      onClose();
    }, 1000);
  };

  const handleFactorChange = (factor) => {
    setFormData(prev => ({
      ...prev,
      factors: prev.factors.includes(factor)
        ? prev.factors.filter(f => f !== factor)
        : [...prev.factors, factor]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Incident Information */}
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-medium text-red-800 mb-3">Incident Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Incident Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Brief description of the incident"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type *</label>
            <select
              required
              value={formData.incidentType}
              onChange={(e) => setFormData(prev => ({ ...prev, incidentType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {incidentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Location and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facility *</label>
          <select
            required
            value={formData.facility}
            onChange={(e) => setFormData(prev => ({ ...prev, facility: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Select facility</option>
            {facilities.map(facility => (
              <option key={facility} value={facility}>{facility}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Specific Location *</label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Room number, department, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Occurred *</label>
          <input
            type="date"
            required
            value={formData.dateOccurred}
            onChange={(e) => setFormData(prev => ({ ...prev, dateOccurred: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Occurred</label>
          <input
            type="time"
            value={formData.timeOccurred}
            onChange={(e) => setFormData(prev => ({ ...prev, timeOccurred: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level *</label>
          <select
            required
            value={formData.severity}
            onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Incident Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          rows="4"
          placeholder="Provide a detailed description of what happened, including sequence of events..."
        />
      </div>

      {/* Patient Information */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="patientInvolved"
            checked={formData.patientInvolved}
            onChange={(e) => setFormData(prev => ({ ...prev, patientInvolved: e.target.checked }))}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="patientInvolved" className="ml-2 text-sm font-medium text-gray-700">
            Patient was involved in this incident
          </label>
        </div>
        
        {formData.patientInvolved && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Patient identifier"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Age</label>
              <input
                type="number"
                value={formData.patientAge}
                onChange={(e) => setFormData(prev => ({ ...prev, patientAge: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Gender</label>
              <select
                value={formData.patientGender}
                onChange={(e) => setFormData(prev => ({ ...prev, patientGender: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Injury Assessment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Injury Level</label>
        <select
          value={formData.injuries}
          onChange={(e) => setFormData(prev => ({ ...prev, injuries: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="none">No Injury</option>
          <option value="minor">Minor Injury</option>
          <option value="moderate">Moderate Injury</option>
          <option value="major">Major Injury</option>
          <option value="death">Death</option>
        </select>
      </div>

      {formData.injuries !== 'none' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Injury Description</label>
          <textarea
            value={formData.injuryDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, injuryDescription: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows="3"
            placeholder="Describe the nature and extent of injuries..."
          />
        </div>
      )}

      {/* Contributing Factors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Contributing Factors</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {contributingFactors.map(factor => (
            <label key={factor} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.factors.includes(factor)}
                onChange={() => handleFactorChange(factor)}
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">{factor}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Immediate Actions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Immediate Actions Taken</label>
        <textarea
          value={formData.immediateAction}
          onChange={(e) => setFormData(prev => ({ ...prev, immediateAction: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          rows="3"
          placeholder="Describe any immediate actions taken to address the incident..."
        />
      </div>

      {/* Reporter Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-3">Reporter Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reported By *</label>
            <input
              type="text"
              required
              value={formData.reportedBy}
              onChange={(e) => setFormData(prev => ({ ...prev, reportedBy: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Reporter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
            <select
              required
              value={formData.reporterRole}
              onChange={(e) => setFormData(prev => ({ ...prev, reporterRole: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select role</option>
              {staffRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
            <input
              type="text"
              value={formData.reporterContact}
              onChange={(e) => setFormData(prev => ({ ...prev, reporterContact: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Phone or email"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.supervisorNotified}
              onChange={(e) => setFormData(prev => ({ ...prev, supervisorNotified: e.target.checked }))}
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">Supervisor has been notified</span>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.familyNotified}
              onChange={(e) => setFormData(prev => ({ ...prev, familyNotified: e.target.checked }))}
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">Patient/Family has been notified</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Report Incident
        </button>
      </div>
    </form>
  );
};

// Schedule Event Form
const ScheduleEventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'audit',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: '',
    facility: '',
    location: '',
    organizer: '',
    attendees: [],
    auditor: '',
    trainer: '',
    reviewer: '',
    priority: 'medium',
    status: 'scheduled',
    resources: '',
    notifications: true,
    recurring: false,
    recurringPattern: 'weekly',
    recurringEnd: '',
    preparation: '',
    agenda: '',
    equipment: '',
    specialInstructions: ''
  });

  const eventTypes = [
    { value: 'audit', label: 'Audit', icon: '🔍' },
    { value: 'meeting', label: 'Meeting', icon: '👥' },
    { value: 'training', label: 'Training', icon: '📚' },
    { value: 'review', label: 'Review', icon: '📋' },
    { value: 'inspection', label: 'Inspection', icon: '🔍' },
    { value: 'calibration', label: 'Calibration', icon: '⚙️' },
    { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { value: 'assessment', label: 'Assessment', icon: '📊' }
  ];

  const facilities = ['General Hospital', 'Emergency Center', 'Pediatric Ward', 'Outpatient Clinic', 'Surgical Center', 'Laboratory', 'Radiology Department'];
  const staffOptions = ['Dr. Smith', 'Dr. Johnson', 'Jane Doe', 'Mike Brown', 'Sarah Wilson', 'Quality Team', 'Safety Officer', 'IT Team'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate duration if start and end times are provided
    if (formData.startTime && formData.endTime && !formData.duration) {
      const start = new Date(`2024-01-01 ${formData.startTime}`);
      const end = new Date(`2024-01-01 ${formData.endTime}`);
      const diffHours = (end - start) / (1000 * 60 * 60);
      formData.duration = `${diffHours} hours`;
    }

    setTimeout(() => {
      const eventId = 'EVT-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
      alert(`Event "${formData.title}" (${eventId}) has been scheduled successfully!${formData.notifications ? ' Notifications have been sent to attendees.' : ''}`);
      onClose();
    }, 1000);
  };

  const handleAttendeesChange = (attendee) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.includes(attendee)
        ? prev.attendees.filter(a => a !== attendee)
        : [...prev.attendees, attendee]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Event Basic Information */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-3">Event Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter descriptive event title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>{type.icon} {type.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Describe the purpose and scope of this event..."
          />
        </div>
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
          <input
            type="time"
            required
            value={formData.startTime}
            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facility *</label>
          <select
            required
            value={formData.facility}
            onChange={(e) => setFormData(prev => ({ ...prev, facility: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select facility</option>
            {facilities.map(facility => (
              <option key={facility} value={facility}>{facility}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Specific Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Room, department, or area"
          />
        </div>
      </div>

      {/* Participants based on event type */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Participants & Responsibilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.type === 'audit' ? 'Lead Auditor' : 
               formData.type === 'training' ? 'Trainer' : 
               formData.type === 'review' ? 'Reviewer' : 'Organizer'} *
            </label>
            <select
              required
              value={formData.type === 'audit' ? formData.auditor : 
                     formData.type === 'training' ? formData.trainer : 
                     formData.type === 'review' ? formData.reviewer : formData.organizer}
              onChange={(e) => {
                const field = formData.type === 'audit' ? 'auditor' : 
                             formData.type === 'training' ? 'trainer' : 
                             formData.type === 'review' ? 'reviewer' : 'organizer';
                setFormData(prev => ({ ...prev, [field]: e.target.value }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select person</option>
              {staffOptions.map(person => (
                <option key={person} value={person}>{person}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Attendees */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {staffOptions.map(person => (
              <label key={person} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.attendees.includes(person)}
                  onChange={() => handleAttendeesChange(person)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{person}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Event-specific fields */}
      {formData.type === 'training' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Training Agenda</label>
          <textarea
            value={formData.agenda}
            onChange={(e) => setFormData(prev => ({ ...prev, agenda: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Outline the training topics and schedule..."
          />
        </div>
      )}

      {formData.type === 'audit' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Audit Preparation Notes</label>
          <textarea
            value={formData.preparation}
            onChange={(e) => setFormData(prev => ({ ...prev, preparation: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Preparation requirements, documents needed, areas to focus on..."
          />
        </div>
      )}

      {/* Resources and Equipment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Required Resources</label>
          <textarea
            value={formData.resources}
            onChange={(e) => setFormData(prev => ({ ...prev, resources: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="2"
            placeholder="Personnel, materials, budget requirements..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Needed</label>
          <textarea
            value={formData.equipment}
            onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="2"
            placeholder="AV equipment, computers, measuring devices..."
          />
        </div>
      </div>

      {/* Recurring Event Options */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="recurring"
            checked={formData.recurring}
            onChange={(e) => setFormData(prev => ({ ...prev, recurring: e.target.checked }))}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="recurring" className="ml-2 text-sm font-medium text-gray-700">
            Make this a recurring event
          </label>
        </div>
        
        {formData.recurring && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Repeat Pattern</label>
              <select
                value={formData.recurringPattern}
                onChange={(e) => setFormData(prev => ({ ...prev, recurringPattern: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Recurrence</label>
              <input
                type="date"
                value={formData.recurringEnd}
                onChange={(e) => setFormData(prev => ({ ...prev, recurringEnd: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Notifications and Special Instructions */}
      <div className="space-y-4">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notifications}
              onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Send notifications to all attendees</span>
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
          <textarea
            value={formData.specialInstructions}
            onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="2"
            placeholder="Any special requirements, precautions, or notes for attendees..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Schedule Event
        </button>
      </div>
    </form>
  );
};

// Export Calendar Form
const ExportCalendarForm = ({ onClose }) => {
  const [exportData, setExportData] = useState({
    format: 'pdf',
    dateRange: 'month',
    startDate: '',
    endDate: '',
    eventTypes: [],
    facilities: [],
    includeDetails: true,
    includeAttendees: true,
    includeResources: false,
    groupBy: 'date',
    sortBy: 'chronological',
    template: 'standard'
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', icon: '📄' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: '📊' },
    { value: 'csv', label: 'CSV File', icon: '📊' },
    { value: 'ical', label: 'iCalendar (.ics)', icon: '📅' },
    { value: 'outlook', label: 'Outlook Calendar', icon: '📧' }
  ];

  const eventTypes = ['audit', 'meeting', 'training', 'review', 'inspection', 'calibration', 'maintenance', 'assessment'];
  const facilities = ['General Hospital', 'Emergency Center', 'Pediatric Ward', 'Outpatient Clinic', 'Surgical Center'];

  const handleExport = async (e) => {
    e.preventDefault();
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export process
    const steps = [
      { progress: 20, message: 'Gathering calendar data...' },
      { progress: 40, message: 'Filtering events...' },
      { progress: 60, message: 'Formatting document...' },
      { progress: 80, message: 'Generating file...' },
      { progress: 100, message: 'Export complete!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setExportProgress(step.progress);
    }

    // Generate filename
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `Healthcare_QMS_Calendar_${dateStr}.${exportData.format}`;
    
    // Simulate file download
    setTimeout(() => {
      alert(`Calendar exported successfully!\nFile: ${fileName}\nEvents included: ${Math.floor(Math.random() * 50) + 10}\nSize: ${(Math.random() * 5 + 1).toFixed(1)} MB`);
      onClose();
    }, 500);
  };

  const handleEventTypeChange = (type) => {
    setExportData(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(type)
        ? prev.eventTypes.filter(t => t !== type)
        : [...prev.eventTypes, type]
    }));
  };

  const handleFacilityChange = (facility) => {
    setExportData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  return (
    <form onSubmit={handleExport} className="space-y-6">
      {isExporting ? (
        <div className="text-center space-y-4">
          <div className="text-lg font-medium">Exporting Calendar...</div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${exportProgress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600">{exportProgress}% Complete</div>
        </div>
      ) : (
        <>
          {/* Export Format */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-3">Export Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formatOptions.map(format => (
                <label key={format.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={exportData.format === format.value}
                    onChange={(e) => setExportData(prev => ({ ...prev, format: e.target.value }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3">
                    {format.icon} {format.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Date Range</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Range Type</label>
                <select
                  value={exportData.dateRange}
                  onChange={(e) => setExportData(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              {exportData.dateRange === 'custom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={exportData.startDate}
                      onChange={(e) => setExportData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={exportData.endDate}
                      onChange={(e) => setExportData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Event Types Filter */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Event Types to Include</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {eventTypes.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportData.eventTypes.includes(type)}
                    onChange={() => handleEventTypeChange(type)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Facilities Filter */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Facilities to Include</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {facilities.map(facility => (
                <label key={facility} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportData.facilities.includes(facility)}
                    onChange={() => handleFacilityChange(facility)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{facility}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">Export Options</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exportData.includeDetails}
                  onChange={(e) => setExportData(prev => ({ ...prev, includeDetails: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Include event details and descriptions</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exportData.includeAttendees}
                  onChange={(e) => setExportData(prev => ({ ...prev, includeAttendees: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Include attendee lists</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exportData.includeResources}
                  onChange={(e) => setExportData(prev => ({ ...prev, includeResources: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Include resource requirements</span>
              </label>
            </div>
          </div>

          {/* Organization Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Group By</label>
              <select
                value={exportData.groupBy}
                onChange={(e) => setExportData(prev => ({ ...prev, groupBy: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="type">Event Type</option>
                <option value="facility">Facility</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={exportData.sortBy}
                onChange={(e) => setExportData(prev => ({ ...prev, sortBy: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="chronological">Chronological</option>
                <option value="priority">Priority</option>
                <option value="facility">Facility</option>
                <option value="type">Event Type</option>
              </select>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          disabled={isExporting}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
        >
          {isExporting ? 'Exporting...' : 'Cancel'}
        </button>
        <button
          type="submit"
          disabled={isExporting}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isExporting ? 'Exporting...' : 'Export Calendar'}
        </button>
      </div>
    </form>
  );
};

// Generate Report Form
const GenerateReportForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    reportType: 'compliance',
    title: '',
    description: '',
    dateRange: 'lastMonth',
    startDate: '',
    endDate: '',
    facilities: [],
    includeCharts: true,
    includeData: true,
    format: 'pdf',
    recipients: [],
    schedule: 'none',
    scheduleFrequency: 'monthly'
  });

  const reportTypes = [
    { value: 'compliance', label: 'Compliance Report' },
    { value: 'safety', label: 'Patient Safety Report' },
    { value: 'audit', label: 'Audit Summary Report' },
    { value: 'capa', label: 'CAPA Analysis Report' },
    { value: 'performance', label: 'Performance Dashboard' },
    { value: 'custom', label: 'Custom Report' }
  ];

  const facilities = ['All Facilities', 'General Hospital', 'Emergency Center', 'Pediatric Ward', 'Outpatient Clinic'];
  const recipients = ['CEO', 'Quality Director', 'Medical Director', 'Facility Managers', 'Audit Team'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      alert(`Report "${formData.title}" is being generated. You will be notified when it's ready for download.`);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type *</label>
          <select
            required
            value={formData.reportType}
            onChange={(e) => setFormData(prev => ({ ...prev, reportType: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {reportTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Format</label>
          <select
            value={formData.format}
            onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="word">Word Document</option>
            <option value="csv">CSV Data</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Report Title *</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter report title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Brief description of the report content and purpose..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            value={formData.dateRange}
            onChange={(e) => setFormData(prev => ({ ...prev, dateRange: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="lastWeek">Last 7 days</option>
            <option value="lastMonth">Last 30 days</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="lastYear">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        {formData.dateRange === 'custom' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Include Facilities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {facilities.map(facility => (
            <label key={facility} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.facilities.includes(facility)}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  facilities: prev.facilities.includes(facility)
                    ? prev.facilities.filter(f => f !== facility)
                    : [...prev.facilities, facility]
                }))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{facility}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.includeCharts}
              onChange={(e) => setFormData(prev => ({ ...prev, includeCharts: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Include charts and visualizations</span>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.includeData}
              onChange={(e) => setFormData(prev => ({ ...prev, includeData: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Include detailed data tables</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Recipients</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {recipients.map(recipient => (
            <label key={recipient} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.recipients.includes(recipient)}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  recipients: prev.recipients.includes(recipient)
                    ? prev.recipients.filter(r => r !== recipient)
                    : [...prev.recipients, recipient]
                }))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{recipient}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Report</label>
          <select
            value={formData.schedule}
            onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="none">Generate Once</option>
            <option value="scheduled">Schedule Recurring</option>
          </select>
        </div>
        {formData.schedule === 'scheduled' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <select
              value={formData.scheduleFrequency}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduleFrequency: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate Report
        </button>
      </div>
    </form>
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
            onClick={() => openModal('addFacility')}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <Plus size={16} className="inline mr-2" />
            Add Facility
          </button>
          <button 
            onClick={() => openModal('scheduleAudit')}
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
      {/* Role Switcher for Testing */}
      <RoleSwitcher />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Management</h1>
          <p className="text-gray-600">Track and manage quality audits across facilities</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => openModal('scheduleAudit')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="inline mr-2" />
            Schedule Audit
          </button>
          <button 
            onClick={() => exportData(filteredAudits, 'audit-report', 'excel')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
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
            <button 
              onClick={() => openModal('advancedFilter')}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Enhanced Audits Table with Role-Based Actions */}
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
              {filteredAudits.map((audit, index) => (
                <AuditTableRow 
                  key={audit.id} 
                  audit={audit} 
                  isLast={index === filteredAudits.length - 1}
                />
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
          onClick={() => openModal('createCAPA')}
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
                  <button 
                    onClick={() => openModal('advancedFilter')}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Filter size={16} className="mr-2" />
                    Filter
                  </button>
                  <button 
                    onClick={() => exportData(capas, 'capa-report', 'excel')}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download size={16} className="mr-2" />
                    Export
                  </button>
                </div>
              </div>

              {/* Enhanced CAPA List with Role-Based Actions */}
              <div className="space-y-4">
                {capas.map((capa, index) => (
                  <CAPAListItem 
                    key={capa.id} 
                    capa={capa} 
                    isLast={index === capas.length - 1}
                  />
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

// Patient Safety Management Component
const PatientSafety = () => {
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const safetyMetrics = {
    totalIncidents: 47,
    openCases: 12,
    closedCases: 35,
    averageResolutionTime: 5.2,
    highSeverityOpen: 3,
    thisMonthIncidents: 8
  };

  const incidents = [
    {
      id: 'INC-2024-001',
      title: 'Medication Administration Error',
      facility: 'General Hospital',
      severity: 'High',
      status: 'Under Investigation',
      reportedDate: '2024-06-15',
      reportedBy: 'Nurse Johnson',
      category: 'Medication Error',
      description: 'Wrong dosage administered to patient in ICU',
      assignedTo: 'Dr. Smith',
      dueDate: '2024-06-22'
    },
    {
      id: 'INC-2024-002',
      title: 'Patient Fall in Ward 3',
      facility: 'General Hospital',
      severity: 'Medium',
      status: 'Closed',
      reportedDate: '2024-06-12',
      reportedBy: 'Staff Nurse',
      category: 'Patient Fall',
      description: 'Elderly patient slipped in bathroom',
      assignedTo: 'Safety Officer',
      dueDate: '2024-06-19',
      resolution: 'Additional safety measures implemented'
    },
    {
      id: 'INC-2024-003',
      title: 'Equipment Malfunction',
      facility: 'Emergency Center',
      severity: 'Critical',
      status: 'Open',
      reportedDate: '2024-06-14',
      reportedBy: 'Dr. Chen',
      category: 'Equipment',
      description: 'Ventilator stopped working during procedure',
      assignedTo: 'Biomedical Team',
      dueDate: '2024-06-16'
    },
    {
      id: 'INC-2024-004',
      title: 'Hospital Acquired Infection',
      facility: 'Pediatric Ward',
      severity: 'High',
      status: 'Under Investigation',
      reportedDate: '2024-06-13',
      reportedBy: 'Dr. Rodriguez',
      category: 'Infection Control',
      description: 'Suspected HAI in post-surgical patient',
      assignedTo: 'Infection Control Team',
      dueDate: '2024-06-20'
    }
  ];

  const trendData = [
    { month: 'Jan', incidents: 12, resolved: 10 },
    { month: 'Feb', incidents: 8, resolved: 9 },
    { month: 'Mar', incidents: 15, resolved: 13 },
    { month: 'Apr', incidents: 11, resolved: 12 },
    { month: 'May', incidents: 9, resolved: 8 },
    { month: 'Jun', incidents: 8, resolved: 6 }
  ];

  const categoryData = [
    { name: 'Medication Error', value: 15, color: '#ef4444' },
    { name: 'Patient Fall', value: 12, color: '#f59e0b' },
    { name: 'Equipment', value: 8, color: '#8b5cf6' },
    { name: 'Infection Control', value: 7, color: '#06b6d4' },
    { name: 'Other', value: 5, color: '#10b981' }
  ];

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSeverity === 'all' || incident.severity.toLowerCase() === filterSeverity;
    return matchesSearch && matchesFilter;
  });

  // Enhanced export function for safety data
  const exportSafetyData = (data, filename, format = 'csv') => {
    if (format === 'csv') {
      const csvContent = convertSafetyDataToCSV(data);
      downloadFile(csvContent, `${filename}.csv`, 'text/csv');
    } else if (format === 'excel') {
      setTimeout(() => {
        alert(`Safety report "${filename}.xlsx" has been downloaded successfully!`);
      }, 1000);
    } else if (format === 'pdf') {
      setTimeout(() => {
        alert(`Safety report "${filename}.pdf" has been downloaded successfully!`);
      }, 1000);
    }
  };

  const convertSafetyDataToCSV = (data) => {
    if (!data || data.length === 0) return '';
    
    const headers = [
      'Incident ID',
      'Title', 
      'Facility',
      'Severity',
      'Status',
      'Reported Date',
      'Reported By',
      'Category',
      'Description',
      'Assigned To',
      'Due Date'
    ].join(',');
    
    const rows = data.map(incident => [
      incident.id,
      `"${incident.title}"`,
      incident.facility,
      incident.severity,
      incident.status,
      incident.reportedDate,
      incident.reportedBy,
      incident.category,
      `"${incident.description}"`,
      incident.assignedTo,
      incident.dueDate
    ].join(','));
    
    return [headers, ...rows].join('\n');
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          {trend && (
            <p className={clsx("text-xs mt-1", trend > 0 ? "text-red-600" : "text-green-600")}>
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Safety Management</h1>
          <p className="text-gray-600">Monitor, track, and manage patient safety incidents</p>
        </div>
        <button 
          onClick={() => openModal('reportIncident')}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          <Plus size={16} className="inline mr-2" />
          Report Incident
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'Safety Dashboard' },
              { id: 'incidents', label: 'Incident Management' },
              { id: 'analytics', label: 'Safety Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                  title="Total Incidents"
                  value={safetyMetrics.totalIncidents}
                  subtitle="This year"
                  icon={AlertTriangle}
                  color="#ef4444"
                  trend={-8}
                />
                <MetricCard
                  title="Open Cases"
                  value={safetyMetrics.openCases}
                  subtitle="Requiring action"
                  icon={Clock}
                  color="#f59e0b"
                  trend={5}
                />
                <MetricCard
                  title="Average Resolution"
                  value={`${safetyMetrics.averageResolutionTime} days`}
                  subtitle="Target: <7 days"
                  icon={Activity}
                  color="#10b981"
                  trend={-12}
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Incident Trends */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Incident Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="incidents" stroke="#ef4444" name="Reported" strokeWidth={2} />
                      <Line type="monotone" dataKey="resolved" stroke="#10b981" name="Resolved" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Breakdown */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Incident Categories</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent High Priority Incidents */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">High Priority Open Incidents</h3>
                <div className="space-y-3">
                  {incidents.filter(inc => inc.severity === 'High' || inc.severity === 'Critical').slice(0, 3).map((incident) => (
                    <div key={incident.id} className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{incident.title}</h4>
                          <p className="text-sm text-gray-600">{incident.facility} • {incident.category}</p>
                          <p className="text-xs text-gray-500 mt-1">Reported: {incident.reportedDate} | Due: {incident.dueDate}</p>
                        </div>
                        <span className={clsx(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          incident.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                        )}>
                          {incident.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <select 
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="all">All Severity</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <button 
                    onClick={() => openModal('safetyAdvancedFilter')}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Filter size={16} className="mr-2" />
                    More Filters
                  </button>
                  <button 
                    onClick={() => exportSafetyData(filteredIncidents, 'safety-incidents-report', 'excel')}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download size={16} className="mr-2" />
                    Export
                  </button>
                </div>
              </div>

              {/* Incidents List */}
              <div className="space-y-4">
                {filteredIncidents.map((incident) => (
                  <div key={incident.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{incident.title}</h4>
                          <span className="text-sm text-gray-500">#{incident.id}</span>
                          <span className={clsx(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            incident.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                            incident.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                            incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          )}>
                            {incident.severity}
                          </span>
                          <span className={clsx(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            incident.status === 'Open' ? 'bg-red-100 text-red-800' :
                            incident.status === 'Under Investigation' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          )}>
                            {incident.status}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{incident.description}</p>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>Facility: {incident.facility} • Category: {incident.category}</p>
                          <p>Reported by: {incident.reportedBy} on {incident.reportedDate}</p>
                          <p>Assigned to: {incident.assignedTo} • Due: {incident.dueDate}</p>
                          {incident.resolution && <p className="text-green-600">Resolution: {incident.resolution}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => openModal('investigationReport', <div>Investigation Report for {incident.title}</div>)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          <FileText size={16} />
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
              <h3 className="text-lg font-semibold">Safety Analytics & Insights</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Severity Distribution */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium mb-4">Severity Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[
                      { severity: 'Critical', count: 5 },
                      { severity: 'High', count: 12 },
                      { severity: 'Medium', count: 18 },
                      { severity: 'Low', count: 12 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="severity" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Resolution Time Analysis */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium mb-4">Average Resolution Time by Category</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[
                      { category: 'Medication', days: 4.2 },
                      { category: 'Falls', days: 3.8 },
                      { category: 'Equipment', days: 6.5 },
                      { category: 'Infection', days: 8.1 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="days" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Safety Performance Indicators */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium mb-4">Safety Performance Indicators</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-gray-600">Incidents Resolved Within Target</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.1</div>
                    <div className="text-sm text-gray-600">Incidents per 1000 Patient Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">15%</div>
                    <div className="text-sm text-gray-600">Reduction in Preventable Events</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Reports & Analytics Component
const ReportsAnalytics = () => {
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('lastMonth');
  const [reportType, setReportType] = useState('compliance');

  const reportMetrics = {
    totalReports: 156,
    scheduledReports: 12,
    downloadedThisMonth: 89,
    automatedReports: 8
  };

  const complianceData = [
    { facility: 'General Hospital', compliance: 94, audits: 12, findings: 8 },
    { facility: 'Emergency Center', compliance: 87, audits: 8, findings: 15 },
    { facility: 'Pediatric Ward', compliance: 96, audits: 6, findings: 3 },
    { facility: 'Outpatient Clinic', compliance: 91, audits: 10, findings: 12 }
  ];

  const performanceData = [
    { month: 'Jan', compliance: 92, incidents: 12, capas: 8 },
    { month: 'Feb', compliance: 93, incidents: 8, capas: 6 },
    { month: 'Mar', compliance: 91, incidents: 15, capas: 9 },
    { month: 'Apr', compliance: 94, incidents: 11, capas: 7 },
    { month: 'May', compliance: 95, incidents: 9, capas: 5 },
    { month: 'Jun', compliance: 94, incidents: 8, capas: 6 }
  ];

  const recentReports = [
    { id: 1, name: 'Monthly Compliance Report', type: 'Compliance', generated: '2024-06-15', format: 'PDF', status: 'Complete' },
    { id: 2, name: 'Patient Safety Analytics', type: 'Safety', generated: '2024-06-14', format: 'Excel', status: 'Complete' },
    { id: 3, name: 'CAPA Performance Summary', type: 'CAPA', generated: '2024-06-13', format: 'PDF', status: 'Complete' },
    { id: 4, name: 'Audit Findings Report', type: 'Audit', generated: '2024-06-12', format: 'Word', status: 'Complete' }
  ];

  const MetricCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
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
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive reports and analyze performance metrics</p>
        </div>
        <button 
          onClick={() => openModal('generateReport')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="inline mr-2" />
          Generate Report
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Analytics Overview' },
              { id: 'compliance', label: 'Compliance Reports' },
              { id: 'performance', label: 'Performance Analytics' },
              { id: 'custom', label: 'Custom Reports' }
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
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Reports"
                  value={reportMetrics.totalReports}
                  subtitle="Generated this year"
                  icon={FileText}
                  color="#3b82f6"
                />
                <MetricCard
                  title="Scheduled Reports"
                  value={reportMetrics.scheduledReports}
                  subtitle="Automated delivery"
                  icon={Clock}
                  color="#10b981"
                />
                <MetricCard
                  title="Downloads This Month"
                  value={reportMetrics.downloadedThisMonth}
                  subtitle="User accessed"
                  icon={Download}
                  color="#f59e0b"
                />
                <MetricCard
                  title="Automated Reports"
                  value={reportMetrics.automatedReports}
                  subtitle="Running weekly"
                  icon={Activity}
                  color="#8b5cf6"
                />
              </div>

              {/* Key Performance Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Trends */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Key Performance Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="compliance" stroke="#10b981" name="Compliance %" strokeWidth={2} />
                      <Line type="monotone" dataKey="incidents" stroke="#ef4444" name="Safety Incidents" strokeWidth={2} />
                      <Line type="monotone" dataKey="capas" stroke="#3b82f6" name="Open CAPAs" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Facility Compliance */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Facility Compliance Scores</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={complianceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="facility" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="compliance" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Enhanced Recent Reports with Download Functionality */}
              <EnhancedRecentReports reports={sampleData.recentReports} />
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="lastWeek">Last Week</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="lastQuarter">Last Quarter</option>
                  <option value="lastYear">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
                <button 
                  onClick={() => exportData(complianceData, 'compliance-report', 'excel')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Export Compliance Report
                </button>
              </div>

              {/* Compliance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">93.2%</div>
                  <div className="text-sm text-gray-600">Overall Compliance</div>
                  <div className="text-xs text-green-600 mt-1">↑ 2.1% from last period</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">Facilities Audited</div>
                  <div className="text-xs text-gray-500 mt-1">100% coverage achieved</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600">47</div>
                  <div className="text-sm text-gray-600">Findings Identified</div>
                  <div className="text-xs text-orange-600 mt-1">↓ 15% from last period</div>
                </div>
              </div>

              {/* Detailed Compliance Table */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Facility Compliance Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Facility</th>
                        <th className="px-6 py-3">Compliance Score</th>
                        <th className="px-6 py-3">Audits Completed</th>
                        <th className="px-6 py-3">Findings</th>
                        <th className="px-6 py-3">Trend</th>
                        <th className="px-6 py-3">Action Required</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceData.map((facility, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{facility.facility}</td>
                          <td className="px-6 py-4">
                            <span className={clsx(
                              "font-medium",
                              facility.compliance >= 95 ? 'text-green-600' :
                              facility.compliance >= 90 ? 'text-yellow-600' : 'text-red-600'
                            )}>
                              {facility.compliance}%
                            </span>
                          </td>
                          <td className="px-6 py-4">{facility.audits}</td>
                          <td className="px-6 py-4">{facility.findings}</td>
                          <td className="px-6 py-4">
                            <span className="text-green-600">↑ 2%</span>
                          </td>
                          <td className="px-6 py-4">
                            {facility.compliance < 90 ? (
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                Immediate Action
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                On Track
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* KPI Performance */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">KPI Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Compliance Rate</span>
                      <span className="text-sm text-green-600">94.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Audit Completion</span>
                      <span className="text-sm text-blue-600">87.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">CAPA Closure Rate</span>
                      <span className="text-sm text-purple-600">78.3%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78.3%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Benchmark Comparison */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Industry Benchmark Comparison</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[
                      { metric: 'Compliance', our: 94, industry: 89 },
                      { metric: 'Safety Score', our: 92, industry: 88 },
                      { metric: 'Audit Score', our: 87, industry: 85 },
                      { metric: 'CAPA Efficiency', our: 78, industry: 82 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="our" fill="#3b82f6" name="Our Performance" />
                      <Bar dataKey="industry" fill="#9ca3af" name="Industry Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Custom Report Builder</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select 
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="compliance">Compliance Report</option>
                      <option value="safety">Patient Safety Report</option>
                      <option value="audit">Audit Summary</option>
                      <option value="capa">CAPA Analysis</option>
                      <option value="performance">Performance Dashboard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="lastWeek">Last 7 days</option>
                      <option value="lastMonth">Last 30 days</option>
                      <option value="lastQuarter">Last Quarter</option>
                      <option value="lastYear">Last Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => openModal('generateReport')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Generate Report
                  </button>
                  <button 
                    onClick={() => {
                      setTimeout(() => {
                        alert('Report template has been saved successfully!');
                      }, 500);
                    }}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Save Template
                  </button>
                  <button 
                    onClick={() => {
                      setTimeout(() => {
                        alert('Report has been scheduled successfully!');
                      }, 500);
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Schedule Report
                  </button>
                </div>
              </div>

              {/* Enhanced Report Templates with Role-Based Actions */}
              <TemplateManagement 
                templates={sampleData.reportTemplates}
                onRun={(template) => console.log('Running template:', template)}
                onEdit={(template) => console.log('Editing template:', template)}
                onDelete={(template) => console.log('Deleting template:', template)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Calendar & Scheduling Component
const CalendarScheduling = () => {
  const { openModal } = useModal();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Internal Audit - General Hospital',
      type: 'audit',
      date: '2024-06-18',
      time: '09:00',
      duration: '4 hours',
      auditor: 'Dr. Smith',
      facility: 'General Hospital',
      status: 'scheduled',
      priority: 'high'
    },
    {
      id: 2,
      title: 'CAPA Review Meeting',
      type: 'meeting',
      date: '2024-06-19',
      time: '14:00',
      duration: '2 hours',
      attendees: ['Quality Team', 'Management'],
      facility: 'Head Office',
      status: 'confirmed',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Safety Training Session',
      type: 'training',
      date: '2024-06-20',
      time: '10:00',
      duration: '3 hours',
      trainer: 'Safety Officer',
      facility: 'Emergency Center',
      status: 'scheduled',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'External Audit - Pediatric Ward',
      type: 'audit',
      date: '2024-06-22',
      time: '08:30',
      duration: '6 hours',
      auditor: 'External Auditor',
      facility: 'Pediatric Ward',
      status: 'confirmed',
      priority: 'critical'
    },
    {
      id: 5,
      title: 'Document Review',
      type: 'review',
      date: '2024-06-25',
      time: '15:00',
      duration: '1.5 hours',
      reviewer: 'Quality Manager',
      facility: 'Head Office',
      status: 'pending',
      priority: 'low'
    }
  ];

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).slice(0, 5);

  const getEventColor = (type) => {
    switch (type) {
      case 'audit': return '#ef4444';
      case 'meeting': return '#3b82f6';
      case 'training': return '#10b981';
      case 'review': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const EventCard = ({ event, isCompact = false }) => (
    <div 
      className={clsx(
        "rounded-lg border-l-4 p-3 cursor-pointer hover:shadow-md transition-shadow",
        isCompact ? "bg-white" : "bg-gray-50"
      )}
      style={{ borderLeftColor: getEventColor(event.type) }}
      onClick={() => setSelectedEvent(event)}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
        <span className={clsx(
          "px-2 py-1 rounded-full text-xs font-medium",
          event.priority === 'critical' ? 'bg-red-100 text-red-800' :
          event.priority === 'high' ? 'bg-orange-100 text-orange-800' :
          event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        )}>
          {event.priority}
        </span>
      </div>
      <div className="text-xs text-gray-600 space-y-1">
        <p>📅 {event.date} at {event.time}</p>
        <p>⏱️ Duration: {event.duration}</p>
        <p>🏢 {event.facility}</p>
        {event.auditor && <p>👤 {event.auditor}</p>}
        {event.trainer && <p>👤 {event.trainer}</p>}
      </div>
      <div className="mt-2">
        <span className={clsx(
          "px-2 py-1 rounded-full text-xs font-medium",
          event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
          event.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        )}>
          {event.status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar & Scheduling</h1>
          <p className="text-gray-600">Manage audit schedules, meetings, and quality events</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => openModal('scheduleEvent', <div>Schedule New Event Form</div>)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="inline mr-2" />
            Schedule Event
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
            <Download size={16} className="inline mr-2" />
            Export Calendar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">June 2024</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode('month')}
                className={clsx(
                  "px-3 py-1 rounded text-sm font-medium transition-colors",
                  viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                )}
              >
                Month
              </button>
              <button 
                onClick={() => setViewMode('week')}
                className={clsx(
                  "px-3 py-1 rounded text-sm font-medium transition-colors",
                  viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                )}
              >
                Week
              </button>
            </div>
          </div>

          {/* Mini Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const dayNumber = i - 2; // Starting from day -2 to show previous month days
              const isCurrentMonth = dayNumber > 0 && dayNumber <= 30;
              const hasEvent = isCurrentMonth && events.some(event => parseInt(event.date.split('-')[2]) === dayNumber);
              
              return (
                <div
                  key={i}
                  className={clsx(
                    "text-center py-2 text-sm cursor-pointer rounded hover:bg-blue-50",
                    isCurrentMonth ? "text-gray-900" : "text-gray-300",
                    hasEvent && "bg-blue-100 font-medium",
                    dayNumber === 18 && "bg-blue-600 text-white" // Today
                  )}
                >
                  {isCurrentMonth ? dayNumber : dayNumber <= 0 ? 30 + dayNumber : dayNumber - 30}
                </div>
              );
            })}
          </div>

          {/* Event Legend */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Event Types</h4>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Audits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Meetings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Training</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} isCompact />
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Events</span>
                <span className="font-medium">{events.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Audits Scheduled</span>
                <span className="font-medium">{events.filter(e => e.type === 'audit').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Confirmation</span>
                <span className="font-medium text-yellow-600">{events.filter(e => e.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Confirmed Events</span>
                <span className="font-medium text-green-600">{events.filter(e => e.status === 'confirmed').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Resource Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">Auditors Available</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-600">Facilities Covered</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">92%</div>
            <div className="text-sm text-gray-600">Capacity Utilization</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ISO 9001 Reference Guide Component
const ISO9001ReferenceGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClause, setSelectedClause] = useState(null);
  const [activeTab, setActiveTab] = useState('clauses');

  const iso9001Clauses = [
    {
      number: '4.1',
      title: 'Understanding the organization and its context',
      description: 'The organization shall determine external and internal issues that are relevant to its purpose and strategic direction.',
      healthcareExample: 'Healthcare organizations must consider regulatory requirements, patient demographics, technology changes, and competitive landscape.',
      auditQuestions: [
        'How does the organization identify internal and external issues?',
        'What process is used to monitor and review these issues?',
        'How do these issues influence the QMS design?'
      ],
      commonNCRs: [
        'Lack of documented process for identifying context',
        'No evidence of regular review of external/internal issues',
        'Context not linked to QMS scope and objectives'
      ]
    },
    {
      number: '4.2',
      title: 'Understanding the needs and expectations of interested parties',
      description: 'The organization shall determine the interested parties that are relevant to the quality management system.',
      healthcareExample: 'Interested parties include patients, families, regulatory bodies, staff, suppliers, and community health organizations.',
      auditQuestions: [
        'Who are the identified interested parties?',
        'How are their needs and expectations determined?',
        'What is the process for monitoring changes in requirements?'
      ],
      commonNCRs: [
        'Incomplete identification of interested parties',
        'No process to monitor changing requirements',
        'Stakeholder needs not reflected in QMS'
      ]
    },
    {
      number: '6.1',
      title: 'Actions to address risks and opportunities',
      description: 'When planning for the QMS, the organization shall consider issues and requirements, and determine risks and opportunities.',
      healthcareExample: 'Healthcare risks include patient safety incidents, regulatory non-compliance, equipment failures, and staff competency gaps.',
      auditQuestions: [
        'How does the organization identify risks and opportunities?',
        'What actions have been planned to address them?',
        'How is the effectiveness of actions evaluated?'
      ],
      commonNCRs: [
        'Risk assessment not comprehensive',
        'No clear link between risks and planned actions',
        'Effectiveness of risk actions not monitored'
      ]
    },
    {
      number: '7.1.5',
      title: 'Monitoring and measuring resources',
      description: 'The organization shall determine and provide the resources needed to ensure valid and reliable results.',
      healthcareExample: 'Medical equipment calibration, laboratory instrument validation, patient monitoring systems maintenance.',
      auditQuestions: [
        'What monitoring and measuring equipment is used?',
        'How is equipment calibrated and maintained?',
        'What happens when equipment is found out of calibration?'
      ],
      commonNCRs: [
        'Equipment not properly calibrated',
        'No traceability to measurement standards',
        'Inadequate records of calibration activities'
      ]
    },
    {
      number: '8.2.1',
      title: 'Customer communication',
      description: 'Communication with customers shall include providing information relating to products and services.',
      healthcareExample: 'Patient communication about treatment options, informed consent, discharge instructions, and complaint handling.',
      auditQuestions: [
        'How does the organization communicate with patients?',
        'What information is provided about services?',
        'How are patient feedback and complaints handled?'
      ],
      commonNCRs: [
        'Inadequate patient information provided',
        'No formal complaint handling process',
        'Patient feedback not systematically collected'
      ]
    }
  ];

  const commonNCRs = [
    {
      category: 'Document Control',
      ncrs: [
        'Documents not controlled or outdated versions in use',
        'No approval process for document changes',
        'External documents not identified or controlled'
      ]
    },
    {
      category: 'Competence',
      ncrs: [
        'Staff competence not evaluated or documented',
        'Training records incomplete or not maintained',
        'No process for determining training effectiveness'
      ]
    },
    {
      category: 'Risk Management',
      ncrs: [
        'Risk assessment not comprehensive or current',
        'Risk controls not effectively implemented',
        'No monitoring of risk control effectiveness'
      ]
    },
    {
      category: 'Internal Audit',
      ncrs: [
        'Audit program not covering all QMS processes',
        'Auditor independence not maintained',
        'Audit findings not properly addressed'
      ]
    }
  ];

  const auditChecklists = [
    {
      title: 'Patient Care Process Audit',
      items: [
        'Are patient care protocols current and accessible?',
        'Is staff training on protocols documented and current?',
        'Are patient outcomes monitored and reviewed?',
        'Is there evidence of continual improvement in care processes?'
      ]
    },
    {
      title: 'Equipment Management Audit',
      items: [
        'Is all medical equipment properly identified and tracked?',
        'Are calibration and maintenance schedules followed?',
        'Are equipment failures properly investigated?',
        'Is there a preventive maintenance program in place?'
      ]
    },
    {
      title: 'Document and Record Control Audit',
      items: [
        'Are all documents current and approved versions?',
        'Is there a document control procedure in place?',
        'Are records legible, identifiable, and retained per schedule?',
        'Is access to documents controlled appropriately?'
      ]
    }
  ];

  const filteredClauses = iso9001Clauses.filter(clause =>
    clause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clause.number.includes(searchTerm) ||
    clause.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ISO 9001 Reference Guide</h1>
          <p className="text-gray-600">Comprehensive guide for ISO 9001 implementation in healthcare</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <Download size={16} className="inline mr-2" />
            Download Guide
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
            <FileText size={16} className="inline mr-2" />
            Print Checklist
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'clauses', label: 'ISO 9001 Clauses' },
              { id: 'ncrs', label: 'Common NCRs' },
              { id: 'checklists', label: 'Audit Checklists' }
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
          {activeTab === 'clauses' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ISO 9001 clauses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Clauses List */}
              <div className="space-y-4">
                {filteredClauses.map((clause) => (
                  <div key={clause.number} className="border border-gray-200 rounded-lg">
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedClause(selectedClause === clause.number ? null : clause.number)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {clause.number} - {clause.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{clause.description}</p>
                        </div>
                        <div className="text-gray-400">
                          {selectedClause === clause.number ? '−' : '+'}
                        </div>
                      </div>
                    </div>

                    {selectedClause === clause.number && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="space-y-4">
                          {/* Healthcare Example */}
                          <div>
                            <h4 className="font-medium text-green-700 mb-2">Healthcare Implementation Example</h4>
                            <p className="text-sm text-gray-700">{clause.healthcareExample}</p>
                          </div>

                          {/* Audit Questions */}
                          <div>
                            <h4 className="font-medium text-blue-700 mb-2">Key Audit Questions</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                              {clause.auditQuestions.map((question, index) => (
                                <li key={index}>{question}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Common NCRs */}
                          <div>
                            <h4 className="font-medium text-red-700 mb-2">Common Non-Conformances</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                              {clause.commonNCRs.map((ncr, index) => (
                                <li key={index}>{ncr}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ncrs' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Common Non-Conformance Reports (NCRs)</h3>
                <p className="text-gray-600 mb-6">Typical findings during ISO 9001 audits in healthcare organizations</p>
              </div>

              <div className="space-y-6">
                {commonNCRs.map((category) => (
                  <div key={category.category} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">{category.category}</h4>
                    <div className="space-y-3">
                      {category.ncrs.map((ncr, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white rounded border-l-4 border-red-500">
                          <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{ncr}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'checklists' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Healthcare Audit Checklists</h3>
                <p className="text-gray-600 mb-6">Ready-to-use checklists for conducting ISO 9001 audits in healthcare settings</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {auditChecklists.map((checklist, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">{checklist.title}</h4>
                    <div className="space-y-3">
                      {checklist.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                          <label className="text-sm text-gray-700">{item}</label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        <Download size={14} className="inline mr-1" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Quality Documents Component
const QualityDocuments = () => {
  const { openModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const documents = [
    {
      id: 1,
      name: 'Quality Manual v3.2',
      category: 'Quality Manual',
      type: 'PDF',
      size: '2.4 MB',
      lastModified: '2024-06-15',
      version: '3.2',
      status: 'Current',
      author: 'Quality Manager',
      approver: 'CEO',
      nextReview: '2024-12-15',
      description: 'Main quality management system documentation'
    },
    {
      id: 2,
      name: 'Patient Care SOP',
      category: 'SOP',
      type: 'Word',
      size: '1.8 MB',
      lastModified: '2024-06-10',
      version: '2.1',
      status: 'Current',
      author: 'Clinical Director',
      approver: 'Medical Director',
      nextReview: '2024-09-10',
      description: 'Standard operating procedures for patient care processes'
    },
    {
      id: 3,
      name: 'Equipment Calibration Procedure',
      category: 'SOP',
      type: 'PDF',
      size: '956 KB',
      lastModified: '2024-06-08',
      version: '1.5',
      status: 'Under Review',
      author: 'Biomedical Engineer',
      approver: 'Quality Manager',
      nextReview: '2024-07-08',
      description: 'Procedures for medical equipment calibration and maintenance'
    },
    {
      id: 4,
      name: 'Internal Audit Report Q2-2024',
      category: 'Reports',
      type: 'Excel',
      size: '3.2 MB',
      lastModified: '2024-06-12',
      version: '1.0',
      status: 'Final',
      author: 'Lead Auditor',
      approver: 'Quality Director',
      nextReview: 'N/A',
      description: 'Comprehensive internal audit findings and recommendations'
    },
    {
      id: 5,
      name: 'Risk Management Policy',
      category: 'Policy',
      type: 'PDF',
      size: '1.2 MB',
      lastModified: '2024-05-20',
      version: '2.0',
      status: 'Current',
      author: 'Risk Manager',
      approver: 'Board of Directors',
      nextReview: '2025-05-20',
      description: 'Organization-wide risk management framework and procedures'
    },
    {
      id: 6,
      name: 'CAPA Tracking Template',
      category: 'Template',
      type: 'Excel',
      size: '245 KB',
      lastModified: '2024-06-01',
      version: '1.3',
      status: 'Current',
      author: 'Quality Analyst',
      approver: 'Quality Manager',
      nextReview: '2024-12-01',
      description: 'Template for tracking corrective and preventive actions'
    }
  ];

  const documentStats = {
    total: documents.length,
    current: documents.filter(d => d.status === 'Current').length,
    underReview: documents.filter(d => d.status === 'Under Review').length,
    expiringSoon: documents.filter(d => {
      if (d.nextReview === 'N/A') return false;
      const reviewDate = new Date(d.nextReview);
      const today = new Date();
      const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      return reviewDate <= thirtyDaysFromNow;
    }).length
  };

  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterCategory === 'all' || doc.category === filterCategory;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'date': return new Date(b.lastModified) - new Date(a.lastModified);
        case 'version': return b.version.localeCompare(a.version);
        default: return 0;
      }
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Final': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'word': return '📝';
      case 'excel': return '📊';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quality Documents</h1>
          <p className="text-gray-600">Manage quality manuals, SOPs, policies, and reports</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => openModal('uploadDocument', <div>Upload Document Form</div>)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Upload size={16} className="inline mr-2" />
            Upload Document
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
            <Download size={16} className="inline mr-2" />
            Bulk Export
          </button>
        </div>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documentStats.total}</p>
            </div>
            <FileText size={24} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documentStats.current}</p>
            </div>
            <CheckCircle size={24} className="text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">{documentStats.underReview}</p>
            </div>
            <Clock size={24} className="text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">{documentStats.expiringSoon}</p>
            </div>
            <AlertTriangle size={24} className="text-red-500" />
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
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Quality Manual">Quality Manual</option>
              <option value="SOP">SOPs</option>
              <option value="Policy">Policies</option>
              <option value="Reports">Reports</option>
              <option value="Template">Templates</option>
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="version">Sort by Version</option>
            </select>
          </div>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Document</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Version</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Modified</th>
                <th className="px-6 py-3">Next Review</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFileIcon(doc.type)}</span>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.description}</p>
                        <p className="text-xs text-gray-400">{doc.size} • {doc.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">v{doc.version}</td>
                  <td className="px-6 py-4">
                    <span className={clsx("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(doc.status))}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{doc.lastModified}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      doc.nextReview !== 'N/A' && documentStats.expiringSoon > 0 ? 'text-red-600 font-medium' : 'text-gray-600'
                    )}>
                      {doc.nextReview}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-800" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Delete">
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

      {/* Document Workflow */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Document Approval Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Edit size={24} className="text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900">Draft</h4>
            <p className="text-sm text-gray-600">Author creates document</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye size={24} className="text-yellow-600" />
            </div>
            <h4 className="font-medium text-gray-900">Review</h4>
            <p className="text-sm text-gray-600">Subject matter expert review</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={24} className="text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900">Approval</h4>
            <p className="text-sm text-gray-600">Management approval</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText size={24} className="text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">Active</h4>
            <p className="text-sm text-gray-600">Document in use</p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        return <ReportsAnalytics />;
      case 'safety':
        return <PatientSafety />;
      case 'calendar':
        return <CalendarScheduling />;
      case 'reference':
        return <ISO9001ReferenceGuide />;
      case 'documents':
        return <QualityDocuments />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <UserRoleProvider>
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
    </UserRoleProvider>
  );
}

export default App;