import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Card Component
 * 
 * A flexible card container with multiple variants and padding options.
 * Supports hover effects and customizable styling.
 * 
 * @component
 * @example
 * <Card variant="elevated" hover>
 *   <Card.Header>
 *     <h3>Card Title</h3>
 *   </Card.Header>
 *   <Card.Body>
 *     Content goes here
 *   </Card.Body>
 * </Card>
 */

export const Card = forwardRef(({
    variant = 'default',
    hover = false,
    padding = 'md',
    children,
    className,
    ...props
}, ref) => {
    const variants = {
        default: 'bg-white border border-gray-200',
        elevated: 'bg-white shadow-md',
        outlined: 'bg-white border-2 border-gray-300',
        ghost: 'bg-transparent border border-gray-100',
    };

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            ref={ref}
            className={cn(
                'rounded-xl transition-all duration-200',
                variants[variant],
                paddings[padding],
                hover && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';

// Card Header Sub-component
export const CardHeader = forwardRef(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn('mb-4', className)}
            {...props}
        >
            {children}
        </div>
    );
});

CardHeader.displayName = 'Card.Header';

// Card Body Sub-component
export const CardBody = forwardRef(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn('', className)}
            {...props}
        >
            {children}
        </div>
    );
});

CardBody.displayName = 'Card.Body';

// Card Footer Sub-component
export const CardFooter = forwardRef(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn('mt-4 pt-4 border-t border-gray-200', className)}
            {...props}
        >
            {children}
        </div>
    );
});

CardFooter.displayName = 'Card.Footer';

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
