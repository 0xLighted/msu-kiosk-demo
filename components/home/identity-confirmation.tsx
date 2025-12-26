"use client"
import Button from "@/components/ui/button";

export default function IdentityConfirmation() {
	return (
		<div className="flex w-full shrink-0 flex-col gap-2 end-0">
			<div className="text-center font-semibold leading-normal text-dark">
				Did I identify you correctly?
			</div>
			<div className="flex w-full gap-2">
				<Button>
					Yes
				</Button>
				<Button>
					No
				</Button>
			</div>
		</div>
	);
}
