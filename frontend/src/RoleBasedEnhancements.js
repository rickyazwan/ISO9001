import React, { useState, createContext, useContext } from 'react';
import { Eye, Edit, Trash2, Download, Play, Settings } from 'lucide-react';
import { handleAction } from './ActionImplementations';

// User Role Context
const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'admin', // 'admin', 'auditor', 'other_auditor'
    email: 'sarah.johnson@health.gov',
    permissions: {
      audit: {
        view: true,
        edit: true,
        delete: true
      },
      capa: {
        view: true,
        edit: true,
        delete: true
      },
      reports: {
        view: true,
        edit: true,
        delete: true,
        run: true
      }
    }
  });

  const switchRole = (role) => {
    const permissions = getRolePermissions(role);
    setCurrentUser(prev => ({
      ...prev,
      role,
      permissions
    }));
  };

  return (
    <UserRoleContext.Provider value={{ currentUser, setCurrentUser, switchRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within UserRoleProvider');
  }
  return context;
};

// Helper function to get permissions based on role
const getRolePermissions = (role) => {
  switch (role) {
    case 'admin':
      return {
        audit: { view: true, edit: true, delete: true },
        capa: { view: true, edit: true, delete: true },
        reports: { view: true, edit: true, delete: true, run: true }
      };
    case 'auditor':
      return {
        audit: { view: true, edit: true, delete: false },
        capa: { view: true, edit: true, delete: false },
        reports: { view: true, edit: true, delete: false, run: true }
      };
    case 'other_auditor':
      return {
        audit: { view: true, edit: false, delete: false },
        capa: { view: true, edit: false, delete: false },
        reports: { view: true, edit: false, delete: false, run: true }
      };
    default:
      return {
        audit: { view: false, edit: false, delete: false },
        capa: { view: false, edit: false, delete: false },
        reports: { view: false, edit: false, delete: false, run: false }
      };
  }
};

// Role Switcher Component for Testing
export const RoleSwitcher = () => {
  const { currentUser, switchRole } = useUserRole();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Current User Role (Testing)</h3>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {currentUser.name} - <span className="font-medium capitalize">{currentUser.role.replace('_', ' ')}</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => switchRole('admin')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              currentUser.role === 'admin' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => switchRole('auditor')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              currentUser.role === 'auditor' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Auditor
          </button>
          <button
            onClick={() => switchRole('other_auditor')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              currentUser.role === 'other_auditor' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Other Auditor
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Action Buttons Component with Functional Implementation
export const RoleBasedActionButtons = ({ 
  type, // 'audit', 'capa', 'report'
  item, 
  onView, 
  onEdit, 
  onDelete, 
  onDownload,
  onRun,
  openModal // Pass the modal function from the main app
}) => {
  const { currentUser } = useUserRole();
  const permissions = currentUser.permissions[type];

  const executeAction = (action) => {
    // Use custom handlers if provided, otherwise use default implementations
    switch (action) {
      case 'view':
        if (onView) {
          onView(item);
        } else {
          handleAction(type, 'view', item, openModal);
        }
        break;
      case 'edit':
        if (onEdit) {
          onEdit(item);
        } else {
          handleAction(type, 'edit', item, openModal);
        }
        break;
      case 'delete':
        if (onDelete) {
          onDelete(item);
        } else {
          handleAction(type, 'delete', item, openModal);
        }
        break;
      case 'download':
        if (onDownload) {
          onDownload(item);
        } else {
          handleAction(type, 'download', item, openModal);
        }
        break;
      case 'run':
        if (onRun) {
          onRun(item);
        } else {
          handleAction(type, 'run', item, openModal);
        }
        break;
      default:
        alert(`Action ${action} not implemented`);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {permissions.view && (
        <button 
          onClick={() => executeAction('view')}
          className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
          title="View Details"
        >
          <Eye size={16} />
        </button>
      )}
      
      {permissions.edit && (
        <button 
          onClick={() => executeAction('edit')}
          className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded hover:bg-gray-50"
          title="Edit"
        >
          <Edit size={16} />
        </button>
      )}
      
      {permissions.delete && (
        <button 
          onClick={() => executeAction('delete')}
          className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
      
      {onDownload && (
        <button 
          onClick={() => executeAction('download')}
          className="text-green-600 hover:text-green-800 transition-colors p-1 rounded hover:bg-green-50"
          title="Download"
        >
          <Download size={16} />
        </button>
      )}
      
      {onRun && permissions.run && (
        <button 
          onClick={() => executeAction('run')}
          className="text-purple-600 hover:text-purple-800 transition-colors p-1 rounded hover:bg-purple-50"
          title="Run"
        >
          <Play size={16} />
        </button>
      )}
    </div>
  );
};

// Enhanced Recent Reports Component with Functional Download
export const EnhancedRecentReports = ({ reports, openModal }) => {
  const [downloadingReport, setDownloadingReport] = useState(null);

  const startDownload = async (report) => {
    setDownloadingReport(report.id);
    
    // Simulate download process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create and trigger download
      const fileName = `${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${report.format.toLowerCase()}`;
      
      // Show success notification
      alert(`Report "${fileName}" has been downloaded successfully!`);
      
      // Optional: Create actual download blob for demo
      const content = `# ${report.name}\n\nGenerated: ${report.generated}\nType: ${report.type}\nFormat: ${report.format}\n\nThis is a sample report content for demonstration purposes.`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      alert('Download failed. Please try again.');
    } finally {
      setDownloadingReport(null);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Reports</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Reports
        </button>
      </div>
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{report.name}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <span>{report.type}</span>
                <span>•</span>
                <span>Generated {report.generated}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {report.format}
                </span>
                <span>•</span>
                <span>{report.size || '2.4 MB'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {report.status}
              </span>
              {report.status === 'Ready' && (
                <button 
                  onClick={() => startDownload(report)}
                  disabled={downloadingReport === report.id}
                  className={`transition-colors ${
                    downloadingReport === report.id 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                  title="Download Report"
                >
                  {downloadingReport === report.id ? (
                    <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  ) : (
                    <Download size={16} />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Template Management Component with Role-Based Actions
export const TemplateManagement = ({ templates, onRun, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Report Templates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                template.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {template.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {template.type} • {template.schedule}
            </p>
            <div className="text-xs text-gray-500 mb-3">
              <p>Last run: {template.lastRun}</p>
              <p>Created: {template.created}</p>
            </div>
            <RoleBasedActionButtons
              type="reports"
              item={template}
              onRun={() => {
                alert(`Running template "${template.name}"...`);
                if (onRun) onRun(template);
              }}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Permission Badge Component
export const PermissionBadge = ({ permission, hasPermission }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      hasPermission 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {permission}: {hasPermission ? 'Allowed' : 'Denied'}
    </span>
  );
};

// Audit Table Row with Role-Based Actions
export const AuditTableRow = ({ audit, isLast = false }) => {
  return (
    <tr className={`bg-white hover:bg-gray-50 ${!isLast ? 'border-b' : ''}`}>
      <td className="px-6 py-4 font-medium text-gray-900">{audit.facility}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          audit.type === 'Internal' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
        }`}>
          {audit.type}
        </span>
      </td>
      <td className="px-6 py-4">{audit.date}</td>
      <td className="px-6 py-4">{audit.auditor}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
          audit.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {audit.status}
        </span>
      </td>
      <td className="px-6 py-4">
        {audit.score ? (
          <span className={`font-medium ${
            audit.score >= 90 ? 'text-green-600' :
            audit.score >= 80 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {audit.score}%
          </span>
        ) : '-'}
      </td>
      <td className="px-6 py-4">{audit.findings}</td>
      <td className="px-6 py-4">
        <RoleBasedActionButtons
          type="audit"
          item={audit}
          onView={() => console.log('View audit', audit)}
          onEdit={() => console.log('Edit audit', audit)}
          onDelete={() => console.log('Delete audit', audit)}
        />
      </td>
    </tr>
  );
};

// CAPA List Item with Role-Based Actions
export const CAPAListItem = ({ capa, isLast = false }) => {
  return (
    <div className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${!isLast ? 'mb-4' : ''}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-medium text-gray-900">{capa.title}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              capa.priority === 'Critical' ? 'bg-red-100 text-red-800' :
              capa.priority === 'High' ? 'bg-red-100 text-red-800' :
              capa.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {capa.priority}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              capa.status === 'Open' ? 'bg-red-100 text-red-800' :
              capa.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
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
        <RoleBasedActionButtons
          type="capa"
          item={capa}
          onView={() => console.log('View CAPA', capa)}
          onEdit={() => console.log('Edit CAPA', capa)}
          onDelete={() => console.log('Delete CAPA', capa)}
        />
      </div>
    </div>
  );
};

// Export utility functions for role management
export const checkPermission = (userRole, module, action) => {
  const permissions = getRolePermissions(userRole);
  return permissions[module] && permissions[module][action];
};

export const formatRole = (role) => {
  return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Sample data for testing
export const sampleData = {
  recentReports: [
    {
      id: 1,
      name: 'Monthly Compliance Report',
      type: 'Compliance',
      generated: '2024-06-15',
      format: 'PDF',
      status: 'Ready',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Patient Safety Analytics',
      type: 'Safety',
      generated: '2024-06-14',
      format: 'Excel',
      status: 'Ready',
      size: '5.2 MB'
    },
    {
      id: 3,
      name: 'CAPA Performance Summary',
      type: 'CAPA',
      generated: '2024-06-13',
      format: 'PDF',
      status: 'Ready',
      size: '1.8 MB'
    },
    {
      id: 4,
      name: 'Quarterly Audit Report',
      type: 'Audit',
      generated: '2024-06-12',
      format: 'Word',
      status: 'Processing',
      size: 'Pending'
    }
  ],
  reportTemplates: [
    {
      id: 1,
      name: 'Monthly Compliance Summary',
      type: 'Compliance',
      schedule: 'Monthly',
      status: 'Active',
      lastRun: '2024-06-15',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: 'Weekly Safety Report',
      type: 'Safety',
      schedule: 'Weekly',
      status: 'Active',
      lastRun: '2024-06-14',
      created: '2024-02-01'
    },
    {
      id: 3,
      name: 'Quarterly Audit Overview',
      type: 'Audit',
      schedule: 'Quarterly',
      status: 'Active',
      lastRun: '2024-06-01',
      created: '2024-01-20'
    },
    {
      id: 4,
      name: 'Executive Dashboard',
      type: 'Performance',
      schedule: 'Weekly',
      status: 'Inactive',
      lastRun: '2024-05-30',
      created: '2024-03-01'
    }
  ]
};