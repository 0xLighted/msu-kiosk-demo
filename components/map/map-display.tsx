interface MapDisplayProps {
    building: string;
    floor: string;
}

export default function MapDisplay({ building, floor }: MapDisplayProps) {
    return (
        <div className="w-full aspect-square bg-neutral-200 animate-pulse rounded-sm flex items-center justify-center">
            {/* Placeholder for actual map - will be replaced with interactive map */}
            <div className="text-center text-neutral-500">
                {building && floor ? (
                    <div>
                        <p className="text-2xl font-semibold">{building}</p>
                        <p className="text-xl">Level {floor}</p>
                        <p className="text-sm mt-4">Map will be displayed here</p>
                    </div>
                ) : (
                    <p className="text-xl">Select a building and floor to view the map</p>
                )}
            </div>
        </div>
    );
}
