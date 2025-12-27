'use client';

import { useUser } from "@/context/user-context";

export default function Greeting() {
	const { user } = useUser();
	const name = user ? user.name : "Visitor";
	const id = user ? user.id : null;

	return (
		<div className="flex w-full shrink-0 flex-col items-center text-center text-dark">
			<div className="font-semibold">
				<span>Hello </span>
				<span className="underline underline-offset-4 decoration-2">
					{name}
				</span>
				{id && <span className="opacity-60"> ({id})</span>}
				<span> !</span>
			</div>
			<p className="">
				What would you like to do?
			</p>
		</div>
	);
}
