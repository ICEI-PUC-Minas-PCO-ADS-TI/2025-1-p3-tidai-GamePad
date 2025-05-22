import React from 'react';
import { twMerge} from 'tailwind-merge';

export function Button({ className = "", ...props }) {
    return (
        <button
            className={twMerge(
                "bg-cyan-500 cursor-pointer text-white font-semibold py-2 px-4 rounded-md hover:bg-transparent border border-cyan-500 hover:text-cyan-500 transition-all duration-500",
                className
            )}
            {...props}
        >
            {props.children}
        </button>
    );
}
