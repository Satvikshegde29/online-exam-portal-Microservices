import Card from '../components/ui/Card';
import { mockExams, mockResults, mockUsers } from '../utils/mockData';

const AnalyticsPage = () => {
  // Mock analytics data
  const analytics = {
    totalExams: mockExams.length,
    totalUsers: mockUsers.length,
    totalAttempts: mockResults.length,
    averageScore: mockResults.length > 0 ? 
      Math.round(mockResults.reduce((sum, result) => sum + result.percentage, 0) / mockResults.length) : 0
  };

  const examPerformance = mockExams.map(exam => ({
    name: exam.title,
    attempts: Math.floor(Math.random() * 50) + 10,
    averageScore: Math.floor(Math.random() * 40) + 60,
    passRate: Math.floor(Math.random() * 30) + 70
  }));

  const monthlyStats = [
    { month: 'Jan', exams: 12, users: 45 },
    { month: 'Feb', exams: 19, users: 52 },
    { month: 'Mar', exams: 15, users: 48 },
    { month: 'Apr', exams: 22, users: 61 },
    { month: 'May', exams: 18, users: 55 },
    { month: 'Jun', exams: 25, users: 68 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">{analytics.totalExams}</div>
          <div className="text-sm text-gray-600">Total Exams</div>
          <div className="text-xs text-green-600 mt-1">↑ 12% from last month</div>
        </Card>
        
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{analytics.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
          <div className="text-xs text-green-600 mt-1">↑ 8% from last month</div>
        </Card>
        
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{analytics.totalAttempts}</div>
          <div className="text-sm text-gray-600">Total Attempts</div>
          <div className="text-xs text-green-600 mt-1">↑ 15% from last month</div>
        </Card>
        
        <Card className="text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">{analytics.averageScore}%</div>
          <div className="text-sm text-gray-600">Average Score</div>
          <div className="text-xs text-red-600 mt-1">↓ 2% from last month</div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Chart */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Monthly Growth</h2>
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={stat.month} className="flex items-center">
                <div className="w-12 text-sm text-gray-600">{stat.month}</div>
                <div className="flex-1 ml-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Exams: {stat.exams}</span>
                    <span>Users: {stat.users}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(stat.exams / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Score Distribution */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Score Distribution</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">90-100%</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">80-89%</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }} />
                </div>
                <span className="text-sm font-medium">35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">70-79%</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Below 70%</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }} />
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Exam Performance Table */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Exam Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attempts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pass Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examPerformance.map((exam, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {exam.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exam.attempts}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exam.averageScore}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exam.passRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      exam.passRate >= 80 ? 'bg-green-100 text-green-800' :
                      exam.passRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {exam.passRate >= 80 ? 'Excellent' : exam.passRate >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Export Section */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Export Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-medium">Exam Results</p>
              <p className="text-sm text-gray-600">Export detailed exam results</p>
            </div>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">👥</div>
              <p className="font-medium">User Reports</p>
              <p className="text-sm text-gray-600">Export user activity data</p>
            </div>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
              <p className="font-medium">Analytics Summary</p>
              <p className="text-sm text-gray-600">Export performance analytics</p>
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;