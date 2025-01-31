import { useState } from 'react'
import './App.css'
import { FluidTable } from './components/FluidTable'
import { FluidChart } from './components/FluidChart'
import { FluidRateChart } from './components/FluidRateChart'

function App() {
  // Format current datetime to match datetime-local input format (YYYY-MM-DDThh:mm)
  const getCurrentDateTime = () => {
    const now = new Date()
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
  }

  const [datetime, setDatetime] = useState(getCurrentDateTime())
  const [fluidAmount, setFluidAmount] = useState('')

  interface FluidEntry {
    datetime: string;
    amount: string;
  }

  const [entries, setEntries] = useState<FluidEntry[]>(() => {
    const savedEntries = localStorage.getItem('fluidEntries')
    return savedEntries ? JSON.parse(savedEntries) : []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry = { datetime, amount: fluidAmount }
    const updatedEntries = [...entries, newEntry]
    setEntries(updatedEntries)
    localStorage.setItem('fluidEntries', JSON.stringify(updatedEntries))

    // Only reset the amount, keep the datetime
    setFluidAmount('')
  }

  const handleClear = () => {
    setEntries([])
    localStorage.removeItem('fluidEntries')
  }

  return (
    <>
      <div className="card">
        <h2>Fluid Tracker</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="datetime">Date and Time:</label>
            <input
              type="datetime-local"
              id="datetime"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="fluid">Fluid Amount (ml):</label>
            <input
              type="number"
              id="fluid"
              value={fluidAmount}
              onChange={(e) => setFluidAmount(e.target.value)}
              min="0"
              required
            />
          </div>
          <button type="submit">Save Entry</button>
        </form>

        <div className="entries-section">
          <h3>Previous Entries</h3>
          {entries.length > 0 && (
            <div className="charts-container">
              <FluidChart entries={entries} />
              <FluidRateChart entries={entries} />
            </div>
          )}
          <FluidTable
            entries={entries}
            onClear={handleClear}
          />
        </div>
      </div>
    </>
  )
}

export default App
