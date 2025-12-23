"use client";

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
						className="flex aspect-square p-3 items-center justify-center text-white cursor-pointer active:inset-shadow-sm/25 rounded-l-md transition-transform outline-none"
						disabled={disabled}
					>
						<Mic size={16} />
					</button>
					<button
						className={cn(
							"flex aspect-square p-3 items-center justify-center text-white cursor-pointer active:inset-shadow-sm/25 rounded-r-md transition-all outline-none",
							isKeyboardVisible ? "inset-shadow-sm/25" : ""
						)}
						disabled={disabled}
						onClick={toggleKeyboard}
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
					placeholder={disabled ? "AI is thinking..." : "Ask me anything about MSU..."}
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
