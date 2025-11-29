import { useState, useCallback } from 'react';

/**
 * useToast Hook
 * 
 * Custom hook to manage toast notifications state.
 * Provides methods to add and remove toasts.
 * 
 * @hook
 * @example
 * const { toasts, addToast, removeToast } = useToast();
 * 
 * // Show success toast
 * addToast({
 *   type: 'success',
 *   message: 'Changes saved successfully!',
 *   duration: 3000
 * });
 */

let toastId = 0;

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    /**
     * Add a new toast notification
     * @param {Object} options - Toast options
     * @param {string} options.type - Toast type: 'success' | 'error' | 'info' | 'warning'
     * @param {string} options.message - Toast message to display
     * @param {number} [options.duration=5000] - Auto-dismiss duration in ms (0 = no auto-dismiss)
     */
    const addToast = useCallback((options) => {
        const id = toastId++;
        const toast = {
            id,
            type: options.type || 'info',
            message: options.message,
            duration: options.duration !== undefined ? options.duration : 5000,
        };

        setToasts((prevToasts) => [...prevToasts, toast]);
        return id;
    }, []);

    /**
     * Remove a toast by ID
     * @param {number} id - Toast ID to remove
     */
    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    /**
     * Remove all toasts
     */
    const clearToasts = useCallback(() => {
        setToasts([]);
    }, []);

    /**
     * Convenience methods for different toast types
     */
    const success = useCallback((message, duration) => {
        return addToast({ type: 'success', message, duration });
    }, [addToast]);

    const error = useCallback((message, duration) => {
        return addToast({ type: 'error', message, duration });
    }, [addToast]);

    const info = useCallback((message, duration) => {
        return addToast({ type: 'info', message, duration });
    }, [addToast]);

    const warning = useCallback((message, duration) => {
        return addToast({ type: 'warning', message, duration });
    }, [addToast]);

    return {
        toasts,
        addToast,
        removeToast,
        clearToasts,
        success,
        error,
        info,
        warning,
    };
};

export default useToast;
