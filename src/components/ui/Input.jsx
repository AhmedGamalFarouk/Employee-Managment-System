import { forwardRef, useState, useMemo } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { cn } from '../../utils/cn';

/**
 * Input Component
 * 
 * A fully accessible input component with validation states, icons, and helper text.
 * Supports all standard input types including password with toggle visibility.
 * 
 * @component
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   error="Invalid email address"
 *   required
 * />
 */

export const Input = forwardRef(({
    label,
    error,
    success,
    hint,
    icon,
    type = 'text',
    required = false,
    disabled = false,
    className,
    containerClassName,
    showPasswordToggle = true,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Generate a stable fallback ID that doesn't change on re-renders
    const fallbackId = useMemo(() => `input-${Math.random().toString(36).slice(2, 9)}`, []);
    const id = props.id || props.name || fallbackId;
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;

    return (
        <div className={cn('space-y-1.5', containerClassName)}>
            {/* Label */}
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                    {required && (
                        <span className="text-error ml-1" aria-label="required">*</span>
                    )}
                </label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Left Icon */}
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {icon}
                    </div>
                )}

                {/* Input Field */}
                <input
                    ref={ref}
                    id={id}
                    type={inputType}
                    required={required}
                    disabled={disabled}
                    aria-required={required}
                    aria-invalid={hasError ? 'true' : 'false'}
                    aria-describedby={
                        hasError ? `${id}-error` :
                            hint ? `${id}-hint` :
                                hasSuccess ? `${id}-success` :
                                    undefined
                    }
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                        // Base styles
                        'w-full h-11 px-4 rounded-lg',
                        'border-2 transition-all duration-200',
                        'focus:outline-none focus-visible:ring-4',
                        'placeholder:text-gray-400',

                        // Icon spacing
                        icon && 'pl-10',
                        (isPassword && showPasswordToggle) && 'pr-10',

                        // State-based border and ring colors
                        hasError && [
                            'border-error text-error',
                            'focus-visible:border-error focus-visible:ring-error/20',
                        ],
                        hasSuccess && [
                            'border-success text-gray-900',
                            'focus-visible:border-success focus-visible:ring-success/20',
                        ],
                        !hasError && !hasSuccess && [
                            'border-gray-300 text-gray-900',
                            'focus-visible:border-gold-500 focus-visible:ring-gold-500/20',
                        ],

                        // Disabled state
                        disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-60',

                        // Custom className
                        className
                    )}
                    {...props}
                />

                {/* Right Icons - Status indicators or password toggle */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {/* Validation Icons */}
                    {hasError && (
                        <FaExclamationCircle
                            className="text-error flex-shrink-0"
                            aria-hidden="true"
                        />
                    )}
                    {hasSuccess && (
                        <FaCheckCircle
                            className="text-success flex-shrink-0"
                            aria-hidden="true"
                        />
                    )}

                    {/* Password Toggle */}
                    {isPassword && showPasswordToggle && !disabled && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus-visible:text-gold-600"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="w-4 h-4" />
                            ) : (
                                <FaEye className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Helper Text */}
            {hint && !hasError && !hasSuccess && (
                <p id={`${id}-hint`} className="text-sm text-gray-500">
                    {hint}
                </p>
            )}

            {/* Success Message */}
            {hasSuccess && (
                <p
                    id={`${id}-success`}
                    className="text-sm text-success flex items-center gap-1.5"
                >
                    <FaCheckCircle className="text-xs flex-shrink-0" aria-hidden="true" />
                    <span>{success}</span>
                </p>
            )}

            {/* Error Message */}
            {hasError && (
                <p
                    id={`${id}-error`}
                    role="alert"
                    className="text-sm text-error flex items-center gap-1.5"
                >
                    <FaExclamationCircle className="text-xs flex-shrink-0" aria-hidden="true" />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
