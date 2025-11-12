
import type { Service, Testimonial, NavLink, BilingualText } from './types';
import { WrenchScrewdriverIcon, TruckIcon, CogIcon, FireIcon, BoltIcon, SunIcon } from '@heroicons/react/24/outline';

export const CONTACT_INFO = {
  name: "MGC Réparation Inc.",
  phone: "(514) 609-4141",
  phoneHref: "tel:514-609-4141",
  address: "1287 Chemin de la Côte Georges, Mascouche, QC J7K 3C2",
  email: "info@mgcreparation.com",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=MGC+Réparation+Inc.+1287+Chemin+de+la+Côte+Georges,+Mascouche,+QC+J7K+3C2"
};

export const OPERATING_HOURS = {
  title: {
    en: "Operating Hours",
    fr: "Heures d'Ouverture"
  },
  hours: [
    { en: "Mon-Thurs: 7:30 AM - 4:00 PM", fr: "Lun-Jeu: 7h30 - 16h00" },
    { en: "Fri: 7:30 AM - 12:00 PM", fr: "Ven: 7h30 - 12h00" },
    { en: "Sat-Sun: Closed", fr: "Sam-Dim: Fermé" }
  ]
};

export const NAV_LINKS: NavLink[] = [
  { name: { en: 'Home', fr: 'Accueil' }, href: '/' },
  { 
    name: { en: 'Services', fr: 'Services' }, 
    href: '/services',
    subLinks: [
      { name: { en: 'General Mechanics', fr: 'Mécanique Générale' }, href: '/services/general-mechanics' },
      { name: { en: 'Air Conditioning', fr: 'Air Climatisé' }, href: '/services/ac-service' },
      { name: { en: 'Heavy Vehicle Mechanics', fr: 'Mécanique de Véhicules Lourds' }, href: '/services/heavy-vehicle-mechanics' },
      { name: { en: 'Trailer Repair', fr: 'Réparation de Remorque' }, href: '/services/trailer-repair' },
      { name: { en: 'Generator Services', fr: 'Service de Génératrice' }, href: '/services/generator-services' },
      { name: { en: 'Welding & Assembly', fr: 'Soudure & Assemblage' }, href: '/services/welding-assembly' },
    ]
  },
  { name: { en: 'About Us', fr: 'À Propos' }, href: '/about' },
  { name: { en: 'Contact', fr: 'Contact' }, href: '/contact' },
];

