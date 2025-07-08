import { useLocation, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ResultPage = () => {
  const location = useLocation();
  const { exam, answers, score, totalMarks } = location.state || {};

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <p>No exam results found</p>
          <Link to="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const percentage = Math.round((score / totalMarks) * 100);
  const questions = exam.questions || [];

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (percentage) => {
    if (percentage >= 80) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Results</h1>
          <p className="text-gray-600">{exam.title}</p>
        </div>

        {/* Score Card */}
        <Card className={`text-center mb-8 ${getScoreBg(percentage)}`}>
          <div className="mb-4">
            <div className={`text-6xl font-bold ${getScoreColor(percentage)} mb-2`}>
              {percentage}%
            </div>
            <p className="text-lg text-gray-700">
              You scored {score} out of {totalMarks} marks
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <div className="text-2xl font-semibold text-gray-900">
                {Object.keys(answers).length}
              </div>
              <div className="text-sm text-gray-600">Questions Attempted</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-green-600">
                {questions.filter(q => answers[q.id] === q.correctAnswer).length}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-red-600">
                {questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer).length}
              </div>
              <div className="text-sm text-gray-600">Wrong Answers</div>
            </div>
          </div>
        </Card>

        {/* Performance Message */}
        <Card className="mb-8 text-center">
          {percentage >= 80 ? (
            <div>
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Excellent Performance!</h3>
              <p className="text-gray-600">You have demonstrated excellent understanding of the subject.</p>
            </div>
          ) : percentage >= 60 ? (
            <div>
              <div className="text-4xl mb-2">👍</div>
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">Good Job!</h3>
              <p className="text-gray-600">You passed the exam. Keep practicing to improve further.</p>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-2">📚</div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">Keep Learning!</h3>
              <p className="text-gray-600">Don't give up! Review the topics and try again.</p>
            </div>
          )}
        </Card>

        {/* Detailed Results */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Detailed Results</h2>
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAttempted = userAnswer !== undefined;

              return (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-gray-900">
                      Question {index + 1}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{question.marks} marks</span>
                      {wasAttempted ? (
                        isCorrect ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            ✓ Correct
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                            ✗ Wrong
                          </span>
                        )
                      ) : (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          Not Attempted
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{question.question}</p>

                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${
                          optionIndex === question.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : userAnswer === optionIndex && optionIndex !== question.correctAnswer
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900">{option}</span>
                          <div className="flex items-center space-x-2">
                            {optionIndex === question.correctAnswer && (
                              <span className="text-green-600 text-sm font-medium">Correct Answer</span>
                            )}
                            {userAnswer === optionIndex && optionIndex !== question.correctAnswer && (
                              <span className="text-red-600 text-sm font-medium">Your Answer</span>
                            )}
                            {userAnswer === optionIndex && optionIndex === question.correctAnswer && (
                              <span className="text-green-600 text-sm font-medium">Your Answer ✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {question.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Button onClick={() => window.print()}>
            Print Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;