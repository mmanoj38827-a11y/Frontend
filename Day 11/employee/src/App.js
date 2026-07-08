import React, { useState, useMemo } from 'react';

// ============================================
// EMPLOYEE MANAGEMENT APP - Single File
// ============================================

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'HR', 'Sales', 'Operations'];
const ROLES = ['Junior', 'Mid', 'Senior', 'Lead', 'Manager', 'Director'];

const INITIAL_EMPLOYEES = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@company.com', department: 'Engineering', role: 'Senior', salary: 95000, status: 'Active', joinDate: '2022-03-15' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus.j@company.com', department: 'Design', role: 'Lead', salary: 88000, status: 'Active', joinDate: '2021-07-22' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily.r@company.com', department: 'Marketing', role: 'Manager', salary: 82000, status: 'On Leave', joinDate: '2020-11-08' },
  { id: 4, name: 'David Kim', email: 'david.kim@company.com', department: 'Engineering', role: 'Junior', salary: 58000, status: 'Active', joinDate: '2024-01-10' },
  { id: 5, name: 'Lisa Thompson', email: 'lisa.t@company.com', department: 'HR', role: 'Director', salary: 110000, status: 'Active', joinDate: '2019-05-30' },
  { id: 6, name: 'James Wilson', email: 'james.w@company.com', department: 'Sales', role: 'Mid', salary: 65000, status: 'Inactive', joinDate: '2023-08-14' },
  { id: 7, name: 'Aisha Patel', email: 'aisha.p@company.com', department: 'Engineering', role: 'Manager', salary: 105000, status: 'Active', joinDate: '2020-02-18' },
  { id: 8, name: 'Tom Baker', email: 'tom.b@company.com', department: 'Operations', role: 'Senior', salary: 72000, status: 'Active', joinDate: '2021-09-05' },
];

// --- Icons ---
const Icons = {
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Dollar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M16 18h.01"/></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
};

