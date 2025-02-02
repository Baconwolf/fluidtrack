import './FluidBag.css';

interface FluidBagProps {
    currentAmount: number;
    maxCapacity?: number;
    label?: string;
}

export function FluidBag({ currentAmount, maxCapacity = 2000, label }: FluidBagProps) {
    const fillPercentage = Math.min((currentAmount / maxCapacity) * 100, 100);

    // Create array of measurement points every 100ml
    const measurementPoints = Array.from(
        { length: Math.floor(maxCapacity / 100) + 1 },
        (_, i) => i * 100
    );

    return (
        <div className="fluid-bag-container">
            <div className="fluid-bag">
                {/* Fluid fill with waves */}
                <div
                    className="fluid-bag-fill"
                    style={{
                        height: `${fillPercentage}%`,
                    }}
                />

                {/* Measurement lines */}
                {measurementPoints.map((amount) => (
                    <div
                        key={amount}
                        className="measurement-line"
                        style={{
                            bottom: `${(amount / maxCapacity) * 100}%`,
                        }}
                    >
                        <span className="measurement-label">
                            {amount}ml
                        </span>
                    </div>
                ))}
            </div>
            <div className="fluid-amount">
                <strong>{currentAmount}ml</strong> / {maxCapacity}ml
            </div>
            {label && <div className="fluid-datetime">{label}</div>}
        </div>
    );
} 