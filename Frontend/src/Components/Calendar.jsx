import React from 'react'
import CalendarContent from './CalendarContent.jsx'

function Calendar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <CalendarContent />
      </div>
    </div>
  )
}

export default Calendar
