import { useState } from 'react';
import { Button, Input, Textarea, Card, Modal, Badge, Spinner } from '../components/ui';
import { ToastContainer } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { FaPlus, FaEdit, FaTrash, FaSave, FaUser, FaEnvelope } from 'react-icons/fa';

/**
 * Design System Showcase
 * 
 * Interactive demonstration of all design system components.
 * This page serves as a living style guide and component testing ground.
 */

const DesignSystemShowcase = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toasts, success, error, info, warning, removeToast } = useToast();

    const handleToastDemo = (type) => {
        const messages = {
            success: 'Operation completed successfully!',
            error: 'An error occurred. Please try again.',
            warning: 'Warning: This action requires attention.',
            info: 'Here is some helpful information.',
        };

        switch (type) {
            case 'success': success(messages.success); break;
            case 'error': error(messages.error); break;
            case 'warning': warning(messages.warning); break;
            case 'info': info(messages.info); break;
        }
    };

    const simulateLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            success('Action completed!');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold text-gray-900">
                        Electric Filament
                    </h1>
                    <p className="text-xl text-gray-600">
                        Design System Showcase
                    </p>
                    <div className="flex justify-center gap-2">
                        <Badge variant="primary">v1.0.0</Badge>
                        <Badge variant="success" dot>Active</Badge>
                    </div>
                </header>

                {/* Buttons Section */}
                <section className="space-y-6">
                    <Card>
                        <Card.Header>
                            <h2 className="text-2xl font-bold text-gray-900">Buttons</h2>
                            <p className="text-gray-600 mt-1">Different variants and sizes</p>
                        </Card.Header>
                        <Card.Body className="space-y-6">
                            {/* Variants */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Variants</h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="danger">Danger</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="text">Text</Button>
                                    <Button variant="outline">Outline</Button>
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Sizes</h3>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Button size="sm">Small</Button>
                                    <Button size="md">Medium</Button>
                                    <Button size="lg">Large</Button>
                                    <Button size="xl">Extra Large</Button>
                                </div>
                            </div>

                            {/* With Icons */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">With Icons</h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button icon={<FaPlus />}>Add New</Button>
                                    <Button variant="secondary" icon={<FaEdit />}>Edit</Button>
                                    <Button variant="danger" icon={<FaTrash />}>Delete</Button>
                                    <Button icon={<FaSave />} iconPosition="right">Save</Button>
                                </div>
                            </div>

                            {/* States */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">States</h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button loading>Loading</Button>
                                    <Button disabled>Disabled</Button>
                                    <Button fullWidth>Full Width</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </section>

                {/* Form Inputs Section */}
                <section className="space-y-6">
                    <Card>
                        <Card.Header>
                            <h2 className="text-2xl font-bold text-gray-900">Form Inputs</h2>
                            <p className="text-gray-600 mt-1">Text inputs and textareas with validation</p>
                        </Card.Header>
                        <Card.Body className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Default Input"
                                    placeholder="Enter text..."
                                />

                                <Input
                                    label="With Icon"
                                    icon={<FaUser />}
                                    placeholder="Your name"
                                />

                                <Input
                                    label="Email with Validation"
                                    type="email"
                                    icon={<FaEnvelope />}
                                    placeholder="you@example.com"
                                    hint="We'll never share your email"
                                />

                                <Input
                                    label="Error State"
                                    error="This field is required"
                                    defaultValue="Invalid input"
                                />

                                <Input
                                    label="Success State"
                                    success="Looks good!"
                                    defaultValue="valid@email.com"
                                />

                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter password"
                                    showPasswordToggle
                                />
                            </div>

                            <Textarea
                                label="Biography"
                                placeholder="Tell us about yourself..."
                                maxLength={200}
                                showCharacterCount
                                rows={4}
                                hint="Maximum 200 characters"
                            />
                        </Card.Body>
                    </Card>
                </section>

                {/* Cards Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Cards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card variant="default">
                            <h3 className="font-semibold text-lg mb-2">Default Card</h3>
                            <p className="text-gray-600">Basic card with border</p>
                        </Card>

                        <Card variant="elevated">
                            <h3 className="font-semibold text-lg mb-2">Elevated Card</h3>
                            <p className="text-gray-600">Card with shadow</p>
                        </Card>

                        <Card variant="outlined" hover>
                            <h3 className="font-semibold text-lg mb-2">Hover Card</h3>
                            <p className="text-gray-600">Hover to see effect</p>
                        </Card>
                    </div>
                </section>

                {/* Badges Section */}
                <section className="space-y-6">
                    <Card>
                        <Card.Header>
                            <h2 className="text-2xl font-bold text-gray-900">Badges</h2>
                        </Card.Header>
                        <Card.Body>
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="default">Default</Badge>
                                <Badge variant="primary">Primary</Badge>
                                <Badge variant="success" dot>Success</Badge>
                                <Badge variant="error" dot>Error</Badge>
                                <Badge variant="warning" dot>Warning</Badge>
                                <Badge variant="info" dot>Info</Badge>
                            </div>
                        </Card.Body>
                    </Card>
                </section>

                {/* Modal & Toast Demo */}
                <section className="space-y-6">
                    <Card>
                        <Card.Header>
                            <h2 className="text-2xl font-bold text-gray-900">Interactive Components</h2>
                        </Card.Header>
                        <Card.Body className="space-y-6">
                            {/* Modal Demo */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Modal</h3>
                                <Button onClick={() => setIsModalOpen(true)}>
                                    Open Modal
                                </Button>
                            </div>

                            {/* Toast Demo */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Toast Notifications</h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button variant="outline" onClick={() => handleToastDemo('success')}>
                                        Success Toast
                                    </Button>
                                    <Button variant="outline" onClick={() => handleToastDemo('error')}>
                                        Error Toast
                                    </Button>
                                    <Button variant="outline" onClick={() => handleToastDemo('warning')}>
                                        Warning Toast
                                    </Button>
                                    <Button variant="outline" onClick={() => handleToastDemo('info')}>
                                        Info Toast
                                    </Button>
                                </div>
                            </div>

                            {/* Loading Demo */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Loading States</h3>
                                <div className="flex items-center gap-4">
                                    <Button loading={loading} onClick={simulateLoading}>
                                        {loading ? 'Processing...' : 'Simulate Loading'}
                                    </Button>
                                    <Spinner size="sm" />
                                    <Spinner size="md" />
                                    <Spinner size="lg" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </section>

                {/* Color Palette */}
                <section className="space-y-6">
                    <Card>
                        <Card.Header>
                            <h2 className="text-2xl font-bold text-gray-900">Color Palette</h2>
                        </Card.Header>
                        <Card.Body className="space-y-6">
                            {/* Gold */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Gold</h3>
                                <div className="grid grid-cols-10 gap-2">
                                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                                        <div key={shade} className="space-y-1">
                                            <div className={`h-12 rounded bg-gold-${shade} border border-gray-200`} />
                                            <p className="text-xs text-center text-gray-500">{shade}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Semantic Colors */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Semantic Colors</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <div className="h-16 rounded bg-success border border-gray-200" />
                                        <p className="text-sm text-center font-medium">Success</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-16 rounded bg-error border border-gray-200" />
                                        <p className="text-sm text-center font-medium">Error</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-16 rounded bg-warning border border-gray-200" />
                                        <p className="text-sm text-center font-medium">Warning</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-16 rounded bg-info border border-gray-200" />
                                        <p className="text-sm text-center font-medium">Info</p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </section>
            </div>

            {/* Demo Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
                description="This is a demo modal with all features"
                size="md"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        This modal demonstrates the focus trap, keyboard navigation (try pressing Tab and Escape),
                        and smooth animations.
                    </p>

                    <Input
                        label="Your Name"
                        placeholder="Enter your name"
                    />

                    <Textarea
                        label="Message"
                        placeholder="Type a message..."
                        rows={3}
                    />
                </div>

                <Modal.Footer>
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        setIsModalOpen(false);
                        success('Modal action completed!');
                    }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Toast Container */}
            <ToastContainer
                toasts={toasts}
                onClose={removeToast}
                position="top-right"
            />
        </div>
    );
};

export default DesignSystemShowcase;
