import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  outline?: boolean;
  small?: boolean;
  fullWidth?: boolean;
  width?: string;
  onClick: () => void;
}

const CommonButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  fullWidth = true,
  width,
  ...props
}) => {
  const buttonClasses = classNames(
    `inline-flex items-center justify-center rounded-lg transition ${
      fullWidth ? "w-full" : width
    }`,
    outline
      ? "bg-white border-black text-black"
      : "bg-rose-500 border-rose-500 text-white",
    small
      ? "text-sm py-1 font-light border-[1px]"
      : "text-md py-3 font-semibold border-2",
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
      <div className="px-3">{label}</div>
    </button>
  );
};

export default CommonButton;
