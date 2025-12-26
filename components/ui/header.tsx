"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
	const pathname = usePathname();
	const currentPage = pathname.slice(1) || "Main Menu";

	return (
		<header className="flex w-full h-fit items-center justify-between relative">
			{/* Left Side: Logo */}
			<Link href="/" className="h-[80%] w-auto absolute">
				<Image
					src="/Logo.png"
					alt="MSU University Logo"
					width={0}
					height={0}
					sizes="100vw"
					className="h-full w-auto object-contain"
				/>
			</Link>

			{/* Right Side: Stacked Text */}
			<div className="flex flex-col items-end justify-center text-right grow text-nowrap">
				<h1 className="font-semibold">
					Official Helpdesk Kiosk
				</h1>
				<p className="">
					{currentPage}
				</p>
			</div>
		</header>
	);
}
