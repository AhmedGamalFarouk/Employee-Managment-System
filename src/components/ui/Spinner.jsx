import { cn } from '../../utils/cn';

/**
 * Spinner Component
 * 
 * A customizable loading spinner with multiple sizes and colors.
 * 
 * @component
 * @example
 * <Spinner size="md" color="gold" />
 */

export const Spinner = ({
    size = 'md',
    color = 'gold',
    className,
    ...props
}) => {
    const sizes = {
        xs: 'w-3 h-3 border',
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-2',
        xl: 'w-12 h-12 border-3',
    };

    const colors = {
        gold: 'border-gray-200 border-t-gold-500',
        white: 'border-gray-300 border-t-white',
        gray: 'border-gray-200 border-t-gray-600',
        primary: 'border-gray-200 border-t-gold-500',
    };

    return (
        <div
            role="status"
            aria-label="Loading"
            className={cn('inline-block', className)}
            {...props}
        >
            <div
                className={cn(
                    'rounded-full animate-spin',
                    sizes[size],
                    colors[color]
                )}
            />
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
