import { useState } from 'react'
import './App.css'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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

    // Reset form
    setDatetime(getCurrentDateTime())
    setFluidAmount('')
  }

  const handleClear = () => {
    setEntries([])
    localStorage.removeItem('fluidEntries')
  }

  // Prepare data for the chart
  const chartData = {
    labels: entries.map(entry => new Date(entry.datetime).toLocaleString()),
    datasets: [
      {
        label: 'Fluid Intake (ml)',
        data: entries.map(entry => Number(entry.amount)),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Fluid Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (ml)'
        }
      }
    }
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

        <div className="entries-list">
          <h3>Previous Entries</h3>
          {entries.length > 0 ? (
            <>
              <div style={{
                marginBottom: '20px',
                width: '100%',
                maxWidth: '1000px',  // Increased from 800px
              }}>
                <Line data={chartData} options={chartOptions} />
              </div>
              <ul>
                {entries.map((entry, index) => (
                  <li key={index}>
                    {new Date(entry.datetime).toLocaleString()}: {entry.amount} ml
                  </li>
                ))}
              </ul>
              <button onClick={handleClear}>Clear All Entries</button>
            </>
          ) : (
            <p>No entries yet</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
