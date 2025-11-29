import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { cn } from '../../utils/cn';

/**
 * Toast Component
 * 
 * Individual toast notification with auto-dismiss and manual close.
 * 
 * @component
 */

const toastIcons = {
    success: FaCheckCircle,
    error: FaExclamationCircle,
    info: FaInfoCircle,
    warning: FaExclamationCircle,
};

const toastStyles = {
    success: {
        container: 'bg-success-light border-success',
        icon: 'text-success-dark',
        text: 'text-success-dark',
    },
    error: {
        container: 'bg-error-light border-error',
        icon: 'text-error-dark',
        text: 'text-error-dark',
    },
    info: {
        container: 'bg-info-light border-info',
        icon: 'text-info-dark',
        text: 'text-info-dark',
    },
    warning: {
        container: 'bg-warning-light border-warning',
        icon: 'text-warning-dark',
        text: 'text-warning-dark',
    },
};

export const Toast = ({
    id,
    type = 'info',
    message,
    duration = 5000,
    onClose
}) => {
    const Icon = toastIcons[type];
    const styles = toastStyles[type];

    useEffect(() => {
        if (duration && duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.2 }
            }}
            className={cn(
                'flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg',
                'min-w-[320px] max-w-md',
                styles.container
            )}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', styles.icon)} />
            <p className={cn('flex-1 font-medium text-sm leading-relaxed', styles.text)}>
                {message}
            </p>
            <button
                onClick={() => onClose(id)}
                aria-label="Close notification"
                className={cn(
                    'flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity',
                    'focus-visible:opacity-100 focus-visible:outline-none',
                    styles.text
                )}
            >
                <FaTimes className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

/**
 * Toast Container Component
 * 
 * Container that manages all active toasts with stacking and animations.
 * 
 * @component
 * @example
 * <ToastContainer toasts={toasts} onClose={removeToast} />
 */

export const ToastContainer = ({
    toasts = [],
    onClose,
    position = 'top-right'
}) => {
    const positions = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    };

    if (toasts.length === 0) return null;

    return createPortal(
        <div
            className={cn(
                'fixed z-[var(--z-notification)] space-y-2',
                positions[position]
            )}
            aria-live="polite"
            aria-label="Notifications"
        >
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={onClose}
                    />
                ))}
            </AnimatePresence>
        </div>,
        document.body
    );
};

export default ToastContainer;
