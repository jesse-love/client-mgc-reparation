import React from 'react';
import { NAV_LINKS } from '../i18n';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { name, address, phone, googleMapsUrl, operatingHours, isLoading } = useBusinessInfo();

  return (
    <footer className="bg-brand-dark text-slate-300">
      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
             <a href="/" className="text-3xl font-bold font-oswald tracking-wider text-white">MGC<span className="text-orange-500"> RÉPARATION</span></a>
            <p className="text-slate-400">
              {t.footer.about}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-oswald font-bold uppercase tracking-wider text-orange-500">{t.footer.contactUs}</h3>
            {isLoading ? Array.from({length: 3}).map((_, i) => <div key={i} className="h-6 bg-slate-800 rounded w-3/4 animate-pulse"></div>) :
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mt-1 mr-4 flex-shrink-0 text-orange-500" />
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">{address}</a>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 mt-1 mr-4 text-orange-500" />
                <a href={`tel:${phone}`} className="hover:text-orange-400 transition-colors">{phone}</a>
              </li>
               <li className="flex items-start">
                <EnvelopeIcon className="h-5 w-5 mt-1 mr-4 text-orange-500" />
                <a href={`mailto:info@mgcreparation.ca`} className="hover:text-orange-400 transition-colors">info@mgcreparation.ca</a>
              </li>
            </ul>
            }
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-oswald font-bold uppercase tracking-wider text-orange-500">{t.footer.operatingHours}</h3>
             {isLoading ? Array.from({length: 5}).map((_, i) => <div key={i} className="h-5 bg-slate-800 rounded w-1/2 animate-pulse my-2"></div>) :
            <ul className="space-y-2 text-slate-300">
              {operatingHours.map((line, index) => (
                <li key={index}>{line[language]}</li>
              ))}
            </ul>
            }
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-oswald font-bold uppercase tracking-wider text-orange-500">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name.en}>
                  <a href={link.href} className="text-slate-300 hover:text-orange-400 transition-colors">{link.name[language]}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {name}. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;