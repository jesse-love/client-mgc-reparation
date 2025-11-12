import { WHY_CHOOSE_US_POINTS } from './data';

const en = {
  header: {
    bookService: 'Book Service',
    allServices: 'All Services'
  },
  footer: {
    about: 'Your trusted, family-owned auto and heavy vehicle experts in Mascouche, QC since 2012.',
    contactUs: 'Contact Us',
    operatingHours: 'Operating Hours',
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
      subtitle: 'We’re more than just mechanics; we’re your neighbors dedicated to ensuring the safety and performance of your vehicles and equipment in Mascouche.',
      // The data is now imported, but the translation text remains.
      points: WHY_CHOOSE_US_POINTS.map(p => ({
          title: p.title,
          description: p.description,
          icon: p.icon
      }))
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Live from our Google Reviews!'
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
    },
    // FIX: Added appointment translations for date/time picker
    appointment: {
        appointmentDatePlaceholder: "Choose an appointment date",
        selectDateFirst: "Select a date first",
        appointmentTimePlaceholder: "Select a time slot",
        noSlotsAvailable: "No slots available for this date"
    }
  },
  ppl: {
      offre: {
          formTitle: "YES! I want my FREE inspection!",
          firstName: "First Name",
          phone: "Phone (Required)",
          ctaButton: "YES! I WANT MY FREE INSPECTION!",
          reassurance: "100% free guarantee. No obligation. Fast response assured.",
          h1: "Suspicious Brake Noise? Get your 100% FREE inspection in Terrebonne.",
          h3: "\"Dealers charge you $150 just to look at your car. Forget that. Get an honest and free diagnosis from our certified experts in Terrebonne, and know exactly what's wrong before paying a dime.\"",
          desireTitle: "Get back on the road with peace of mind. Your free inspection includes:",
          benefits: [
              "Know the real problem: Receive a precise and honest diagnosis, without jargon.",
              "Save instantly: Get a 10% discount on all necessary parts if a repair is required.",
              "Drive safely: Get back on the road knowing your brakes are 100% safe.",
              "No surprises: We never do repairs without your clear approval."
          ],
          socialProofTitle: "What our Terrebonne clients say:",
          finalActionTitle: "Don't risk your safety one more day.",
          finalActionCta: "BOOK YOUR 100% FREE INSPECTION NOW!"
      },
      bilan: {
          formTitle: "Get your FREE estimate",
          // FIX: Added missing form field translations
          firstName: "First Name",
          phone: "Phone (Required)",
          ctaButton: "YES! I WANT MY HONEST ESTIMATE!",
          reassurance: "100% free guarantee. No obligation. No-pressure sales.",
          h1: "Is your dealership overcharging you? Get a 100% FREE health check for your brakes.",
          h3: "\"Dealers love '$150 inspections' to sell you unnecessary repairs. Forget that. Get an honest diagnosis from our certified experts. Zero obligation. Zero jargon. Just the truth about your vehicle's condition.\"",
          desireTitle: "Get ahead of it. Avoid big bills.",
          benefits: [
              "Detect problems BEFORE they become $2000 catastrophes.",
              "Get a clear, no-pressure maintenance plan. We tell you what's urgent and what can wait.",
              "Validate (or contest) your dealer's quote. Our estimate is 100% free and without commitment.",
              "Save 10% on parts if preventative maintenance is necessary."
          ],
          socialProofTitle: "Our clients appreciate our transparency:",
          finalActionTitle: "Peace of mind has no price. Especially when it's free.",
          finalActionCta: "RESERVE YOUR FREE HEALTH CHECK!"
      },
      pneus: {
          formTitle: "Reserve your \"Combo\" Tires + Brakes!",
          // FIX: Added missing form field translations
          firstName: "First Name",
          phone: "Phone (Required)",
          ctaButton: "YES! I WANT MY \"COMBO\" SEASONAL!",
          reassurance: "Free inspection with your tire change. Guaranteed fast service.",
          h1: "Time to change your tires? Add a FREE Brake Inspection (Value $99).",
          h3: "\"Why make two trips to the garage? While your tires are being changed in Terrebonne, our experts will inspect your brakes for free. Leave in complete safety for the new season.\"",
          desireTitle: "Be ready for the road. It's simple, fast, and smart.",
          benefits: [
              "Save time: Do everything in one appointment. It's the most efficient solution in Terrebonne.",
              "It's logical: The wheels are already off for the tires. It's the perfect time for a complete visual inspection of your brakes.",
              "Leave safely: After your tires, the brakes are the #1 safety element to check before winter (or summer).",
              "Save 10% on parts: If your pads or discs are worn, get a 10% discount on replacement parts."
          ],
          socialProofTitle: "Our clients love the efficiency of our seasonal service:",
          finalActionTitle: "Be ready for the new season. Leave nothing to chance.",
          finalActionCta: "RESERVE YOUR TIRE CHANGE + FREE INSPECTION!"
      },
      merci: {
          title: "Thank You!",
          message: "Your request has been received. Our team will contact you shortly to confirm the details.",
          backToHome: "Back to Main Site"
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
    operatingHours: 'Heures d\'Ouverture',
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
      subtitle: 'On est pas juste des mécanos; on est vos voisins, dédiés à assurer la sécurité et la performance de vos chars et équipements à Mascouche.',
       points: WHY_CHOOSE_US_POINTS.map(p => ({
          title: p.title,
          description: p.description,
          icon: p.icon
      }))
    },
    testimonials: {
      title: 'Ce que nos Clients en Disent',
      subtitle: 'En direct de nos avis Google!'
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
    },
    // FIX: Added appointment translations for date/time picker
    appointment: {
        appointmentDatePlaceholder: "Choisissez une date de rendez-vous",
        selectDateFirst: "Sélectionnez d'abord une date",
        appointmentTimePlaceholder: "Sélectionnez une plage horaire",
        noSlotsAvailable: "Aucun créneau disponible pour cette date"
    }
  },
  ppl: {
      offre: {
          formTitle: "OUI! Je veux mon inspection GRATUITE!",
          firstName: "Prénom",
          phone: "Téléphone (Requis)",
          ctaButton: "OUI! JE VEUX MON INSPECTION GRATUITE!",
          reassurance: "Garanti 100% gratuit. Sans obligation. Réponse rapide assurée.",
          h1: "Bruit de freins suspect? Obtenez votre inspection 100% GRATUITE à Terrebonne.",
          h3: "\"Les concessionnaires vous facturent 150$ juste pour regarder votre auto. Oubliez ça. Obtenez un diagnostic honnête et gratuit de nos experts certifiés à Terrebonne, et sachez exactement ce qui ne va pas avant de payer un sou.\"",
          desireTitle: "Reprenez la route l'esprit tranquille. Votre inspection gratuite inclut :",
          benefits: [
              "Sachez le vrai problème: Recevez un diagnostic précis et honnête, sans jargon.",
              "Économisez instantanément: Obtenez 10% de rabais sur toutes les pièces nécessaires si une réparation est requise.",
              "Conduisez en sécurité: Reprenez la route en sachant que vos freins sont 100% sécuritaires.",
              "Pas de surprises: Nous ne faisons jamais de réparations sans votre approbation claire."
          ],
          socialProofTitle: "Ce que nos clients de Terrebonne disent :",
          finalActionTitle: "Ne risquez pas votre sécurité un jour de plus.",
          finalActionCta: "RÉSERVEZ VOTRE INSPECTION 100% GRATUITE MAINTENANT!"
      },
      bilan: {
          formTitle: "Obtenez votre bilan GRATUIT",
          // FIX: Added missing form field translations
          firstName: "Prénom",
          phone: "Téléphone (Requis)",
          ctaButton: "OUI! JE VEUX MON BILAN HONNÊTE!",
          reassurance: "Garanti 100% gratuit. Sans obligation. Pas de vente sous pression.",
          h1: "Votre concessionnaire vous charge-t-il trop cher? Obtenez un bilan de santé 100% GRATUIT pour vos freins.",
          h3: "\"Les concessionnaires adorent les 'inspections' à 150$ pour vous vendre des réparations inutiles. Oubliez ça. Obtenez un diagnostic honnête de nos experts certifiés. Zéro obligation. Zéro jargon. Juste la vérité sur l'état de votre véhicule.\"",
          desireTitle: "Prenez les devants. Évitez les grosses factures.",
          benefits: [
              "Détectez les problèmes AVANT qu'ils ne deviennent des catastrophes à 2000$.",
              "Obtenez un plan d'entretien clair et sans pression. Nous vous disons ce qui est urgent et ce qui peut attendre.",
              "Validez (ou contestez) le devis de votre concessionnaire. Notre bilan est 100% gratuit et sans engagement.",
              "Économisez 10% sur les pièces si une maintenance préventive est nécessaire."
          ],
          socialProofTitle: "Nos clients apprécient notre transparence :",
          finalActionTitle: "La tranquillité d'esprit n'a pas de prix. Surtout quand elle est gratuite.",
          finalActionCta: "RÉSERVEZ VOTRE BILAN DE SANTÉ GRATUIT!"
      },
      pneus: {
          formTitle: "Réservez votre \"Combo\" Pneus + Freins!",
          // FIX: Added missing form field translations
          firstName: "Prénom",
          phone: "Téléphone (Requis)",
          ctaButton: "OUI! JE VEUX MON \"COMBO\" SAISONNIER!",
          reassurance: "Inspection gratuite avec votre changement de pneus. Service rapide garanti.",
          h1: "Temps de changer vos pneus? Ajoutez une Inspection de Freins GRATUITE (Valeur 99$).",
          h3: "\"Pourquoi faire deux voyages au garage? Pendant que vos pneus sont changés à Terrebonne, nos experts inspecteront vos freins gratuitement. Repartez en toute sécurité pour la nouvelle saison.\"",
          desireTitle: "Soyez prêt pour la route. C'est simple, rapide et intelligent.",
          benefits: [
              "Économisez du temps: Faites tout en un seul rendez-vous. C'est la solution la plus efficace à Terrebonne.",
              "C'est logique: Les roues sont déjà enlevées pour les pneus. C'est le moment idéal pour une inspection visuelle complète de vos freins.",
              "Repartez en sécurité: Après vos pneus, les freins sont l'élément de sécurité #1 à vérifier avant l'hiver (ou l'été).",
              "Économisez 10% sur les pièces: Si vos plaquettes ou disques sont usés, obtenez 10% de rabais sur les pièces de remplacement."
          ],
          socialProofTitle: "Nos clients adorent l'efficacité de notre service saisonnier :",
          finalActionTitle: "Soyez prêt pour la nouvelle saison. Ne laissez rien au hasard.",
          finalActionCta: "RÉSERVEZ VOTRE CHANGEMENT DE PNEUS + INSPECTION GRATUITE!"
      },
      merci: {
          title: "Merci!",
          message: "Votre demande a été reçue. Notre équipe vous contactera sous peu pour confirmer les détails.",
          backToHome: "Retour au site principal"
      }
  }
};

export const translations = { en, fr };