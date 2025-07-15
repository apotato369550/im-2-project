import React, { useState, useEffect } from 'react'

const RecentUpdateTestingSpace = () => {
  const [updates, setUpdates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [endpoint, setEndpoint] = useState('http://localhost/im-2-project/api/recUp')
  const [method, setMethod] = useState('GET')

  const fetchRecentUpdates = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwidXNlcl9lbWFpbCI6ImpoYW5lbGwubWluZ29AZ21haWwuY29tIiwiZXhwIjoxNzUyNTc3MzczfQ.YkwHVBz9lQ8ZUp1W7QERTsRBwmk8YXEohvNgGh_zlCo'
        }
      })

      const data = await response.json()
      
      if (response.ok) {
        setUpdates(data)
      } else {
        setError(`Error ${response.status}: ${data.error || 'Unknown error'}`)
      }
    } catch (err) {
      setError(`Network error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const clearData = () => {
    setUpdates([])
    setError('')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Recent Updates Testing Space</h1>
        
        {/* Controls */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Test Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endpoint URL:
              </label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HTTP Method:
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={fetchRecentUpdates}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-md transition-colors"
            >
              {loading ? 'Loading...' : 'Fetch Updates'}
            </button>
            
            <button
              onClick={clearData}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Clear Data
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Results */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Results</h2>
            <span className="text-sm text-gray-500">
              {updates.length} update{updates.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading updates...</p>
            </div>
          ) : updates.length > 0 ? (
            <div className="space-y-3">
              {updates.map((update, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Update ID:</span> {update.update_id}
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Worker:</span> {update.user_full_name || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Assignment ID:</span> {update.assignment_id}
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Date:</span> {update.date_last_update}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-600">Message:</span> {update.update_message}
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Read:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        update.is_read ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {update.is_read ? 'Read' : 'Unread'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No updates found. Try fetching data to see results here.</p>
            </div>
          )}
        </div>

        {/* Raw JSON Display */}
        {updates.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-2">Raw JSON Response:</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(updates, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentUpdateTestingSpace