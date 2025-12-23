"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface ResponsiveWrapperProps {
	children: React.ReactNode;
	className?: string;
}

export function ResponsiveWrapper({ children, className }: ResponsiveWrapperProps) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// Smooth springs for the effect
	const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
	const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

	function handleMouseMove({ clientX, clientY }: { clientX: number; clientY: number }) {
		mouseX.set(clientX);
		mouseY.set(clientY);
	}

	// Effect gradient that follows mouse
	// Using a large radial gradient that reveals a subtle color
	const background = useMotionTemplate`radial-gradient(
    600px circle at ${springX}px ${springY}px,
    rgba(239, 28, 36, 0.15),
    transparent 80%
  )`;

	return (
		<main
			className="relative flex h-dvh w-screen items-center justify-center overflow-hidden bg-dark"
			onMouseMove={handleMouseMove}
		>
			{/* Desktop Background Animation Layer */}
			<motion.div
				className="pointer-events-none absolute inset-0 z-0 opacity-0 md:opacity-100"
				style={{ background }}
			/>

			{/* Grid Pattern Overlay for Tech Feel */}
			<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] opacity-20 md:opacity-100"></div>

			{/* Main Kiosk Container (9:16) */}
			<div
				className={cn(
					"relative z-10 flex h-full w-full flex-col overflow-hidden overflow-y-scroll shadow-2xl",
					"md:aspect-9/16 md:h-[95vh] md:w-auto md:rounded-xl",
					className
				)}
			>
				{children}
			</div>
		</main>
	);
}
