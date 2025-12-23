import MainImage from "@/components/home/camere-box";
import Greeting from "@/components/home/greeting";
import MenuOptions from "@/components/home/menu-options";
import IdentityConfirmation from "@/components/home/identity-confirmation";

export default function Home() {
	return (
		<div className="flex flex-col gap-5">
			<MainImage />
			<Greeting />
			<MenuOptions />
			<IdentityConfirmation />
		</div>
	);
}