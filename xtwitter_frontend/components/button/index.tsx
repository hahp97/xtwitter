import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  outline?: boolean;
  large?: boolean;
  fullWidth?: boolean;
  width?: string;
  onClick: () => void;
  secondary?: boolean;
}

const CommonButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  large,
  fullWidth = true,
  width,
  secondary,
  ...props
}) => {
  const buttonClasses = classNames(
    `disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-full
    font-semibold
    hover:opacity-80
    transition
    border-2 ${
      fullWidth ? "w-full" : 'w-fit'
    }`,
    outline
      ? "bg-transparent border-white text-white"
      : "",
    large
      ? "text-xl py-5 font-light py-3"
      : "text-md py-4 font-semibold py-3",
    secondary ? 'bg-white text-black border-black' : 'bg-sky-500 text-white border-sky-500',
    disabled && "opacity-50",
    props.className
  );

  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
    >
      {label}
    </button>
  );
};

export default CommonButton;
