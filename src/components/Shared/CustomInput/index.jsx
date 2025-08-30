// Library imports
import { useState } from 'react';
import { CrossIcon } from '../../../assets/icons';
// Local imports
import { CloseEyeIcon, OpenEyeIcon } from '../../../assets/icons';

export const CustomInput = ({
  label,
  value = '', 
  name,
  onChange,
  type = 'text',
  disabled = false,
  error = false,
  errorMsg = '',
  className = '',
  placeholder,
  autoFocus = false,
  autoComplete = 'off',
  isSearch = false,
  handleSearchClear,
  onSearch
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyDown = (e) => {
    if (type === 'number' && !/[0-9]/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
    if (isSearch && e.key === 'Escape' && value?.length > 0) {
      handleSearchClear?.();
    }
    if (isSearch && e.key === 'Enter' && value?.length > 0) {
      e.preventDefault();
      onSearch?.(value); 
    }
  };

  return (
    <div className={'relative w-full'}>
      {label && (
        <label
          className={`absolute left-3 text-xs -top-[8px] text-nowrap z-10 bg-white px-1 transition-all duration-200
            ${error ? 'text-danger' : 'text-input-title'}
          `}
        >
          {label}
        </label>
      )}

      <div
        className={`relative w-full`}
      >
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="off"
          onKeyDown={type === 'number' ? handleKeyDown : undefined}
          className={`w-full px-3 py-2 min-w-[180px] h-[36px] sm:h-[40px] border text-input-size rounded transition-all text-black
            ${disabled ? 'bg-input-disabled cursor-not-allowed' : 'bg-white'}
            ${error
              ? 'border-danger focus:border-danger'
              : 'border-input hover:border-input-hover focus:border-input-active'
            }
           ${type === 'number' ? 'no-spinner' : ''}
           focus:outline-none pr-10
           ${className}
          `}
          placeholder={!value ? placeholder : ''}
        />

  
        {type === 'password' && !disabled && !isSearch && (
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-input-placeholder`}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <CloseEyeIcon className='size-5' /> : <OpenEyeIcon className='size-5' />}
          </span>
        )}

        {error && (
          <span className="text-[11px] text-danger ml-1 block absolute top-[40px]">
            {errorMsg}
          </span>
        )}
      </div>
    </div>
  );
};