// --- Styles ---
const styles = {
  app: { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '24px' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { marginBottom: '24px' },
  title: { fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' },
  subtitle: { fontSize: '14px', color: '#6b7280', margin: 0 },
  
  // Stats Cards
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' },
  statCard: { background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '14px' },
  statIcon: { width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0' },
  statLabel: { fontSize: '13px', color: '#6b7280', margin: 0 },
  
  // Controls
  controls: { display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' },
  searchBox: { position: 'relative', flex: '1', minWidth: '240px' },
  searchIcon: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' },
  searchInput: { width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
  select: { padding: '10px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', background: '#fff', cursor: 'pointer', outline: 'none' },
  btnPrimary: { padding: '10px 18px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s' },
  btnDanger: { padding: '6px 10px', backgroundColor: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' },
  btnEdit: { padding: '6px 10px', backgroundColor: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' },
  
  // Table
  tableCard: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #f3f4f6', background: '#fafafa' },
  td: { padding: '14px 20px', fontSize: '14px', color: '#374151', borderBottom: '1px solid #f3f4f6' },
  nameCell: { fontWeight: '600', color: '#111827' },
  emailCell: { fontSize: '13px', color: '#6b7280' },
  
  // Badges
  badge: { padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', display: 'inline-block' },
  badgeActive: { background: '#dcfce7', color: '#166534' },
  badgeInactive: { background: '#f3f4f6', color: '#6b7280' },
  badgeLeave: { background: '#fef3c7', color: '#92400e' },
  deptBadge: { padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', display: 'inline-block' },
  
  // Modal
  overlay: { position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' },
  modal: { background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  modalHeader: { padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#9ca3af', borderRadius: '6px' },
  modalBody: { padding: '24px' },
  formGroup: { marginBottom: '16px' },
  formLabel: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' },
  formInput: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
  modalFooter: { padding: '16px 24px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  btnSecondary: { padding: '10px 16px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  
  emptyState: { textAlign: 'center', padding: '60px 20px', color: '#9ca3af' },
  emptyTitle: { fontSize: '16px', fontWeight: '600', color: '#6b7280', marginBottom: '4px' },
};

const DEPT_COLORS = {
  Engineering: { bg: '#ede9fe', color: '#7c3aed' },
  Design: { bg: '#fce7f3', color: '#db2777' },
  Marketing: { bg: '#ffedd5', color: '#ea580c' },
  HR: { bg: '#dbeafe', color: '#2563eb' },
  Sales: { bg: '#d1fae5', color: '#059669' },
  Operations: { bg: '#f3e8ff', color: '#9333ea' },
};

const STATUS_STYLES = {
  Active: styles.badgeActive,
  Inactive: styles.badgeInactive,
  'On Leave': styles.badgeLeave,
};

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({
    name: '', email: '', department: 'Engineering', role: 'Junior', salary: '', status: 'Active', joinDate: ''
  });

  // Stats
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'Active').length;
    const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
    const avgSalary = total > 0 ? Math.round(totalSalary / total) : 0;
    return { total, active, avgSalary, departments: new Set(employees.map(e => e.department)).size };
  }, [employees]);

  // Filtered list
  const filtered = useMemo(() => {
    return employees.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                          e.email.toLowerCase().includes(search.toLowerCase());
      const matchDept = deptFilter === 'All' || e.department === deptFilter;
      const matchStatus = statusFilter === 'All' || e.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, search, deptFilter, statusFilter]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', email: '', department: 'Engineering', role: 'Junior', salary: '', status: 'Active', joinDate: new Date().toISOString().split('T')[0] });
    setModalOpen(true);
  };

  const openEdit = (emp) => {
    setEditingId(emp.id);
    setForm({ ...emp, salary: emp.salary.toString() });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, salary: Number(form.salary) };
    if (editingId) {
      setEmployees(prev => prev.map(e => e.id === editingId ? { ...data, id: editingId } : e));
    } else {
      setEmployees(prev => [...prev, { ...data, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const formatCurrency = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>👥 Employee Management</h1>
          <p style={styles.subtitle}>Manage your team, track performance, and keep everything organized.</p>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#ede9fe', color: '#7c3aed' }}><Icons.Users /></div>
            <div><p style={styles.statValue}>{stats.total}</p><p style={styles.statLabel}>Total Employees</p></div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#dcfce7', color: '#166534' }}><Icons.Users /></div>
            <div><p style={styles.statValue}>{stats.active}</p><p style={styles.statLabel}>Active Now</p></div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#dbeafe', color: '#2563eb' }}><Icons.Dollar /></div>
            <div><p style={styles.statValue}>{formatCurrency(stats.avgSalary)}</p><p style={styles.statLabel}>Avg. Salary</p></div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#ffedd5', color: '#ea580c' }}><Icons.Building /></div>
            <div><p style={styles.statValue}>{stats.departments}</p><p style={styles.statLabel}>Departments</p></div>
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}><Icons.Search /></span>
            <input 
              style={styles.searchInput} 
              placeholder="Search by name or email..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
          <select style={styles.select} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            <option value="All">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select style={styles.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
          <button style={styles.btnPrimary} onClick={openAdd}>
            <Icons.Plus /> Add Employee
          </button>
        </div>

        {/* Table */}
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Salary</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Joined</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div style={styles.emptyState}>
                      <p style={styles.emptyTitle}>No employees found</p>
                      <p style={{ margin: 0, fontSize: '14px' }}>Try adjusting your filters or add a new employee.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(emp => (
                  <tr key={emp.id}>
                    <td style={styles.td}>
                      <div style={styles.nameCell}>{emp.name}</div>
                      <div style={styles.emailCell}>{emp.email}</div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.deptBadge, ...DEPT_COLORS[emp.department] }}>
                        {emp.department}
                      </span>
                    </td>
                    <td style={styles.td}>{emp.role}</td>
                    <td style={styles.td}>{formatCurrency(emp.salary)}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...STATUS_STYLES[emp.status] }}>{emp.status}</span>
                    </td>
                    <td style={styles.td}>{emp.joinDate}</td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={styles.btnEdit} onClick={() => openEdit(emp)}><Icons.Edit /> Edit</button>
                        <button style={styles.btnDanger} onClick={() => handleDelete(emp.id)}><Icons.Trash /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={styles.overlay} onClick={() => setModalOpen(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingId ? '✏️ Edit Employee' : '➕ Add Employee'}</h3>
              <button style={styles.closeBtn} onClick={() => setModalOpen(false)}><Icons.X /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={styles.modalBody}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Full Name</label>
                  <input style={styles.formInput} required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Email</label>
                  <input style={styles.formInput} type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@company.com" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Department</label>
                    <select style={styles.formInput} value={form.department} onChange={e => setForm({...form, department: e.target.value})}>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Role</label>
                    <select style={styles.formInput} value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Salary (USD)</label>
                    <input style={styles.formInput} type="number" required min="0" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} placeholder="75000" />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Status</label>
                    <select style={styles.formInput} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Join Date</label>
                  <input style={styles.formInput} type="date" required value={form.joinDate} onChange={e => setForm({...form, joinDate: e.target.value})} />
                </div>
              </div>
              <div style={styles.modalFooter}>
                <button type="button" style={styles.btnSecondary} onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" style={styles.btnPrimary}>{editingId ? 'Save Changes' : 'Add Employee'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}