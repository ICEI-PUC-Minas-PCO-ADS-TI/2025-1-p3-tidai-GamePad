import React from "react";

export default function GlassButton({
  icon: Icon,
  text,
  hoverGradient,
  hoverBorder,
  hoverRing,
  hoverText,
  iconColor,
  className = "",
  ...props
}) {
  return (
    <div
      className={`backdrop-blur-md bg-white/20 border border-white/20 rounded-full flex items-center justify-center p-6 shadow-lg z-10 gap-4 cursor-pointer group transition-all duration-300 hover:scale-105 ${hoverGradient} ${hoverBorder} ${hoverRing} ${className}`}
      {...props}
    >
      {Icon && (
        <Icon
          className={`w-8 h-8 flex-shrink-0 transition-colors duration-300 group-hover:text-white`}
          color={iconColor}
        />
      )}
      <span className={`md:text-sm text-xl text-white text-left transition-colors duration-300 group-hover:${hoverText}`}>
        {text}
      </span>
    </div>
  );
}
