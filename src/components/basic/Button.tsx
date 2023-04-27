import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

function Button(props: ButtonProps) {
  const { children, leftSection, rightSection, className, ...moreProps } =
    props;
  return (
    <button
      className={`
          border-1 
          inline-flex
          h-10
          animate-pop 
          select-none 
          items-center 
          justify-center 
          gap-3
          rounded-md
          bg-blue-600
          stroke-gray-200 
          px-4 py-0 
          font-semibold 
          uppercase 
          text-gray-200
          no-underline 
          outline-offset-4
          transition-all  
          focus-visible:outline-sky-600 
          disabled:pointer-events-none 
          disabled:bg-stone-700 
          hover:bg-blue-700 
          active:focus:scale-95 
          active:focus:animate-none 
          active:hover:scale-95 
          active:hover:animate-none	
          ${className ?? ""}
            `}
      {...moreProps}
    >
      {!!leftSection && leftSection}
      {children}
      {!!rightSection && rightSection}
    </button>
  );
}

export default Button;
