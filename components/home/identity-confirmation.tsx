
export default function IdentityConfirmation() {
	return (
		<div className="flex w-full shrink-0 flex-col gap-2 end-0">
			<div className="text-center font-semibold leading-normal text-dark">
				Did I identify you correctly?
			</div>
			<div className="flex w-full gap-2">
				<button className="p-2 w-full bg-white shadow-sm rounded-sm cursor-pointer hover:bg-crimson/20 transition-colors duration-200">
					Yes
				</button>
				<button className="p-2 w-full bg-white shadow-sm rounded-sm cursor-pointer hover:bg-crimson/20 transition-colors duration-200">
					No
				</button>
			</div>
		</div>
	);
}
