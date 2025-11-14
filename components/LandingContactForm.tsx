import React, { useState } from 'react';

interface LandingContactFormProps {
  formTitle: string;
  ctaButtonText: string;
  reassuranceText: string;
  avatarType: 'alex_anxieux' | 'sophie_sage' | 'martin_prevoyant';
  webhookTitle: string;
}

const LandingContactForm: React.FC<LandingContactFormProps> = ({ formTitle, ctaButtonText, reassuranceText, avatarType, webhookTitle }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Les deux champs sont requis.');
      return;
    }
    setError('');

    const webhookUrl = "/api/submit-form";
    
    const messageBody = `*${webhookTitle}*

*Nom:* ${name}
*Téléphone:* ${phone}

*<https://www.google.com/search?q=${phone.replace(/\s/g, '')}|Recherche Google du numéro>*
Appelez-le MAINTENANT.
    `.trim();

    const payload = { text: messageBody };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status ${response.status}`);
      }
      
      // Redirect to thank you page with avatar type
      window.location.href = `/merci?avatar=${avatarType}`;

    } catch (err) {
      console.error('Failed to submit form to webhook:', err);
      setError('Une erreur est survenue. Veuillez nous appeler directement.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl border border-slate-700">
      <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-6">{formTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="landing-name" className="sr-only">Prénom</label>
          <input 
            type="text" 
            id="landing-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Prénom"
            className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <label htmlFor="landing-phone" className="sr-only">Téléphone (Requis)</label>
          <input 
            type="tel" 
            id="landing-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Téléphone (Requis)"
            required
            className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div>
          <button type="submit" className="w-full bg-orange-500 text-slate-900 font-bold py-4 px-6 rounded-md hover:bg-orange-400 transition duration-300 text-xl shadow-lg hover:shadow-orange-500/40 transform hover:scale-105">
            {ctaButtonText}
          </button>
        </div>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">{reassuranceText}</p>
      </form>
    </div>
  );
};

export default LandingContactForm;
