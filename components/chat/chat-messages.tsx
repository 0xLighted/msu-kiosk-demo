"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface Message {
	id: string;
	text: string;
	sender: "user" | "ai";
	isLoading?: boolean;
}

interface ChatMessagesProps {
	messages: Message[];
	isLoading?: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isLoading]);

	return (
		<div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-4 scroll-smooth">
			{messages.map((msg) => (
				<div
					key={msg.id}
					className={cn(
						"max-w-[85%] rounded-sm p-3 px-5 shadow-sm transition-all duration-300",
						msg.sender === "user"
							? "self-end bg-crimson text-white"
							: "self-start bg-white text-dark border border-dark/5"
					)}
				>
					{msg.text}
				</div>
			))}

			{isLoading && (
				<div className="self-start max-w-[85%] rounded-sm p-3 px-10 bg-white border border-dark/5 shadow-sm">
					<div className="flex gap-1">
						<div className="w-2 h-2 bg-dark/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
						<div className="w-2 h-2 bg-dark/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
						<div className="w-2 h-2 bg-dark/40 rounded-full animate-bounce" />
					</div>
				</div>
			)}
			<div ref={bottomRef} />
		</div>
	);
}