export const services: Service[] = [
  {
    slug: 'general-mechanics',
    title: { en: 'General Mechanics', fr: 'Mécanique Générale' },
    shortDescription: { en: 'Expert diagnostics, maintenance, and repairs for all makes and models.', fr: 'Diagnostics experts, entretien et réparations pour toutes les marques et modèles de chars.' },
    icon: WrenchScrewdriverIcon,
    metaDescription: { en: "Comprehensive general mechanics in Mascouche. MGC Réparation Inc. offers oil changes, brake repair, diagnostics, and tune-ups for all vehicles.", fr: "Mécanique générale complète à Mascouche. MGC Réparation Inc. offre changements d'huile, réparation de freins, diagnostics et mises au point pour tous les véhicules." },
    headline: { en: "Complete General Mechanics for All Vehicles", fr: "Mécanique Générale Complète pour tous les Véhicules" },
    subHeadline: { en: "From Routine Maintenance to Complex Repairs, We Keep Your Car Running Smoothly and Safely.", fr: "De l'entretien de routine aux réparations complexes, on s'assure que votre char roule comme un neuf." },
    pageContent: { en: "At MGC Réparation Inc., we are your one-stop shop for all general mechanic needs in Mascouche. Our certified technicians have the expertise and state-of-the-art diagnostic equipment to handle everything from a simple oil change to complex engine repairs. We believe in preventative maintenance to save you time and money, ensuring your vehicle remains reliable for years to come.", fr: "Chez MGC Réparation Inc., on est votre place de confiance pour tous vos besoins en mécanique générale à Mascouche. Nos techniciens certifiés ont l'expertise et l'équipement de diagnostic à la fine pointe pour s'occuper de tout, d'un simple changement d'huile à des réparations de moteur complexes. On croit à l'entretien préventif pour vous faire sauver du temps et de l'argent, en s'assurant que votre véhicule reste fiable pour des années." },
    servicePoints: [
      { en: "Oil Changes & Tune-ups", fr: "Changements d'huile & Mises au point" },
      { en: "Brake Repair & Replacement", fr: "Réparation & Remplacement des freins" },
      { en: "Steering & Suspension Service", fr: "Service de direction & suspension" },
      { en: "Exhaust System Repairs", fr: "Réparation du système d'échappement" },
      { en: "Tire Services (Rotation, Balancing, Repair)", fr: "Services de pneus (Rotation, Balancement, Réparation)" },
      { en: "Battery & Electrical System Diagnostics", fr: "Diagnostics de batterie & système électrique" },
      { en: "Pre-purchase Inspections", fr: "Inspections avant achat" }
    ],
    whyChoosePoints: [
        { title: { en: 'All Makes & Models', fr: 'Toutes Marques & Modèles' }, description: { en: 'Our team is experienced with a wide variety of domestic and imported vehicles.', fr: 'Notre gang a de l\'expérience avec une grande variété de véhicules domestiques et importés.' } },
        { title: { en: 'Transparent Diagnostics', fr: 'Diagnostics Transparents' }, description: { en: 'We explain the issues clearly and provide upfront estimates before any work begins.', fr: 'On vous explique les problèmes clairement et on vous donne une soumission avant de commencer l\'ouvrage.' } },
        { title: { en: 'Quality Parts', fr: 'Pièces de Qualité' }, description: { en: 'We use high-quality parts to ensure durable and reliable repairs.', fr: 'On utilise des pièces de haute qualité pour garantir des réparations qui durent.' } },
    ]
  },
  {
    slug: 'ac-service',
    title: { en: 'Air Conditioning', fr: 'Air Climatisé' },
    shortDescription: { en: 'Stay cool with our complete AC inspection, repair, and recharge services.', fr: 'Restez au frais avec nos services complets d\'inspection, réparation et recharge d\'AC.' },
    icon: SunIcon,
    metaDescription: { en: "Professional auto AC repair and recharge services in Mascouche. MGC Réparation Inc. handles leak detection, component replacement, and diagnostics.", fr: "Services professionnels de réparation et recharge d'air climatisé à Mascouche. MGC Réparation Inc. s'occupe de la détection de fuites, du remplacement de composantes et des diagnostics." },
    headline: { en: "Expert Air Conditioning Services", fr: "Services Experts en Air Climatisé" },
    subHeadline: { en: "Reliable AC Diagnostics, Recharge, and Repair to Keep You Comfortable on the Road.", fr: "Diagnostics, recharge et réparation d'AC fiables pour que vous soyez confortable sur la route." },
    pageContent: { en: "A functioning air conditioning system is essential for comfort during Quebec's warmer months. At MGC Réparation Inc., we offer comprehensive AC services to ensure your system is running efficiently and effectively. Whether you need a simple recharge or have a complex leak, our technicians can diagnose and fix the problem quickly.", fr: "Un système d'air climatisé qui fonctionne bien, c'est essentiel pour le confort durant les mois chauds du Québec. Chez MGC Réparation Inc., on offre des services complets d'AC pour s'assurer que votre système roule efficacement. Que vous ayez besoin d'une simple recharge ou d'une fuite compliquée, nos mécanos peuvent diagnostiquer et arranger le problème rapidement." },
    servicePoints: [
      { en: "AC System Diagnostics", fr: "Diagnostics du système d'AC" },
      { en: "Refrigerant Recharge (R134a & R1234yf)", fr: "Recharge de réfrigérant (R134a & R1234yf)" },
      { en: "Leak Detection and Repair", fr: "Détection et réparation de fuites" },
      { en: "Compressor & Condenser Replacement", fr: "Remplacement du compresseur & condenseur" },
      { en: "Evaporator & Blower Motor Service", fr: "Service de l'évaporateur & moteur de ventilation" },
      { en: "Full AC System Flush", fr: "Nettoyage complet du système d'AC" }
    ],
    whyChoosePoints: [
        { title: { en: 'Certified Technicians', fr: 'Techniciens Certifiés' }, description: { en: 'Our technicians are certified to handle modern automotive AC systems and refrigerants.', fr: 'Nos techniciens sont certifiés pour s\'occuper des systèmes d\'AC automobiles modernes et des réfrigérants.' } },
        { title: { en: 'Advanced Equipment', fr: 'Équipement de Pointe' }, description: { en: 'We use specialized equipment for accurate leak detection and efficient servicing.', fr: 'On utilise de l\'équipement spécialisé pour une détection de fuites précise et un service efficace.' } },
        { title: { en: 'Cost-Effective Solutions', fr: 'Solutions Économiques' }, description: { en: 'We focus on repairing components whenever possible to save you money.', fr: 'On se concentre sur la réparation des composantes lorsque c\'est possible pour vous faire économiser.' } },
    ]
  },
  {
    slug: 'heavy-vehicle-mechanics',
    title: { en: 'Heavy Vehicle Mechanics', fr: 'Mécanique de Véhicules Lourds' },
    shortDescription: { en: 'Dedicated service for trucks, buses, and commercial fleets to minimize downtime.', fr: 'Service dédié pour les camions, autobus et flottes commerciales pour minimiser les temps d\'arrêt.' },
    icon: TruckIcon,
    metaDescription: { en: "Expert heavy vehicle mechanics in Mascouche. MGC Réparation Inc. offers specialized repair, maintenance, and diagnostics for trucks, diesel engines, and commercial fleets. Get a quote!", fr: "Mécanos experts en véhicules lourds à Mascouche. MGC Réparation Inc. offre des réparations spécialisées, de l'entretien et des diagnostics pour les camions, moteurs diesel et flottes commerciales. Demandez une soumission!" },
    headline: { en: "Expert Heavy Vehicle Mechanics in Mascouche: Keeping Your Fleet On The Road", fr: "Mécanos Experts en Véhicules Lourds à Mascouche: On Garde Votre Flotte sur la Route" },
    subHeadline: { en: "Specialized Diagnostics, Repair, and Maintenance for Trucks, Buses, and Commercial Equipment by Trusted Professionals.", fr: "Diagnostics, réparations et entretien spécialisés pour camions, autobus et équipements commerciaux par des pros de confiance." },
    pageContent: { en: "For businesses and operators in Mascouche and beyond, a reliable heavy vehicle fleet is critical. At MGC Réparation Inc., we understand the immense demands placed on heavy trucks, commercial vehicles, and diesel engines. Our dedicated heavy vehicle mechanics department is equipped with the specialized tools, advanced diagnostic technology, and deep expertise required to keep your operations running smoothly and efficiently.", fr: "Pour les entreprises et les opérateurs à Mascouche et les environs, une flotte de véhicules lourds fiable est cruciale. Chez MGC Réparation Inc., on comprend la grosse demande placée sur les camions lourds, les véhicules commerciaux et les moteurs diesel. Notre département de mécanique de véhicules lourds est équipé avec les outils spécialisés, la technologie de diagnostic avancée et l'expertise nécessaire pour que vos opérations roulent sans problème." },
    servicePoints: [
      { en: "Advanced Diesel Engine Diagnostics & Repair", fr: "Diagnostics & réparation de moteurs diesel avancés" },
      { en: "Brake System Maintenance & Repair (Air & Hydraulic)", fr: "Entretien & réparation du système de freinage (Air & Hydraulique)" },
      { en: "Transmission & Drivetrain Services", fr: "Services de transmission & groupe motopropulseur" },
      { en: "Suspension & Steering Systems (Heavy Duty)", fr: "Systèmes de suspension & direction (Heavy Duty)" },
      { en: "Electrical System Troubleshooting", fr: "Dépannage du système électrique" },
      { en: "Preventative Maintenance Programs", fr: "Programmes d'entretien préventif" },
      { en: "Provincial Safety Inspections (SAAQ)", fr: "Inspections de sécurité provinciales (SAAQ)" },
    ],
    whyChoosePoints: [
        { title: { en: 'Specialized Expertise', fr: 'Expertise Spécialisée' }, description: { en: 'Our technicians are highly trained and experienced specifically in heavy vehicle mechanics, not just cars.', fr: 'Nos techniciens sont formés et expérimentés spécifiquement en mécanique de véhicules lourds, pas juste les chars.' } },
        { title: { en: 'Reduced Downtime', fr: 'Temps d\'Arrêt Réduit' }, description: { en: 'We work efficiently to get your valuable assets back in service faster.', fr: 'On travaille efficacement pour remettre vos précieux camions en service plus vite.' } },
        { title: { en: 'Local Mascouche Partner', fr: 'Partenaire Local de Mascouche' }, description: { en: 'We\'re a family-owned business deeply committed to supporting local businesses.', fr: 'On est une business familiale engagée à soutenir les entreprises locales.' } },
    ]
  },
   {
    slug: 'trailer-repair',
    title: { en: 'Trailer Repair', fr: 'Réparation de Remorque' },
    shortDescription: { en: 'Reliable repair and maintenance for utility, commercial, and RV trailers.', fr: 'Réparation et entretien fiables pour les remorques utilitaires, commerciales et de VR.' },
    icon: CogIcon,
    metaDescription: { en: "Complete trailer repair services in Mascouche. From utility trailers to commercial fleets, we handle axles, wiring, brakes, and structural repairs.", fr: "Services complets de réparation de remorques à Mascouche. Des remorques utilitaires aux flottes commerciales, on s'occupe des essieux, du filage, des freins et des réparations structurales." },
    headline: { en: "Comprehensive Trailer Repair & Maintenance", fr: "Réparation & Entretien Complets de Remorques" },
    subHeadline: { en: "Ensuring Your Trailers Are Safe, Roadworthy, and Ready for the Haul.", fr: "On s'assure que vos remorques sont sécuritaires, légales et prêtes pour la route." },
    pageContent: { en: "A well-maintained trailer is crucial for safety and efficiency. MGC Réparation Inc. provides a full range of repair and maintenance services for all types of trailers. From wiring issues to axle replacements, our skilled technicians will ensure your equipment is in top condition.", fr: "Une remorque bien entretenue est cruciale pour la sécurité et l'efficacité. MGC Réparation Inc. fournit une gamme complète de services de réparation et d'entretien pour tous les types de remorques. Des problèmes de filage aux remplacements d'essieux, nos techniciens qualifiés s'assureront que votre équipement est en parfaite condition." },
    servicePoints: [
      { en: "Axle Repair & Replacement", fr: "Réparation & remplacement d'essieux" },
      { en: "Braking System Service (Electric & Hydraulic)", fr: "Service du système de freinage (Électrique & Hydraulique)" },
      { en: "Wiring, Lighting & Electrical Diagnostics", fr: "Filage, éclairage & diagnostics électriques" },
      { en: "Suspension Repair (Leaf Spring & Torsion)", fr: "Réparation de la suspension (à lames & à torsion)" },
      { en: "Wheel Bearing & Hub Service", fr: "Service des roulements de roue & moyeux" },
      { en: "Structural Welding & Frame Repair", fr: "Soudure structurale & réparation de châssis" }
    ],
    whyChoosePoints: [
        { title: { en: 'All Trailer Types', fr: 'Tous les Types de Remorques' }, description: { en: 'We service everything from small utility trailers to large commercial flatbeds and RVs.', fr: 'On s\'occupe de tout, des petites remorques utilitaires aux grands flatbeds commerciaux et VR.' } },
        { title: { en: 'Safety Focused', fr: 'Axé sur la Sécurité' }, description: { en: 'Our primary goal is to ensure your trailer is safe and compliant with all regulations.', fr: 'Notre but principal est de s\'assurer que votre remorque est sécuritaire et conforme à toutes les réglementations.' } },
        { title: { en: 'Durable Repairs', fr: 'Réparations Durables' }, description: { en: 'We use quality parts and expert techniques for repairs that last.', fr: 'On utilise des pièces de qualité et des techniques expertes pour des réparations qui durent longtemps.' } },
    ]
  },
  {
    slug: 'generator-services',
    title: { en: 'Generator Services', fr: 'Service de Génératrice' },
    shortDescription: { en: 'Keep your power on with expert maintenance and repair for all generator types.', fr: 'Gardez le courant avec notre service expert d\'entretien et de réparation pour tous les types de génératrices.' },
    icon: BoltIcon,
    metaDescription: { en: "Reliable generator repair and maintenance in Mascouche for residential, commercial, and portable units. MGC Réparation keeps your power on.", fr: "Réparation et entretien fiables de génératrices à Mascouche pour unités résidentielles, commerciales et portables. MGC Réparation vous assure de ne jamais manquer de courant." },
    headline: { en: "Dependable Generator Services", fr: "Services Fiables de Génératrices" },
    subHeadline: { en: "Expert Maintenance and Repair to Ensure You're Never Left in the Dark.", fr: "Entretien et réparation experts pour s'assurer que vous ne soyez jamais dans le noir." },
    pageContent: { en: "Whether for your home or business, a reliable generator is a critical asset. MGC Réparation Inc. offers expert diagnostic, repair, and preventative maintenance services for residential, commercial, and portable generators to ensure they are ready when you need them most.", fr: "Que ce soit pour votre maison ou votre entreprise, une génératrice fiable est un atout essentiel. MGC Réparation Inc. offre des services experts de diagnostic, de réparation et d'entretien préventif pour les génératrices résidentielles, commerciales et portables pour s'assurer qu'elles sont prêtes quand vous en avez le plus besoin." },
    servicePoints: [
      { en: "Preventative Maintenance & Tune-ups", fr: "Entretien préventif & Mises au point" },
      { en: "Engine & Electrical Diagnostics", fr: "Diagnostics du moteur & électriques" },
      { en: "Load Bank Testing", fr: "Test de banc de charge" },
      { en: "Fuel System Cleaning & Repair", fr: "Nettoyage & réparation du système de carburant" },
      { en: "Transfer Switch Inspection & Service", fr: "Inspection & service du commutateur de transfert" },
      { en: "Portable Generator Repair", fr: "Réparation de génératrice portable" }
    ],
    whyChoosePoints: [
        { title: { en: 'Peace of Mind', fr: 'Tranquillité d\'Esprit' }, description: { en: 'Regular maintenance ensures your generator will start and run properly during an outage.', fr: 'Un entretien régulier assure que votre génératrice démarrera et fonctionnera correctement lors d\'une panne.' } },
        { title: { en: 'All Major Brands', fr: 'Toutes les Grandes Marques' }, description: { en: 'Our technicians are experienced with a wide range of generator makes and models.', fr: 'Nos techniciens ont de l\'expérience avec une large gamme de marques et modèles de génératrices.' } },
        { title: { en: 'Mobile Service Available', fr: 'Service Mobile Disponible' }, description: { en: 'We can come to you for maintenance and diagnostics on stationary units.', fr: 'On peut se déplacer chez vous pour l\'entretien et les diagnostics sur les unités fixes.' } },
    ]
  },
  {
    slug: 'welding-assembly',
    title: { en: 'Welding & Assembly', fr: 'Soudure & Assemblage' },
    shortDescription: { en: 'Precision welding and custom fabrication for automotive and equipment needs.', fr: 'Soudure de précision et fabrication sur mesure pour les besoins automobiles et d\'équipement.' },
    icon: FireIcon,
    metaDescription: { en: "Expert welding and assembly services in Mascouche. MGC Réparation Inc. offers custom fabrication, frame repair, and structural welding for vehicles and equipment.", fr: "Services experts de soudure et d'assemblage à Mascouche. MGC Réparation Inc. offre la fabrication sur mesure, la réparation de châssis et la soudure structurale pour véhicules et équipements." },
    headline: { en: "Precision Welding & Custom Assembly", fr: "Soudure de Précision & Assemblage sur Mesure" },
    subHeadline: { en: "From Frame Repairs to Custom Fabrications, We Provide Strong and Durable Solutions.", fr: "Des réparations de châssis aux fabrications sur mesure, on fournit des solutions solides et durables." },
    pageContent: { en: "MGC Réparation Inc. offers specialized welding and assembly services that go beyond typical auto repair. Our skilled welders can handle a variety of materials and projects, providing strong, reliable solutions for vehicles and equipment.", fr: "MGC Réparation Inc. offre des services spécialisés de soudure et d'assemblage qui vont au-delà de la réparation automobile typique. Nos soudeurs qualifiés peuvent travailler avec une variété de matériaux et de projets, fournissant des solutions solides et fiables pour les véhicules et l'équipement." },
    servicePoints: [
      { en: "Vehicle Frame & Chassis Repair", fr: "Réparation de cadre & châssis de véhicule" },
      { en: "Custom Exhaust System Welding", fr: "Soudure de système d'échappement sur mesure" },
      { en: "Trailer Structural Repair & Reinforcement", fr: "Réparation & renforcement structurel de remorque" },
      { en: "Heavy Equipment Component Repair", fr: "Réparation de composantes d'équipement lourd" },
      { en: "Custom Bracket & Mount Fabrication", fr: "Fabrication de supports & fixations sur mesure" },
      { en: "MIG & Stick Welding Services", fr: "Services de soudure MIG & à l'arc" }
    ],
    whyChoosePoints: [
        { title: { en: 'Skilled Welders', fr: 'Soudeurs Qualifiés' }, description: { en: 'Our certified welders have the expertise to deliver high-quality, durable welds.', fr: 'Nos soudeurs certifiés ont l\'expertise pour livrer des soudures de haute qualité et durables.' } },
        { title: { en: 'Problem Solvers', fr: 'Solutionneurs de Problèmes' }, description: { en: 'We can create custom solutions for unique repair and fabrication challenges.', fr: 'On peut créer des solutions sur mesure pour des défis de réparation et de fabrication uniques.' } },
        // FIX: The single quote in "l'intégrité" was breaking the string. Changed outer quotes to double quotes to fix it.
        { title: { en: 'Strength & Safety', fr: 'Solidité & Sécurité' }, description: { en: 'We prioritize structural integrity and safety in all our welding work.', fr: "On priorise l'intégrité structurale et la sécurité dans tous nos travaux de soudure." } },
    ]
  },
];

