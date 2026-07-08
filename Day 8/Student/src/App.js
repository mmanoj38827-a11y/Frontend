import React, { useState, useEffect } from 'react';

/* ============ CSS ============ */
const styles = `
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --primary: #4f46e5;
  --primary-dark: #4338ca;
  --secondary: #64748b;
  --danger: #ef4444;
  --danger-dark: #dc2626;
  --success: #10b981;
  --warning: #f59e0b;
  --bg: #f1f5f9;
  --card-bg: #ffffff;
  --text: #1e293b;
  --text-light: #64748b;
  --border: #e2e8f0;
  --shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
  --radius: 12px;
  --radius-sm: 8px;
  --transition: all 0.3s ease;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

.app-header {
  background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
  color: white;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.header-content p { opacity: 0.9; font-size: 1.1rem; }

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Stats */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-info h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text);
}

.stat-info p { color: var(--text-light); font-size: 0.9rem; }

/* Controls */
.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-bar {
  display: flex;
  gap: 1rem;
  flex: 1;
  min-width: 300px;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
}

.search-input-wrapper i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.search-input-wrapper input {
  width: 100%;
  padding: 0.75rem 2.5rem;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  transition: var(--transition);
  background: var(--card-bg);
}

.search-input-wrapper input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.clear-search {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.25rem;
}

.filter-wrapper { position: relative; }

.filter-wrapper i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  pointer-events: none;
}

.filter-wrapper select {
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  background: var(--card-bg);
  cursor: pointer;
  transition: var(--transition);
  min-width: 140px;
}

.filter-wrapper select:focus {
  outline: none;
  border-color: var(--primary);
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-secondary {
  background: var(--border);
  color: var(--text);
}

.btn-secondary:hover { background: #cbd5e1; }

.add-btn { white-space: nowrap; }

/* Form */
.form-container {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-container h2 {
  margin-bottom: 1.5rem;
  color: var(--text);
  font-size: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--text);
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  transition: var(--transition);
  background: var(--card-bg);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group input.error { border-color: var(--danger); }

.error-text {
  color: var(--danger);
  font-size: 0.85rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Student List */
.list-header {
  margin-bottom: 1rem;
  color: var(--text-light);
  font-size: 0.95rem;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Student Card */
.student-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.student-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.student-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), #7c3aed);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.grade-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
}

.grade-a { background: #dcfce7; color: #166534; }
.grade-b { background: #dbeafe; color: #1e40af; }
.grade-c { background: #fef3c7; color: #92400e; }
.grade-d { background: #fee2e2; color: #991b1b; }

.card-body h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.card-body .email,
.card-body .major {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  font-size: 0.85rem;
  color: var(--text-light);
}

.info-row span {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  font-size: 0.9rem;
}

.btn-icon.edit {
  background: #dbeafe;
  color: #1e40af;
}

.btn-icon.edit:hover {
  background: #1e40af;
  color: white;
}

.btn-icon.delete {
  background: #fee2e2;
  color: #dc2626;
}

.btn-icon.delete:hover {
  background: #dc2626;
  color: white;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-light);
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}

/* Footer */
.app-footer {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  border-top: 1px solid var(--border);
  margin-top: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content h1 { font-size: 1.75rem; }
  .controls-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .search-bar {
    flex-direction: column;
    min-width: unset;
  }
  .student-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .stats-container { grid-template-columns: repeat(2, 1fr); }
}
`;

/* ============ COMPONENTS ============ */

