"use client"

import { useState } from "react";
import MapDisplay from "@/components/map/map-display";
import MapControls from "@/components/map/map-controls";
import MapLegend from "@/components/map/map-legend";

export default function MapPage() {
    const [selectedBuilding, setSelectedBuilding] = useState<string>("");
    const [selectedFloor, setSelectedFloor] = useState<string>("");

    // Mock data - replace with actual data from API
    const buildings = { "Management Tower": 20, "Academic Tower": 10, "Science Tower": 15, "Medical Centre": 25 };

    return (
        <div className="flex flex-1 flex-col gap-5">
            <MapDisplay
                building={selectedBuilding}
                floor={selectedFloor}
            />

            <MapControls
                buildings={buildings}
                selectedBuilding={selectedBuilding}
                selectedFloor={selectedFloor}
                onBuildingChange={setSelectedBuilding}
                onFloorChange={setSelectedFloor}
            />

            <MapLegend />
        </div>
    );
}
