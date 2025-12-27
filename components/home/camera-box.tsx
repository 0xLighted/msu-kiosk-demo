'use client';

import { useRef, useState, useEffect } from "react";
import { Camera, UserCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/user-context";

export default function CameraBox() {
	const { setUser } = useUser();
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isActive, setIsActive] = useState(false);
	const [isIdentifying, setIsIdentifying] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);

	const startCamera = async () => {
		setError(null);
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 640 } }
			});

			if (videoRef.current) {
				videoRef.current.srcObject = mediaStream;
				setStream(mediaStream);
				setIsActive(true);
			}
		} catch (err: any) {
			console.error("Camera access error:", err);
			if (err.name === "NotAllowedError") {
				setError("Camera access denied. Please enable it in browser settings.");
			} else {
				setError("Could not access camera. Please check your hardware.");
			}
		}
	};

	// Explicitly play video when stream changes or isActive changes
	useEffect(() => {
		if (isActive && videoRef.current && stream) {
			videoRef.current.play().catch(err => {
				console.error("Error playing video:", err);
			});
		}
	}, [isActive, stream]);

	// Cleanup tracks on component unmount
	useEffect(() => {
		return () => {
			if (stream) {
				stream.getTracks().forEach(track => track.stop());
			}
		};
	}, [stream]);

	const identifyMe = async () => {
		if (!videoRef.current || !canvasRef.current) return;

		setIsIdentifying(true);
		setError(null);

		try {
			const canvas = canvasRef.current;
			const video = videoRef.current;

			// Use internal dimensions
			canvas.width = video.videoWidth || 640;
			canvas.height = video.videoHeight || 640;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			// Mirror snap to match preview
			ctx.translate(canvas.width, 0);
			ctx.scale(-1, 1);
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);

			const blob = await new Promise<Blob | null>((resolve) =>
				canvas.toBlob(resolve, 'image/jpeg', 0.9)
			);

			if (!blob) throw new Error("Capture failed");

			const formData = new FormData();
			formData.append('file', blob, 'ident.jpg');

			const res = await fetch('http://127.0.0.1:8000/identify', {
				method: 'POST',
				body: formData,
			});

			if (!res.ok) throw new Error("API error");

			const data = await res.json();

			if (data.results && data.results.length > 0) {
				const identified = data.results[0];
				if (identified.id) {
					setUser({ id: identified.id, name: identified.name });
					setError(null);
				} else {
					setError("Face not recognized.");
					setUser(null);
				}
			} else {
				setError("No faces detected.");
				setUser(null);
			}
		} catch (err) {
			console.error("Identification failed:", err);
			setError("Failed to reach vision server. Ensure API is running.");
		} finally {
			setIsIdentifying(false);
		}
	};

	return (
		<div className="relative flex flex-col gap-2 w-full">
			<div className="aspect-square w-full shrink-0 bg-neutral-100 rounded-md overflow-hidden border-2 border-neutral-200 shadow-inner group relative">
				{/* Empty state / Placeholder */}
				<AnimatePresence>
					{!isActive && (
						<motion.div
							key="placeholder"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 flex items-center justify-center bg-neutral-50 z-20"
						>
							<div className="flex flex-col items-center gap-3">
								<Camera className="w-12 h-12 text-neutral-300" />
								<span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Camera Offline</span>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Video Layer - Always in DOM to prevent race conditions during activation */}
				<video
					ref={videoRef}
					autoPlay
					playsInline
					muted
					className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] bg-black transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
				/>

				{/* Scanning Animation UI */}
				{isIdentifying && (
					<motion.div
						initial={{ top: "0%" }}
						animate={{ top: "100%" }}
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
						className="absolute left-0 right-0 h-1.5 bg-crimson/60 shadow-[0_0_20px_rgba(239,28,36,0.8)] z-30"
					/>
				)}

				<canvas ref={canvasRef} className="hidden" />
			</div>

			<div className="flex flex-col gap-2">
				{!isActive ? (
					<button
						onClick={startCamera}
						className="flex items-center justify-center gap-2 w-full py-4 bg-dark text-white rounded-sm font-bold shadow-lg active:scale-95 transition-all hover:bg-dark/90 text-sm uppercase tracking-wide"
					>
						<Camera className="w-4 h-4" />
						Power On Camera
					</button>
				) : (
					<button
						onClick={identifyMe}
						disabled={isIdentifying}
						className="flex items-center justify-center gap-2 w-full py-4 bg-crimson text-white rounded-sm font-bold shadow-lg active:scale-95 transition-all hover:bg-crimson/90 disabled:opacity-50 disabled:active:scale-100 text-sm uppercase tracking-wide"
					>
						{isIdentifying ? (
							<Loader2 className="w-4 h-4 animate-spin" />
						) : (
							<UserCheck className="w-4 h-4" />
						)}
						{isIdentifying ? "Scanning..." : "Identify Me"}
					</button>
				)}

				{error && (
					<motion.p
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-[11px] text-red-500 font-bold text-center uppercase tracking-tight"
					>
						{error}
					</motion.p>
				)}
			</div>
		</div>
	);
}