const Stats = ({ students }) => {
  const totalStudents = students.length;
  const avgAge = totalStudents > 0 
    ? (students.reduce((sum, s) => sum + Number(s.age), 0) / totalStudents).toFixed(1) 
    : 0;
  const topStudents = students.filter(s => s.grade.startsWith('A')).length;
  const uniqueMajors = new Set(students.map(s => s.major)).size;

  const stats = [
    { label: 'Total Students', value: totalStudents, icon: 'fa-users', color: '#4f46e5' },
    { label: 'Average Age', value: avgAge, icon: 'fa-birthday-cake', color: '#06b6d4' },
    { label: 'Top Performers', value: topStudents, icon: 'fa-star', color: '#f59e0b' },
    { label: 'Unique Majors', value: uniqueMajors, icon: 'fa-book', color: '#10b981' },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
            <i className={`fas ${stat.icon}`}></i>
          </div>
          <div className="stat-info">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const SearchBar = ({ searchTerm, setSearchTerm, filterGrade, setFilterGrade, grades }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search by name, email, or major..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-search" onClick={() => setSearchTerm('')}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      <div className="filter-wrapper">
        <i className="fas fa-filter"></i>
        <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)}>
          {grades.map(grade => (
            <option key={grade} value={grade}>
              {grade === 'All' ? 'All Grades' : `Grade ${grade}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const StudentForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    grade: 'A',
    major: '',
    enrollmentDate: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.age || formData.age < 16 || formData.age > 100) {
      newErrors.age = 'Age must be between 16 and 100';
    }
    if (!formData.major.trim()) newErrors.major = 'Major is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        name: '',
        email: '',
        age: '',
        grade: 'A',
        major: '',
        enrollmentDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="form-container">
      <h2>{initialData ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="Enter full name" className={errors.name ? 'error' : ''} />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="Enter email" className={errors.email ? 'error' : ''} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange}
              placeholder="Enter age" className={errors.age ? 'error' : ''} />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>
          <div className="form-group">
            <label>Grade</label>
            <select name="grade" value={formData.grade} onChange={handleChange}>
              {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Major</label>
            <input type="text" name="major" value={formData.major} onChange={handleChange}
              placeholder="Enter major" className={errors.major ? 'error' : ''} />
            {errors.major && <span className="error-text">{errors.major}</span>}
          </div>
          <div className="form-group">
            <label>Enrollment Date</label>
            <input type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i> {initialData ? 'Update' : 'Save'} Student
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const StudentCard = ({ student, onDelete, onEdit }) => {
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'grade-a';
    if (grade.startsWith('B')) return 'grade-b';
    if (grade.startsWith('C')) return 'grade-c';
    return 'grade-d';
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="student-card">
      <div className="card-header">
        <div className="avatar">{getInitials(student.name)}</div>
        <div className={`grade-badge ${getGradeColor(student.grade)}`}>{student.grade}</div>
      </div>
      <div className="card-body">
        <h3>{student.name}</h3>
        <p className="email"><i className="fas fa-envelope"></i> {student.email}</p>
        <p className="major"><i className="fas fa-book"></i> {student.major}</p>
        <div className="info-row">
          <span><i className="fas fa-birthday-cake"></i> {student.age} years</span>
          <span><i className="fas fa-calendar"></i> {student.enrollmentDate}</span>
        </div>
      </div>
      <div className="card-actions">
        <button className="btn-icon edit" onClick={() => onEdit(student)} title="Edit">
          <i className="fas fa-pen"></i>
        </button>
        <button className="btn-icon delete" onClick={() => onDelete(student.id)} title="Delete">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

const StudentList = ({ students, onDelete, onEdit }) => {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-user-slash"></i>
        <h3>No students found</h3>
        <p>Try adjusting your search or add a new student.</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <div className="list-header">
        <span>Showing {students.length} student{students.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="student-grid">
        {students.map(student => (
          <StudentCard key={student.id} student={student} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

/* ============ MAIN APP ============ */

const App = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', grade: 'A', age: 20, major: 'Computer Science', enrollmentDate: '2024-09-01' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', grade: 'B+', age: 21, major: 'Mathematics', enrollmentDate: '2024-09-01' },
      { id: 3, name: 'Carol Williams', email: 'carol@example.com', grade: 'A-', age: 19, major: 'Physics', enrollmentDate: '2024-09-02' },
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('All');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now() };
    setStudents([...students, newStudent]);
    setShowForm(false);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setEditingStudent(null);
    setShowForm(false);
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingStudent(null);
    setShowForm(false);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.major.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'All' || student.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const uniqueGrades = ['All', ...new Set(students.map(s => s.grade))];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1><i className="fas fa-graduation-cap"></i> Student Management</h1>
            <p>Manage your students efficiently</p>
          </div>
        </header>

        <main className="main-container">
          <Stats students={students} />

          <div className="controls-bar">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              filterGrade={filterGrade}
              setFilterGrade={setFilterGrade}
              grades={uniqueGrades}
            />
            <button className="btn btn-primary add-btn" onClick={() => setShowForm(!showForm)}>
              <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'}`}></i>
              {showForm ? ' Close Form' : ' Add Student'}
            </button>
          </div>

          {showForm && (
            <StudentForm 
              onSubmit={editingStudent ? updateStudent : addStudent}
              initialData={editingStudent}
              onCancel={handleCancel}
            />
          )}

          <StudentList 
            students={filteredStudents} 
            onDelete={deleteStudent}
            onEdit={handleEdit}
          />
        </main>

        <footer className="app-footer">
          <p> Student Management System. Built with React.</p>
        </footer>
      </div>
    </>
  );
};

export default App;