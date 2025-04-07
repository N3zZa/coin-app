import React, { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: ReactNode;
  variant?: 'blue'|'gray';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, variant = 'gray', className, ...props }) => {
  const buttonClasses = clsx(
    variant === 'blue' ? 'btn-blue' : 'btn-gray',
    className, // Переданные через className стили не перезаписываются, а объединяются
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

