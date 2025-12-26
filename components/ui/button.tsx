import { cn } from "@/lib/utils";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({ children, className, onClick, disabled }: ButtonProps) {
    return (
        <button className={cn("p-2 px-4 w-full bg-white shadow-sm rounded-sm cursor-pointer hover:bg-crimson/20 transition-colors duration-200", className)} onClick={onClick} disabled={disabled}>{children}</button>
    )
}