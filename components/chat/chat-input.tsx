"use client";

import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from "react";
import { Mic, Send, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
	value: string;
	onChange: (val: string) => void;
	onSend: () => void;
	disabled?: boolean;
	isKeyboardVisible: boolean;
	toggleKeyboard: () => void;
}

export default function ChatInput({ value, onChange, onSend, disabled, isKeyboardVisible, toggleKeyboard }: ChatInputProps) {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		if (transcript) {
			onChange(transcript);
		}
	}, [transcript, onChange]);

	const handleMicClick = () => {
		if (listening) {
			SpeechRecognition.stopListening();
		} else {
			resetTranscript();
			onChange("");
			SpeechRecognition.startListening({ continuous: true });
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !disabled && value.trim()) {
			onSend();
		}
	};

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex p-2 items-center gap-2 rounded-sm bg-white shadow-sm border border-dark/10">
				{/* Action Buttons */}
				<div className="flex bg-crimson rounded-md shrink-0">
					<button
						className={cn(
							"flex aspect-square p-3 items-center justify-center text-white cursor-pointer active:inset-shadow-sm/25 rounded-l-md transition-all outline-none",
							listening ? "bg-red-600 animate-pulse" : ""
						)}
						disabled={disabled || !mounted || !browserSupportsSpeechRecognition}
						onClick={handleMicClick}
						title={listening ? "Stop Listening" : "Start Voice Input"}
					>
						<Mic size={16} className={listening ? "animate-bounce" : ""} />
					</button>
					<button
						className={cn(
							"flex aspect-square p-3 items-center justify-center text-white cursor-pointer active:inset-shadow-sm/25 rounded-r-md transition-all outline-none",
							isKeyboardVisible ? "inset-shadow-sm/25" : ""
						)}
						disabled={disabled}
						onClick={toggleKeyboard}
						title="Toggle Virtual Keyboard"
					>
						<Keyboard size={16} />
					</button>
				</div>

				{/* Input Field */}
				<input
					type="text"
					value={value}
					id="chat-input"
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={listening ? "Listening..." : (disabled ? "AI is thinking..." : "Ask me anything about MSU...")}
					className="w-full bg-transparent text-dark outline-none placeholder:text-dark/40 h-full"
					disabled={disabled}
				/>

				{/* Send Button */}
				<button
					onClick={onSend}
					disabled={disabled || !value.trim()}
					className={cn(
						"flex aspect-square p-3 items-center justify-center rounded-md text-white transition-all outline-none",
						disabled || !value.trim() ? "bg-dark/40 cursor-not-allowed" : "bg-dark cursor-pointer active:scale-95 hover:scale-105"
					)}
				>
					<Send size={16} />
				</button>
			</div>
		</div>
	);
}