export const testimonials: Testimonial[] = [
  { quote: { en: "MGC Réparation fixed my truck's generator quickly and professionally. Highly recommend for any heavy vehicle work!", fr: "MGC Réparation a arrangé la génératrice de mon camion rapidement et professionnellement. Je les recommande fortement pour toute job de véhicule lourd!" }, name: 'Jean-Luc P.' },
  { quote: { en: "Always reliable for my car's maintenance. Trustworthy and honest mechanics right here in Mascouche. I won't go anywhere else.", fr: "Toujours fiables pour l'entretien de mon char. Des mécanos de confiance et honnêtes, ici même à Mascouche. J'irai jamais ailleurs." }, name: 'Sophie L.' },
  { quote: { en: "Finding a heavy vehicle mechanic who truly understands the work is tough. MGC exceeded expectations. Great service and fair pricing.", fr: "Trouver un mécano de véhicules lourds qui connaît vraiment son affaire, c'est rare. MGC a dépassé mes attentes. Super service et prix justes." }, name: 'Marc D.' },
  { quote: { en: "They handled the AC repair on my SUV perfectly. It's colder than when it was new! Very friendly staff.", fr: "Ils ont réparé l'AC de mon VUS perfectly. Il fait plus frette que quand il était neuf! Le personnel est vraiment sympathique." }, name: 'Chantal B.' },
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: { en: "Family-Owned & Community Focused", fr: "Entreprise Familiale Axée sur la Communauté" },
    description: { en: "We're a local, family-run business rooted in Mascouche, committed to providing honest advice and exceptional service.", fr: "On est une business locale et familiale de Mascouche, engagée à donner des conseils honnêtes et un service exceptionnel." },
    icon: 'UsersIcon'
  },
  {
    title: { en: "Trusted Expertise Since 2012", fr: "Expertise de Confiance Depuis 2012" },
    description: { en: "With over a decade of experience, we've built a strong reputation for reliable, professional, and high-quality mechanical solutions.", fr: "Avec plus de 10 ans d'expérience, on s'est bâti une solide réputation pour des solutions mécaniques fiables, professionnelles et de top qualité." },
    icon: 'ShieldCheckIcon'
  },
  {
    title: { en: "Specialized Solutions for Every Need", fr: "Solutions Spécialisées pour Tous les Besoins" },
    description: { en: "From daily drivers to heavy vehicles, trailers, and generators, our certified technicians offer a comprehensive range of services.", fr: "Des chars de tous les jours aux véhicules lourds, remorques et génératrices, nos techniciens certifiés offrent une gamme complète de services." },
    icon: 'WrenchScrewdriverIcon'
  },
  {
    title: { en: "Complete Care, Peace of Mind Guaranteed", fr: "Soin Complet, Tranquillité d'Esprit Garantie" },
    description: { en: "We handle everything with meticulous attention to detail, getting you back on the road with confidence.", fr: "On s'occupe de tout avec une attention méticuleuse aux détails, pour que vous retourniez sur la route en toute confiance." },
    icon: 'HeartIcon'
  },
];

