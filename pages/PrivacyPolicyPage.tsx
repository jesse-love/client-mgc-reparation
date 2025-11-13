import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SchemaManager from '../components/SchemaManager';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <SchemaManager pageType="Generic" />
      <div className="bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-2">
                <li>
                  <div className="flex items-center">
                    <a href="/" className="mr-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                      {t.breadcrumbs.home}
                    </a>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-slate-400 dark:text-slate-600"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
                <li>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.breadcrumbs.privacyPolicy}</span>
                </li>
              </ol>
            </nav>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
               <h1 className="text-5xl lg:text-6xl font-oswald font-bold text-slate-900 dark:text-white">
                Politique de Confidentialité
              </h1>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-CA')}
              </p>
            </div>
            <div className="mt-12 prose prose-lg lg:prose-xl max-w-none text-slate-700 dark:prose-invert dark:text-slate-300 space-y-6 leading-relaxed">
                <p>
                    Bienvenue sur MGCreparation.ca. Votre vie privée est importante pour nous. Cette politique de confidentialité explique comment MGC Réparation Inc. ("nous", "notre") recueille, utilise, divulgue et protège vos renseignements personnels lorsque vous utilisez notre site web.
                </p>

                <h2 className="font-oswald">1. Collecte des Renseignements Personnels</h2>
                <p>
                    Nous recueillons des renseignements personnels que vous nous fournissez volontairement lorsque vous remplissez un formulaire de contact, de demande de soumission ou de prise de rendez-vous sur notre site. Ces renseignements peuvent inclure :
                </p>
                <ul>
                    <li>Votre nom complet</li>
                    <li>Votre numéro de téléphone</li>
                    <li>Votre adresse courriel</li>
                    <li>Des informations sur votre véhicule (type, année, etc.)</li>
                    <li>La description du service dont vous avez besoin</li>
                    <li>Votre date et heure de rendez-vous souhaitées</li>
                </ul>

                <h2 className="font-oswald">2. Utilisation de vos Renseignements</h2>
                <p>
                    Les renseignements que nous recueillons sont utilisés exclusivement pour les finalités suivantes :
                </p>
                <ul>
                    <li>Pour répondre à vos demandes et vous fournir une soumission.</li>
                    <li>Pour planifier et confirmer votre rendez-vous.</li>
                    <li>Pour vous contacter concernant votre demande de service.</li>
                    <li>Pour améliorer la qualité de nos services et de notre site web.</li>
                </ul>

                <h2 className="font-oswald">3. Partage des Renseignements</h2>
                <p>
                    Nous ne vendons, n'échangeons ni ne transférons vos renseignements personnels identifiables à des tiers. Vos informations sont traitées de manière confidentielle et ne sont accessibles qu'à notre personnel autorisé dans le but de vous fournir le service demandé.
                </p>

                <h2 className="font-oswald">4. Sécurité des Données</h2>
                <p>
                    Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos renseignements personnels. La communication entre votre navigateur et notre site web est protégée par la technologie de cryptage SSL (Secure Socket Layer).
                </p>

                <h2 className="font-oswald">5. Témoins (Cookies) et Technologies de Suivi</h2>
                <p>
                    Notre site web utilise des témoins et d'autres technologies de suivi, telles que Google Tag Manager et Google Analytics, pour recueillir des informations non personnelles sur votre visite. Ces informations nous aident à analyser le trafic, à comprendre comment les utilisateurs interagissent avec notre site et à améliorer l'expérience utilisateur. Ces données sont agrégées et anonymes et ne permettent pas de vous identifier personnellement.
                </p>

                <h2 className="font-oswald">6. Vos Droits</h2>
                <p>
                    Conformément aux lois applicables, vous avez le droit d'accéder à vos renseignements personnels, de les corriger ou de demander leur suppression. Pour exercer ces droits, veuillez nous contacter aux coordonnées ci-dessous.
                </p>

                <h2 className="font-oswald">7. Modifications de la Politique de Confidentialité</h2>
                <p>
                    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page. Nous vous encourageons à consulter cette page régulièrement pour rester informé.
                </p>

                <h2 className="font-oswald">8. Contactez-nous</h2>
                <p>
                    Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse suivante :
                </p>
                <p>
                    MGC Réparation Inc.<br />
                    1287 Chem. de la Côte Georges, Mascouche, QC J7K 3C3<br />
                    info@mgcreparation.ca
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;