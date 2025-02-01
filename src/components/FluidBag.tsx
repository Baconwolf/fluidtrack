interface FluidBagProps {
    currentAmount: number;
    maxCapacity?: number;
}

export function FluidBag({ currentAmount, maxCapacity = 2000 }: FluidBagProps) {
    const fillPercentage = Math.min((currentAmount / maxCapacity) * 100, 100);

    // Create array of measurement points every 100ml
    const measurementPoints = Array.from(
        { length: Math.floor(maxCapacity / 100) + 1 },
        (_, i) => i * 100
    );

    return (
        <div style={{
            width: '150px',
            margin: '20px auto',
            textAlign: 'center'
        }}>
            <div style={{
                position: 'relative',
                width: '100px',
                height: '200px',
                margin: '0 auto',
                border: '3px solid #666',
                borderRadius: '0 0 25px 25px',
                overflow: 'hidden'
            }}>
                {/* Fluid fill with waves */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: `${fillPercentage}%`,
                    backgroundColor: 'rgba(255, 150, 150, 0.7)',
                    transition: 'height 0.5s ease-out',
                    borderRadius: '0 0 25px 25px'
                }} className="fluid-fill" />

                {/* Measurement lines */}
                {measurementPoints.map((amount) => (
                    <div key={amount} style={{
                        position: 'absolute',
                        bottom: `${(amount / maxCapacity) * 100}%`,
                        width: '100%',
                        borderBottom: '1px solid #999',
                        fontSize: '12px'
                    }}>
                        <span style={{
                            position: 'absolute',
                            right: '105%',
                            transform: 'translateY(-50%)'
                        }}>
                            {amount}ml
                        </span>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                <strong>{currentAmount}ml</strong> / {maxCapacity}ml
            </div>
        </div>
    );
} 