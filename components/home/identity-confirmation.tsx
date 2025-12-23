
export default function IdentityConfirmation() {
	return (
		<div className="flex w-full shrink-0 flex-col gap-2">
			<div className="text-center font-semibold leading-normal text-dark">
				Did I identify you correctly?
			</div>
			<div className="flex w-full gap-2">
				<button className="p-2 w-full border-2 border-dark rounded-sm cursor-pointer hover:border-crimson">
					Yes
				</button>
				<button className="p-2 w-full border-2 border-dark rounded-sm cursor-pointer hover:border-crimson">
					No
				</button>
			</div>
		</div>
	);
}
