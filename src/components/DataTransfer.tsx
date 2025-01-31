import { useState } from 'react';

interface DataTransferProps {
    entries: Array<{ datetime: string; amount: string }>;
    onImport: (newEntries: Array<{ datetime: string; amount: string }>) => void;
}

export function DataTransfer({ entries, onImport }: DataTransferProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExport = async () => {
        const dataStr = JSON.stringify(entries, null, 2);
        try {
            await navigator.clipboard.writeText(dataStr);
            alert('Data copied to clipboard!');
        } catch (error) {
            alert('Failed to copy to clipboard. Please try again.');
        }
    };

    const handleImport = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            const importedData = JSON.parse(clipboardText);
            if (Array.isArray(importedData)) {
                onImport(importedData);
                alert('Data imported successfully!');
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            alert('Error importing data. Please make sure you have valid JSON data in your clipboard.');
        }
    };

    return (
        <div className="data-transfer">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="collapse-button"
            >
                {isExpanded ? '▼' : '▶'} Data Options
            </button>
            {isExpanded && (
                <div className="data-transfer-options">
                    <button onClick={handleExport}>Copy Data to Clipboard</button>
                    <button onClick={handleImport}>Import Data from Clipboard</button>
                </div>
            )}
        </div>
    );
} 