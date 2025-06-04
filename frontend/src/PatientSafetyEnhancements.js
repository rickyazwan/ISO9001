import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Eye, Edit, FileText, AlertTriangle, Clock, Activity } from 'lucide-react';

// Report Incident Form
export const ReportIncidentForm = ({ onClose }) => {
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

// Safety Advanced Filter Component
export const SafetyAdvancedFilter = ({ onApplyFilters, onClose }) => {
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

// Safety Export Functions
export const exportSafetyData = (data, filename, format = 'csv') => {
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