const en = {
  header: {
    bookService: 'Book Service',
    allServices: 'All Services'
  },
  footer: {
    about: 'Your trusted, family-owned auto and heavy vehicle experts in Mascouche, QC since 2012.',
    contactUs: 'Contact Us',
    quickLinks: 'Quick Links',
    rights: 'All Rights Reserved.'
  },
  home: {
    hero: {
      title1: 'Your Road-Ready Partner in',
      title2: 'Mascouche',
      subtitle: 'Since 2012, our family-owned shop has kept Mascouche moving with expert general and specialized mechanical services, where honesty and precision drive every repair.',
      ctaBook: 'Book Your Service Now',
      ctaCall: 'Call Us:'
    },
    services: {
      title: 'Our Comprehensive Services',
      subtitle: 'From routine maintenance to specialized repairs, we are equipped to handle all your vehicle and equipment needs.',
      learnMore: 'Learn More'
    },
    whyUs: {
      title: 'Why Mascouche Drivers Trust MGC Réparation Inc.',
      subtitle: 'We’re more than just mechanics; we’re your neighbors dedicated to ensuring the safety and performance of your vehicles and equipment in Mascouche.'
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Rated 4.8 Stars on Google by 43+ Customers!'
    },
    contactMap: {
      title: 'Book an Appointment & Visit Us',
      visitTitle: 'Visit Our Shop',
      visitSubtitle: 'We\'re ready to serve you.',
      cta: 'Get Directions'
    }
  },
  breadcrumbs: {
    home: 'Home',
    about: 'About Us',
    contact: 'Contact',
    services: 'Services'
  },
  about: {
    title: 'A Family Legacy of Trust & Mechanical Excellence',
    subtitle: 'Serving Mascouche Since 2012 with Integrity, Expertise, and a Passion for Vehicles.',
    p1: 'Welcome to MGC Réparation Inc., where mechanical expertise meets genuine family values. Founded in 2012 by Maxime Caron, our shop at 1287 Chemin de la Côte Georges has proudly served the Mascouche community for over a decade.',
    p2: 'Maxime envisioned a repair center built on honesty, precision, and an unwavering commitment to customer satisfaction. Starting with a passion for cars and a dedication to mastering complex mechanical challenges, he grew MGC Réparation into the trusted establishment it is today. As a family-owned business, we understand the importance of reliability – whether it\'s for your daily commute, your commercial fleet, or critical power generators. We treat every vehicle and piece of equipment as if it were our own, ensuring meticulous attention to detail and lasting solutions.',
    p3: 'Our team, handpicked for their skill and integrity, shares Maxime’s vision. We’re not just mechanics; we’re problem-solvers who take pride in diagnosing intricate issues and delivering efficient, professional repairs. We believe in transparent communication, providing clear explanations and fair estimates before any work begins.',
    p4: 'Over the years, MGC Réparation Inc. has expanded its capabilities to include specialized services like heavy vehicle mechanics, trailer repair, generator maintenance, and expert welding and assembly. This growth reflects our continuous pursuit of excellence and our dedication to meeting the diverse needs of our clients in Mascouche and the surrounding regions.',
    p5: 'When you choose MGC Réparation Inc., you\'re choosing a partner dedicated to keeping you and your equipment moving forward safely and reliably. We look forward to welcoming you to our family.',
    cta: 'Contact Us for Service'
  },
  contact: {
    title: 'Get in Touch',
    subtitle: 'We\'re here to help. Schedule your service or ask a question below.',
    formTitle: 'Request a Free Quote',
    infoTitle: 'Contact Information',
    address: 'Address',
    phone: 'Phone',
    email: 'Email'
  },
  contactForm: {
    fullName: 'Full Name',
    phone: 'Phone Number',
    email: 'Email Address',
    contactMethod: 'Preferred Contact Method',
    phoneRadio: 'Phone',
    vehicleType: 'Vehicle/Equipment Type',
    vehicleOptions: ['Car', 'SUV', 'Light Truck', 'Heavy Truck', 'Trailer', 'Generator', 'Other'],
    vehicleDetails: 'Year, Make, Model',
    vehicleDetailsPlaceholder: 'e.g., 2018 Ford F-150',
    serviceNeeded: 'Service(s) Needed',
    description: 'Describe Your Issue/Service Request',
    descriptionPlaceholder: 'Please provide as much detail as possible...',
    appointmentDate: 'Preferred Appointment Date',
    appointmentDatePlaceholder: 'Select a date',
    appointmentTime: 'Preferred Time',
    appointmentTimePlaceholder: 'Select a time slot',
    selectDateFirst: 'Please select a date to see available times.',
    noSlotsAvailable: 'No appointments available on this day. Please select another.',
    submitButton: 'Get My Free Quote',
    success: {
      title: 'Thank You!',
      message: 'Your request has been sent successfully. We will contact you shortly.',
      button: 'Submit Another Request'
    }
  },
  services: {
    title: 'Our Mechanical Services',
    subtitle: 'At MGC Réparation Inc., we offer a full spectrum of mechanical services for your daily driver, heavy vehicles, trailers, and equipment.',
    viewDetails: 'View Details'
  },
  serviceDetail: {
    includesTitle: 'Our {service} Services Include:',
    whyTrustTitle: 'Why Trust MGC for {service}?',
    ctaTitle: 'Ready for Service?',
    ctaSubtitle: 'Let our experts take care of your vehicle. Get a reliable, transparent quote today.',
    ctaButton: 'Request a Quote'
  },
  quoteWizard: {
    brandTitle: 'Get a Precise Quote in Minutes',
    brandSubtitle: 'Our smart wizard guides you to the right service. Just a few clicks to book your appointment.',
    progress: 'Step {current} of {total}',
    steps: {
      1: {
        title: "What type of vehicle needs service?",
        options: {
          car: "Car / SUV / Light Truck",
          heavy: "Heavy Truck",
          trailer: "Trailer / Other Equipment"
        }
      },
      2: {
        title: "What kind of service do you need?",
        options: {
          maintenance: "Maintenance / Inspection",
          repair: "Specific Repair",
          diagnostics: "Diagnostics / Not Sure"
        }
      },
      3: {
        title: "Tell us about your needs & book a time.",
        descriptionPlaceholder: "Describe the issue or the service you need...",
        fullName: "Full Name",
        phone: "Phone",
        email: "Email"
      }
    },
    buttons: {
      next: "Next",
      back: "Back",
      submit: "Book My Appointment"
    },
    success: {
        title: "Appointment Request Sent!",
        message: "Thank you! We've received your request and will contact you shortly to confirm your booking.",
        button: "Start a New Request"
    }
  }
};

