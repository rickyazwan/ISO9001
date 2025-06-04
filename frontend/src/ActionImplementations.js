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
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Export Details
        </button>
      </div>
    </div>
  );
};

export const ViewCAPAModal = ({ capa, onClose }) => {
  const capaDetails = CAPAActionHandler.viewCAPA(capa);

  return (
    <div className="space-y-6">
      {/* CAPA Header */}
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-semibold text-orange-900 mb-2">CAPA Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Title:</strong> {capaDetails.title}</div>
          <div><strong>Category:</strong> {capaDetails.category}</div>
          <div><strong>Priority:</strong> <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">{capaDetails.priority}</span></div>
          <div><strong>Status:</strong> <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">{capaDetails.status}</span></div>
          <div><strong>Assignee:</strong> {capaDetails.assignee}</div>
          <div><strong>Due Date:</strong> {capaDetails.dueDate}</div>
        </div>
      </div>

      {/* Root Cause Analysis */}
      <div>
        <h4 className="font-medium mb-2">Root Cause Analysis</h4>
        <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{capaDetails.details.rootCauseAnalysis}</p>
      </div>

      {/* Corrective Actions */}
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
      {capaDetails.progress && (
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
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
          Update Progress
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

// Utility function to handle all actions
export const handleAction = (type, action, item, openModal) => {
  switch (`${type}_${action}`) {
    case 'audit_view':
      openModal('viewAudit', <ViewAuditModal audit={item} onClose={() => openModal.closeModal('viewAudit')} />);
      break;
    case 'audit_edit':
      alert(`Editing audit for ${item.facility}. Edit form would open here.`);
      break;
    case 'audit_delete':
      if (window.confirm(`Are you sure you want to delete the audit for "${item.facility}"? This action cannot be undone.`)) {
        alert(`Audit for ${item.facility} has been deleted.`);
      }
      break;
    case 'capa_view':
      openModal('viewCAPA', <ViewCAPAModal capa={item} onClose={() => openModal.closeModal('viewCAPA')} />);
      break;
    case 'capa_edit':
      alert(`Editing CAPA "${item.title}". Edit form would open here.`);
      break;
    case 'capa_delete':
      if (window.confirm(`Are you sure you want to delete CAPA "${item.title}"? This action cannot be undone.`)) {
        alert(`CAPA "${item.title}" has been deleted.`);
      }
      break;
    case 'reports_download':
      openModal('downloadProgress', <DownloadProgressModal report={item} onClose={() => openModal.closeModal('downloadProgress')} />);
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