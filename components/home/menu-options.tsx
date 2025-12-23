import Link from "next/link";

export default function MenuOptions() {
	const options = {
		"Ask a Question": "/chat",
		"University Services": "/services",
		"Find Directions": "/map",
		"FAQs": "/faq"
	};

	return (
		<div className="flex w-full shrink-0 flex-col gap-5">
			{Object.entries(options).map(([label, path]) => (
				<Link key={path} href={path} className="flex flex-col gap-1 group">
					<p className="pl-5 text-left font-normal leading-normal text-dark group-hover:text-crimson transition-colors">
						{label}
					</p>
					<div className="h-0.5 bg-dark group-hover:bg-crimson transition-colors rounded-full" />
				</Link>
			))}
		</div>
	);
}
