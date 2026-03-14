import React, { useState } from 'react';
import './StudentManager.css';

function StudentManager() {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', course: 'Computer Science' },
    { id: 2, name: 'Jane Smith', course: 'Engineering' },
    { id: 3, name: 'Mike Johnson', course: 'Business' },
    { id: 4, name: 'Sarah Williams', course: 'Medicine' },
    { id: 5, name: 'David Brown', course: 'Law' }
  ]);

  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    course: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStudent = () => {
    if (newStudent.id && newStudent.name && newStudent.course) {
      setStudents(prev => [...prev, {
        id: parseInt(newStudent.id),
        name: newStudent.name,
        course: newStudent.course
      }]);
      setNewStudent({
        id: '',
        name: '',
        course: ''
      });
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return (
    <div className="manager-container">
      <h1>Academic Portal - Student Manager</h1>
      
      <div className="form-section">
        <h2>Add New Student</h2>
        <div className="form-group">
          <input
            type="text"
            name="id"
            placeholder="Student ID"
            value={newStudent.id}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={newStudent.course}
            onChange={handleInputChange}
            className="input-field"
          />
          <button onClick={handleAddStudent} className="add-btn">Add Student</button>
        </div>
      </div>

      <div className="list-section">
        <h2>Student List</h2>
        {students.length === 0 ? (
          <p className="empty-message">No students available</p>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentManager;
