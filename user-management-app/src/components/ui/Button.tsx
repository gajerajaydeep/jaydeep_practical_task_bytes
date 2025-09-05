import React from 'react'

interface ButtonProps {
    type?: "submit" | "button" | "reset",
    text: string,
    onClick?: () => void;
    disable?: boolean;
    bgColor?: string,
    textColor?: string,
    className?: string,
    leftIcon?: string,
    isLoading?: boolean
}

const Button: React.FC<ButtonProps> = (
    {
        type = "button",
        text,
        onClick,
        disable,
        bgColor,
        textColor,
        className,
        leftIcon,
        isLoading
    }
) => {
    return (
        <>
            <button
                onClick={onClick}
                type={type}
                disabled={disable}
                className={` ${textColor ? textColor : "text-white"} rounded-lg flex gap-4 ${className} 
                ${bgColor? bgColor : ''}
                ${disable ? "cursor-not-allowed bg-blue-400" : `cursor-pointer ${bgColor? bgColor : 'bg-blue-800'}` } font-medium`}
            >
                <span>{leftIcon && <img src={`${leftIcon}`} alt={text} />} {isLoading ? "submitting...":text} </span>
            </button>
        </>
    )
}

export default Button