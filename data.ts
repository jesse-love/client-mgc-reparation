import type { Service, NavLink, PPLTestimonial } from './types';
import { WrenchScrewdriverIcon, TruckIcon, CogIcon, FireIcon, BoltIcon, SunIcon } from '@heroicons/react/24/outline';

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
        { title: { en: 'Strength & Safety', fr: 'Solidité & Sécurité' }, description: { en: 'We prioritize structural integrity and safety in all our welding work.', fr: "On priorise l'intégrité structurale et la sécurité dans tous nos travaux de soudure." } },
    ]
  },
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

export const PPL_TESTIMONIALS: { [key: string]: PPLTestimonial[] } = {
  offre: [
    {
      quote: {
        en: '"Fast and honest service. They found the problem my old garage couldn\'t see. I trust them completely."',
        fr: '"Service rapide et honnête. Ils ont trouvé le problème que mon ancien garage ne voyait pas. Je leur fais confiance les yeux fermés."'
      },
      author: { en: 'Julie P., Terrebonne', fr: 'Julie P., Terrebonne' }
    },
    {
      quote: {
        en: '"I saved $200 compared to the dealer\'s quote. My only garage now. Thanks MGC!"',
        fr: '"J\'ai sauvé 200$ par rapport à la soumission du concessionnaire. Mon seul garage maintenant. Merci MGC!"'
      },
      author: { en: 'Marc L., Mascouche', fr: 'Marc L., Mascouche' }
    },
    {
      quote: {
        en: '"My brakes were grinding and I was scared. They took me in the same day. Incredible service. I recommend them 100%."',
        fr: '"Mes freins grinçaient et j\'avais peur. Ils m\'ont pris le jour-même. Service incroyable. Je recommande à 100%."'
      },
      author: { en: 'Sophie B., Terrebonne', fr: 'Sophie B., Terrebonne' }
    }
  ],
  bilan: [
    {
      quote: {
        en: '"Tired of being ripped off by the dealer. The team at MGC gave me the straight goods. Honest and professional. I\'m not going anywhere else."',
        fr: '"Fatigué de me faire avoir par le concessionnaire. L\'équipe de MGC m\'a donné l\'heure juste. Honnêtes et professionnels. Je ne vais plus ailleurs."'
      },
      author: { en: 'David R., Terrebonne', fr: 'David R., Terrebonne' }
    },
    {
      quote: {
        en: '"They clearly explained what needed to be done now and what could wait 6 months. I finally have a garage I can trust in Mascouche. Priceless."',
        fr: '"Ils m\'ont expliqué clairement ce qui devait être fait maintenant et ce qui pouvait attendre 6 mois. J\'ai enfin un garage de confiance à Mascouche. Ça n\'a pas de prix."'
      },
      author: { en: 'Sophie L.', fr: 'Sophie L.' }
    },
    {
      quote: {
        en: '"The free inspection allowed me to save money on a repair that my other garage deemed \'urgent\'. Thanks for the honesty. I recommend MGC."',
        fr: '"L\'inspection gratuite m\'a permis d\'économiser sur une réparation que mon autre garage jugeait \'urgente\'. Merci pour l\'honnêteté. Je recommande MGC."'
      },
      author: { en: 'Michel P.', fr: 'Michel P.' }
    }
  ],
  pneus: [
     {
      quote: {
        en: '"I go to MGC for my tires every season. The service is fast, and the free brake inspection gave me peace of mind for the winter."',
        fr: '"Je vais chez MGC pour mes pneus chaque saison. Le service est rapide, et l\'inspection gratuite des freins m\'a donné la paix d\'esprit pour l\'hiver."'
      },
      author: { en: 'Martin V., Terrebonne', fr: 'Martin V., Terrebonne' }
    },
    {
      quote: {
        en: '"Super service! I was able to get my tire change and a check-up at the same time. Efficient and honest team."',
        fr: '"Super service! J\'ai pu faire mon changement de pneus et une vérification en même temps. Équipe efficace et honnête."'
      },
      author: { en: 'Isabelle D., Mascouche', fr: 'Isabelle D., Mascouche' }
    },
    {
      quote: {
        en: '"They noticed my brake pads were almost finished during my tire change. It saved me another trip! I recommend."',
        fr: '"Ils ont remarqué que mes plaquettes de frein étaient presque finies pendant mon changement de pneus. Ça m\'a sauvé un autre voyage! Je recommande."'
      },
      author: { en: 'Patrick G.', fr: 'Patrick G.' }
    }
  ]
};