const fr: typeof en = {
  header: {
    bookService: 'Prendre RDV',
    allServices: 'Tous les services'
  },
  footer: {
    about: 'Vos experts de confiance pour l\'auto et les véhicules lourds à Mascouche, QC depuis 2012.',
    contactUs: 'Nous Contacter',
    quickLinks: 'Liens Rapides',
    rights: 'Tous droits réservés.'
  },
  home: {
    hero: {
      title1: 'Votre Partenaire de Confiance sur la Route à',
      title2: 'Mascouche',
      subtitle: 'Depuis 2012, notre garage familial fait rouler Mascouche avec des services de mécanique experts, où l\'honnêteté et la précision sont la base de chaque ouvrage.',
      ctaBook: 'Prenez votre rendez-vous',
      ctaCall: 'Appelez-nous:'
    },
    services: {
      title: 'Nos Services Complets',
      subtitle: 'De l\'entretien de routine aux réparations spécialisées, on est équipé pour s\'occuper de tous vos besoins de véhicules et d\'équipements.',
      learnMore: 'En savoir plus'
    },
    whyUs: {
      title: 'Pourquoi les Chauffeurs de Mascouche Font Confiance à MGC Réparation Inc.',
      subtitle: 'On est pas juste des mécanos; on est vos voisins, dédiés à assurer la sécurité et la performance de vos chars et équipements à Mascouche.'
    },
    testimonials: {
      title: 'Ce que nos Clients en Disent',
      subtitle: 'Noté 4.8 étoiles sur Google par plus de 43 clients!'
    },
    contactMap: {
      title: 'Prenez RDV et Visitez-Nous',
      visitTitle: 'Visitez notre Garage',
      visitSubtitle: 'On est prêt à vous servir.',
      cta: 'Obtenir l\'itinéraire'
    }
  },
  breadcrumbs: {
    home: 'Accueil',
    about: 'À Propos',
    contact: 'Contact',
    services: 'Services'
  },
  about: {
    title: 'Un Héritage Familial de Confiance & d\'Excellence Mécanique',
    subtitle: 'Au service de Mascouche depuis 2012 avec intégrité, expertise et passion pour les véhicules.',
    p1: 'Bienvenue chez MGC Réparation Inc., où l\'expertise mécanique rencontre de vraies valeurs familiales. Fondé en 2012 par Maxime Caron, notre garage au 1287 Chemin de la Côte Georges sert fièrement la communauté de Mascouche depuis plus d\'une décennie.',
    p2: 'Maxime a imaginé un centre de réparation bâti sur l\'honnêteté, la précision et un engagement inébranlable envers la satisfaction du client. Parti d\'une passion pour les chars et d\'une volonté de maîtriser des défis mécaniques complexes, il a fait de MGC Réparation l\'établissement de confiance qu\'il est aujourd\'hui. En tant qu\'entreprise familiale, on comprend l\'importance de la fiabilité – que ce soit pour votre trajet quotidien, votre flotte commerciale ou vos génératrices essentielles. On traite chaque véhicule et équipement comme si c\'était le nôtre, en garantissant une attention méticuleuse aux détails et des solutions durables.',
    p3: 'Notre équipe, choisie pour ses compétences et son intégrité, partage la vision de Maxime. On n\'est pas juste des mécanos; on est des solutionneurs de problèmes qui sont fiers de diagnostiquer des problèmes complexes et de livrer des réparations efficaces et professionnelles. On croit en la communication transparente, en fournissant des explications claires et des estimations justes avant de commencer le travail.',
    p4: 'Au fil des ans, MGC Réparation Inc. a élargi ses capacités pour inclure des services spécialisés comme la mécanique de véhicules lourds, la réparation de remorques, l\'entretien de génératrices, et la soudure et l\'assemblage experts. Cette croissance reflète notre quête continue de l\'excellence et notre dévouement à répondre aux divers besoins de nos clients à Mascouche et dans les régions avoisinantes.',
    p5: 'Quand vous choisissez MGC Réparation Inc., vous choisissez un partenaire dédié à vous garder, vous et votre équipement, en mouvement de manière sécuritaire et fiable. On a hâte de vous accueillir dans notre famille.',
    cta: 'Contactez-nous pour un service'
  },
  contact: {
    title: 'Contactez-nous',
    subtitle: 'On est là pour vous aider. Planifiez votre service ou posez une question ci-dessous.',
    formTitle: 'Demandez une soumission gratuite',
    infoTitle: 'Informations de Contact',
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'Courriel'
  },
  contactForm: {
    fullName: 'Nom Complet',
    phone: 'Numéro de téléphone',
    email: 'Adresse courriel',
    contactMethod: 'Méthode de contact préférée',
    phoneRadio: 'Téléphone',
    vehicleType: 'Type de véhicule/équipement',
    vehicleOptions: ['Voiture', 'VUS', 'Camion léger', 'Camion lourd', 'Remorque', 'Génératrice', 'Autre'],
    vehicleDetails: 'Année, Marque, Modèle',
    vehicleDetailsPlaceholder: 'ex: 2018 Ford F-150',
    serviceNeeded: 'Service(s) Requis',
    description: 'Décrivez le problème ou le service demandé',
    descriptionPlaceholder: 'Donnez-nous le plus de détails possible, s\'il vous plaît...',
    appointmentDate: 'Date de rendez-vous souhaitée',
    appointmentDatePlaceholder: 'Sélectionnez une date',
    appointmentTime: 'Heure souhaitée',
    appointmentTimePlaceholder: 'Sélectionnez un créneau horaire',
    selectDateFirst: 'Veuillez sélectionner une date pour voir les heures disponibles.',
    noSlotsAvailable: 'Aucun rendez-vous disponible ce jour-là. Veuillez en sélectionner un autre.',
    submitButton: 'Obtenir ma soumission gratuite',
    success: {
      title: 'Merci!',
      message: 'Votre demande a été envoyée avec succès. On vous contacte bientôt.',
      button: 'Faire une autre demande'
    }
  },
  services: {
    title: 'Nos Services de Mécanique',
    subtitle: 'Chez MGC Réparation Inc., on offre une gamme complète de services de mécanique pour votre char de tous les jours, vos véhicules lourds, remorques et équipements.',
    viewDetails: 'Voir les détails'
  },
  serviceDetail: {
    includesTitle: 'Nos services de {service} incluent:',
    whyTrustTitle: 'Pourquoi faire confiance à MGC pour {service}?',
    ctaTitle: 'Prêt pour un service?',
    ctaSubtitle: 'Laissez nos experts s\'occuper de votre véhicule. Obtenez une soumission fiable et transparente aujourd\'hui.',
    ctaButton: 'Demander une soumission'
  },
  quoteWizard: {
    brandTitle: 'Obtenez une soumission précise en quelques minutes',
    brandSubtitle: "Notre assistant intelligent vous guide vers le bon service. Quelques clics suffisent pour prendre votre rendez-vous.",
    progress: 'Étape {current} sur {total}',
    steps: {
        1: {
            title: "Quel type de véhicule a besoin d'un service?",
            options: {
                car: "Voiture / VUS / Camion léger",
                heavy: "Camion lourd",
                trailer: "Remorque / Autre équipement"
            }
        },
        2: {
            title: "Quel genre de service avez-vous besoin?",
            options: {
                maintenance: "Entretien / Inspection",
                repair: "Réparation spécifique",
                diagnostics: "Diagnostic / Je ne suis pas sûr"
            }
        },
        3: {
            title: "Parlez-nous de vos besoins et réservez une heure.",
            descriptionPlaceholder: "Décrivez le problème ou le service dont vous avez besoin...",
            fullName: "Nom complet",
            phone: "Téléphone",
            email: "Courriel"
        }
    },
    buttons: {
        next: "Suivant",
        back: "Retour",
        submit: "Réserver mon rendez-vous"
    },
    success: {
        title: "Demande de rendez-vous envoyée!",
        message: "Merci! Nous avons bien reçu votre demande et nous vous contacterons sous peu pour confirmer votre réservation.",
        button: "Commencer une nouvelle demande"
    }
  }
};

export const translations = { en, fr };
