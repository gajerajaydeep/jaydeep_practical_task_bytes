import React from 'react';

interface LoaderProps { 
    color?: string;      
    message?: string;
    className?: string;   
    orientation?: string;
    textColor? : string
}

export const Loader: React.FC<LoaderProps> = ({
    color = 'indigo-600',
    message= "Please Wait...",
    className = '',
    orientation = "flex-row",
    textColor
}) => {
    return (

        <div className='flex items-center justify-center '>
            <div className={`flex ${orientation} items-center justify-center ${className} gap-4`}>
                <div
                    className={`rounded-full animate-spin border-solid border-${color}`}
                    style={{
                        width: `32px`,
                        height: `32px`,
                        borderWidth: `4px`,
                        borderTopColor: 'transparent',
                    }}
                ></div>

                {message && <p className={`text-md text-gray-500 ${textColor}`}>{message}</p>}
            </div>
        </div>
    );
};
