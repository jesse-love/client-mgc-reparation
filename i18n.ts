import type { Service, NavLink } from './types';
import { WrenchScrewdriverIcon, TruckIcon, CogIcon, FireIcon, BoltIcon, SunIcon } from '@heroicons/react/24/outline';

export const NAV_LINKS: NavLink[] = [
  { name: { en: 'HOME', fr: 'ACCUEIL' }, href: '/' },
  { 
    name: { en: 'SERVICES', fr: 'SERVICES' }, 
    href: '/services',
    subLinks: [
      { name: { en: 'GENERAL MECHANICS', fr: 'MÉCANIQUE GÉNÉRALE' }, href: '/services/general-mechanics' },
      { name: { en: 'AIR CONDITIONING', fr: 'AIR CLIMATISÉ' }, href: '/services/ac-service' },
      { name: { en: 'HEAVY VEHICLE MECHANICS', fr: 'MÉCANIQUE DE VÉHICULES LOURDS' }, href: '/services/heavy-vehicle-mechanics' },
      { name: { en: 'TRAILER REPAIR', fr: 'RÉPARATION DE REMORQUE' }, href: '/services/trailer-repair' },
      { name: { en: 'GENERATOR SERVICES', fr: 'SERVICE DE GÉNÉRATRICE' }, href: '/services/generator-services' },
      { name: { en: 'WELDING & ASSEMBLY', fr: 'SOUDURE & ASSEMBLAGE' }, href: '/services/welding-assembly' },
    ]
  },
  { name: { en: 'ABOUT US', fr: 'À PROPOS' }, href: '/about' },
  { name: { en: 'CONTACT', fr: 'CONTACT' }, href: '/contact' },
];

