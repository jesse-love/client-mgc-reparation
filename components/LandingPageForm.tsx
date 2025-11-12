import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LandingPageFormProps {
    avatar: 'alex' | 'sophie' | 'martin';
}

const LandingPageForm: React.FC<LandingPageFormProps> = ({ avatar }) => {
    const { language, t } = useLanguage();
    const [formData, setFormData] = useState({ firstName: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const avatarConfig = {
        alex: {
            tag: 'ppl_lead_brakes_inspection',
            page: 'offre',
            formTexts: t.ppl.offre
        },
        sophie: {
            tag: 'ppl_lead_health_check',
            page: 'bilan',
            formTexts: t.ppl.bilan
        },
        martin: {
            tag: 'ppl_lead_seasonal',
            page: 'pneus',
            formTexts: t.ppl.pneus
        }
    };
    
    const config = avatarConfig[avatar];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAQA5dTsm5U/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=aCNAfav8FUhPPhQ0tMhrsE-6PCpIpxtyC3aor2E1UGA';
        
        const messageBody = `*New PPL Lead (${avatar.toUpperCase()})*

*Name:* ${formData.firstName}
*Phone:* ${formData.phone}
*Tag:* ${config.tag}
        `.trim();
        
        const payload = { text: messageBody };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Redirect on success
            window.location.href = `/merci?from=${config.page}`;

        } catch (err) {
            console.error('Failed to submit form:', err);
            setError('Submission failed. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-center text-brand-dark dark:text-white mb-4">{config.formTexts.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="sr-only">{config.formTexts.firstName}</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder={config.formTexts.firstName}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="sr-only">{config.formTexts.phone}</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={config.formTexts.phone}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-brand-dark font-extrabold py-4 px-6 rounded-md hover:bg-orange-600 transition duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : config.formTexts.ctaButton}
                </button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">{config.formTexts.reassurance}</p>
            </form>
        </div>
    );
};

export default LandingPageForm;
