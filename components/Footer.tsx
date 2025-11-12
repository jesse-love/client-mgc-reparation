
import React from 'react';
import { CONTACT_INFO, OPERATING_HOURS, NAV_LINKS } from '../i18n';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
             <a href="/" className="text-3xl font-black text-white">MGC<span className="text-orange-500"> Réparation</span></a>
            <p className="text-gray-400">
              {t.footer.about}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-500">{t.footer.contactUs}</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mt-1 mr-3 flex-shrink-0 text-orange-500" />
                <a href={CONTACT_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">{CONTACT_INFO.address}</a>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 text-orange-500" />
                <a href={CONTACT_INFO.phoneHref} className="hover:text-white">{CONTACT_INFO.phone}</a>
              </li>
               <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-3 text-orange-500" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">{CONTACT_INFO.email}</a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-500">{OPERATING_HOURS.title[language]}</h3>
            <ul className="space-y-1 text-gray-300">
              {OPERATING_HOURS.hours.map((line, index) => (
                <li key={index}>{line[language]}</li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-500">{t.footer.quickLinks}</h3>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.name.en}>
                  <a href={link.href} className="text-gray-300 hover:text-white">{link.name[language]}</a>
                  {link.subLinks && (
                    <ul className="pl-4 mt-1 space-y-1">
                      {link.subLinks.map(subLink => (
                        <li key={subLink.name.en}>
                          <a href={subLink.href} className="text-gray-400 hover:text-white text-sm">{subLink.name[language]}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {CONTACT_INFO.name}. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;