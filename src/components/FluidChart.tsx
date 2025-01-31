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
import './FluidChart.css'

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

interface FluidEntry {
    datetime: string;
    amount: string;
}

interface FluidChartProps {
    entries: FluidEntry[];
}

export function FluidChart({ entries }: FluidChartProps) {
    const chartData = {
        labels: entries.map(entry => new Date(entry.datetime).toLocaleString()),
        datasets: [
            {
                label: 'Fluid (ml)',
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
        <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
        </div>
    )
} 