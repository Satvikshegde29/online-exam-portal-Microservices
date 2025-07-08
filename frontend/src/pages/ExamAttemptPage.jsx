import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockExams } from '../utils/mockData';

const ExamAttemptPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam] = useState(mockExams.find(e => e.id === examId));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(exam?.duration * 60 || 3600); // Convert minutes to seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const questions = exam?.questions || [];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score += question.marks;
      }
    });

    // Navigate to results page with score
    navigate('/exam/result', { 
      state: { 
        exam, 
        answers, 
        score, 
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0)
      } 
    });
  };

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <p>Exam not found</p>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-lg font-semibold">{exam.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                ⏰ {formatTime(timeLeft)}
              </div>
              <Button variant="danger" onClick={() => setShowSubmitModal(true)}>
                Submit Exam
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Question {currentQuestion + 1}
            </h2>
            <p className="text-gray-700 leading-relaxed">{currentQ?.question}</p>
            <div className="mt-2 text-sm text-gray-500">
              Marks: {currentQ?.marks}
            </div>
          </div>

          <div className="space-y-3">
            {currentQ?.options.map((option, index) => (
              <label 
                key={index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  answers[currentQ.id] === index 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={index}
                  checked={answers[currentQ.id] === index}
                  onChange={() => handleAnswerSelect(currentQ.id, index)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[currentQ.id] === index 
                    ? 'border-primary-500 bg-primary-500' 
                    : 'border-gray-300'
                }`}>
                  {answers[currentQ.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </Button>

          <div className="text-sm text-gray-600">
            {Object.keys(answers).length} of {questions.length} answered
          </div>

          {currentQuestion === questions.length - 1 ? (
            <Button onClick={() => setShowSubmitModal(true)}>
              Submit Exam
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next →
            </Button>
          )}
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Submit Exam?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit the exam? You have answered{' '}
              {Object.keys(answers).length} out of {questions.length} questions.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Submit Exam
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExamAttemptPage;