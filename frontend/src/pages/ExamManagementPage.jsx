import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { mockExams, mockQuestions } from '../utils/mockData';

const ExamManagementPage = () => {
  const [exams, setExams] = useState(mockExams);
  const [filteredExams, setFilteredExams] = useState(mockExams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    search: ''
  });

  const [examForm, setExamForm] = useState({
    title: '',
    description: '',
    duration: 60,
    category: '',
    difficulty: 'Beginner',
    totalMarks: 100,
    passingMarks: 60,
    instructions: '',
    status: 'draft'
  });

  const applyFilters = () => {
    let filtered = exams;

    if (filters.status) {
      filtered = filtered.filter(exam => exam.status === filters.status);
    }

    if (filters.category) {
      filtered = filtered.filter(exam => exam.category === filters.category);
    }

    if (filters.search) {
      filtered = filtered.filter(exam => 
        exam.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        exam.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredExams(filtered);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setExamForm({
      title: exam.title,
      description: exam.description,
      duration: exam.duration,
      category: exam.category,
      difficulty: exam.difficulty,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks || 60,
      instructions: exam.instructions || '',
      status: exam.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      const newExams = exams.filter(exam => exam.id !== examId);
      setExams(newExams);
      setFilteredExams(newExams);
    }
  };

  const handleSave = () => {
    if (editingExam) {
      const updatedExams = exams.map(exam => 
        exam.id === editingExam.id 
          ? { ...exam, ...examForm, updatedAt: new Date().toISOString() }
          : exam
      );
      setExams(updatedExams);
      setFilteredExams(updatedExams);
    } else {
      const newExam = {
        id: Date.now().toString(),
        ...examForm,
        totalQuestions: 0,
        createdAt: new Date().toISOString(),
        questions: []
      };
      const newExams = [...exams, newExam];
      setExams(newExams);
      setFilteredExams(newExams);
    }

    setIsModalOpen(false);
    setEditingExam(null);
    setExamForm({
      title: '',
      description: '',
      duration: 60,
      category: '',
      difficulty: 'Beginner',
      totalMarks: 100,
      passingMarks: 60,
      instructions: '',
      status: 'draft'
    });
  };

  const openAddModal = () => {
    setEditingExam(null);
    setExamForm({
      title: '',
      description: '',
      duration: 60,
      category: '',
      difficulty: 'Beginner',
      totalMarks: 100,
      passingMarks: 60,
      instructions: '',
      status: 'draft'
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, exams]);

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
          <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
            {exams.filter(exam => exam.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active Exams</div>
        </Card>
        
        <Card variant="floating" className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
            {exams.filter(exam => exam.status === 'draft').length}
          </div>
          <div className="text-sm text-gray-600">Draft Exams</div>
        </Card>
        
        <Card variant="floating" className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            {Math.round(exams.reduce((sum, exam) => sum + (exam.duration || 0), 0) / exams.length) || 0}
          </div>
          <div className="text-sm text-gray-600">Avg Duration (min)</div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="floating">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search exams..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="input-field"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Framework">Framework</option>
            <option value="Styling">Styling</option>
            <option value="Database">Database</option>
          </select>

          <Button variant="outline" onClick={() => setFilters({ status: '', category: '', search: '' })}>
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
                  Exam Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{exam.description}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Created: {new Date(exam.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800">
                      {exam.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exam.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      exam.status === 'active' 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                        : exam.status === 'draft'
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                    }`}>
                      {exam.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(exam)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exam.id)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Exam Title"
              value={examForm.title}
              onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
              placeholder="Enter exam title..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={examForm.category}
                onChange={(e) => setExamForm({ ...examForm, category: e.target.value })}
                className="input-field"
              >
                <option value="">Select Category</option>
                <option value="Programming">Programming</option>
                <option value="Framework">Framework</option>
                <option value="Styling">Styling</option>
                <option value="Database">Database</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={examForm.description}
              onChange={(e) => setExamForm({ ...examForm, description: e.target.value })}
              className="input-field"
              rows="3"
              placeholder="Enter exam description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <Input
              label="Passing Marks"
              type="number"
              value={examForm.passingMarks}
              onChange={(e) => setExamForm({ ...examForm, passingMarks: parseInt(e.target.value) })}
              min="1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={examForm.difficulty}
                onChange={(e) => setExamForm({ ...examForm, difficulty: e.target.value })}
                className="input-field"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={examForm.status}
                onChange={(e) => setExamForm({ ...examForm, status: e.target.value })}
                className="input-field"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions (Optional)
            </label>
            <textarea
              value={examForm.instructions}
              onChange={(e) => setExamForm({ ...examForm, instructions: e.target.value })}
              className="input-field"
              rows="4"
              placeholder="Enter exam instructions for students..."
            />
          </div>

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