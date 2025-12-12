import { forwardRef, useState, useMemo } from 'react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { cn } from '../../utils/cn';

/**
 * Textarea Component
 * 
 * A fully accessible textarea component with validation states, character counter, and auto-resize.
 * 
 * @component
 * @example
 * <Textarea
 *   label="Bio"
 *   placeholder="Tell us about yourself"
 *   maxLength={500}
 *   showCharacterCount
 * />
 */

export const Textarea = forwardRef(({
    label,
    error,
    success,
    hint,
    required = false,
    disabled = false,
    maxLength,
    showCharacterCount = false,
    rows = 4,
    autoResize = false,
    className,
    containerClassName,
    onChange,
    ...props
}, ref) => {
    const [charCount, setCharCount] = useState(props.value?.length || props.defaultValue?.length || 0);
    const [isFocused, setIsFocused] = useState(false);

    // Generate a stable fallback ID that doesn't change on re-renders
    const fallbackId = useMemo(() => `textarea-${Math.random().toString(36).slice(2, 9)}`, []);
    const id = props.id || props.name || fallbackId;
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;

    const handleChange = (e) => {
        setCharCount(e.target.value.length);
        if (onChange) {
            onChange(e);
        }

        // Auto-resize logic
        if (autoResize && e.target) {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        }
    };

    return (
        <div className={cn('space-y-1.5', containerClassName)}>
            {/* Label and Character Count */}
            <div className="flex items-center justify-between">
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

                {showCharacterCount && maxLength && (
                    <span
                        className={cn(
                            'text-xs font-medium transition-colors',
                            charCount > maxLength * 0.9 ? 'text-warning' : 'text-gray-400',
                            charCount >= maxLength && 'text-error'
                        )}
                        aria-live="polite"
                    >
                        {charCount}/{maxLength}
                    </span>
                )}
            </div>

            {/* Textarea Container */}
            <div className="relative">
                <textarea
                    ref={ref}
                    id={id}
                    rows={rows}
                    required={required}
                    disabled={disabled}
                    maxLength={maxLength}
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
                    onChange={handleChange}
                    className={cn(
                        // Base styles
                        'w-full px-4 py-3 rounded-lg',
                        'border-2 transition-all duration-200',
                        'focus:outline-none focus-visible:ring-4',
                        'placeholder:text-gray-400',
                        'resize-none',

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

                        // Auto-resize
                        autoResize && 'overflow-hidden',

                        // Custom className
                        className
                    )}
                    {...props}
                />

                {/* Status Icon - positioned at top right */}
                {(hasError || hasSuccess) && (
                    <div className="absolute right-3 top-3">
                        {hasError && (
                            <FaExclamationCircle
                                className="text-error"
                                aria-hidden="true"
                            />
                        )}
                        {hasSuccess && (
                            <FaCheckCircle
                                className="text-success"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                )}
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

Textarea.displayName = 'Textarea';

export default Textarea;