export const services: Service[] = [
  {
    slug: 'general-mechanics',
    title: { en: 'General Mechanics', fr: 'Mécanique Générale' },
    shortDescription: { en: 'Expert diagnostics, maintenance, and repairs for all makes and models.', fr: 'Diagnostics experts, entretien et réparations pour toutes les marques et modèles.' },
    icon: WrenchScrewdriverIcon,
    metaDescription: { en: "Comprehensive general mechanics in Mascouche: MGC Réparation Inc. offers expert oil changes, brake repair, diagnostic services, and vehicle tune-ups for all cars & light trucks. Book now!", fr: "Mécanique générale complète à Mascouche: MGC Réparation Inc. offre changements d'huile experts, réparation de freins, services de diagnostic et mises au point pour toutes autos & camions légers. Réservez maintenant!" },
    headline: { en: "Complete General Mechanics & Engine Diagnostics for All Vehicles in Mascouche", fr: "Mécanique Générale Complète & Diagnostic Moteur pour tous les Véhicules à Mascouche" },
    subHeadline: { en: "From Routine Maintenance (brakes, tires, oil changes) to Complex Repairs, We Keep Your Car Running Smoothly.", fr: "De l'entretien de routine (freins, pneus, changement d'huile) aux réparations complexes, on s'assure que votre auto roule perfectly." },
    pageContent: { en: "At MGC Réparation Inc., we are your one-stop shop for all general mechanic needs in Mascouche. Our certified technicians have the expertise and state-of-the-art diagnostic equipment to handle everything from a simple oil change to complex engine repairs. We believe in preventative maintenance to save you time and money, ensuring your vehicle remains reliable for years to come.", fr: "Chez MGC Réparation Inc., on est votre place de confiance pour tous vos besoins en mécanique générale à Mascouche. Nos techniciens certifiés ont l'expertise et l'équipement de diagnostic à la fine pointe pour s'occuper de tout, d'un simple changement d'huile à des réparations de moteur complexes. On croit à l'entretien préventif pour vous faire sauver du temps et de l'argent, en s'assurant que votre véhicule reste fiable pour des années." },
    servicePoints: [
      { en: "Oil Changes & Tune-ups", fr: "Changements d'huile & Mises au point" },
      { en: "Brake Repair & Replacement", fr: "Réparation & Remplacement des freins" },
      { en: "Advanced Engine Diagnostics", fr: "Diagnostic moteur avancé" },
      { en: "Steering & Suspension Service", fr: "Service de direction & suspension" },
      { en: "Exhaust System & Muffler Repair", fr: "Réparation silencieux et échappement" },
      { en: "Tire Services (Rotation, Balancing, Repair)", fr: "Services de pneus (Rotation, Balancement, Réparation)" },
      { en: "Battery & Electrical System Diagnostics", fr: "Diagnostics de batterie & système électrique" },
      { en: "Pre-purchase Inspections", fr: "Inspections avant achat" }
    ],
    whyChoosePoints: [
        { title: { en: 'All Makes & Models', fr: 'Toutes Marques & Modèles' }, description: { en: 'Our team is experienced with a wide variety of domestic and imported vehicles.', fr: 'Notre équipe a de l\'expérience avec une grande variété de véhicules domestiques et importés.' } },
        { title: { en: 'Transparent Diagnostics', fr: 'Diagnostics Transparents' }, description: { en: 'We explain the issues clearly and provide upfront estimates before any work begins.', fr: 'On vous explique les problèmes clairement et on vous donne une soumission avant de commencer le travail.' } },
        { title: { en: 'Quality Parts', fr: 'Pièces de Qualité' }, description: { en: 'We use high-quality parts to ensure durable and reliable repairs.', fr: 'On utilise des pièces de haute qualité pour garantir des réparations qui durent.' } },
    ]
  },
  {
    slug: 'ac-service',
    title: { en: 'Air Conditioning', fr: 'Air Climatisé' },
    shortDescription: { en: 'Stay cool with our complete AC inspection, repair, and recharge services.', fr: 'Restez au frais avec nos services complets d\'inspection, réparation et recharge d\'AC.' },
    icon: SunIcon,
    metaDescription: { en: "Professional auto AC repair and recharge services in Mascouche. MGC Réparation Inc. handles leak detection, compressor replacement, and complete system diagnostics for comfortable driving. Get a quote!", fr: "Services professionnels de réparation et recharge d'air climatisé à Mascouche. MGC Réparation Inc. s'occupe de la détection de fuites, du remplacement de compresseur et des diagnostics complets pour une conduite confortable. Demandez une soumission!" },
    headline: { en: "Expert Air Conditioning Services", fr: "Services Experts en Air Climatisé" },
    subHeadline: { en: "Reliable AC Diagnostics, Recharge, and Repair to Keep You Comfortable on the Road.", fr: "Diagnostics, recharge et réparation d'AC fiables pour que vous soyez confortable sur la route." },
    pageContent: { en: "A functioning air conditioning system is essential for comfort during Quebec's warmer months. At MGC Réparation Inc., we offer comprehensive AC services to ensure your system is running efficiently and effectively. Whether you need a simple recharge or have a complex leak, our technicians can diagnose and fix the problem quickly.", fr: "Un système d'air climatisé qui fonctionne bien, c'est essentiel pour le confort durant les mois chauds du Québec. Chez MGC Réparation Inc., on offre des services complets d'AC pour s'assurer que votre système roule efficacement. Que vous ayez besoin d'une simple recharge ou d'une fuite compliquée, nos mécanos peuvent diagnostiquer et arranger le problème rapidement." },
    servicePoints: [
      { en: "AC System Diagnostics", fr: "Diagnostics du système d'AC" },
      { en: "Refrigerant Recharge (R134a & R1234yf)", fr: "Recharge de réfrigérant (R134a & R1234yf)" },
      { en: "AC Leak Detection and Repair", fr: "Détection et réparation de fuites AC" },
      { en: "Compressor & Condenser Replacement", fr: "Remplacement du compresseur & condenseur" },
      { en: "Air Conditioning Compressor Replacement", fr: "Remplacement compresseur air climatisé" },
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
    metaDescription: { en: "Expert heavy truck and commercial vehicle mechanics in Mascouche. MGC Réparation Inc. offers specialized diesel engine repair, fleet maintenance, and SAAQ inspections for minimal downtime. Request a quote!", fr: "Mécanos experts pour camions lourds et véhicules commerciaux à Mascouche. MGC Réparation Inc. offre des réparations de moteurs diesel spécialisées, de l'entretien de flotte et des inspections SAAQ pour un temps d'arrêt minimal. Demandez une soumission!" },
    headline: { en: "Expert Heavy Vehicle Mechanics: Keeping Your Truck Fleet & Heavy Equipment On The Road in Mascouche", fr: "Mécanique de Véhicules Lourds Expert: On Garde Votre Flotte de Camions & Poids Lourds sur la Route à Mascouche" },
    subHeadline: { en: "Specialized diagnostics, diesel repair, and fleet maintenance for Trucks, Buses, and Commercial Equipment by Trusted Professionals.", fr: "Diagnostics spécialisés, réparation diesel et entretien de flotte pour camions, autobus et équipements commerciaux par des pros de confiance." },
    pageContent: { en: "For businesses and operators in Mascouche and beyond, a reliable heavy vehicle fleet is critical. At MGC Réparation Inc., we understand the immense demands placed on heavy trucks, commercial vehicles, and diesel engines. Our dedicated heavy vehicle mechanics department is equipped with the specialized tools, advanced diagnostic technology, and deep expertise required to keep your operations running smoothly and efficiently.", fr: "Pour les entreprises et les opérateurs à Mascouche et les environs, une flotte de véhicules lourds fiable est cruciale. Chez MGC Réparation Inc., on comprend la grosse demande placée sur les camions lourds, les véhicules commerciaux et les moteurs diesel. Notre département de mécanique de véhicules lourds est équipé avec les outils spécialisés, la technologie de diagnostic avancée et l'expertise nécessaire pour que vos opérations roulent sans problème." },
    servicePoints: [
      { en: "Advanced Diesel Engine Diagnostics & Repair", fr: "Diagnostics & réparation de moteurs diesel avancés" },
      { en: "Diesel Truck Engine Repair", fr: "Réparation moteur diesel camion" },
      { en: "Brake System Maintenance & Repair (Air & Hydraulic)", fr: "Entretien & réparation du système de freinage (Air & Hydraulique)" },
      { en: "Transmission & Drivetrain Services", fr: "Services de transmission & groupe motopropulseur" },
      { en: "Suspension & Steering Systems (Heavy Duty)", fr: "Systèmes de suspension & direction (Heavy Duty)" },
      { en: "Electrical System Troubleshooting", fr: "Dépannage du système électrique" },
      { en: "Preventative Maintenance Programs", fr: "Programmes d'entretien préventif" },
      { en: "Provincial Safety Inspections (SAAQ)", fr: "Inspection SAAQ véhicules lourds" },
    ],
    whyChoosePoints: [
        { title: { en: 'Specialized Expertise', fr: 'Expertise Spécialisée' }, description: { en: 'Our technicians are highly trained and experienced specifically in heavy vehicle mechanics, not just cars.', fr: 'Nos techniciens sont formés et expérimentés spécifiquement en mécanique de véhicules lourds, pas juste les autos.' } },
        { title: { en: 'Reduced Downtime', fr: 'Temps d\'Arrêt Réduit' }, description: { en: 'We work efficiently to get your valuable assets back in service faster.', fr: 'On travaille efficacement pour remettre vos précieux camions en service plus vite.' } },
        { title: { en: 'Local Mascouche Partner', fr: 'Partenaire Local de Mascouche' }, description: { en: 'We\'re a family-owned business deeply committed to supporting local businesses.', fr: 'On est une business familiale engagée à soutenir les entreprises locales.' } },
    ]
  },
   {
    slug: 'trailer-repair',
    title: { en: 'Trailer Repair', fr: 'Réparation de Remorque' },
    shortDescription: { en: 'Reliable repair and maintenance for utility, commercial, and RV trailers.', fr: 'Réparation et entretien fiables pour les remorques utilitaires, commerciales et de VR.' },
    icon: CogIcon,
    metaDescription: { en: "Complete trailer repair services in Mascouche. MGC Réparation Inc. handles axle repair, wiring, brakes, and structural welding for utility, boat, and commercial trailers. Fast service available!", fr: "Services complets de réparation de remorques à Mascouche. MGC Réparation Inc. s'occupe de la réparation d'essieux, du filage, des freins et de la soudure structurale pour remorques utilitaires, de bateau et commerciales. Service rapide disponible!" },
    headline: { en: "Comprehensive Trailer Repair & Maintenance", fr: "Réparation & Entretien Complets de Remorques" },
    subHeadline: { en: "Ensuring Your Trailers Are Safe, Roadworthy, and Ready for the Haul.", fr: "On s'assure que vos remorques sont sécuritaires, légales et prêtes pour la route." },
    pageContent: { en: "A well-maintained trailer is crucial for safety and efficiency. MGC Réparation Inc. provides a full range of repair and maintenance services for all types of trailers. From wiring issues to axle replacements, our skilled technicians will ensure your equipment is in top condition.", fr: "Une remorque bien entretenue est cruciale pour la sécurité et l'efficacité. MGC Réparation Inc. fournit une gamme complète de services de réparation et d'entretien pour tous les types de remorques. Des problèmes de filage aux remplacements d'essieux, nos techniciens qualifiés s'assureront que votre équipement est en parfaite condition." },
    servicePoints: [
      { en: "Axle Repair & Replacement", fr: "Réparation & remplacement d'essieux" },
      { en: "Trailer Axle Repair", fr: "Réparation essieu remorque" },
      { en: "Braking System Service (Electric & Hydraulic)", fr: "Service du système de freinage (Électrique & Hydraulique)" },
      { en: "Wiring, Lighting & Electrical Diagnostics", fr: "Filage, éclairage & diagnostics électriques" },
      { en: "Suspension Repair (Leaf Spring & Torsion)", fr: "Réparation de la suspension (à lames & à torsion)" },
      { en: "Wheel Bearing & Hub Service", fr: "Service des roulements de roue & moyeux" },
      { en: "Structural Welding & Frame Repair", fr: "Soudure structurelle remorque" }
    ],
    whyChoosePoints: [
        { title: { en: 'All Trailer Types', fr: 'Tous les Types de Remorques' }, description: { en: 'We service everything from a small utility trailers to large commercial flatbeds and RVs.', fr: 'On s\'occupe de tout, des petites remorques utilitaires aux grands flatbeds commerciaux et VR.' } },
        { title: { en: 'Safety Focused', fr: 'Axé sur la Sécurité' }, description: { en: 'Our primary goal is to ensure your trailer is safe and compliant with all regulations.', fr: 'Notre but principal est de s\'assurer que votre remorque est sécuritaire et conforme à toutes les réglementations.' } },
        { title: { en: 'Durable Repairs', fr: 'Réparations Durables' }, description: { en: 'We use quality parts and expert techniques for repairs that last.', fr: 'On utilise des pièces de qualité et des techniques expertes pour des réparations qui durent longtemps.' } },
    ]
  },
  {
    slug: 'generator-services',
    title: { en: 'Generator Services', fr: 'Service de Génératrice' },
    shortDescription: { en: 'Keep your power on with expert maintenance and repair for all generator types.', fr: 'Gardez le courant avec notre service expert d\'entretien et de réparation pour tous les types de génératrices.' },
    icon: BoltIcon,
    metaDescription: { en: "Reliable generator repair and maintenance in Mascouche for residential, commercial, and portable units. MGC Réparation Inc. ensures your power is always on. Schedule service today!", fr: "Réparation et entretien fiables de génératrices à Mascouche pour unités résidentielles, commerciales et portables. MGC Réparation Inc. assure que votre courant est toujours fonctionnel. Planifiez un service aujourd'hui!" },
    headline: { en: "Dependable Generator Services", fr: "Services Fiables de Génératrices" },
    subHeadline: { en: "Expert Maintenance and Repair to Ensure You're Never Left in the Dark.", fr: "Entretien et réparation experts pour s'assurer que vous ne soyez jamais dans le noir." },
    pageContent: { en: "Whether for your home or business, a reliable generator is a critical asset. MGC Réparation Inc. offers expert diagnostic, repair, and preventative maintenance services for residential, commercial, and portable generators to ensure they are ready when you need them most.", fr: "Que ce soit pour votre maison ou votre entreprise, une génératrice fiable est un atout essentiel. MGC Réparation Inc. offre des services experts de diagnostic, de réparation et d'entretien préventif pour les génératrices résidentielles, commerciales et portables pour s'assurer qu'elles sont prêtes quand vous en avez le plus besoin." },
    servicePoints: [
      { en: "Preventative Maintenance & Tune-ups", fr: "Entretien préventif génératrice" },
      { en: "Engine & Electrical Diagnostics", fr: "Diagnostics du moteur & électriques" },
      { en: "Load Bank Testing", fr: "Test de banc de charge" },
      { en: "Fuel System Cleaning & Repair", fr: "Nettoyage & réparation du système de carburant" },
      { en: "Transfer Switch Inspection & Service", fr: "Inspection & service du commutateur de transfert" },
      { en: "Portable Generator Repair", fr: "Réparation génératrice portable" }
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
    metaDescription: { en: "Expert welding and custom fabrication services in Mascouche. MGC Réparation Inc. offers vehicle frame repair, custom exhaust welding, and structural assembly for automotive & heavy equipment needs. Get a quote!", fr: "Services experts de soudure et fabrication sur mesure à Mascouche. MGC Réparation Inc. offre la réparation de châssis de véhicule, la soudure d'échappement sur mesure et l'assemblage structural pour les besoins automobiles et d'équipement lourd. Demandez une soumission!" },
    headline: { en: "Precision Welding & Custom Assembly", fr: "Soudure de Précision & Assemblage sur Mesure" },
    subHeadline: { en: "From Frame Repairs to Custom Fabrications, We Provide Strong and Durable Solutions.", fr: "Des réparations de châssis aux fabrications sur mesure, on fournit des solutions solides et durables." },
    pageContent: { en: "MGC Réparation Inc. offers specialized welding and assembly services that go beyond typical auto repair. Our skilled welders can handle a variety of materials and projects, providing strong, reliable solutions for vehicles and equipment.", fr: "MGC Réparation Inc. offers specialized welding and assembly services that go beyond typical auto repair. Nos soudeurs qualifiés peuvent travailler avec une variété de matériaux et de projets, fournissant des solutions solides et fiables pour les véhicules et l'équipement." },
    servicePoints: [
      { en: "Vehicle Frame & Chassis Repair", fr: "Soudure châssis auto" },
      { en: "Custom Exhaust System Welding", fr: "Soudure de système d'échappement sur mesure" },
      { en: "Trailer Structural Repair & Reinforcement", fr: "Réparation & renforcement structurel de remorque" },
      { en: "Heavy Equipment Component Repair", fr: "Réparation de composantes d'équipement lourd" },
      { en: "Custom Bracket & Mount Fabrication", fr: "Fabrication pièces sur mesure" },
      { en: "MIG & Stick Welding Services", fr: "Services de soudure MIG & à l'arc" }
    ],
    whyChoosePoints: [
        { title: { en: 'Skilled Welders', fr: 'Soudeurs Qualifiés' }, description: { en: 'Our certified welders have the expertise to deliver high-quality, durable welds.', fr: 'Nos soudeurs certifiés ont l\'expertise pour livrer des soudures de haute qualité et durables.' } },
        { title: { en: 'Problem Solvers', fr: 'Solutionneurs de Problèmes' }, description: { en: 'We can create custom solutions for unique repair and fabrication challenges.', fr: 'On peut créer des solutions sur mesure pour des défis de réparation et de fabrication uniques.' } },
        { title: { en: 'Strength & Safety', fr: 'Solidité & Sécurité' }, description: { en: 'We prioritize structural integrity and safety in all our welding work.', fr: "On priorise l'intégrité structurale et la sécurité dans tous nos travaux de soudure." } },
    ]
  },
];

const FAQ_DATA = [
    {
        question: { en: "What types of vehicles do you service?", fr: "Quels types de véhicules réparez-vous ?" },
        answer: { en: "We are a full-service shop equipped to handle everything from family cars, SUVs, and light trucks to heavy-duty trucks, commercial fleets, trailers, and even generators. If it has an engine, we can likely fix it.", fr: "Nous sommes un garage complet équipé pour tout gérer, des voitures familiales, VUS et camions légers aux camions lourds, flottes commerciales, remorques et même les génératrices. Si ça a un moteur, on peut probably le réparer." }
    },
    {
        question: { en: "What are your operating hours?", fr: "Quelles sont vos heures d'ouverture ?" },
        answer: { en: "We are open Monday to Thursday from 7:30 AM to 4:00 PM, and Friday from 7:30 AM to 12:00 PM. We are closed on weekends.", fr: "Nous sommes ouverts du lundi au jeudi de 7h30 à 16h00, et le vendredi de 7h30 à 12h00. Nous sommes fermés la fin de semaine." }
    },
    {
        question: { en: "Do you service diesel engines?", fr: "Réparez-vous les moteurs diesel ?" },
        answer: { en: "Yes, absolutely. Our heavy vehicle mechanics specialize in advanced diesel engine diagnostics and repair for trucks and commercial equipment.", fr: "Oui, absolument. Nos mécaniciens de véhicules lourds se spécialisent dans le diagnostic et la réparation de moteurs diesel avancés pour les camions et équipements commerciaux." }
    },
    {
        question: { en: "Are your repairs guaranteed?", fr: "Est-ce que vos réparations sont garanties ?" },
        answer: { en: "Yes. We stand behind our work with a guarantee on all our repairs. Our goal is to provide you with total confidence and peace of mind on the road.", fr: "Oui. Nous garantissons tout notre travail. Notre objectif est de vous offrir une confiance totale et une tranquillité d'esprit sur la route." }
    }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: { en: "Honest & Transparent", fr: "Honnête et Transparent" },
    description: { en: "We provide clear explanations and upfront estimates. No surprises, no upselling—just honest work.", fr: "On vous explique tout clairement et on vous donne une soumission juste. Pas de surprises, juste du travail honnête." },
    icon: 'UsersIcon'
  },
  {
    title: { en: "Expertise You Can Trust", fr: "Une Expertise de Confiance" },
    description: { en: "With over a decade of experience, our certified technicians deliver high-quality, professional solutions that last.", fr: "Avec plus de 10 ans d'expérience, nos techniciens certifiés offrent des solutions professionnelles et durables." },
    icon: 'ShieldCheckIcon'
  },
  {
    title: { en: "Full-Service Shop", fr: "Garage Tout-en-Un" },
    description: { en: "From your family car to heavy trucks, trailers, and generators, we have the specialized skills to handle it all.", fr: "De votre voiture familiale aux camions lourds, remorques et génératrices, on a les compétences pour tout réparer." },
    icon: 'WrenchScrewdriverIcon'
  },
  {
    title: { en: "Workmanship Guaranteed", fr: "Travail Garanti" },
    description: { en: "We stand behind our work. Our goal is to get you back on the road with total confidence and peace of mind.", fr: "On est fiers de notre travail. Notre but est que vous repreniez la route en toute confiance et tranquillité d'esprit." },
    icon: 'HeartIcon'
  },
];

const QUICK_ACTIONS = {
  en: [
    { text: "URGENT Brake Inspection", href: "/offre", icon: "ExclamationTriangleIcon" },
    { text: "FREE Health Check", href: "/bilan", icon: "CheckBadgeIcon" },
    { text: "Tires + FREE Inspection", href: "/pneus", icon: "TruckIcon" },
    { text: "My questions and answers", action: "openChat", icon: "QuestionMarkCircleIcon" }
  ],
  fr: [
    { text: "Inspection Freins URGENTE", href: "/offre", icon: "ExclamationTriangleIcon" },
    { text: "Bilan de Santé GRATUIT", href: "/bilan", icon: "CheckBadgeIcon" },
    { text: "Pneus + Inspection GRATUITE", href: "/pneus", icon: "TruckIcon" },
    { text: "Mes questions et réponses", action: "openChat", icon: "QuestionMarkCircleIcon" }
  ]
};

const AI_CONVERSATION_FLOW = {
  en: {
    starters: {
      question: "Hello! I'm the MGC AI assistant. To best help you, please select a category for your issue:",
      options: [
        { text: "I hear a noise", payload: "noise", description: "The vehicle is making an unusual noise." },
        { text: "A warning light is on", payload: "light", description: "A warning light is on the dashboard." },
        { text: "Performance issue", payload: "performance", description: "There is a performance issue." },
        { text: "Something else", payload: "other", description: "" },
      ]
    },
    ramifications: {
      noise: {
        question: "Okay, you're hearing a noise. What does it sound like?",
        options: [
          { text: "Grinding or Squealing", payload: "grinding", description: "The noise sounds like grinding or squealing." },
          { text: "Clicking or Ticking", payload: "clicking", description: "The noise sounds like clicking or ticking." },
          { text: "Rumbling or Humming", payload: "rumbling", description: "The noise sounds like rumbling or humming." },
        ],
      },
      light: {
        question: "Which warning light is on?",
        options: [
          { text: "Check Engine Light", payload: "check_engine", description: "The check engine light is on." },
          { text: "Battery Light", payload: "battery_light", description: "The battery light is on." },
          { text: "Brake Warning Light", payload: "brake_light", description: "The brake warning light is on." },
        ],
      },
      performance: {
        question: "What kind of performance issue are you noticing?",
        options: [
            { text: "Loss of Power", payload: "power_loss", description: "The vehicle has a loss of power." },
            { text: "Shaking or Vibrating", payload: "shaking", description: "The vehicle is shaking or vibrating." },
            { text: "Poor Fuel Economy", payload: "fuel_economy", description: "The vehicle has poor fuel economy." },
        ]
      }
    },
  },
  fr: {
    starters: {
      question: "Bonjour! Je suis l'assistant IA de MGC. Pour mieux vous aider, veuillez sélectionner une catégorie pour votre problème :",
      options: [
        { text: "J'entends un bruit", payload: "noise", description: "Le véhicule fait un bruit inhabituel." },
        { text: "Un voyant est allumé", payload: "light", description: "Un voyant est allumé sur le tableau de bord." },
        { text: "Problème de performance", payload: "performance", description: "Il y a un problème de performance." },
        { text: "Autre chose", payload: "other", description: "" },
      ]
    },
    ramifications: {
      noise: {
        question: "D'accord, vous entendez un bruit. À quoi ressemble-t-il?",
        options: [
          { text: "Grincement ou Sifflement", payload: "grinding", description: "Le bruit ressemble à un grincement ou un sifflement." },
          { text: "Cliquetis ou Tic-tac", payload: "clicking", description: "Le bruit ressemble à un cliquetis ou un tic-tac." },
          { text: "Gargouillement ou Bourdonnement", payload: "rumbling", description: "Le bruit ressemble à un gargouillement ou un bourdonnement." },
        ],
      },
      light: {
        question: "Quel voyant est allumé?",
        options: [
          { text: "Voyant Moteur (Check Engine)", payload: "check_engine", description: "Le voyant moteur est allumé." },
          { text: "Voyant de Batterie", payload: "battery_light", description: "Le voyant de la batterie est allumé." },
          { text: "Voyant de Freins", payload: "brake_light", description: "Le voyant des freins est allumé." },
        ],
      },
      performance: {
        question: "Quel genre de problème de performance remarquez-vous?",
        options: [
            { text: "Perte de puissance", payload: "power_loss", description: "Le véhicule a une perte de puissance." },
            { text: "Secousses ou Vibrations", payload: "shaking", description: "Le véhicule tremble ou vibre." },
            { text: "Consommation excessive", payload: "fuel_economy", description: "Le véhicule consomme beaucoup de carburant." },
        ]
      }
    },
  }
};


const en = {
  header: {
    bookService: 'Get My Quote & Book Appointment',
    allServices: 'All Services'
  },
  footer: {
    about: 'Your trusted, family-owned auto and heavy vehicle experts in Mascouche, QC. Honest repairs, guaranteed work.',
    contactUs: 'Contact Us',
    operatingHours: 'Operating Hours',
    quickLinks: 'Quick Links',
    rights: 'All Rights Reserved.'
  },
  home: {
    hero: {
      title1: 'HONEST REPAIRS.',
      title2: 'GUARANTEED WORK.',
      subtitle: 'Your trusted, family-owned shop in Mascouche for expert car, truck, trailer, and generator services. We get it done right, the first time. Fast diagnostics available.',
      ctaBook: 'Get My Free Quote',
      ctaCall: 'Call Us Now:'
    },
    services: {
      title: 'OUR EXPERT AUTO & HEAVY VEHICLE MECHANICS SERVICES',
      subtitle: 'From routine maintenance to engine diagnostics and specialized repairs, we are equipped to handle all your vehicle and equipment needs with precision and care.',
      learnMore: 'View Details'
    },
    whyUs: {
      title: 'WHY MGC REPAIR IS THE CHOICE FOR MASCOUCHE DRIVERS',
      subtitle: 'More than just mechanics, we’re your partners in keeping your vehicles safe and reliable in Mascouche, Terrebonne, and Lachenaie.',
      points: WHY_CHOOSE_US_POINTS
    },
    testimonials: {
      title: 'WHAT OUR CLIENTS SAY',
      subtitle: 'Real, unfiltered reviews from our valued customers on Google.'
    },
    contactMap: {
      title: 'Ready for Trusted Auto Repair in Mascouche?',
      visitTitle: 'Visit Our Shop',
      visitSubtitle: 'We\'re ready to serve you.',
      cta: 'Get Directions'
    },
    faq: {
        title: "Frequently Asked Questions",
        subtitle: "Quick answers to common questions about our services in Mascouche.",
        questions: FAQ_DATA
    }
  },
  breadcrumbs: {
    home: 'Home',
    about: 'About Us',
    contact: 'Contact',
    services: 'Services',
    privacyPolicy: 'Privacy Policy'
  },
  about: {
    title: 'A Family Legacy of Trust & Mechanical Excellence',
    subtitle: 'Serving Mascouche Since 2012 with Integrity, Expertise, and a Passion for Vehicles.',
    p1: 'Welcome to MGC Réparation Inc., where mechanical expertise meets genuine family values. Founded in 2012 by Maxime Caron, our shop at 1287 Chemin de la Côte Georges has proudly served the Mascouche and Terrebonne communities for over a decade.',
    p2: 'Maxime envisioned a repair center built on honesty, precision, and an unwavering commitment to customer satisfaction. Starting with a passion for cars and a dedication to mastering complex mechanical challenges like engine diagnostics and electrical repairs, he grew MGC Réparation into the trusted establishment it is today. As a family-owned business, we understand the importance of reliability – whether it\'s for your daily commute, your commercial fleet, or critical power generators. We treat every vehicle and piece of equipment as if it were our own, ensuring meticulous attention to detail and lasting solutions.',
    p3: 'Our team, handpicked for their skill and integrity, shares Maxime’s vision. We’re not just mechanics; we’re problem-solvers who take pride in diagnosing intricate issues and delivering efficient, professional repairs. We believe in transparent communication, providing clear explanations and fair estimates before any work begins.',
    p4: 'Over the years, MGC Réparation Inc. has expanded its capabilities to include specialized services like heavy vehicle mechanics, trailer repair, generator maintenance, and expert welding and assembly. This growth reflects our continuous pursuit of excellence and our dedication to meeting the diverse needs of our clients in Mascouche and the surrounding regions.',
    p5: 'When you choose MGC Réparation Inc., you\'re choosing a partner dedicated to keeping you and your equipment on the road safely and reliably. We look forward to welcoming you to our family.',
    ctaTitle: 'Ready for Trusted Repair in Mascouche?',
    ctaSubtitle: 'Get a precise, no-obligation quote from our mechanical experts in just a few clicks.',
  },
  contact: {
    title: 'Contact MGC Repair in Mascouche',
    subtitle: 'Schedule your service, request a quote, or ask a question to our expert mechanics.',
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
    descriptionPlaceholder: "Describe the issue (e.g., brake noise, check engine light, oil change, breakdown...) or the service you need.",
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
    },
    validation: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number'
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
    subtitle: 'Let our experts take care of your vehicle. Get a reliable, transparent quote today.',
    ctaButton: 'Request a Quote'
  },
  quoteWizard: {
    formTitle: 'Get Your Free Quote',
    infoPanel: {
      title: 'Get an accurate diagnostic or quote in just a few minutes.',
      subtitle: 'Our smart assistant guides you to the right service and helps you schedule your appointment quickly.'
    },
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
        descriptionPlaceholder: "Describe the issue (e.g., brake noise, check engine light, tire change, AC maintenance) or the service you're looking for...",
        fullName: "Full Name",
        phone: "Phone",
        email: "Email"
      }
    },
    buttons: {
      next: "Next",
      back: "Back",
      submit: "Submit Request"
    },
    success: {
        title: "Appointment Request Sent!",
        message: "Thank you! We've received your request and will contact you shortly to confirm your booking.",
        button: "Start a New Request"
    }
  },
  prequalificationForm: {
    formTitle: 'GET YOUR CUSTOM QUOTE',
    infoPanel: {
      title: 'Quickly find the perfect mechanical service for your needs.',
      subtitle: 'Our smart form connects you to the best expert and provides fair pricing, without obligation.'
    },
    steps: {
        1: {
            alex_anxieux: { title: "Describe the urgent problem with your vehicle" },
            sophie_sage: { title: "What type of maintenance or inspection are you looking for?" },
            martin_prevoyant: { title: "What is the approximate date for your planned service?" }
        },
        2: {
            title: "Vehicle Details"
        },
        3: {
            title: "Schedule your appointment"
        },
        4: {
            title: "Almost done!"
        }
    },
    buttons: {
        continue: "Continue",
        back: "Back",
        submit: "Send My Request"
    }
  },
  localAdvantage: {
    title: "Your Local Advantage in Mascouche",
  },
  aiAssistant: {
      quickActionsTitle: "More options",
      quickActionsSubtitle: "Tap to send a suggestion from mgcreparation",
      buttonTooltip: "Quick Actions",
      modalTitle: "AI Diagnostic Assistant",
      greeting: "Hello! I'm the MGC AI assistant. To get started, please describe the problem you're experiencing with your vehicle.",
      inputPlaceholder: "e.g., My car is making a clicking noise...",
      error: "I'm sorry, I'm having trouble connecting right now. Please try again later or call us directly.",
      conversationFlow: AI_CONVERSATION_FLOW.en,
      quickActions: QUICK_ACTIONS.en,
  }
};

