import MenuButton from "@/components/ui/menu-button";

export default function Services() {
    const services = {
        "Finance Department": {
            "Payment portal": "https://www2.msu.edu.my/molpay/molpay_process_order.php",
            "Get ticket": "/finance/get-ticket"
        },
        "Library": {
            "Rent book": "/library/rent-book",
            "Rent room": "/library/rent-room"
        },
        "IT Department": {
            "Rent equipment": "/it/rent-equipment",
            "Send inquiry": "/it/send-inquiry",
            "Request assistance": "/it/request-assistance"
        },
        "Campus Department": {
            "Book venue": "/campus/book-venue",
            "Inquire a room": "/campus/inquire-room"
        }
    }
    return (
        <div className="flex flex-col gap-5">
            {Object.entries(services).map(([label, options]) => (
                <div className="flex w-full flex-col gap-3" key={label}>
                    <h1 className="text-lg font-semibold">{label}</h1>
                    {Object.entries(options).map(([optionLabel, path]) => (
                        <MenuButton key={optionLabel} label={optionLabel} path={path} />
                    ))}
                </div>
            ))}
        </div>
    );
}