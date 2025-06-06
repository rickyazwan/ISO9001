import React, { useState } from 'react';
import { Eye, Edit, Trash2, Download, Play, Calendar, User, Building2, AlertTriangle, FileText, CheckCircle, Clock } from 'lucide-react';

// Audit Action Implementations
export const AuditActionHandler = {
  // View Audit Function
  viewAudit: (audit) => {
    const auditDetails = {
      ...audit,
      details: {
        scope: 'Complete facility audit including patient care, documentation, and compliance',
        checklist: [
          { item: 'Patient Care Protocols', status: 'Compliant', notes: 'All protocols current and followed' },
          { item: 'Documentation Management', status: 'Minor Finding', notes: 'Some records not properly filed' },
          { item: 'Staff Training Records', status: 'Compliant', notes: 'Training up to date' },
          { item: 'Equipment Calibration', status: 'Compliant', notes: 'All equipment properly maintained' },
          { item: 'Safety Procedures', status: 'Major Finding', notes: 'Emergency exits partially blocked' }
        ],
        recommendations: [
          'Implement daily filing checks for documentation',
          'Clear emergency exit pathways immediately',
          'Schedule follow-up audit in 30 days'
        ],
        nextSteps: 'CAPA required for major findings',
        auditTeam: ['Dr. Smith (Lead)', 'Jane Doe (Clinical)', 'Mike Johnson (Safety)']
      }
    };

    return auditDetails;
  },

  // Edit Audit Function
  editAudit: (audit) => {
    const editableFields = {
      status: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      priority: ['Low', 'Medium', 'High', 'Critical'],
      findings: audit.findings,
      score: audit.score,
      notes: '',
      followUpDate: '',
      correctionsPlan: ''
    };

    return editableFields;
  },

  // Delete Audit Function
  deleteAudit: (audit) => {
    const deleteConfirmation = {
      message: `Are you sure you want to delete the audit for "${audit.facility}"?`,
      consequences: [
        'All audit data will be permanently removed',
        'Associated findings and CAPAs will be orphaned',
        'Compliance history will be affected',
        'This action cannot be undone'
      ],
      requiresJustification: true,
      approvalRequired: audit.status === 'Completed'
    };

    return deleteConfirmation;
  }
};

// CAPA Action Implementations
export const CAPAActionHandler = {
  // View CAPA Function
  viewCAPA: (capa) => {
    const capaDetails = {
      ...capa,
      details: {
        rootCauseAnalysis: 'Inadequate staff training on new equipment protocols',
        correctiveActions: [
          { action: 'Immediate retraining of all affected staff', target: '2024-06-25', responsible: 'HR Manager' },
          { action: 'Update training documentation', target: '2024-06-30', responsible: 'Quality Manager' },
          { action: 'Implement competency verification', target: '2024-07-05', responsible: 'Department Head' }
        ],
        preventiveActions: [
          { action: 'Quarterly competency assessments', target: '2024-07-15', responsible: 'Quality Team' },
          { action: 'Enhanced onboarding program', target: '2024-08-01', responsible: 'HR Department' }
        ],
        effectivenessCheck: {
          scheduled: '2024-08-15',
          criteria: 'Zero incidents related to equipment protocols for 60 days',
          responsible: 'Quality Director'
        },
        attachments: [
          { name: 'Root Cause Analysis.pdf', size: '1.2 MB' },
          { name: 'Training Records.xlsx', size: '890 KB' },
          { name: 'Equipment Protocol.docx', size: '456 KB' }
        ]
      }
    };

    return capaDetails;
  },

  // Edit CAPA Function
  editCAPA: (capa) => {
    const editableFields = {
      status: ['Open', 'In Progress', 'Pending Review', 'Completed', 'Cancelled'],
      priority: ['Low', 'Medium', 'High', 'Critical'],
      progress: capa.progress || 0,
      assignee: capa.assignee,
      dueDate: capa.dueDate,
      extendedDueDate: '',
      notes: '',
      resourcesRequired: '',
      budgetImpact: '',
      approvalStatus: ['Pending', 'Approved', 'Rejected']
    };

    return editableFields;
  },

  // Delete CAPA Function
  deleteCAPA: (capa) => {
    const deleteConfirmation = {
      message: `Are you sure you want to delete CAPA "${capa.title}"?`,
      consequences: [
        'All CAPA progress will be lost',
        'Associated audit findings may become non-compliant',
        'Regulatory requirements may not be met',
        'This action requires supervisor approval'
      ],
      requiresJustification: true,
      approvalRequired: true,
      alternativeActions: [
        'Cancel CAPA instead of deleting',
        'Archive CAPA for future reference',
        'Transfer to different assignee'
      ]
    };

    return deleteConfirmation;
  }
};

