'use client';

import CameraBox from "@/components/home/camera-box";
import Greeting from "@/components/home/greeting";
import MenuButton from "@/components/ui/menu-button";

export default function Home() {
	const options = {
		"Ask a Question": "/chat",
		"University Services": "/services",
		"Find Directions": "/map",
		"FAQs": "/faq"
	};

	return (
		<div className="flex flex-1 flex-col gap-5">
			<CameraBox />
			<Greeting />
			<div className="flex flex-1 w-full flex-col gap-3">
				{Object.entries(options).map(([label, path]) => (
					<MenuButton key={path} label={label} path={path} />
				))}
			</div>
		</div>
	);
}