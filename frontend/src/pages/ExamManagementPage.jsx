import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const ExamManagementPage = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [filters, setFilters] = useState({
    search: ''
  });

  const [examForm, setExamForm] = useState({
    title: '',
    description: '',
    duration: 60,
    totalMarks: 100,
    questionIds: [],
  });

  // Fetch exams from backend on page load
  useEffect(() => {
    fetch('http://localhost:8090/api/admin/exams')
      .then(res => res.json())
      .then(data => {
        setExams(data);
        setFilteredExams(data);
      });
  }, []);

  // Fetch questions from backend (if needed)
  useEffect(() => {
    fetch('http://localhost:8090/api/admin/questions')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  // Filter exams by search
  useEffect(() => {
    let filtered = exams;
    if (filters.search) {
      filtered = exams.filter(exam =>
        (exam.title || '').toLowerCase().includes(filters.search.toLowerCase()) ||
        (exam.description || '').toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    setFilteredExams(filtered);
  }, [filters, exams]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setExamForm({
      title: exam.title,
      description: exam.description,
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      questionIds: exam.questionIds || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      // Optionally call backend to delete
      // await fetch(`http://localhost:8090/api/admin/exams/${examId}`, { method: 'DELETE' });
      const newExams = exams.filter(exam => exam.examId !== examId);
      setExams(newExams);
      setFilteredExams(newExams);
    }
  };

  const handleSave = async () => {
    const payload = {
      title: examForm.title,
      description: examForm.description,
      duration: examForm.duration,
      totalMarks: examForm.totalMarks,
      questionIds: examForm.questionIds,
    };

    const token = localStorage.getItem('token');
    let response, newExam;

    if (editingExam) {
      // Update existing exam
      response = await fetch(`http://localhost:8090/api/admin/exams/${editingExam.examId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        alert('Failed to update exam: ' + errorText);
        return;
      }
      newExam = await response.json();
      const updatedExams = exams.map(exam =>
        exam.examId === editingExam.examId ? newExam : exam
      );
      setExams(updatedExams);
      setFilteredExams(updatedExams);
    } else {
      // Create new exam
      response = await fetch('http://localhost:8090/api/admin/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        alert('Failed to create exam: ' + errorText);
        return;
      }
      newExam = await response.json();
      setExams([...exams, newExam]);
      setFilteredExams([...exams, newExam]);
    }

    setIsModalOpen(false);
    setExamForm({
      title: '',
      description: '',
      duration: 60,
      totalMarks: 100,
      questionIds: [],
    });
    setEditingExam(null);
  };

  const openAddModal = () => {
    setEditingExam(null);
    setExamForm({
      title: '',
      description: '',
      duration: 60,
      totalMarks: 100,
      questionIds: [],
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Exam Management</h1>
          <p className="text-gray-600 mt-2">Create, edit, and manage all exams</p>
        </div>
        <Button onClick={openAddModal}>Create New Exam</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="floating" className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            {exams.length}
          </div>
          <div className="text-sm text-gray-600">Total Exams</div>
        </Card>
        <Card variant="floating" className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            {Math.round(exams.reduce((sum, exam) => sum + (exam.duration || 0), 0) / (exams.length || 1))}
          </div>
          <div className="text-sm text-gray-600">Avg Duration (min)</div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="floating">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Search exams..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          <Button variant="outline" onClick={() => setFilters({ search: '' })}>
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Exams Table */}
      <Card variant="floating">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExams.map((exam) => (
                <tr key={exam.examId}>
                  <td className="px-6 py-4">{exam.title}</td>
                  <td className="px-6 py-4">{exam.description}</td>
                  <td className="px-6 py-4">{exam.duration} min</td>
                  <td className="px-6 py-4">{exam.totalMarks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(exam)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exam.examId)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredExams.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No exams found matching your criteria.
          </div>
        )}
      </Card>

      {/* Add/Edit Exam Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExam ? 'Edit Exam' : 'Create New Exam'}
        size="lg"
      >
        <div className="space-y-6">
          <Input
            label="Exam Title"
            value={examForm.title}
            onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
            placeholder="Enter exam title..."
          />
          <Input
            label="Description"
            value={examForm.description}
            onChange={(e) => setExamForm({ ...examForm, description: e.target.value })}
            placeholder="Enter exam description..."
          />
          <Input
            label="Duration (minutes)"
            type="number"
            value={examForm.duration}
            onChange={(e) => setExamForm({ ...examForm, duration: parseInt(e.target.value) })}
            min="1"
          />
          <Input
            label="Total Marks"
            type="number"
            value={examForm.totalMarks}
            onChange={(e) => setExamForm({ ...examForm, totalMarks: parseInt(e.target.value) })}
            min="1"
          />
          {/* If you want to select questions, keep this: */}
          <label className="block text-sm font-medium text-gray-700">Questions</label>
          <select
            multiple
            className="input-field w-full"
            value={examForm.questionIds}
            onChange={e =>
              setExamForm({
                ...examForm,
                questionIds: Array.from(e.target.selectedOptions, option => Number(option.value)),
              })
            }
          >
            {questions.map(q => (
              <option key={q.id || q.questionId} value={q.id || q.questionId}>
                {q.text || q.title}
              </option>
            ))}
          </select>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingExam ? 'Update Exam' : 'Create Exam'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExamManagementPage;