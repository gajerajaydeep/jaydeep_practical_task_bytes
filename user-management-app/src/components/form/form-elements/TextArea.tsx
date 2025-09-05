import React from "react"

interface TextAreaProps {
    label: string,
    name?: string,
    error?: string,
    className?: string,
    placeholder?: string
}
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ label, name, error, className, placeholder, ...rest }, ref) => {
    return (
        <>
            <div className="flex flex-col">
                {label && (
                    <label className={`text-sm font-medium  mb-1 leading-5 ${error ? "text-red-600" : "text-gray-700"}`}>
                        {label}*
                    </label>
                )}

                <div className={`flex flex-1 items-center px-3 py-2 bg-gray-50 border ${error ? "border-red-600" : "border-gray-300"} rounded-md mt-1 focus-within:border-blue-500`}>

                    <textarea
                        name={name}
                        rows={5}
                        ref={ref}
                        {...rest}
                        placeholder={placeholder}
                        className={`bg-transparent outline-none w-full text-sm ${className}  focus:border-blue-500`}
                    >

                    </textarea>
                </div>
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>
        </>
    )
}
)