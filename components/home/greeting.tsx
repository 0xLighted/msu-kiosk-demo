interface GreetingProps {
	name?: string;
}

export default function Greeting({ name = "Visitor" }: GreetingProps) {
	return (
		<div className="flex w-full shrink-0 flex-col items-center text-center text-dark">
			<div className="font-semibold">
				<span>Hello </span>
				<span className="underline underline-offset-2">
					{name}
				</span>
				<span> !</span>
			</div>
			<p>
				What would you like to do
			</p>
		</div>
	);
}
