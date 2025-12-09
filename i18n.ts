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
];

export const services: Service[] = [
  {
    slug: 'general-mechanics',
    title: { en: 'General Mechanics', fr: 'Mécanique Générale' },
    shortDescription: { en: 'Expert diagnostics, maintenance, and repairs for all makes and models.', fr: 'Diagnostics experts, entretien et réparations pour toutes les marques et modèles.' },
    icon: WrenchScrewdriverIcon,
    metaDescription: { en: "Comprehensive general mechanics in Mascouche: MGC Réparation Inc. offers expert oil changes, brake repair, diagnostic services, and vehicle tune-ups for all cars & light trucks. Book now!", fr: "Mécanique générale complète à Mascouche: MGC Réparation Inc. offre changements d'huile experts, réparation de freins, services de diagnostic et mises au point pour toutes autos & camions légers. Réservez maintenant!" },
    headline: { en: "Complete General Mechanics & Engine Diagnostics for All Vehicles in Mascouche", fr: "Mécanique Générale Complète & Diagnostic Moteur pour tous les Véhicules à Mascouche" },
    subHeadline: { en: "From Routine Maintenance (brakes, tires, oil changes) to Complex Repairs, We Keep Your Car Running Smoothly.", fr: "De l'entretien de routine (freins, pneus, changement d'huile) aux réparations complexes, on s'assure que votre auto roule parfaitement." },
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
    subServices: [
      {
        slug: 'oil-changes',
        title: { en: 'Oil Changes & Tune-ups', fr: "Changements d'huile & Mises au point" },
        shortDescription: { en: 'Regular maintenance to keep your engine running smoothly.', fr: 'Entretien régulier pour que votre moteur tourne rond.' },
        pageContent: { en: 'Regular oil changes and tune-ups are the lifeblood of your vehicle. We use high-quality oils and filters to ensure maximum engine protection and performance.', fr: "Les changements d'huile réguliers et les mises au point sont essentiels. On utilise des huiles et filtres de haute qualité pour une protection et performance moteur maximales." }
      },
      {
        slug: 'brake-repair',
        title: { en: 'Brake Repair & Replacement', fr: "Réparation & Remplacement des freins" },
        shortDescription: { en: 'Complete brake services for your safety.', fr: 'Services de freins complets pour votre sécurité.' },
        pageContent: { en: 'From pads and rotors to calipers and lines, we ensure your braking system is responsive and safe. If you hear squeaking or grinding, come see us immediately.', fr: "Des plaquettes et disques aux étriers et conduites, on s'assure que votre système de freinage est réactif et sécuritaire. Si vous entendez des grincements, venez nous voir immédiatement." }
      },
      {
        slug: 'engine-diagnostics',
        title: { en: 'Advanced Engine Diagnostics', fr: "Diagnostic moteur avancé" },
        shortDescription: { en: 'Pinpoint engine issues with state-of-the-art tools.', fr: 'Identifiez les problèmes moteur avec des outils de pointe.' },
        pageContent: { en: 'Check engine light on? Our advanced diagnostic tools communicate with your vehicle’s computer to accurately identify and resolve engine issues quickly.', fr: "Lumière Check Engine allumée? Nos outils de diagnostic avancés communiquent avec l'ordinateur de votre véhicule pour identifier et résoudre les problèmes moteur rapidement." }
      },
      {
        slug: 'steering-suspension',
        title: { en: 'Steering & Suspension Service', fr: "Service de direction & suspension" },
        shortDescription: { en: 'Improve ride comfort and handling.', fr: 'Améliorez le confort de roulement et la tenue de route.' },
        pageContent: { en: 'Worn suspension components can lead to unsafe driving conditions and uneven tire wear. We inspect and repair shocks, struts, tie rods, and more.', fr: "Des composantes de suspension usées peuvent rendre la conduite dangereuse et user vos pneus inégalement. On inspecte et répare amortisseurs, jambes de force, biellettes et plus." }
      },
      {
        slug: 'exhaust-system',
        title: { en: 'Exhaust System & Muffler Repair', fr: "Réparation silencieux et échappement" },
        shortDescription: { en: 'Reduce noise and emissions.', fr: 'Réduisez le bruit et les émissions.' },
        pageContent: { en: 'A healthy exhaust system is crucial for fuel efficiency and safety. We repair leaks, replace mufflers, and ensure your vehicle meets emission standards.', fr: "Un système d'échappement en santé est crucial pour l'économie d'essence et la sécurité. On répare les fuites, remplace les silencieux et s'assure que votre véhicule respecte les normes." }
      },
      {
        slug: 'tire-services',
        title: { en: 'Tire Services', fr: "Services de pneus" },
        shortDescription: { en: 'Rotation, balancing, and repair.', fr: 'Rotation, balancement et réparation.' },
        pageContent: { en: 'We offer complete tire services including rotation, balancing, and puncture repair to extend the life of your tires and ensure a smooth ride.', fr: "On offre des services de pneus complets incluant rotation, balancement et réparation de crevaison pour prolonger la vie de vos pneus et assurer un roulement doux." }
      },
      {
        slug: 'battery-electrical',
        title: { en: 'Battery & Electrical System', fr: "Batterie & Système Électrique" },
        shortDescription: { en: 'Diagnostics for starting and charging issues.', fr: 'Diagnostics pour problèmes de démarrage et charge.' },
        pageContent: { en: 'Modern vehicles rely heavily on their electrical systems. We test batteries, alternators, and starters to prevent you from being stranded.', fr: "Les véhicules modernes dépendent beaucoup de leur système électrique. On teste batteries, alternateurs et démarreurs pour éviter que vous restiez en panne." }
      },
      {
        slug: 'pre-purchase-inspection',
        title: { en: 'Pre-purchase Inspections', fr: "Inspections avant achat" },
        shortDescription: { en: 'Know the condition of a used car before you buy.', fr: "Connaissez l'état d'une auto usagée avant d'acheter." },
        pageContent: { en: 'Buying a used car? Our comprehensive inspection checks all major systems to give you an honest assessment of the vehicle’s condition.', fr: "Vous achetez une auto usagée? Notre inspection complète vérifie tous les systèmes majeurs pour vous donner une évaluation honnête de l'état du véhicule." }
      }
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
      { en: "Evaporator & Blower Motor Service", fr: "Service de l'évaporateur & moteur de ventilation" },
      { en: "Full AC System Flush", fr: "Nettoyage complet du système d'AC" }
    ],
    subServices: [
      {
        slug: 'ac-diagnostics',
        title: { en: "AC System Diagnostics", fr: "Diagnostics du système d'AC" },
        shortDescription: { en: "Identify why your AC isn't blowing cold.", fr: "Identifiez pourquoi votre AC ne pousse pas froid." },
        pageContent: { en: "We perform a full system check to identify leaks, electrical issues, or mechanical failures preventing your AC from working properly.", fr: "On fait une vérification complète pour identifier les fuites, problèmes électriques ou bris mécaniques qui empêchent votre AC de bien fonctionner." }
      },
      {
        slug: 'refrigerant-recharge',
        title: { en: "Refrigerant Recharge", fr: "Recharge de réfrigérant" },
        shortDescription: { en: "R134a & R1234yf recharge services.", fr: "Services de recharge R134a & R1234yf." },
        pageContent: { en: "Low refrigerant is a common cause of poor cooling. We recharge your system with the correct type and amount of refrigerant.", fr: "Le manque de réfrigérant est une cause fréquente de mauvais refroidissement. On recharge votre système avec le bon type et la bonne quantité." }
      },
      {
        slug: 'leak-detection',
        title: { en: "AC Leak Detection", fr: "Détection de fuites AC" },
        shortDescription: { en: "Find and fix hidden leaks.", fr: "Trouvez et réparez les fuites cachées." },
        pageContent: { en: "Using UV dye and specialized sniffers, we locate even the smallest leaks in your AC system to prevent future refrigerant loss.", fr: "Avec du colorant UV et des détecteurs spécialisés, on localise même les plus petites fuites pour éviter les pertes futures." }
      },
      {
        slug: 'compressor-replacement',
        title: { en: "Compressor Replacement", fr: "Remplacement du compresseur" },
        shortDescription: { en: "Replace faulty AC compressors.", fr: "Remplacez les compresseurs AC défectueux." },
        pageContent: { en: "The compressor is the heart of your AC. If it fails, we replace it with a high-quality unit to restore your system's cooling power.", fr: "Le compresseur est le coeur de votre AC. S'il brise, on le remplace par une unité de qualité pour restaurer la puissance de refroidissement." }
      }
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
    subServices: [
      {
        slug: 'diesel-engine-repair',
        title: { en: "Diesel Engine Repair", fr: "Réparation moteur diesel" },
        shortDescription: { en: "Expert diagnostics and repair for diesel engines.", fr: "Diagnostics et réparation experts pour moteurs diesel." },
        pageContent: { en: "We specialize in diesel engine repair, from fuel injection issues to major overhauls, ensuring your heavy trucks maintain peak power and efficiency.", fr: "On se spécialise dans la réparation diesel, des problèmes d'injection aux révisions majeures, pour que vos camions gardent leur puissance et efficacité." }
      },
      {
        slug: 'heavy-brake-systems',
        title: { en: "Air & Hydraulic Brakes", fr: "Freins à Air & Hydrauliques" },
        shortDescription: { en: "Maintenance for heavy duty braking systems.", fr: "Entretien pour systèmes de freinage poids lourds." },
        pageContent: { en: "Safety is paramount. We service and repair air and hydraulic brake systems, including compressors, lines, and drums/discs.", fr: "La sécurité est primordiale. On entretient et répare les systèmes de freins à air et hydrauliques, incluant compresseurs, lignes et tambours/disques." }
      },
      {
        slug: 'fleet-maintenance',
        title: { en: "Fleet Maintenance", fr: "Entretien de flotte" },
        shortDescription: { en: "Preventative programs for commercial fleets.", fr: "Programmes préventifs pour flottes commerciales." },
        pageContent: { en: "We offer tailored maintenance programs to keep your fleet on the road and minimize unexpected downtime.", fr: "On offre des programmes d'entretien sur mesure pour garder votre flotte sur la route et minimiser les temps d'arrêt imprévus." }
      },
      {
        slug: 'saaq-inspection-prep',
        title: { en: "SAAQ Inspection Prep", fr: "Préparation Inspection SAAQ" },
        shortDescription: { en: "Get ready for provincial safety inspections.", fr: "Préparez-vous pour les inspections de sécurité provinciales." },
        pageContent: { en: "We inspect and repair your vehicle to ensure it meets all SAAQ safety standards before your official inspection.", fr: "On inspecte et répare votre véhicule pour s'assurer qu'il respecte toutes les normes SAAQ avant votre inspection officielle." }
      }
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
    subServices: [
      {
        slug: 'trailer-axles',
        title: { en: "Axle Repair & Replacement", fr: "Réparation & remplacement d'essieux" },
        shortDescription: { en: "Fix bent or damaged axles.", fr: "Réparez les essieux croches ou endommagés." },
        pageContent: { en: "We repair and replace damaged axles to ensure your trailer tracks true and carries its load safely.", fr: "On répare et remplace les essieux endommagés pour que votre remorque roule droit et porte sa charge en sécurité." }
      },
      {
        slug: 'trailer-brakes',
        title: { en: "Trailer Brakes", fr: "Freins de remorque" },
        shortDescription: { en: "Electric and hydraulic brake service.", fr: "Service de freins électriques et hydrauliques." },
        pageContent: { en: "We service all trailer braking systems, ensuring your electric or hydraulic brakes engage correctly when you need them.", fr: "On entretient tous les systèmes de freinage de remorque, s'assurant que vos freins électriques ou hydrauliques s'engagent correctement." }
      },
      {
        slug: 'trailer-wiring',
        title: { en: "Wiring & Lighting", fr: "Filage & Éclairage" },
        shortDescription: { en: "Fix lights and connection issues.", fr: "Réparez les lumières et problèmes de connexion." },
        pageContent: { en: "Lighting issues are a common frustration. We diagnose and repair wiring faults, grounds, and connector plugs.", fr: "Les problèmes de lumières sont frustrants. On diagnostique et répare les défauts de filage, les mises à la terre et les connecteurs." }
      },
      {
        slug: 'structural-welding',
        title: { en: "Structural Welding", fr: "Soudure Structurelle" },
        shortDescription: { en: "Frame repair and reinforcement.", fr: "Réparation et renforcement de châssis." },
        pageContent: { en: "Our welders can repair cracks, reinforce frames, and modify trailers to suit your specific needs.", fr: "Nos soudeurs peuvent réparer les fissures, renforcer les châssis et modifier les remorques pour vos besoins spécifiques." }
      }
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
    subServices: [
      {
        slug: 'generator-maintenance',
        title: { en: "Preventative Maintenance", fr: "Entretien Préventif" },
        shortDescription: { en: "Routine check-ups for reliability.", fr: "Vérifications de routine pour la fiabilité." },
        pageContent: { en: "Regular maintenance includes oil changes, filter replacements, and system tests to ensure your generator starts when the power goes out.", fr: "L'entretien régulier inclut changements d'huile, filtres et tests système pour assurer que votre génératrice démarre quand le courant coupe." }
      },
      {
        slug: 'generator-repair',
        title: { en: "Generator Repair", fr: "Réparation de Génératrice" },
        shortDescription: { en: "Fixing starting and running issues.", fr: "Réparation des problèmes de démarrage et fonctionnement." },
        pageContent: { en: "If your generator won't start or runs roughly, our technicians can diagnose engine or electrical faults and repair them quickly.", fr: "Si votre génératrice ne part pas ou roule mal, nos techniciens peuvent diagnostiquer les défauts moteur ou électriques et les réparer vite." }
      },
      {
        slug: 'load-bank-testing',
        title: { en: "Load Bank Testing", fr: "Test de Banc de Charge" },
        shortDescription: { en: "Verify performance under load.", fr: "Vérifiez la performance sous charge." },
        pageContent: { en: "We test your generator under artificial load to ensure it can handle the power demands of your home or business without overheating or failing.", fr: "On teste votre génératrice sous charge artificielle pour s'assurer qu'elle peut supporter la demande de votre maison ou entreprise sans surchauffer." }
      }
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
    subServices: [
      {
        slug: 'frame-repair',
        title: { en: "Frame & Chassis Repair", fr: "Réparation de Châssis" },
        shortDescription: { en: "Structural repairs for vehicles.", fr: "Réparations structurelles pour véhicules." },
        pageContent: { en: "Rust or accident damage can compromise your vehicle's frame. We perform safe, structural welding repairs to restore integrity.", fr: "La rouille ou les accidents peuvent compromettre le châssis. On fait des soudures structurelles sécuritaires pour restaurer l'intégrité." }
      },
      {
        slug: 'custom-exhaust',
        title: { en: "Custom Exhaust Welding", fr: "Soudure Échappement Sur Mesure" },
        shortDescription: { en: "Fabrication for custom exhaust systems.", fr: "Fabrication pour systèmes d'échappement custom." },
        pageContent: { en: "We can fabricate and weld custom exhaust pipes and mounts for modifications or repairs where standard parts aren't available.", fr: "On peut fabriquer et souder des tuyaux et supports d'échappement sur mesure pour des modifications ou réparations où les pièces standard n'existent pas." }
      },
      {
        slug: 'custom-fabrication',
        title: { en: "Custom Fabrication", fr: "Fabrication Sur Mesure" },
        shortDescription: { en: "Brackets, mounts, and unique solutions.", fr: "Supports, fixations et solutions uniques." },
        pageContent: { en: "Need a custom bracket or a specific modification? Our fabrication skills allow us to create unique metal solutions for your needs.", fr: "Besoin d'un support sur mesure ou d'une modification spécifique? Nos compétences en fabrication nous permettent de créer des solutions en métal uniques." }
      }
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
    answer: { en: "We are a full-service shop equipped to handle everything from family cars, SUVs, and light trucks to heavy-duty trucks, commercial fleets, trailers, and even generators. If it has an engine, we can likely fix it.", fr: "Nous sommes un garage complet équipé pour tout gérer, des voitures familiales, VUS et camions légers aux camions lourds, flottes commerciales, remorques et même les génératrices. Si ça a un moteur, on peut probablement le réparer." }
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

const en = {
  header: {
    bookService: 'Get My Quote & Book Appointment',
    allServices: 'All Services',
    checkPrice: 'Check Price & Availability',
    spotsLeft: '3 spots',
    callButton: '(514) 123-4567'
  },
  footer: {
    about: 'Your trusted, family-owned auto and heavy vehicle experts in Mascouche, QC. Honest repairs, guaranteed work.',
    contactUs: 'Contact Us',
    operatingHours: 'Operating Hours',
    quickLinks: 'Quick Links',
    areasServed: 'Areas We Serve',
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
          diagnostics: "Diagnostics / Not Sure",
          tires: "Tires / Wheels"
        },
        offers: {
          alex: {
            title: "Oil Change + Free Brake Inspection ($150 Value)",
            description: "Hear a noise? Get a 50-point brake inspection included with your regular oil change. Safety first.",
            badge: "Most Popular"
          },
          sophie: {
            title: "$49 Diagnostic (100% Credited)",
            description: "Dealer charging too much? Get an honest 2nd opinion. The $49 fee is fully credited back if you do the repair.",
            badge: "Best Value"
          },
          martin: {
            title: "Tire Change + Free Brake Inspection",
            description: "Kill two birds with one stone. We check your brakes for free while your wheels are off.",
            badge: "Seasonal Special"
          }
        }
      },
      3: {
        title: "Tell us about your needs & book a time.",
        descriptionPlaceholder: "Describe the issue (e.g., brake noise, check engine light, tire change, AC maintenance) or the service you're looking for...",
        fullName: "Full Name",
        phone: "Phone",
        email: "Email",
        vehicleYear: "Year",
        vehicleMake: "Make",
        vehicleModel: "Model",
        tireSize: "Tire Size (e.g., 225/45R17)"
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
    },
    urgency: "🔥 2 slots left for tomorrow",
    trustWall: {
      maintenance: "Quickest oil change I've ever had. They even checked my brakes for free.",
      repair: "Fixed my transmission when the dealer said it needed replacing. Saved me $2000!",
      general: "Honest mechanics are hard to find. MGC is the real deal. Highly recommend.",
      verified: "Verified Customer"
    },
    priorityAccess: {
      title: "Priority Access Required",
      description: "For heavy vehicles, we skip the queue. Call our dedicated commercial line now for immediate assistance.",
      code: "Mention code \"FLEET-VIP\" for priority dispatch.",
      label: "Priority Service"
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
  seo: {
    about: {
      description: "Discover the history of MGC Réparation Inc., a trusted family-owned garage in Mascouche, QC. Learn about our commitment to honesty, expertise, and exceptional customer service since 2012."
    },
    contact: {
      description: "Contact MGC Réparation Inc. in Mascouche, QC. Get directions to our shop, our business hours, or request a free quote for your car, heavy truck, or trailer repairs."
    },
    services: {
      description: "Explore the full range of mechanical services offered by MGC Réparation Inc. in Mascouche: general mechanics, heavy truck repair, trailer service, welding, and more."
    },
    privacy: {
      title: "Privacy Policy",
      description: "Review the privacy policy of MGC Réparation Inc. to understand how we protect your personal information on our website."
    }
  },
  landingOffer: {
    urgency: "🔥 {city} Special: Only 3 Spots Left This Week",
    title: "Hear a Brake Noise?",
    subtitle: "Get a FREE Brake Inspection",
    value: "($150 Value)",
    description: "Included with your regular Oil Change in {city}.",
    cards: {
      trojan: {
        title: "Trojan Horse Offer",
        description: "We don't just look. We inspect 50 points of safety while we change your oil."
      },
      credited: {
        title: "100% Credited",
        description: "If repairs are needed, the inspection value is credited back to you."
      },
      safety: {
        title: "Safety First",
        description: "Don't risk it. Know exactly what's wrong before you pay a dime."
      }
    },
    cta: "Claim My Free Inspection Now",
    disclaimer: "Valid for {city} residents. No obligation to repair."
  },
  landingHealthCheck: {
    badge: "🛡️ The \"Honest Mechanic\" Guarantee in {city}",
    title: "Dealer Quoted You a Fortune?",
    subtitle: "Get a Second Opinion for $49",
    description: "(And we credit 100% of it back if you do the repair).",
    cards: {
      scan: {
        title: "Full 50-Point Scan",
        description: "We check everything. No guessing. You get a clear, jargon-free report."
      },
      credited: {
        title: "100% Credited Back",
        description: "The $49 fee vanishes if you proceed with the repair. It's effectively free."
      },
      pressure: {
        title: "No Pressure",
        description: "We tell you the truth. You decide what to do. No sales tactics."
      }
    },
    cta: "Book My $49 Credited Session",
    disclaimer: "Trusted by 500+ {city} drivers."
  },
  landingTires: {
    badge: "❄️ Seasonal Special: Limited Slots in {city}",
    title: "Need a Tire Change?",
    subtitle: "Get a FREE Brake Inspection",
    description: "While We're At It. Two services. One trip. Zero wasted time.",
    cards: {
      install: {
        title: "Professional Install",
        description: "Mounting, balancing, and torque check. Done right the first time."
      },
      check: {
        title: "Free Brake Check",
        description: "Since the wheels are off, we check your pads and rotors for free ($150 value)."
      },
      fast: {
        title: "Fast Service",
        description: "We respect your time. Book a slot and get back on the road quickly."
      }
    },
    cta: "Book My Tire Combo Now",
    disclaimer: "Available for all car makes & models in {city}."
  }
};

const fr: typeof en = {
  header: {
    bookService: 'Obtenir ma soumission et rendez-vous',
    allServices: 'Tous les services',
    checkPrice: 'Voir Prix & Dispo',
    spotsLeft: '3 places',
    callButton: '(514) 123-4567'
  },
  footer: {
    about: 'Votre garage familial de confiance pour l\'auto et les véhicules lourds à Mascouche, QC. Réparations honnêtes, travail garanti.',
    contactUs: 'Nous Contacter',
    operatingHours: 'Heures d\'Ouverture',
    quickLinks: 'Liens Rapides',
    areasServed: 'Zones Desservies',
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
          diagnostics: "Diagnostic / Pas certain",
          tires: "Pneus / Roues"
        },
        offers: {
          alex: {
            title: "Changement d'Huile + Inspection Freins Gratuite (Valeur 150$)",
            description: "Bruit suspect? Inspection 50 points incluse avec votre changement d'huile. Votre sécurité avant tout.",
            badge: "Plus Populaire"
          },
          sophie: {
            title: "Diagnostic à 49$ (100% Crédité)",
            description: "Le concessionnaire charge trop cher? Obtenez un 2e avis honnête. Le 49$ est 100% crédité sur votre réparation.",
            badge: "Meilleure Valeur"
          },
          martin: {
            title: "Combo Pneus + Inspection Gratuite",
            description: "2 services en 1. On vérifie vos freins gratuitement pendant que vos roues sont enlevées.",
            badge: "Spécial Saisonnier"
          }
        }
      },
      3: {
        title: "Parlez-nous de vos besoins et réservez une heure.",
        descriptionPlaceholder: "Décrivez le problème (ex: bruit de freins, voyant moteur allumé, besoin de changement de pneus, entretien AC) ou le service que vous cherchez...",
        fullName: "Nom complet",
        phone: "Téléphone",
        email: "Courriel",
        vehicleYear: "Année",
        vehicleMake: "Marque",
        vehicleModel: "Modèle",
        tireSize: "Taille de pneu (ex: 225/45R17)"
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
    },
    urgency: "🔥 2 places restantes pour demain",
    trustWall: {
      maintenance: "Le changement d'huile le plus rapide que j'ai eu. Ils ont même vérifié mes freins gratuitement.",
      repair: "Ils ont réparé ma transmission quand le concessionnaire disait de la changer. J'ai sauvé 2000$!",
      general: "C'est dur de trouver des mécanos honnêtes. MGC c'est la vraie affaire. Je recommande fortement.",
      verified: "Client Vérifié"
    },
    priorityAccess: {
      title: "Accès Prioritaire Requis",
      description: "Pour les véhicules lourds, on saute la file. Appelez notre ligne commerciale dédiée maintenant pour une assistance immédiate.",
      code: "Mentionnez le code \"FLOTTE-VIP\" pour un dispatch prioritaire.",
      label: "Service Prioritaire"
    }
  },
  prequalificationForm: {
    formTitle: 'OBTENEZ VOTRE SOUMISSION SUR MESURE',
    infoPanel: {
      title: 'Trouvez rapidement le service mécanique parfait pour vos besoins.',
      subtitle: 'Notre formulaire intelligent vous connecte au meilleur expert et vous donne un prix juste, sans obligation.'
    },
    steps: {
      1: {
        alex_anxieux: { title: "Décrivez le problème urgent avec votre véhicule" },
        sophie_sage: { title: "Quel type d'entretien ou inspection cherchez-vous ?" },
        martin_prevoyant: { title: "Quelle est la date approximative pour votre service prévu ?" }
      },
      2: {
        title: "Détails du Véhicule"
      },
      3: {
        title: "Planifiez votre rendez-vous"
      },
      4: {
        title: "Presque fini!"
      }
    },
    buttons: {
      continue: "Continuer",
      back: "Retour",
      submit: "Envoyer ma demande"
    }
  },
  seo: {
    about: {
      description: "Découvrez l'histoire de MGC Réparation Inc., un garage familial de confiance à Mascouche, QC. Apprenez-en plus sur notre engagement envers l'honnêteté, l'expertise et un service client exceptionnel depuis 2012."
    },
    contact: {
      description: "Contactez MGC Réparation Inc. à Mascouche, QC. Obtenez l'itinéraire vers notre garage, nos heures d'ouverture, ou demandez une soumission gratuite pour vos réparations d'auto, camion lourd ou remorque."
    },
    services: {
      description: "Explorez la gamme complète de services mécaniques offerts par MGC Réparation Inc. à Mascouche : mécanique générale, réparation de camions lourds, service de remorques, soudure, et plus."
    },
    privacy: {
      title: "Politique de Confidentialité",
      description: "Consultez la politique de confidentialité de MGC Réparation Inc. pour comprendre comment nous protégeons vos informations personnelles sur notre site web."
    }
  },
  landingOffer: {
    urgency: "🔥 Spécial {city}: Seulement 3 places restantes cette semaine",
    title: "Bruit de freins suspect?",
    subtitle: "Obtenez une Inspection de Freins GRATUITE",
    value: "(Valeur 150$)",
    description: "Incluse avec votre changement d'huile régulier à {city}.",
    cards: {
      trojan: {
        title: "Offre Cheval de Troie",
        description: "On ne fait pas juste regarder. On inspecte 50 points de sécurité pendant qu'on change votre huile."
      },
      credited: {
        title: "100% Crédité",
        description: "Si des réparations sont nécessaires, la valeur de l'inspection vous est créditée."
      },
      safety: {
        title: "Sécurité Avant Tout",
        description: "Ne prenez pas de risque. Sachez exactement ce qui ne va pas avant de payer un sou."
      }
    },
    cta: "Réclamer mon Inspection Gratuite",
    disclaimer: "Valide pour les résidents de {city}. Aucune obligation de réparation."
  },
  landingHealthCheck: {
    badge: "🛡️ La Garantie \"Mécanicien Honnête\" à {city}",
    title: "Le concessionnaire charge trop cher?",
    subtitle: "Obtenez un 2e avis pour 49$",
    description: "(Et on vous le crédite à 100% si vous faites la réparation).",
    cards: {
      scan: {
        title: "Scan Complet 50 Points",
        description: "On vérifie tout. Pas de devinettes. Vous recevez un rapport clair, sans jargon."
      },
      credited: {
        title: "100% Remboursé",
        description: "Le frais de 49$ disparaît si vous procédez à la réparation. C'est effectivement gratuit."
      },
      pressure: {
        title: "Pas de Pression",
        description: "On vous dit la vérité. Vous décidez quoi faire. Pas de tactiques de vente."
      }
    },
    cta: "Réserver ma Session Créditée à 49$",
    disclaimer: "La confiance de 500+ conducteurs de {city}."
  },
  landingTires: {
    badge: "❄️ Spécial Saisonnier: Places Limitées à {city}",
    title: "Besoin de changer vos pneus?",
    subtitle: "Obtenez une Inspection de Freins GRATUITE",
    description: "Pendant qu'on y est. Deux services. Un voyage. Zéro perte de temps.",
    cards: {
      install: {
        title: "Installation Pro",
        description: "Montage, balancement et vérification du couple. Bien fait du premier coup."
      },
      check: {
        title: "Vérification Freins Gratuite",
        description: "Puisque les roues sont enlevées, on vérifie vos plaquettes et disques gratuitement (valeur 150$)."
      },
      fast: {
        title: "Service Rapide",
        description: "On respecte votre temps. Réservez une plage et reprenez la route rapidement."
      }
    },
    cta: "Réserver mon Combo Pneus Maintenant",
    disclaimer: "Disponible pour toutes marques & modèles à {city}."
  }
};

export const translations = { en, fr };