const fr: typeof en = {
  header: {
    bookService: 'Obtenir ma soumission et rendez-vous',
    allServices: 'Tous les services'
  },
  footer: {
    about: 'Votre garage familial de confiance pour l\'auto et les véhicules lourds à Mascouche, QC. Réparations honnêtes, travail garanti.',
    contactUs: 'Nous Contacter',
    operatingHours: 'Heures d\'Ouverture',
    quickLinks: 'Liens Rapides',
    rights: 'Tous droits réservés.'
  },
  home: {
    hero: {
      title1: 'RÉPARATIONS HONNÊTES.',
      title2: 'TRAVAIL GARANTI.',
      subtitle: 'Votre garage familial de confiance à Mascouche pour des services experts pour autos, camions, remorques et génératrices. On fait la job comme il faut, du premier coup. Diagnostic rapide disponible.',
      ctaBook: 'Obtenir ma soumission gratuite',
      ctaCall: 'Appelez-nous:'
    },
    services: {
      title: 'NOS SERVICES EXPERTS DE MÉCANIQUE AUTO ET VÉHICULES LOURDS',
      subtitle: 'De l\'entretien de routine au diagnostic moteur et aux réparations spécialisées, nous sommes équipés pour répondre à tous vos besoins avec précision et soin.',
      learnMore: 'Voir les détails'
    },
    whyUs: {
      title: 'POURQUOI MGC RÉPARATION EST LE CHOIX DES CHAUFFEURS DE MASCOUCHE',
      subtitle: 'Plus que des mécaniciens, nous sommes vos partenaires pour des véhicules sécuritaires et fiables à Mascouche, Terrebonne et Lachenaie.',
      points: WHY_CHOOSE_US_POINTS
    },
    testimonials: {
      title: 'CE QUE NOS CLIENTS DISENT',
      subtitle: 'De vrais avis, non filtrés, de nos précieux clients sur Google.'
    },
    contactMap: {
      title: 'Prêt pour une Réparation de Confiance à Mascouche?',
      visitTitle: 'Visitez notre Garage',
      visitSubtitle: 'On est prêt à vous servir.',
      cta: 'Obtenir l\'itinéraire'
    },
     faq: {
        title: "Questions Fréquemment Posées",
        subtitle: "Réponses rapides aux questions courantes sur nos services à Mascouche.",
        questions: FAQ_DATA
    }
  },
  breadcrumbs: {
    home: 'Accueil',
    about: 'À Propos',
    contact: 'Contact',
    services: 'Services',
    privacyPolicy: 'Politique de confidentialité'
  },
  about: {
    title: 'Un Héritage Familial de Confiance & d\'Excellence Mécanique',
    subtitle: 'Au service de Mascouche depuis 2012 avec intégrité, expertise et passion pour les véhicules.',
    p1: 'Bienvenue chez MGC Réparation Inc., où l\'expertise mécanique rencontre de vraies valeurs familiales. Fondé en 2012 par Maxime Caron, notre garage au 1287 Chemin de la Côte Georges a fièrement servi les communautés de Mascouche et Terrebonne depuis plus d\'une décennie.',
    p2: 'Maxime a imaginé un centre de réparation bâti sur l\'honnêteté, la précision et un engagement inébranlable envers la satisfaction du client. Parti d\'une passion pour les autos et d\'une volonté de maîtriser des défis mécaniques complexes comme le diagnostic moteur et les réparations électriques, il a fait de MGC Réparation l\'établissement de confiance qu\'il est aujourd\'hui. En tant qu\'entreprise familiale, on comprend l\'importance de la fiabilité – que ce soit pour votre trajet quotidien, votre flotte commerciale ou vos génératrices essentielles. On traite chaque véhicule et équipement comme si c\'était le nôtre, en garantissant une attention méticuleuse aux détails et des solutions durables.',
    p3: 'Notre équipe, choisie pour ses compétences et son intégrité, partage la vision de Maxime. On n\'est pas juste des mécanos; on est des solutionneurs de problèmes qui sont fiers de diagnostiquer des problèmes complexes et de livrer des réparations efficaces et professionnelles. On croit en la communication transparente, en fournissant des explications claires et des estimations justes avant de commencer le travail.',
    p4: 'Au fil des ans, MGC Réparation Inc. a élargi ses capacités pour inclure des services spécialisés comme la mécanique de véhicules lourds, la réparation de remorques, l\'entretien de génératrices, et la soudure et l\'assemblage experts. Cette croissance reflète notre quête continue de l\'excellence et notre dévouement à répondre aux divers besoins de nos clients à Mascouche et dans les régions avoisinantes.',
    p5: 'Quand vous choisissez MGC Réparation Inc., vous choisissez un partenaire dédié à vous garder, vous et votre équipement, sur la route de manière sécuritaire et fiable. On a hâte de vous accueillir dans notre famille.',
    ctaTitle: 'Prêt pour une Réparation de Confiance à Mascouche?',
    ctaSubtitle: 'Obtenez une soumission précise et sans obligation de nos experts en mécanique en quelques clics.',
  },
  contact: {
    title: 'Contactez MGC Réparation à Mascouche',
    subtitle: 'Planifiez votre service, demandez une soumission ou posez une question à nos experts mécaniciens.',
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
    descriptionPlaceholder: "Décrivez le problème (ex: bruit de freins, voyant moteur, changement d'huile, panne...) ou le service dont vous avez besoin.",
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
    },
    validation: {
      required: 'Ce champ est requis',
      email: 'Veuillez entrer une adresse courriel valide',
      phone: 'Veuillez entrer un numéro de téléphone valide'
    }
  },
  services: {
    title: 'Nos Services de Mécanique',
    subtitle: 'Chez MGC Réparation Inc., on offre une gamme complète de services de mécanique pour votre auto de tous les jours, vos véhicules lourds, remorques et équipements.',
    viewDetails: 'Voir les détails'
  },
  serviceDetail: {
    includesTitle: 'Nos services de {service} incluent:',
    whyTrustTitle: 'Pourquoi faire confiance à MGC pour {service}?',
    ctaTitle: 'Prêt pour un service?',
    subtitle: 'Laissez nos experts s\'occuper de votre véhicule. Obtenez une soumission fiable et transparente aujourd\'hui.',
    ctaButton: 'Demander une soumission'
  },
  quoteWizard: {
    formTitle: 'Demandez votre soumission gratuite',
    infoPanel: {
      title: 'Obtenez un diagnostic ou une soumission précise en quelques minutes.',
      subtitle: 'Notre assistant intelligent vous guide vers le bon service et vous permet de planifier votre rendez-vous rapidement.'
    },
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
                diagnostics: "Diagnostic / Pas certain"
            }
        },
        3: {
            title: "Parlez-nous de vos besoins et réservez une heure.",
            descriptionPlaceholder: "Décrivez le problème (ex: bruit de freins, voyant moteur allumé, besoin de changement de pneus, entretien AC) ou le service que vous cherchez...",
            fullName: "Nom complet",
            phone: "Téléphone",
            email: "Courriel"
        }
    },
    buttons: {
        next: "Suivant",
        back: "Retour",
        submit: "Envoyer ma demande"
    },
    success: {
        title: "Rendez-vous demandé!",
        message: "Merci! Nous avons bien reçu votre demande et nous vous contacterons sous peu pour confirmer votre réservation.",
        button: "Nouvelle demande"
    }
  },
  prequalificationForm: {
    formTitle: 'OBTENEZ VOTRE SOUMISSION PERSONNALISÉE',
    infoPanel: {
      title: 'Trouvez rapidement le service parfait pour vos besoins mécaniques.',
      subtitle: 'Notre formulaire intelligent vous connecte au meilleur expert et vous donne un prix juste, sans engagement.'
    },
    steps: {
        1: {
            alex_anxieux: { title: "Décrivez le problème urgent de votre véhicule" },
            sophie_sage: { title: "Quel type d'entretien ou d'inspection recherchez-vous?" },
            martin_prevoyant: { title: "Quelle est la date approximative pour votre service planifié?" }
        },
        2: {
            title: "Détails du véhicule"
        },
        3: {
            title: "Planifiez votre rendez-vous"
        },
        4: {
            title: "Presque terminé!"
        }
    },
    buttons: {
        continue: "Continuer",
        back: "Retour",
        submit: "Envoyer ma demande"
    }
  },
  localAdvantage: {
    title: "Votre Avantage Local à Mascouche",
  },
  aiAssistant: {
      quickActionsTitle: "Plus d'options",
      quickActionsSubtitle: "Appuyez pour envoyer une suggestion de mgcreparation",
      buttonTooltip: "Actions Rapides",
      modalTitle: "Assistant de Diagnostic IA",
      greeting: "Bonjour! Je suis l'assistant IA de MGC. Veuillez choisir une option ci-dessous ou décrire le problème que vous rencontrez avec votre véhicule.",
      inputPlaceholder: "ex: Mon auto fait un bruit de claquement...",
      error: "Désolé, je rencontre un problème de connexion pour le moment. Veuillez réessayer plus tard ou nous appeler directement.",
      conversationFlow: AI_CONVERSATION_FLOW.fr,
      quickActions: QUICK_ACTIONS.fr,
  }
};

export const translations = { en, fr };