import { useState } from 'react'
import './FluidTable.css'

interface FluidEntry {
    datetime: string;
    amount: string;
}

interface FluidTableProps {
    entries: FluidEntry[];
    onClear: () => void;
}

export function FluidTable({ entries, onClear }: FluidTableProps) {
    const [isTableVisible, setIsTableVisible] = useState(false);

    return (
        <div className="entries-list">
            <h3>Previous Entries</h3>
            {entries.length > 0 ? (
                <>
                    <div className="collapsible">
                        <button
                            className="collapse-button"
                            onClick={() => setIsTableVisible(!isTableVisible)}
                        >
                            {isTableVisible ? 'Hide Details ▼' : 'Show Details ▶'}
                        </button>
                        <div className={`table-container ${isTableVisible ? 'visible' : ''}`}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date & Time</th>
                                        <th>Amount (ml)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{new Date(entry.datetime).toLocaleString()}</td>
                                            <td>{entry.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button onClick={onClear}>Clear All Entries</button>
                </>
            ) : (
                <p>No entries yet</p>
            )}
        </div>
    );
} 