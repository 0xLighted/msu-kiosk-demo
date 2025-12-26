import Link from "next/link"

interface MenuButtonProps {
    label: string;
    path?: string;
}

export default function MenuButton({ label, path }: MenuButtonProps) {
    return (
        <Link href={path || "#"} className="flex flex-col gap-1 group">
            <p className="pl-5 text-left font-normal leading-normal text-dark group-hover:text-crimson transition-colors">
                {label}
            </p>
            <div className="h-0.5 bg-dark group-hover:bg-crimson transition-colors rounded-full" />
        </Link>
    )
}