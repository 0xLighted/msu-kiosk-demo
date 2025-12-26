import MainImage from "@/components/home/camere-box";
import Greeting from "@/components/home/greeting";
import IdentityConfirmation from "@/components/home/identity-confirmation";
import MenuButton from "@/components/ui/menu-button";

export default function Home() {
	const options = {
		"Ask a Question": "/chat",
		"University Services": "/services",
		"Find Directions": "/map",
		"FAQs": "/faq"
	};

	return (
		<div className="flex flex-col gap-5">
			<MainImage />
			<Greeting />
			<div className="flex w-full flex-col gap-3">
				{Object.entries(options).map(([label, path]) => (
					<MenuButton key={path} label={label} path={path} />
				))}
			</div>
			<IdentityConfirmation />
		</div>
	);
}