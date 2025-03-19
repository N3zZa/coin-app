import React from 'react';

interface InputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number';
}

const Input: React.FC<InputProps> = ({ className = "",value = "", onChange, placeholder = '', type = 'text' }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > 0 || event.target.value === "") {
      onChange(event.target.value);
    } 
  };

  return (
    <div>
      <input
        className={`w-full my-1 bg-[#282A38] border-none p-2 outline-none rounded-xl ${className}`}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input