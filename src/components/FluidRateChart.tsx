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
import './FluidRateChart.css'
import 'chartjs-adapter-date-fns'

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

interface FluidRateChartProps {
    entries: FluidEntry[];
}

export function FluidRateChart({ entries }: FluidRateChartProps) {
    // Calculate daily rates
    const calculateDailyRates = () => {
        if (entries.length < 3) return [] // Need at least 3 points now

        const sortedEntries = [...entries].sort((a, b) =>
            new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        )

        const rates = []
        for (let i = 2; i < sortedEntries.length; i++) {
            const currentEntry = sortedEntries[i]
            const prevEntry2 = sortedEntries[i - 2]  // Two entries back

            const timeDiff = new Date(currentEntry.datetime).getTime() -
                new Date(prevEntry2.datetime).getTime()
            const hoursDiff = timeDiff / (1000 * 60 * 60)

            // Calculate ml per 24 hours over two points
            const amountDiff = Number(currentEntry.amount) - Number(prevEntry2.amount)
            const rate = (amountDiff / hoursDiff) * 24

            rates.push({
                datetime: currentEntry.datetime,
                rate: Math.round(rate)
            })
        }

        return rates
    }

    const rateData = calculateDailyRates()

    const chartData = {
        datasets: [
            {
                label: 'Fluid Rate (ml/24h)',
                data: rateData.map(entry => ({
                    x: new Date(entry.datetime),
                    y: entry.rate
                })),
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Fluid Rate'
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
                    unit: 'hour' as const,
                    stepSize: 6,
                    displayFormats: {
                        hour: 'd.MM., HH:mm'
                    }
                },
                title: {
                    display: true,
                    text: 'Time'
                },
                ticks: {
                    maxTicksLimit: 8
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'ml per 24 hours'
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