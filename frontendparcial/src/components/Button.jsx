function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
    className = "",
    variant = "primary"
}) {
    const base = "px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-500 text-white font-bold hover:bg-blue-700",
        danger: "bg-red-500 text-white font-bold hover:bg-red-700",
        edit: "bg-yellow-500 text-white font-bold hover:bg-yellow-800",
        ghost: "bg-transparent text-red-600 font-bold hover:underline"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant] || variants.primary} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;