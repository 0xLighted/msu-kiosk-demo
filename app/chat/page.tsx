"use client"

import { useState, useRef, useEffect } from "react";
import ChatMessages, { Message } from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([
		{ id: "1", text: "Hello! How can I help you today?", sender: "ai" },
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
	const keyboard = useRef<any>(null);

	const handleSend = async () => {
		if (!input.trim() || isLoading) return;

		const userMsg: Message = {
			id: Date.now().toString(),
			text: input,
			sender: "user",
		};

		setMessages((prev: Message[]) => [...prev, userMsg]);
		const currentText = input;
		setInput("");
		if (keyboard.current) keyboard.current.setInput("");
		setIsLoading(true);

		// Mock AI Response
		setTimeout(() => {
			const aiMsg: Message = {
				id: (Date.now() + 1).toString(),
				text: `I'm an AI assistant. You asked: "${currentText}". How else can I help?`,
				sender: "ai",
			};
			setMessages((prev: Message[]) => [...prev, aiMsg]);
			setIsLoading(false);
		}, 1500);
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