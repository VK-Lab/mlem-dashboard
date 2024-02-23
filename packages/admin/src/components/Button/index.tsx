import React from "react";

const shapes = { square: "rounded-none", round: "rounded" } as const;
const variants = {
  fill: {
    indigo_900_01: "bg-indigo-900_01",
    indigo_500: "bg-indigo-500",
    indigo_500_7f: "bg-indigo-500_7f",
    gray_900: "bg-gray-900",
    amber_500: "bg-amber-500",
    indigo_900_cc: "bg-indigo-900_cc",
  },
  gradient: { indigo_A400_indigo_A400_e5: "bg-gradient " },
} as const;
const sizes = { xs: "p-2.5", sm: "p-[13px]", md: "px-4 py-[35px]" } as const;

export type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClick"
> &
  Partial<{
    className: string;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    color: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
  }>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "",
  variant = "",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
