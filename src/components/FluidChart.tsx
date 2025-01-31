import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import './FluidChart.css'

// Register ChartJS components
ChartJS.register(
    TimeScale,
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
        datasets: [
            {
                label: 'Fluid (ml)',
                data: entries.map(entry => ({
                    x: new Date(entry.datetime),
                    y: Number(entry.amount)
                })),
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
            },
            tooltip: {
                callbacks: {
                    title: (context: any) => {
                        const date = new Date(context[0].parsed.x);
                        return date.toLocaleString('de-DE', {
                            day: 'numeric',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'd.MM., HH:mm'
                    }
                },
                title: {
                    display: true,
                    text: 'Time'
                },
                ticks: {
                    maxTicksLimit: 8,
                    autoSkip: true
                }
            },
            y: {
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