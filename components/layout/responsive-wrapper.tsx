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

			{/* Main Content Area */}
			<div className="relative z-10 flex w-full h-full md:w-auto md:h-auto items-center justify-center gap-12 xl:gap-24">
				{/* Kiosk Container (9:16) */}
				<div
					className={cn(
						"flex h-full w-full flex-col overflow-hidden overflow-y-scroll shadow-2xl transition-all duration-300",
						"md:aspect-9/16 md:h-[90vh] md:w-auto md:rounded-3xl md:border-8 md:border-neutral-900",
						className
					)}
				>
					{children}
				</div>

				{/* Desktop Side Panel: QR Code */}
				<div className="hidden lg:flex flex-col items-center justify-center gap-6 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
					<div className="group relative bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10 shadow-2xl transition-transform hover:scale-105 duration-300">
						<img
							src="/QR code.png"
							alt="Scan to try"
							className="w-64 h-64 object-contain"
						/>

						{/* Decorative Elements */}
						<div className="absolute -top-2 -right-2 w-6 h-6 bg-crimson rounded-full animate-pulse" />
						<div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full opacity-60" />
					</div>

					<div className="text-center space-y-1">
						<h3 className="text-2xl font-bold text-white tracking-tight font-outfit">Try it yourself!</h3>
						<p className="text-white/60 text-sm max-w-[200px] font-medium leading-relaxed">
							Scan the QR code to experience the MSU Smart Kiosk on your mobile device.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
