import { cn } from '../../utils/cn';

/**
 * Badge Component
 * 
 * A small status indicator or label with multiple variants.
 * 
 * @component
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="sm">Inactive</Badge>
 */

export const Badge = ({
    variant = 'default',
    size = 'md',
    dot = false,
    children,
    className,
    ...props
}) => {
    const variants = {
        default: 'bg-gray-100 text-gray-700 border-gray-200',
        primary: 'bg-gold-100 text-gold-700 border-gold-200',
        success: 'bg-success-light text-success-dark border-success',
        error: 'bg-error-light text-error-dark border-error',
        warning: 'bg-warning-light text-warning-dark border-warning',
        info: 'bg-info-light text-info-dark border-info',
    };

    const sizes = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
        lg: 'text-base px-3 py-1.5',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5',
                'font-medium rounded-full border',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {dot && (
                <span
                    className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        variant === 'success' && 'bg-success',
                        variant === 'error' && 'bg-error',
                        variant === 'warning' && 'bg-warning',
                        variant === 'info' && 'bg-info',
                        variant === 'primary' && 'bg-gold-500',
                        variant === 'default' && 'bg-gray-400',
                    )}
                    aria-hidden="true"
                />
            )}
            {children}
        </span>
    );
};

export default Badge;
