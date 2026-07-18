import React, { useState } from 'react';

export default function EmployeeDashboardLight() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Arun Kumar', role: 'Frontend Developer', dept: 'Engineering', status: 'Active', salary: '$85,000' },
    { id: 2, name: 'Priya Sharma', role: 'UI/UX Designer', dept: 'Design', status: 'Active', salary: '$78,000' },
    { id: 3, name: 'Karthik Raja', role: 'Backend Lead', dept: 'Engineering', status: 'On Leave', salary: '$95,000' },
    { id: 4, name: 'Divya Ramesh', role: 'HR Manager', dept: 'Human Resources', status: 'Active', salary: '$70,000' },
    { id: 5, name: 'Rahul Dravid', role: 'DevOps Engineer', dept: 'Engineering', status: 'Active', salary: '$90,000' }
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Add Employee Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('Engineering');
  const [salary, setSalary] = useState('');

  // Other Module States
  const [leaveStatus, setLeaveStatus] = useState('Pending');
  const [clockStatus, setClockStatus] = useState('Not Checked In');
  const [rating, setRating] = useState('4.5');
  const [assetAssigned, setAssetAssigned] = useState('Laptop #540');
  const [password, setPassword] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [auditLogs, setAuditLogs] = useState(['Deleted employee profile ID #2', 'Manager login from 192.168.1.10']);

  const addEmployee = (e) => {
    e.preventDefault();
    if (!name || !role || !salary) return;
    if (email && !email.includes('@')) {
      alert("Invalid Email Format ❌");
      return;
    }
    const newEmp = {
      id: Date.now(),
      name,
      role,
      dept,
      status: 'Active',
      salary: `$${salary}`,
    };
    setEmployees([newEmp, ...employees]);
    setName('');
    setRole('');
    setEmail('');
    setSalary('');
    setActiveTab('directory');
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setAuditLogs([`Deleted employee ID #${id}`, ...auditLogs]);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
                          emp.role.toLowerCase().includes(search.toLowerCase()) ||
                          emp.dept.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif', height: '100vh', background: '#f8fafc', boxSizing: 'border-box' }}>
      
      {/* Sidebar Navigation for all 16 Modules */}
      <aside style={{ width: '280px', background: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px', overflowY: 'auto' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: '#4f46e5', color: '#fff', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>N</div>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>NexusCorp</h1>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button onClick={() => setActiveTab('dashboard')} style={navBtnStyle(activeTab === 'dashboard')}>📊 1. Dashboard</button>
            <button onClick={() => setActiveTab('directory')} style={navBtnStyle(activeTab === 'directory')}>👥 2. Directory</button>
            <button onClick={() => setActiveTab('add')} style={navBtnStyle(activeTab === 'add')}>➕ 3. Add Employee</button>
            <button onClick={() => setActiveTab('analytics')} style={navBtnStyle(activeTab === 'analytics')}>📈 4. Analytics</button>
            <button onClick={() => setActiveTab('settings')} style={navBtnStyle(activeTab === 'settings')}>⚙️ 5. Settings</button>
            <button onClick={() => setActiveTab('leave')} style={navBtnStyle(activeTab === 'leave')}>📅 6. Leave Mgmt</button>
            <button onClick={() => setActiveTab('attendance')} style={navBtnStyle(activeTab === 'attendance')}>⏱️ 7. Attendance</button>
            <button onClick={() => setActiveTab('payroll')} style={navBtnStyle(activeTab === 'payroll')}>💵 8. Payroll</button>
            <button onClick={() => setActiveTab('performance')} style={navBtnStyle(activeTab === 'performance')}>🎖️ 9. Performance</button>
            <button onClick={() => setActiveTab('training')} style={navBtnStyle(activeTab === 'training')}>📝 10. Training</button>
            <button onClick={() => setActiveTab('assets')} style={navBtnStyle(activeTab === 'assets')}>💻 11. IT Assets</button>
            <button onClick={() => setActiveTab('scheduling')} style={navBtnStyle(activeTab === 'scheduling')}>📅 12. Shifts</button>
            <button onClick={() => setActiveTab('security')} style={navBtnStyle(activeTab === 'security')}>🛡️ 13. Security</button>
            <button onClick={() => setActiveTab('notifications')} style={navBtnStyle(activeTab === 'notifications')}>📣 14. Notifications ({notificationCount})</button>
            <button onClick={() => setActiveTab('profile')} style={navBtnStyle(activeTab === 'profile')}>👤 15. Profile</button>
            <button onClick={() => setActiveTab('audit')} style={navBtnStyle(activeTab === 'audit')}>📜 16. Audit Logs</button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        
        {/* 1. Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0' }}>Welcome Back, Boss! 👋</h2>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>Overview of your workspace performance.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={cardStyle}><h4>Total Employees</h4><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4f46e5' }}>{employees.length}</p></div>
              <div style={cardStyle}><h4>Active Now</h4><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>{employees.filter(e => e.status === 'Active').length}</p></div>
              <div style={cardStyle}><h4>Departments</h4><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0ea5e9' }}>3</p></div>
              <div style={cardStyle}><h4>On Leave</h4><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#d97706' }}>{employees.filter(e => e.status === 'On Leave').length}</p></div>
            </div>
          </div>
        )}

        {/* 2. Directory */}
        {activeTab === 'directory' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>👥 Employee Directory</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="text" placeholder="Search name, role..." value={search} onChange={(e) => setSearch(e.target.value)} style={inputStyle} />
                <select aria-label="Filter Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={inputStyle}>
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>
            <table style={{ width: '100%', background: '#fff', borderRadius: '12px', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Name</th>
                  <th style={{ padding: '12px' }}>Role & Dept</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Salary</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(emp => (
                  <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{emp.name}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{emp.role} ({emp.dept})</td>
                    <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', background: emp.status === 'Active' ? '#dcfce7' : '#fef3c7', color: emp.status === 'Active' ? '#166534' : '#92400e' }}>{emp.status}</span></td>
                    <td style={{ padding: '12px' }}>{emp.salary}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}><button onClick={() => deleteEmployee(emp.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Delete 🗑️</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. Add Employee */}
        {activeTab === 'add' && (
          <div style={{ ...cardStyle, maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>➕ Add New Employee</h2>
            <form onSubmit={addEmployee}>
              <div style={{ marginBottom: '12px' }}><label>Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={inputStyle} /></div>
              <div style={{ marginBottom: '12px' }}><label>Email Address</label><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@company.com" style={inputStyle} /></div>
              <div style={{ marginBottom: '12px' }}><label>Role</label><input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" style={inputStyle} /></div>
              <div style={{ marginBottom: '12px' }}><label>Department</label><select value={dept} onChange={(e) => setDept(e.target.value)} style={inputStyle}><option>Engineering</option><option>Design</option><option>Human Resources</option></select></div>
              <div style={{ marginBottom: '16px' }}><label>Salary ($)</label><input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="85000" style={inputStyle} /></div>
              <button type="submit" style={btnPrimaryStyle}>Submit Onboarding 🚀</button>
            </form>
          </div>
        )}

        {/* 4. Analytics */}
        {activeTab === 'analytics' && (
          <div style={{ ...cardStyle, maxWidth: '600px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>📈 Organization Analytics</h2>
            <p>Engineering: 60% | Design: 20% | HR: 20%</p>
            <h3 style={{ marginTop: '20px' }}>Estimated Payroll: <span style={{ color: '#059669' }}>$418,000</span></h3>
          </div>
        )}

        {/* 5. Settings */}
        {activeTab === 'settings' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>⚙️ System Settings</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => alert("CSV Downloaded Successfully! 📂")} style={btnPrimaryStyle}>Export CSV 📥</button>
              <button onClick={() => alert("Cache Wiped! 🧹")} style={{ ...btnPrimaryStyle, background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1' }}>Clear Cache 🗑️</button>
            </div>
          </div>
        )}

        {/* 6. Leave Management */}
        {activeTab === 'leave' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>📅 Leave Management</h2>
            <p>Status Tag: <span style={{ padding: '4px 8px', background: '#fef3c7', color: '#92400e', borderRadius: '12px' }}>{leaveStatus}</span></p>
            <button onClick={() => setLeaveStatus('Approved')} style={btnPrimaryStyle}>Approve Leave Request 🟢</button>
          </div>
        )}

        {/* 7. Attendance Tracking */}
        {activeTab === 'attendance' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>⏱️ Attendance Tracking</h2>
            <p>Current Status: <b>{clockStatus}</b></p>
            <button onClick={() => setClockStatus('Checked In at 9:00 AM (Location Tagged)')} style={btnPrimaryStyle}>Clock-In Now 📍</button>
          </div>
        )}

        {/* 8. Payroll Processing */}
        {activeTab === 'payroll' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>💵 Payroll Processing</h2>
            <p>Net Pay Formula: Base ($5000) - 10% Tax = <b>$4500</b></p>
            <button onClick={() => alert("Bulk Payroll Approved! 🟢")} style={btnPrimaryStyle}>Approve Bulk Payroll</button>
          </div>
        )}

        {/* 9. Performance Appraisal */}
        {activeTab === 'performance' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>🎖️ Performance Appraisal</h2>
            <p>Manager Rating Score: ⭐ <b>{rating} / 5.0</b></p>
            <button onClick={() => alert("Report generated successfully as PDF! 📄")} style={btnPrimaryStyle}>Generate PDF Report</button>
          </div>
        )}

        {/* 10. Training Module */}
        {activeTab === 'training' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>📝 Onboarding & Training</h2>
            <p>Progress Bar: <b>100% Complete</b></p>
            <button onClick={() => alert("Handbook downloaded! 📥")} style={btnPrimaryStyle}>Download Handbook.pdf</button>
          </div>
        )}

        {/* 11. IT Asset Tracking */}
        {activeTab === 'assets' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>💻 IT Asset Tracking</h2>
            <p>Assigned Asset: <b>{assetAssigned}</b></p>
            <button onClick={() => setAssetAssigned('Available (Returned)')} style={btnPrimaryStyle}>Return Asset</button>
          </div>
        )}

        {/* 12. Shift Scheduling */}
        {activeTab === 'scheduling' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>📅 Shift Scheduling</h2>
            <p>Active Shift: <b>Night Shift (10 PM - 6 AM)</b></p>
            <button onClick={() => alert("CSV schedule uploaded successfully! 📁")} style={btnPrimaryStyle}>Upload Shift CSV</button>
          </div>
        )}

        {/* 13. System Access & Security */}
        {activeTab === 'security' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>🛡️ System Access & Security</h2>
            <p>RBAC Role: <b>Super Admin</b> (2FA Enabled)</p>
            <button onClick={() => alert("OTP Prompt Triggered! 📱")} style={btnPrimaryStyle}>Test 2FA Prompt</button>
          </div>
        )}

        {/* 14. Notifications & Alerts */}
        {activeTab === 'notifications' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>📣 Notifications & Alerts</h2>
            <p>Unread Alerts Count: <b>{notificationCount}</b></p>
            <button onClick={() => setNotificationCount(0)} style={btnPrimaryStyle}>Mark All as Read ✓</button>
          </div>
        )}

        {/* 15. Profile Settings */}
        {activeTab === 'profile' && (
          <div style={{ ...cardStyle, maxWidth: '500px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>👤 Profile Settings</h2>
            <p>Emergency Contact Limit: <b>2 / 2 Contacts Used</b></p>
            <button onClick={() => alert("Profile updated successfully! 🟢")} style={btnPrimaryStyle}>Update Profile Data</button>
          </div>
        )}

        {/* 16. Audit Trails & Logs */}
        {activeTab === 'audit' && (
          <div style={{ ...cardStyle, maxWidth: '600px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>📜 Audit Trails & Logs</h2>
            <ul style={{ paddingLeft: '20px', color: '#334155' }}>
              {auditLogs.map((log, index) => <li key={index} style={{ marginBottom: '8px' }}>{log}</li>)}
            </ul>
          </div>
        )}

      </main>
    </div>
  );
}

const navBtnStyle = (isActive) => ({
  width: '100%',
  padding: '10px 12px',
  textAlign: 'left',
  border: 'none',
  background: isActive ? '#eef2ff' : 'transparent',
  color: isActive ? '#4f46e5' : '#64748b',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '13px'
});

const cardStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  boxSizing: 'border-box',
  outline: 'none'
};

const btnPrimaryStyle = {
  background: '#4f46e5',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer',
  width: '100%'
};