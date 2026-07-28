import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  error,
  icon: Icon,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const hasValue = value && value.length > 0;

  return (
    <div className="relative">
      <div
        className={`group relative rounded-2xl border transition-all duration-300 ${
          error
            ? 'border-red-500/40 bg-red-500/5'
            : focused
              ? 'border-indigo-500/40 bg-white/[0.05]'
              : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05]'
        }`}
      >
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Icon
              className={`text-lg transition-colors duration-300 ${
                focused ? 'text-indigo-400' : error ? 'text-red-400' : 'text-zinc-500'
              }`}
            />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent text-white text-sm outline-none transition-all duration-300 autofill:bg-transparent autofill:text-white ${
            Icon ? 'pl-11' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'} py-4`}
          {...props}
        />
        <label
          className={`absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 text-sm ${
            Icon ? 'ml-11' : 'ml-4'
          } ${
            focused || hasValue
              ? '-translate-y-7 text-xs text-indigo-400'
              : error
                ? 'text-red-400/60'
                : 'text-zinc-500'
          }`}
        >
          {label}
        </label>
        {focused && (
          <motion.div
            layoutId="input-focus"
            className="absolute inset-0 rounded-2xl ring-1 ring-indigo-500/30 pointer-events-none"
            transition={{ duration: 0.2 }}
          />
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 mt-1.5 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
