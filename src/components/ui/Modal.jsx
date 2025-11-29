import { useEffect, useRef, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { cn } from '../../utils/cn';

/**
 * Modal Component
 * 
 * A fully accessible modal dialog with focus trap, keyboard navigation,
 * and smooth animations. Renders in a portal for proper stacking.
 * 
 * @component
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Confirm Action"
 *   size="md"
 * >
 *   <p>Are you sure you want to continue?</p>
 * </Modal>
 */

export const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    className,
}) => {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);

    // Size variants
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl mx-4',
    };

    // Focus trap and keyboard handling
    useEffect(() => {
        if (!isOpen) return;

        // Store previously focused element
        previousActiveElement.current = document.activeElement;

        // Focus first focusable element in modal
        const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        firstElement?.focus();

        // Handle Tab key for focus trap
        const handleTab = (e) => {
            if (e.key === 'Tab') {
                if (focusableElements.length === 1) {
                    e.preventDefault();
                    return;
                }

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            }

            // Handle Escape key
            if (e.key === 'Escape' && closeOnEscape) {
                onClose();
            }
        };

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleTab);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleTab);

            // Restore focus to previously focused element
            if (previousActiveElement.current instanceof HTMLElement) {
                previousActiveElement.current.focus();
            }
        };
    }, [isOpen, onClose, closeOnEscape]);

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleBackdropClick}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[var(--z-modal-backdrop)]"
                        aria-hidden="true"
                    />

                    {/* Modal Container */}
                    <div
                        className="fixed inset-0 overflow-y-auto z-[var(--z-modal)] flex items-center justify-center p-4"
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{
                                duration: 0.2,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={title ? 'modal-title' : undefined}
                            aria-describedby={description ? 'modal-description' : undefined}
                            className={cn(
                                'bg-white rounded-2xl shadow-2xl w-full',
                                'overflow-hidden',
                                sizes[size],
                                className
                            )}
                        >
                            {/* Header */}
                            {(title || showCloseButton) && (
                                <div className="flex items-start justify-between p-6 border-b border-gray-200">
                                    <div className="flex-1">
                                        {title && (
                                            <h2
                                                id="modal-title"
                                                className="text-xl font-semibold text-gray-900"
                                            >
                                                {title}
                                            </h2>
                                        )}
                                        {description && (
                                            <p
                                                id="modal-description"
                                                className="mt-1 text-sm text-gray-500"
                                            >
                                                {description}
                                            </p>
                                        )}
                                    </div>

                                    {showCloseButton && (
                                        <button
                                            onClick={onClose}
                                            aria-label="Close modal"
                                            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gold-500"
                                        >
                                            <FaTimes className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Body */}
                            <div className="p-6">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </Fragment>
            )}
        </AnimatePresence>,
        document.body
    );
};

// Modal Footer Sub-component
export const ModalFooter = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                'flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200 -mx-6 -mb-6 mt-6',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

ModalFooter.displayName = 'Modal.Footer';
Modal.Footer = ModalFooter;

export default Modal;
