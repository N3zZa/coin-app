import React from 'react';

interface InputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  minAmount: number;
  maxAmount: number;
  coinPrice: number;
}

const AddInput: React.FC<InputProps> = ({
  className = '',
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  minAmount,
  maxAmount,
  coinPrice,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (Number(event.target.value) > 0 || event.target.value === '') &&
      coinPrice * Number(event.target.value) >= minAmount &&
      coinPrice * Number(event.target.value) <= maxAmount
    ) {
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

export default AddInput;
