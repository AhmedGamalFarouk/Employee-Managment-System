import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Button Component
 * 
 * A comprehensive button component with multiple variants, sizes, and states.
 * Fully accessible with ARIA attributes and keyboard support.
 * 
 * @component
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */

const buttonVariants = {
    primary: {
        base: 'bg-gold-500 text-white border-transparent',
        hover: 'hover:bg-gold-600 hover:shadow-gold',
        active: 'active:bg-gold-700',
        focus: 'focus-visible:ring-gold-500/30',
    },
    secondary: {
        base: 'bg-white text-gray-900 border-gray-300',
        hover: 'hover:bg-gray-50 hover:border-gray-400',
        active: 'active:bg-gray-100',
        focus: 'focus-visible:ring-gray-400/30',
    },
    danger: {
        base: 'bg-error text-white border-transparent',
        hover: 'hover:bg-error-dark hover:shadow-lg',
        active: 'active:bg-error-dark',
        focus: 'focus-visible:ring-error/30',
    },
    ghost: {
        base: 'bg-transparent text-gray-700 border-transparent',
        hover: 'hover:bg-gray-100',
        active: 'active:bg-gray-200',
        focus: 'focus-visible:ring-gray-400/20',
    },
    text: {
        base: 'bg-transparent text-gold-600 border-transparent',
        hover: 'hover:text-gold-700 hover:underline',
        active: 'active:text-gold-800',
        focus: 'focus-visible:ring-0 focus-visible:underline',
    },
    outline: {
        base: 'bg-transparent text-gold-600 border-gold-500',
        hover: 'hover:bg-gold-50 hover:border-gold-600',
        active: 'active:bg-gold-100',
        focus: 'focus-visible:ring-gold-500/30',
    },
};

const buttonSizes = {
    sm: 'h-8 px-3 text-sm gap-1.5 min-w-[44px]',
    md: 'h-10 px-4 text-base gap-2 min-w-[44px]',
    lg: 'h-12 px-6 text-lg gap-2 min-w-[44px]',
    xl: 'h-14 px-8 text-xl gap-3 min-w-[44px]',
};

export const Button = forwardRef(({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    children,
    className,
    type = 'button',
    ...props
}, ref) => {
    const variantStyles = buttonVariants[variant];
    const isDisabled = disabled || loading;

    return (
        <button
            ref={ref}
            type={type}
            disabled={isDisabled}
            className={cn(
                // Base styles
                'inline-flex items-center justify-center',
                'font-semibold rounded-lg border-2',
                'transition-all duration-200',
                'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',

                // Interactive states (only when not disabled)
                !isDisabled && 'active:scale-[0.98]',

                // Variant styles
                variantStyles.base,
                !isDisabled && variantStyles.hover,
                !isDisabled && variantStyles.active,
                variantStyles.focus,

                // Size
                buttonSizes[size],

                // Full width
                fullWidth && 'w-full',

                // Custom className
                className
            )}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {icon && iconPosition === 'left' && !loading && (
                <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
            )}
            {children && <span>{children}</span>}
            {icon && iconPosition === 'right' && !loading && (
                <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
            )}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