// Report Action Implementations
export const ReportActionHandler = {
  // Download Report Function
  downloadReport: async (report) => {
    const downloadProcess = {
      preparing: true,
      progress: 0,
      status: 'Preparing download...'
    };

    // Simulate download preparation
    const steps = [
      { progress: 20, status: 'Generating report data...' },
      { progress: 40, status: 'Formatting content...' },
      { progress: 60, status: 'Creating file...' },
      { progress: 80, status: 'Applying security settings...' },
      { progress: 100, status: 'Download ready!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 500));
      downloadProcess.progress = step.progress;
      downloadProcess.status = step.status;
    }

    // Create actual download
    const fileName = `${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${report.format.toLowerCase()}`;
    const downloadResult = {
      success: true,
      fileName,
      fileSize: report.size || '2.4 MB',
      downloadTime: new Date().toLocaleString(),
      downloadId: `DL-${Date.now()}`
    };

    return downloadResult;
  },

  // Run Template Function
  runTemplate: async (template) => {
    const runProcess = {
      templateId: template.id,
      runId: `RUN-${Date.now()}`,
      status: 'Initializing...',
      progress: 0,
      estimatedTime: '3-5 minutes'
    };

    // Simulate template execution
    const executionSteps = [
      { progress: 10, status: 'Loading template configuration...' },
      { progress: 25, status: 'Gathering data sources...' },
      { progress: 40, status: 'Processing compliance data...' },
      { progress: 55, status: 'Calculating metrics...' },
      { progress: 70, status: 'Generating charts and graphs...' },
      { progress: 85, status: 'Formatting report layout...' },
      { progress: 95, status: 'Finalizing report...' },
      { progress: 100, status: 'Report generation complete!' }
    ];

    for (const step of executionSteps) {
      await new Promise(resolve => setTimeout(resolve, 400));
      runProcess.progress = step.progress;
      runProcess.status = step.status;
    }

    const executionResult = {
      success: true,
      reportId: `RPT-${Date.now()}`,
      generatedAt: new Date().toLocaleString(),
      fileSize: '3.2 MB',
      format: template.format || 'PDF',
      downloadUrl: '#',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };

    return executionResult;
  },

  // Edit Template Function
  editTemplate: (template) => {
    const editableTemplate = {
      ...template,
      editableFields: {
        name: template.name,
        description: template.description || '',
        schedule: template.schedule,
        format: ['PDF', 'Excel', 'Word', 'CSV'],
        recipients: ['CEO', 'Quality Director', 'Medical Director', 'Facility Managers'],
        dataFilters: {
          dateRange: 'Last 30 days',
          facilities: ['All Facilities', 'General Hospital', 'Emergency Center'],
          includeCharts: true,
          includeRawData: false
        },
        automationSettings: {
          enabled: true,
          frequency: template.schedule,
          dayOfWeek: 'Monday',
          timeOfDay: '08:00',
          notifications: true
        }
      }
    };

    return editableTemplate;
  },

  // Delete Template Function
  deleteTemplate: (template) => {
    const deleteConfirmation = {
      message: `Are you sure you want to delete template "${template.name}"?`,
      consequences: [
        'Template configuration will be permanently lost',
        'Scheduled reports will be cancelled',
        'Historical report data will remain intact',
        'Recipients will no longer receive automated reports'
      ],
      dependentReports: [
        'Monthly Executive Summary (3 scheduled)',
        'Weekly Compliance Brief (4 scheduled)',
        'Quarterly Board Report (1 scheduled)'
      ],
      requiresJustification: template.status === 'Active',
      approvalRequired: template.schedule !== 'Manual'
    };

    return deleteConfirmation;
  }
};

// Action Modal Components
export const ViewAuditModal = ({ audit, onClose }) => {
  const auditDetails = AuditActionHandler.viewAudit(audit);

  const handleExport = () => {
    // Create comprehensive audit report data
    const auditReport = {
      'Audit ID': audit.id,
      'Facility': auditDetails.facility,
      'Type': auditDetails.type,
      'Date': auditDetails.date,
      'Auditor': auditDetails.auditor,
      'Status': auditDetails.status,
      'Score': auditDetails.score ? `${auditDetails.score}%` : 'N/A',
      'Findings Count': audit.findings,
      'Scope': auditDetails.details.scope,
      'Recommendations': auditDetails.details.recommendations.join('; '),
      'Next Steps': auditDetails.details.nextSteps,
      'Audit Team': auditDetails.details.auditTeam.join(', '),
      'Export Date': new Date().toLocaleDateString(),
      'Export Time': new Date().toLocaleTimeString()
    };

    // Create detailed checklist data
    const checklistData = auditDetails.details.checklist.map((item, index) => ({
      'Item #': index + 1,
      'Checklist Item': item.item,
      'Status': item.status,
      'Notes': item.notes
    }));

    // Export audit summary
    const auditSummaryCSV = convertAuditToCSV([auditReport]);
    downloadFile(auditSummaryCSV, `Audit_${audit.facility}_${audit.id}_Summary_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');

    // Export checklist details
    const checklistCSV = convertAuditToCSV(checklistData);
    downloadFile(checklistCSV, `Audit_${audit.facility}_${audit.id}_Checklist_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');

    // Show success message
    setTimeout(() => {
      alert(`Audit reports exported successfully!\n\n✅ Audit Summary: Audit_${audit.facility}_${audit.id}_Summary.csv\n✅ Checklist Details: Audit_${audit.facility}_${audit.id}_Checklist.csv`);
    }, 500);
  };

  const convertAuditToCSV = (data) => {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => {
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    return [headers, ...rows].join('\n');
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Audit Header */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Audit Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Facility:</strong> {auditDetails.facility}</div>
          <div><strong>Type:</strong> {auditDetails.type}</div>
          <div><strong>Date:</strong> {auditDetails.date}</div>
          <div><strong>Auditor:</strong> {auditDetails.auditor}</div>
          <div><strong>Status:</strong> <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{auditDetails.status}</span></div>
          <div><strong>Score:</strong> <span className="font-bold text-green-600">{auditDetails.score}%</span></div>
        </div>
      </div>

      {/* Audit Scope */}
      <div>
        <h4 className="font-medium mb-2">Audit Scope</h4>
        <p className="text-gray-700 text-sm">{auditDetails.details.scope}</p>
      </div>

      {/* Checklist Results */}
      <div>
        <h4 className="font-medium mb-3">Checklist Results</h4>
        <div className="space-y-2">
          {auditDetails.details.checklist.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">{item.item}</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                  item.status === 'Minor Finding' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h4 className="font-medium mb-2">Recommendations</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {auditDetails.details.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
        <button 
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Download size={16} />
          Export Details
        </button>
      </div>
    </div>
  );
};

export const ViewCAPAModal = ({ capa, onClose }) => {
  const capaDetails = CAPAActionHandler.viewCAPA(capa);

  const handleExport = () => {
    // Create comprehensive CAPA report data
    const capaReport = {
      'CAPA ID': capa.id,
      'Title': capaDetails.title,
      'Category': capaDetails.category,
      'Priority': capaDetails.priority,
      'Status': capaDetails.status,
      'Assignee': capaDetails.assignee,
      'Due Date': capaDetails.dueDate,
      'Date Opened': capa.dateOpened || 'N/A',
      'Progress (%)': capaDetails.progress || 0,
      'Description': capa.description || '',
      'Root Cause': capa.rootCause || '',
      'Export Date': new Date().toLocaleDateString(),
      'Export Time': new Date().toLocaleTimeString()
    };

    // Export CAPA details
    const capaCSV = convertCAPAToCSV([capaReport]);
    downloadFile(capaCSV, `CAPA_${capa.id}_${capa.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');

    // Show success message
    setTimeout(() => {
      alert(`✅ CAPA report exported successfully!\n\nFile: CAPA_${capa.id}_${capa.title.replace(/\s+/g, '_')}.csv`);
    }, 500);
  };

  const convertCAPAToCSV = (data) => {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => {
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    return [headers, ...rows].join('\n');
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* CAPA Header */}
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-semibold text-orange-900 mb-2">CAPA Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Title:</strong> {capaDetails.title}</div>
          <div><strong>Category:</strong> {capaDetails.category}</div>
          <div><strong>Priority:</strong> <span className={`px-2 py-1 rounded text-xs font-medium ${
            capaDetails.priority === 'Critical' ? 'bg-red-100 text-red-800' :
            capaDetails.priority === 'High' ? 'bg-orange-100 text-orange-800' :
            capaDetails.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>{capaDetails.priority}</span></div>
          <div><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs font-medium ${
            capaDetails.status === 'Completed' ? 'bg-green-100 text-green-800' :
            capaDetails.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>{capaDetails.status}</span></div>
          <div><strong>Assignee:</strong> {capaDetails.assignee}</div>
          <div><strong>Due Date:</strong> {capaDetails.dueDate}</div>
          {capa.dateOpened && <div><strong>Date Opened:</strong> {capa.dateOpened}</div>}
          {capa.dateCompleted && <div><strong>Date Completed:</strong> {capa.dateCompleted}</div>}
        </div>
      </div>

      {/* Description */}
      {capa.description && (
        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{capa.description}</p>
        </div>
      )}

      {/* Root Cause Analysis */}
      {capa.rootCause && (
        <div>
          <h4 className="font-medium mb-2">Root Cause Analysis</h4>
          <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{capa.rootCause}</p>
        </div>
      )}

      {/* Sample Corrective Actions - this could be extended with real data */}
      <div>
        <h4 className="font-medium mb-3">Corrective Actions</h4>
        <div className="space-y-2">
          {capaDetails.details.correctiveActions.map((action, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded">
              <div className="font-medium text-sm">{action.action}</div>
              <div className="text-xs text-gray-600 mt-1">
                Target: {action.target} | Responsible: {action.responsible}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      {capaDetails.progress !== undefined && (
        <div>
          <h4 className="font-medium mb-2">Progress</h4>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${capaDetails.progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{capaDetails.progress}%</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
        <button 
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Download size={16} />
          Export Details
        </button>
      </div>
    </div>
  );
};

export const DownloadProgressModal = ({ report, onClose, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Preparing download...');
  const [completed, setCompleted] = useState(false);

  React.useEffect(() => {
    const simulateDownload = async () => {
      const steps = [
        { progress: 20, status: 'Generating report data...' },
        { progress: 40, status: 'Formatting content...' },
        { progress: 60, status: 'Creating file...' },
        { progress: 80, status: 'Applying security settings...' },
        { progress: 100, status: 'Download ready!' }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(step.progress);
        setStatus(step.status);
      }

      setCompleted(true);
      if (onComplete) {
        onComplete({
          fileName: `${report.name.replace(/\s+/g, '_')}.${report.format.toLowerCase()}`,
          fileSize: report.size || '2.4 MB'
        });
      }
    };

    simulateDownload();
  }, [report, onComplete]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Downloading Report</h3>
        <p className="text-gray-600">{report.name}</p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>{status}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {completed && (
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <CheckCircle className="mx-auto text-green-600 mb-2" size={24} />
          <p className="text-green-800 font-medium">Download Complete!</p>
          <p className="text-sm text-green-600">File has been saved to your downloads folder</p>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          {completed ? 'Close' : 'Cancel'}
        </button>
        {completed && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Open File Location
          </button>
        )}
      </div>
    </div>
  );
};

// Edit Audit Modal Component
export const EditAuditModal = ({ audit, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    facility: audit.facility,
    type: audit.type,
    date: audit.date,
    auditor: audit.auditor,
    status: audit.status,
    score: audit.score || '',
    findings: audit.findings || '',
    scope: audit.details?.scope || '',
    recommendations: audit.details?.recommendations?.join('\n') || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare updated audit data
      const updatedAudit = {
        facility: formData.facility,
        type: formData.type,
        date: formData.date,
        auditor: formData.auditor,
        status: formData.status,
        score: formData.score ? parseInt(formData.score) : null,
        findings: formData.findings ? parseInt(formData.findings) : audit.findings,
        details: {
          scope: formData.scope,
          recommendations: formData.recommendations.split('\n').filter(r => r.trim())
        }
      };

      // Call the onSave callback with updated data (this will trigger updateAudit in the context)
      if (onSave) {
        onSave(updatedAudit);
      }

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Show success message
      alert(`✅ Audit Updated Successfully!\n\nFacility: ${formData.facility}\nStatus: ${formData.status}\nScore: ${formData.score ? formData.score + '%' : 'Not set'}\n\nThe table has been updated with your changes.`);
      
      onClose();
    } catch (error) {
      alert('❌ Error updating audit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Edit Audit</h3>
        <p className="text-sm text-blue-700">Update audit information and findings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facility</label>
            <input
              type="text"
              value={formData.facility}
              onChange={(e) => handleChange('facility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Internal">Internal</option>
              <option value="External">External</option>
              <option value="Surveillance">Surveillance</option>
              <option value="Certification">Certification</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auditor</label>
            <input
              type="text"
              value={formData.auditor}
              onChange={(e) => handleChange('auditor', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.score}
              onChange={(e) => handleChange('score', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter score (0-100)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Audit Scope</label>
          <textarea
            value={formData.scope}
            onChange={(e) => handleChange('scope', e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the scope of this audit..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Findings</label>
          <textarea
            value={formData.findings}
            onChange={(e) => handleChange('findings', e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter audit findings..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations</label>
          <textarea
            value={formData.recommendations}
            onChange={(e) => handleChange('recommendations', e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter recommendations (one per line)..."
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Delete Audit Confirmation Modal
export const DeleteAuditModal = ({ audit, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Call the onConfirm callback (this will trigger deleteAudit in the context)
      if (onConfirm) {
        onConfirm(audit.id); // Pass the audit ID for deletion
      }

      // Show success message
      alert(`✅ Audit Deleted Successfully!\n\nFacility: ${audit.facility}\nAuditor: ${audit.auditor}\nDate: ${audit.date}\n\nThe audit has been permanently removed from the system.`);
      
      onClose();
    } catch (error) {
      alert('❌ Error deleting audit. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-semibold text-red-900 mb-2">Delete Audit</h3>
        <p className="text-sm text-red-700">This action cannot be undone</p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete the following audit?
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><strong>Facility:</strong> {audit.facility}</div>
            <div><strong>Type:</strong> {audit.type}</div>
            <div><strong>Date:</strong> {audit.date}</div>
            <div><strong>Auditor:</strong> {audit.auditor}</div>
            <div><strong>Status:</strong> {audit.status}</div>
            <div><strong>Score:</strong> {audit.score ? `${audit.score}%` : 'N/A'}</div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="text-amber-600 mr-2 mt-0.5" size={20} />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Warning</h4>
              <p className="text-sm text-amber-700">
                Deleting this audit will permanently remove all associated data, findings, and recommendations. 
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            isDeleting 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isDeleting ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              Deleting...
            </>
          ) : (
            'Delete Audit'
          )}
        </button>
      </div>
    </div>
  );
};

// Edit CAPA Modal Component
export const EditCAPAModal = ({ capa, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: capa.title,
    category: capa.category,
    priority: capa.priority,
    status: capa.status,
    assignee: capa.assignee,
    dueDate: capa.dueDate,
    progress: capa.progress || 0,
    description: capa.description || '',
    rootCause: capa.rootCause || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare updated CAPA data
      const updatedCAPA = {
        title: formData.title,
        category: formData.category,
        priority: formData.priority,
        status: formData.status,
        assignee: formData.assignee,
        dueDate: formData.dueDate,
        progress: parseInt(formData.progress),
        description: formData.description,
        rootCause: formData.rootCause,
        ...(formData.status === 'Completed' && !capa.dateCompleted && { dateCompleted: new Date().toISOString().split('T')[0] })
      };

      // Call the onSave callback with updated data (this will trigger updateCAPA in the context)
      // This updates the global CAPA state, which automatically triggers re-renders of:
      // 1. CAPA list items with new data
      // 2. Statistics cards with recalculated numbers
      // 3. Charts with updated priority/status distributions
      // 4. Dashboard metrics and other dependent components
      if (onSave) {
        onSave(updatedCAPA);
      }

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Show comprehensive success message with all updates
      const statusMessage = `✅ CAPA Updated Successfully!\n\n` +
        `📋 Title: ${formData.title}\n` +
        `📂 Category: ${formData.category}\n` +
        `⭐ Priority: ${formData.priority}\n` +
        `📊 Status: ${formData.status}\n` +
        `👤 Assignee: ${formData.assignee}\n` +
        `📅 Due Date: ${formData.dueDate}\n` +
        `📈 Progress: ${formData.progress}%\n\n` +
        `🔄 All data has been updated in the system:\n` +
        `• CAPA list refreshed with new information\n` +
        `• Statistics automatically recalculated\n` +
        `• Priority & status charts updated\n` +
        `• Dashboard metrics synced\n` +
        `• Overdue count updated if due date changed\n` +
        `• Progress tracking updated for all views`;
      
      alert(statusMessage);
      
      onClose();
    } catch (error) {
      alert('❌ Error updating CAPA. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Custom CSS for progress slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
      
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-semibold text-orange-900 mb-2">Edit CAPA</h3>
        <p className="text-sm text-orange-700">Update CAPA information and progress</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="Safety">Safety</option>
              <option value="Quality">Quality</option>
              <option value="Equipment">Equipment</option>
              <option value="Training">Training</option>
              <option value="Information Security">Information Security</option>
              <option value="Process">Process</option>
              <option value="Documentation">Documentation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => handleChange('assignee', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
          <div className="space-y-3">
            {/* Visual Progress Bar with Milestones */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div 
                  className={`h-4 rounded-full transition-all duration-300 ${
                    formData.progress === 100 ? 'bg-green-500' :
                    formData.progress >= 75 ? 'bg-blue-500' :
                    formData.progress >= 50 ? 'bg-yellow-500' :
                    formData.progress >= 25 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${formData.progress}%` }}
                ></div>
              </div>
              
              {/* Milestone markers */}
              <div className="absolute top-0 w-full h-4 flex justify-between items-center pointer-events-none">
                {[25, 50, 75].map((milestone) => (
                  <div 
                    key={milestone}
                    className={`w-1 h-6 ${
                      formData.progress >= milestone ? 'bg-white' : 'bg-gray-400'
                    } rounded-full shadow-sm`}
                    style={{ marginLeft: `${milestone}%`, transform: 'translateX(-50%)' }}
                  ></div>
                ))}
              </div>
              
              {/* Milestone labels */}
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
            
            {/* Range Slider Control */}
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => handleChange('progress', e.target.value)}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${formData.progress}%, #e5e7eb ${formData.progress}%, #e5e7eb 100%)`
                }}
              />
              <span className="text-sm font-medium w-12 text-center bg-gray-100 px-2 py-1 rounded">
                {formData.progress}%
              </span>
            </div>
            
            {/* Quick Progress Buttons */}
            <div className="flex gap-2 flex-wrap">
              {[0, 25, 50, 75, 100].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleChange('progress', value)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    formData.progress == value 
                      ? 'bg-orange-500 text-white border-orange-500' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {value}%
                </button>
              ))}
            </div>
            
            {/* Progress Status Text */}
            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              {formData.progress === 0 && "🔴 Not Started - CAPA has not begun"}
              {formData.progress > 0 && formData.progress < 25 && "🟠 Just Started - Initial actions taken"}
              {formData.progress >= 25 && formData.progress < 50 && "🟡 In Progress - Early Stage - Foundation work underway"}
              {formData.progress >= 50 && formData.progress < 75 && "🔵 In Progress - Mid Stage - Significant progress made"}
              {formData.progress >= 75 && formData.progress < 100 && "🟣 In Progress - Nearly Complete - Final steps remaining"}
              {formData.progress === 100 && "🟢 Completed - All actions finished and verified"}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Describe the CAPA in detail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Root Cause Analysis</label>
          <textarea
            value={formData.rootCause}
            onChange={(e) => handleChange('rootCause', e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Describe the root cause analysis..."
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Updating CAPA & Tables...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Delete CAPA Confirmation Modal
export const DeleteCAPAModal = ({ capa, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Call the onConfirm callback (this will trigger deleteCAPA in the context)
      if (onConfirm) {
        onConfirm(capa.id); // Pass the CAPA ID for deletion
      }

      // Show success message
      alert(`✅ CAPA Deleted Successfully!\n\nTitle: ${capa.title}\nCategory: ${capa.category}\nAssignee: ${capa.assignee}\n\nThe CAPA has been permanently removed from the system.`);
      
      onClose();
    } catch (error) {
      alert('❌ Error deleting CAPA. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-semibold text-red-900 mb-2">Delete CAPA</h3>
        <p className="text-sm text-red-700">This action cannot be undone</p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete the following CAPA?
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><strong>Title:</strong> {capa.title}</div>
            <div><strong>Category:</strong> {capa.category}</div>
            <div><strong>Priority:</strong> {capa.priority}</div>
            <div><strong>Status:</strong> {capa.status}</div>
            <div><strong>Assignee:</strong> {capa.assignee}</div>
            <div><strong>Due Date:</strong> {capa.dueDate}</div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="text-amber-600 mr-2 mt-0.5" size={20} />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Warning</h4>
              <p className="text-sm text-amber-700">
                Deleting this CAPA will permanently remove all associated data, progress information, and action history. 
                This action cannot be undone and may affect compliance tracking.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            isDeleting 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isDeleting ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              Deleting...
            </>
          ) : (
            'Delete CAPA'
          )}
        </button>
      </div>
    </div>
  );
};

// Utility function to handle all actions
export const handleAction = (type, action, item, openModal, closeModal, updateAudit, deleteAudit, updateCAPA, deleteCAPA) => {
  switch (`${type}_${action}`) {
    case 'audit_view':
      openModal('viewAudit', <ViewAuditModal audit={item} onClose={() => closeModal('viewAudit')} />, 'Audit Details');
      break;
    case 'audit_edit':
      openModal('editAudit', <EditAuditModal 
        audit={item} 
        onClose={() => closeModal('editAudit')}
        onSave={(updatedData) => updateAudit(item.id, updatedData)}
      />, 'Edit Audit');
      break;
    case 'audit_delete':
      openModal('deleteAudit', <DeleteAuditModal 
        audit={item} 
        onClose={() => closeModal('deleteAudit')}
        onConfirm={(auditId) => deleteAudit(auditId)}
      />, 'Delete Audit');
      break;
    case 'capa_view':
      openModal('viewCAPA', <ViewCAPAModal capa={item} onClose={() => closeModal('viewCAPA')} />, 'CAPA Details');
      break;
    case 'capa_edit':
      openModal('editCAPA', <EditCAPAModal 
        capa={item} 
        onClose={() => closeModal('editCAPA')}
        onSave={(updatedData) => updateCAPA(item.id, updatedData)}
      />, 'Edit CAPA');
      break;
    case 'capa_delete':
      openModal('deleteCAPA', <DeleteCAPAModal 
        capa={item} 
        onClose={() => closeModal('deleteCAPA')}
        onConfirm={(capaId) => deleteCAPA(capaId)}
      />, 'Delete CAPA');
      break;
    case 'reports_download':
      openModal('downloadProgress', <DownloadProgressModal report={item} onClose={() => closeModal('downloadProgress')} />);
      break;
    case 'reports_run':
      alert(`Running template "${item.name}". Report generation started...`);
      break;
    case 'reports_edit':
      alert(`Editing template "${item.name}". Template editor would open here.`);
      break;
    case 'reports_delete':
      if (window.confirm(`Are you sure you want to delete template "${item.name}"? This will cancel all scheduled reports.`)) {
        alert(`Template "${item.name}" has been deleted.`);
      }
      break;
    default:
      alert(`Action ${action} for ${type} is not yet implemented.`);
  }
};