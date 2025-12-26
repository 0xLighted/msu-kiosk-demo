"use client"

import { useState } from "react";
import Button from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MapControlsProps {
    buildings: { [key: string]: number };
    selectedBuilding: string;
    selectedFloor: string;
    onBuildingChange: (building: string) => void;
    onFloorChange: (floor: string) => void;
}

export default function MapControls({
    buildings,
    selectedBuilding,
    selectedFloor,
    onBuildingChange,
    onFloorChange,
}: MapControlsProps) {
    const [isBuildingOpen, setIsBuildingOpen] = useState(false);

    return (
        <div className="flex gap-5">
            {/* Building Section */}
            <div className="flex flex-col gap-2 w-full">
                <h2 className="font-bold ">Building</h2>

                {/* Building Selector */}
                <div className="relative">

                    <Button
                        onClick={() => setIsBuildingOpen(!isBuildingOpen)}
                        className="flex items-center justify-between"
                    >
                        <span className="">
                            {selectedBuilding || "Select Building"}
                        </span>
                        <ChevronDown />
                    </Button>

                    {isBuildingOpen && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white border-2 border-neutral-200 rounded shadow-lg z-10 max-h-48 overflow-y-auto">
                            {Object.keys(buildings).map((building) => (
                                <Button
                                    key={building}
                                    onClick={() => {
                                        onBuildingChange(building);
                                        setIsBuildingOpen(false);
                                    }}
                                    className={`${selectedBuilding === building ? "bg-crimson/20" : ""}`}
                                >
                                    {building}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                {/* Floor Section */}
                <h2 className="font-bold">Floor</h2>

                {/* Floor Selector */}
                <div className="flex gap-2 items-center">
                    <Button
                        onClick={() => {
                            const currentFloor = parseInt(selectedFloor) || 0;
                            if (currentFloor > 0) {
                                onFloorChange((currentFloor - 1).toString());
                            }
                        }}
                        className="flex items-center justify-center w-fit"
                        disabled={!selectedBuilding || parseInt(selectedFloor) <= 0}
                    >
                        <ChevronDown />
                    </Button>

                    <div className={`w-full p-2 px-4 bg-white shadow-sm rounded-sm text-center ${!selectedBuilding ? "bg-neutral-100 text-neutral-400" : ""}`}>
                        {selectedFloor || "0"}
                    </div>

                    <Button
                        onClick={() => {
                            const currentFloor = parseInt(selectedFloor) || 0;
                            const maxFloor = selectedBuilding ? buildings[selectedBuilding as keyof typeof buildings] : 0;
                            if (currentFloor < maxFloor) {
                                onFloorChange((currentFloor + 1).toString());
                            }
                        }}
                        className="flex items-center justify-center w-fit"
                        disabled={!selectedBuilding || parseInt(selectedFloor) >= (selectedBuilding ? buildings[selectedBuilding as keyof typeof buildings] : 0)}
                    >
                        <ChevronUp />
                    </Button>
                </div>
            </div>
        </div>
    );
}
