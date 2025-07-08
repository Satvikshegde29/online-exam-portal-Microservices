import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockExams, mockResults } from '../utils/mockData';

const StudentDashboard = () => {
  const [availableExams] = useState(mockExams.filter(exam => exam.status === 'active'));
  const [recentResults] = useState(mockResults);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Ready to take an exam?</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="floating" className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">{availableExams.length}</div>
          <div className="text-sm text-gray-600">Available Exams</div>
          <div className="w-full bg-blue-100 rounded-full h-2 mt-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </Card>
        
        <Card variant="floating" className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">{recentResults.length}</div>
          <div className="text-sm text-gray-600">Completed Exams</div>
          <div className="w-full bg-green-100 rounded-full h-2 mt-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </Card>
        
        <Card variant="floating" className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            {recentResults.length > 0 ? Math.round(recentResults[0].percentage) : 0}%
          </div>
          <div className="text-sm text-gray-600">Average Score</div>
          <div className="w-full bg-purple-100 rounded-full h-2 mt-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </Card>
      </div>

      {/* Available Exams */}
      <Card variant="floating">
        <h2 className="text-xl font-semibold mb-6 gradient-text">Available Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableExams.map((exam) => (
            <div key={exam.id} className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{exam.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{exam.description}</p>
                </div>
                <span className="px-3 py-1 text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full font-medium">
                  {exam.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <span className="mr-2">⏱️</span>
                  {exam.duration} minutes
                </div>
                <div className="flex items-center">
                  <span className="mr-2">❓</span>
                  {exam.totalQuestions} questions
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🏆</span>
                  {exam.totalMarks} marks
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📚</span>
                  {exam.category}
                </div>
              </div>
              
              <Link to={`/exam/${exam.id}`}>
                <Button className="w-full">Start Exam</Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="floating">
          <h2 className="text-xl font-semibold mb-6 gradient-text">Recent Results</h2>
          <div className="space-y-4">
            {recentResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div>
                  <p className="font-medium text-gray-900">{result.examTitle}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(result.endTime).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{result.percentage}%</p>
                  <p className="text-sm text-gray-600">{result.score}/{result.totalMarks}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/dashboard/results">
            <Button variant="outline" className="w-full mt-6">View All Results</Button>
          </Link>
        </Card>

        <Card variant="floating">
          <h2 className="text-xl font-semibold mb-6 gradient-text">Study Tips</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <p className="font-medium text-blue-900 flex items-center">
                <span className="mr-2">📚</span>
                Prepare thoroughly
              </p>
              <p className="text-sm text-blue-700 mt-1">Review all materials before starting an exam</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <p className="font-medium text-green-900 flex items-center">
                <span className="mr-2">⏰</span>
                Manage your time
              </p>
              <p className="text-sm text-green-700 mt-1">Keep track of time during the exam</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100">
              <p className="font-medium text-yellow-900 flex items-center">
                <span className="mr-2">🎯</span>
                Stay focused
              </p>
              <p className="text-sm text-yellow-700 mt-1">Find a quiet environment for taking exams</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;