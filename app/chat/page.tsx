"use client"

import { useState, useRef, useEffect } from "react";
import ChatMessages, { Message } from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/user-context";

export default function Chat() {
	const { user } = useUser();
	const [messages, setMessages] = useState<Message[]>([
		{ id: "1", text: `Hello ${user?.name || "Visitor"}! How can I help you today?`, sender: "ai" },
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
	const keyboard = useRef<any>(null);

	// Optional: Clear session when user leaves the page
	useEffect(() => {
		return () => {
			if (user?.id) {
				fetch(`${process.env.NEXT_PUBLIC_VISION_API_URL || ""}/chat/${user.id}`, {
					method: 'DELETE',
				}).catch(err => console.error("Failed to clear session:", err));
			}
		};
	}, [user?.id]);

	const handleSend = async () => {
		if (!input.trim() || isLoading) return;

		const currentInput = input;
		const userMsg: Message = {
			id: Date.now().toString(),
			text: currentInput,
			sender: "user",
		};

		setMessages((prev: Message[]) => [...prev, userMsg]);
		setInput("");
		if (keyboard.current) keyboard.current.setInput("");
		setIsLoading(true);

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_VISION_API_URL || ""}/chat`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user_id: user?.id || "visitor",
					user_name: user?.name || "Visitor",
					message: currentInput,
				}),
			});

			if (!res.ok) throw new Error("Failed to get response");

			const data = await res.json();

			const aiMsg: Message = {
				id: (Date.now() + 1).toString(),
				text: data.response,
				sender: "ai",
			};
			setMessages((prev) => [...prev, aiMsg]);
		} catch (error) {
			console.error("Chat Error:", error);
			const errorMsg: Message = {
				id: (Date.now() + 1).toString(),
				text: "Sorry, I'm having trouble connecting to the MSU assistant. Please try again.",
				sender: "ai",
			};
			setMessages((prev) => [...prev, errorMsg]);
		} finally {
			setIsLoading(false);
		}
	};

	const onKeyboardChange = (newInput: string) => {
		setInput(newInput);
	};

	// Keep keyboard in sync if input changes externally (e.g. from the input field itself)
	useEffect(() => {
		if (keyboard.current && input !== keyboard.current.input) {
			keyboard.current.setInput(input);
		}
	}, [input]);


	return (
		<div className="flex flex-1 flex-col gap-2 overflow-hidden">
			<ChatMessages messages={messages} isLoading={isLoading} />
			<div className="flex flex-col gap-2">
				<ChatInput
					value={input}
					onChange={setInput}
					onSend={handleSend}
					disabled={isLoading}
					isKeyboardVisible={isKeyboardVisible}
					toggleKeyboard={() => setIsKeyboardVisible(!isKeyboardVisible)}
				/>
				<AnimatePresence>
					{isKeyboardVisible && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="overflow-hidden"
						>
							<div className="text-dark rounded-md">
								<Keyboard
									keyboardRef={(r: any) => (keyboard.current = r)}
									onChange={onKeyboardChange}
									inputName="default"
									layoutName="default"
									mergeDisplay
									layout={{
										default: [
											"1 2 3 4 5 6 7 8 9 0",
											"q w e r t y u i o p",
											"a s d f g h j k l",
											"{shift} z x c v b n m {backspace}",
											", {space} .",
										],
										shift: [
											"1 2 3 4 5 6 7 8 9 0",
											"Q W E R T Y U I O P",
											"A S D F G H J K L",
											"{shift} Z X C V B N M {backspace}",
											", {space} .",
										]
									}}
									display={{
										"{space}": "space",
										"{backspace}": "⌫",
										"{shift}": "⇧",
									}}
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}