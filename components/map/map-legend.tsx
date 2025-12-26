export default function MapLegend() {
    const legendItems = [
        { icon: "🚻", label: "Toilet" },
        { icon: "🛗", label: "Elevator" },
        { icon: "👩🏻‍🏫", label: "Classroom" },
        { icon: "👨🏻‍🏫", label: "Lecture Hall" },
    ];

    return (
        <div className="flex-1 flex flex-col gap-2.5">
            {/* Legend Label */}
            <h2 className="font-bold text-black">Legend</h2>

            {/* Legend Items */}
            <div className="grid grid-cols-2 gap-2">
                {legendItems.map((item) => (
                    <div
                        key={item.label}
                        className="flex gap-2.5 items-center"
                    >
                        {/* Icon placeholder */}
                        <div className="p-2 bg-neutral-200 rounded-sm flex items-center justify-center">
                            {item.icon}
                        </div>
                        {/* Label */}
                        <p className="text-black">{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
