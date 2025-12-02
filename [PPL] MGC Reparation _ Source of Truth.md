# \[PLAN DE BATAILLE\] Machine PPL garageterrebonne.ca

# \[ PLAN DE BATAILLE \] Machine PPL mgcreparation.ca

Ce document présente l'implémentation complète du système de paiement par prospect (PPL) multi-avatars pour [mgcreparation.ca](http://garageterrebonne.ca).-----

## Section 1 : Stratégie de base : Les 3 Avatars

Notre stratégie consiste à cibler trois segments de clientèle distincts avec trois pages de destination séparées et à forte conversion.

* **Avatar 1 : Alex l'Anxieux**  
  * **Public :** Le conducteur « en détresse » (B2C).  
  * **Douleur :** Aiguë, immédiate, émotionnelle. Les freins grincent *maintenant*. Il a peur et craint de se faire arnaquer.  
  * **Psychologie :** Peur, Urgence, Méfiance. Il cherche un sauveteur.  
  * **L'« Angle » :** SÉCURITÉ & URGENCE. Nous utilisons un langage direct, rapide et rassurant.  
  * **Tag :** `ppl_lead_brakes_inspection`.

* **Avatar 2 : Sophie la Sage**  
  * **Public :** La « planificatrice proactive » / Propriétaire soucieux de son budget.  
  * **Douleur :** Logique et financière. Sa voiture n'est plus sous garantie et elle veut détecter les petits problèmes *avant* qu'ils ne deviennent coûteux. Elle se méfie des concessionnaires.  
  * **Psychologie :** Prudence, Scepticisme, Valeur. Elle est à la recherche d'un expert de confiance.  
  * **L'« Angle » :** CONFIANCE & VALEUR. Nous dénonçons l'« Ennemi Commun » (le concessionnaire qui facture trop cher).  
  * **Tag :** `ppl_lead_health_check`.

* **Avatar 3 : Martin le Prévoyant**  
  * **Public :** Le conducteur « saisonnier » (Chaque conducteur au Québec, deux fois par an).  
  * **Douleur :** Commodité. Il est *déjà* en train de faire effectuer un changement de pneus obligatoire et considère cela comme une corvée. Il veut être efficace.  
  * **Psychologie :** Efficacité, Aspect pratique, Recherche de bonnes affaires. C'est un « regroupeur » logique, pas en détresse ni sceptique.  
  * **L'« Angle » :** COMMODITÉ & VALEUR GROUPÉE. Nous interceptons sa recherche de changement de pneus et lui offrons un « ajout » logique.  
  * **Tag :** `ppl_lead_seasonal`.

## Section 2 : Plans des Pages de Destination (GHL)

Construire ces trois pages de destination distinctes dans GHL. **Principe de base :** Pas de menu de navigation, pas de liens externes (sauf politique de confidentialité), pas de distractions. La seule sortie est le formulaire.

* ### Plan 1 : Avatar 1 (Alex) \- `mgcreparation.ca/offre`

  * **H1 (Titre) :** Bruit de freins suspect? Obtenez votre inspection 100% GRATUITE à Terrebonne.  
  * **H3 (Accroche) :** "Les concessionnaires vous facturent 150$... Oubliez ça. Obtenez un diagnostic honnête et gratuit..."  
  * **CTA du formulaire :** OUI \! JE VEUX MON INSPECTION GRATUITE \!  
  * **Désir (Avantages) :** Sachez le vrai problème, Économisez 10% de rabais, Conduisez en sécurité, Pas de surprises.

* ### Plan 2 : Avatar 2 (Sophie) \- `mgcreparation.ca/bilan`

  * **H1 (Titre) :** Votre concessionnaire vous charge-t-il trop cher? Obtenez un bilan de santé 100% GRATUIT pour vos freins.  
  * **H3 (Accroche) :** "Les concessionnaires adorent les 'inspections' à 150$... Zéro obligation. Zéro jargon. Juste la vérité..."  
  * **CTA du formulaire :** OUI \! JE VEUX MON BILAN HONNÊTE \!  
  * **Désir (Avantages) :** Détectez les problèmes AVANT, Obtenez un plan d'entretien clair, Validez (ou contestez) le devis, Économisez 10%.

* #### Plan 3 : Avatar 3 (Martin) \- `mgcreparation.ca/pneus`

  * **H1 (Titre) :** Temps de changer vos pneus? Ajoutez une Inspection de Freins GRATUITE (Valeur 99$).  
  * **H3 (Accroche) :** "Pourquoi faire deux voyages au garage? Pendant que vos pneus sont changés... nos experts inspecteront vos freins gratuitement..."  
  * **CTA du formulaire :** OUI \! JE VEUX MON "COMBO" SAISONNIER \!  
  * **Désir (Avantages) :** Économisez du temps, C'est logique (roues déjà enlevées), Repartez en sécurité, Économisez 10%.

## Section 3 : Génération de Trafic : Google Ads

Créer trois groupes d'annonces distincts, chacun avec une « correspondance de message » avec sa page de destination spécifique.

* **Groupe d'Annonces 1 : Alex l'Anxieux (Douleur)**  
  * **Mots-clés :** `bruit freins voiture`, `réparation freins terrebonne`, `mécanicien urgent`.  
  * **Texte de l'Annonce :**  
    * H1 : Freins qui Grincent?  
    * H2 : Inspection 100% Gratuite  
    * Desc : Bruit suspect? Obtenez un diagnostic honnête et gratuit de nos experts. Réponse rapide.  
  * **Destination :** [`mgcreparation.ca/offre`](http://garageterrebonne.ca/offre).

* **Groupe d'Annonces 2 : Sophie la Sage (Confiance)**  
  * **Mots-clés :** `mécanicien honnête terrebonne`, `avis garage terrebonne`, `deuxième avis mécanicien`.  
  * **Texte de l'Annonce :**  
    * H1 : Dealer Trop Cher?  
    * H2 : Obtenez un 2e Avis Gratuit  
    * Desc : Fatigué de payer trop cher? Obtenez un diagnostic honnête et gratuit de nos experts.  
  * **Destination :** [`mgcreparation.ca/bilan`](http://garageterrebonne.ca/bilan).

* **Groupe d'Annonces 3 : Martin le Prévoyant (Groupe)**  
  * **Mots-clés :** `changement pneu terrebonne`, `pose de pneu mascouche`, `service pneus`.  
  * **Texte de l'Annonce :**  
    * H1 : Changement Pneus Terrebonne  
    * H2 : Inspection Freins Gratuite  
    * Desc : Changez vos pneus et obtenez une inspection de freins 100% gratuite. Service 2-en-1.  
  * **Destination :** [`mgcreparation.ca/pneus`](http://garageterrebonne.ca/pneus).

## Section 4 : Flux de Travail d'Automatisation GHL

Créer un seul pipeline de vente à 5 étapes (Prospect Entrant, Contacté, Qualifié, Rendez-vous Pris, Gagné, Perdu). Ensuite, construire ces trois flux de travail distincts.

* **Flux de Travail 1 (Alex) : « Prospect Urgent »**  
  * **Déclencheur :** Formulaire 1 (/offre) soumis.  
  * **Actions :**  
    1. Ajouter un Tag : `ppl_lead_brakes_inspection`.  
    2. Créer une Opportunité à l'étape Prospect Entrant.  
    3. SMS Interne (à MGC) : "🚨 **LEAD URGENT (Freins)**: \[Nom\], \[Téléphone\]. Appelez-le MAINTENANT."  
    4. SMS Externe (à Alex) : "Bonjour \[Nom\], c'est MGC. Nous avons votre demande d'inspection URGENTE. Un expert vous appelle d'ici 5 minutes."

* **Flux de Travail 2 (Sophie) : « Prospect Sceptique »**  
  * **Déclencheur :** Formulaire 2 (/bilan) soumis.  
  * **Actions :**  
    1. Ajouter un Tag : `ppl_lead_health_check`.  
    2. Créer une Opportunité à l'étape Prospect Entrant.  
    3. SMS Interne (à MGC) : "✅ **NOUVEAU LEAD (Bilan)**: \[Nom\], \[Téléphone\]. Appelez-le pour booker son inspection gratuite."  
    4. SMS Externe (à Sophie) : "Bonjour \[Nom\], c'est MGC. Nous avons bien reçu votre demande pour un bilan de santé gratuit. Nous vous appelons sous peu pour confirmer un moment qui vous convient."

* **Flux de Travail 3 (Martin) : « Prospect Groupé »**  
  * **Déclencheur :** Formulaire 3 (/pneus) soumis.  
  * **Actions :**  
    1. Ajouter un Tag : `ppl_lead_seasonal`.  
    2. Créer une Opportunité à l'étape Prospect Entrant.  
    3. SMS Interne (à MGC) : "❄️ **NOUVEAU LEAD (Pneus)**: \[Nom\], \[Téléphone\]. Appelez-le pour booker son changement de pneus \+ inspection gratuite."  
    4. SMS Externe (à Martin) : "Bonjour \[Nom\], c'est MGC. Nous avons votre demande pour le combo changement de pneus \+ inspection de freins gratuite. Nous vous appelons pour confirmer votre rendez-vous."

## Section 5 : Schéma de Suivi et d'Analyse (GTM/GA4)

C'est le cerveau. Tout le suivi est basé sur une seule page de remerciement : `garageterrebonne.ca/merci`.

1. **Conteneur GTM :** Installer un conteneur GTM sur les quatre pages (/offre, /bilan, /pneus et /merci).  
2. **Événement GTM 1 : `view_landing_page`**  
   * **Déclencheur :** Vue de la page sur l'URL *contient* `/offre` OU `/bilan` OU `/pneus`.  
   * **Action :** Envoyer à GA4.  
3. **Événement GTM 2 : `generate_lead` (CONVERSION)**  
   * **Déclencheur :** Vue de la page sur l'URL *contient* `/merci`.  
   * **Actions :**  
     * Envoyer l'événement `generate_lead` à GA4. (Marquer ceci comme une Conversion dans GA4).  
     * Envoyer la balise de conversion Google Ads.  
     * Envoyer l'événement « Lead » de Meta Pixel.  
   * **Paramètre Personnalisé :** Ajouter un paramètre `avatar_type` qui lit la variable « Chemin de la page de référence » :  
     * Si le Référent *contient* `/offre`, valeur \= `alex_anxieux`.  
     * Si le Référent *contient* `/bilan`, valeur \= `sophie_sage`.  
     * Si le Référent *contient* `/pneus`, valeur \= `martin_prevoyant`.  
4. **Audiences GA4 :**  
   * **Audience 1 (Abandonneurs) :** Utilisateurs qui ont déclenché `view_landing_page` MAIS PAS `generate_lead`. (Utiliser pour le Retargeting).  
   * **Audience 2 (Leads) :** Utilisateurs qui ont déclenché `generate_lead`. (EXCLURE de toutes les campagnes publicitaires).

## Section 6 : Liste de l'Implémentation Étape par Étape

1. **Phase 1 : Fondation GHL**  
   * Construire un pipeline de vente à 5 étapes dans GHL.  
   * Acheter `mgcreparation.ca` et le connecter à GHL.  
2. **Phase 2 : Fondation Technique**  
   * Créer un conteneur GTM.  
   * Créer une propriété GA4.  
   * Installer GTM sur le domaine GHL.  
3. **Phase 3 : Construction de l'Entonnoir**  
   * Créer 3 formulaires GHL séparés (Formulaire 1, 2, 3).  
   * Construire la Page de Destination 1 (`/offre`) et intégrer le Formulaire 1\.  
   * Construire la Page de Destination 2 (`/bilan`) et intégrer le Formulaire 2\.  
   * Construire la Page de Destination 3 (`/pneus`) et intégrer le Formulaire 3\.  
   * Construire une page « Merci » (`/merci`).  
   * Configurer les 3 formulaires pour rediriger vers `/merci` en cas de succès.  
4. **Phase 4 : Construction de l'Automatisation**  
   * Construire le Flux de Travail GHL 1 (Alex).  
   * Construire le Flux de Travail GHL 2 (Sophie).  
   * Construire le Flux de Travail GHL 3 (Martin).  
5. **Phase 5 : Construction du Suivi**  
   * Configurer l'événement `view_landing_page` dans GTM.  
   * Configurer l'événement `generate_lead` dans GTM.  
   * Configurer le paramètre personnalisé `avatar_type` dans GTM.  
   * Marquer `generate_lead` comme une conversion dans GA4.  
   * Construire les Audiences dans GA4.  
6. **Phase 6 : Construction du Trafic**  
   * Construire la Campagne Google Ads 1 (Alex).  
   * Construire la Campagne Google Ads 2 (Sophie).  
   * Construire la Campagne Google Ads 3 (Martin).  
   * Lier GA4 à Google Ads et importer les conversions.  
7. **Phase 7 : Test et Lancement**  
   * **Tester l'Entonnoir 1 :** Soumettre le formulaire `/offre`. Vérifier : (1) Redirection vers `/merci`, (2) L'événement GA4 se déclenche, (3) Tag/Opportunité GHL, (4) SMS Interne, (5) SMS Externe.  
   * **Tester l'Entonnoir 2 :** Soumettre le formulaire `/bilan`. Vérifier les 5 étapes.  
   * **Tester l'Entonnoir 3 :** Soumettre le formulaire `/pneus`. Vérifier les 5 étapes.  
   * **Lancer :** Activer les campagnes Google Ads.

# 🎯 PPL Core Strategy & Avatars

## **🎯 Sección: PPL Core Strategy & Avatars**

This section defines the core customer avatars for the PPL machine. All assets (Landing Pages, Ad Copy, Forms) are segmented to target these specific "Hungry Crowds" using a reframed version of the same core offer.

---

### **Avatar 1: Alex l'Anxieux (Anxious Alex)**

* **Crowd:** The "In-Pain" Driver (B2C Target).  
* **Pain:** Acute, immediate, and emotional. "My brakes are grinding *right now*. I'm scared to drive. I'm afraid of a $2,000 surprise bill from a dealer who will rip me off."  
* **Psychology:** Fear, urgency, and distrust. They are looking for a rescuer.

* **The "Spin" (The Angle):** **SAFETY & URGENCY**  
  * **Headline:** Bruit de freins suspect? Obtenez votre inspection 100% GRATUITE à Terrebonne.  
  * **Hook:** Ne risquez pas votre sécurité. Sachez \*exactement\* ce qui ne va pas avant de payer un sou.  
  * **GHL Tag:** ppl\_lead\_brakes\_inspection

### **Avatar 2: Sophie la Sage (Smart Sophie)**

* ***Crowd: The "Proactive Planner" / Budget-Conscious Owner.***  
* **Pain:** Logical and financial. "My car is 6 years old, and the warranty is gone. I *know* a big repair is coming. I want to catch a small problem *before* it becomes a big one."  
* **Psychology:** Prudent, skeptical, and value-driven. They are looking for a trusted expert.

* **The "Spin" (The Angle):** **TRUST & VALUE**  
  * **Headline:** Votre concessionnaire vous charge-t-il trop cher? Obtenez un bilan de santé 100% GRATUIT pour vos freins.  
  * **Hook:** Obtenez un diagnostic honnête de nos experts certifiés. Zéro obligation. Zéro jargon. Juste la vérité.  
  * **GHL Tag:** ppl\_lead\_health\_check

### **Avatar 3: Martin le Prévoyant (The Seasonal Planner)**

* **Crowd:** The "Seasonal" Driver (Every driver in Quebec, twice a year).  
* **Pain:** Convenience and "Bundle" value. "I *already* have to go to a garage for my mandatory tire change. It's a hassle. Since the wheels are already off, why not check the brakes?"  
* **Psychology:** Efficient, practical, and deal-seeking. They are looking for a "smart bundle."

* **The "Spin" (The Angle):** **CONVENIENCE & BUNDLED VALUE**  
  * **Headline:** Temps de changer vos pneus? Ajoutez une Inspection de Freins GRATUITE (Valeur 99$).  
  * **Hook:** Pendant que vos pneus sont changés, nos experts inspecteront vos freins gratuitement. Repartez en toute sécurité pour la nouvelle saison.  
  * **GHL Tag:** ppl\_lead\_seasonal

---

# 🤖 GHL Implementation Schema (Multi-Avatar)

## **🤖 Sección: GHL Implementation Schema (Multi-Avatar)**

This is the technical plan for building these identities in GoHighLevel.

**1\. Create Three Landing Pages:**

* /offre (For Avatar 1: Alex) \-\> Uses **Form 1**  
* /bilan (For Avatar 2: Sophie) \-\> Uses **Form 2**  
* /pneus (For Avatar 3: Martin) \-\> Uses **Form 3**  
  (Using separate forms is critical for segmented tracking).

2\. Create Three Workflows:

(Each workflow is tied to one specific form).

* **Workflow 1 (Trigger: Form 1 Submitted):**  
  * Add Tag \-\> ppl\_lead\_brakes\_inspection  
  * Create Opportunity \-\> In MGC Sales Pipeline (Stage: Lead In)  
  * Internal SMS to MGC \-\> "🚨 **LEAD URGENT (Freins)**: \[Name\], \[Phone\]. Appelez-le MAINTENANT."  
  * External SMS to Lead \-\> "Bonjour \[Name\], c'est MGC. Nous avons votre demande d'inspection URGENTE..."

* **Workflow 2 (Trigger: Form 2 Submitted):**  
  * Add Tag \-\> ppl\_lead\_health\_check  
  * Create Opportunity \-\> In MGC Sales Pipeline (Stage: Lead In)  
  * Internal SMS to MGC \-\> "✅ **NOUVEAU LEAD (Bilan)**: \[Name\], \[Phone\]. Appelez-le pour booker son inspection gratuite."  
  * External SMS to Lead \-\> "Bonjour \[Name\], c'est MGC. Nous avons votre demande pour un bilan de santé gratuit..."

* **Workflow 3 (Trigger: Form 3 Submitted):**  
  * Add Tag \-\> ppl\_lead\_seasonal  
  * Create Opportunity \-\> In MGC Sales Pipeline (Stage: Lead In)  
  * Internal SMS to MGC \-\> "❄️ **NOUVEAU LEAD (Pneus)**: \[Name\], \[Phone\]. Appelez-le pour booker son changement de pneus \+ inspection gratuite."  
  * External SMS to Lead \-\> "Bonjour \[Name\], c'est MGC. Nous avons votre demande pour le changement de pneus \+ inspection..."

That's a sharp insight. You are correct.

Both "Martin" and "Sophie" are 'smart' planners. They are both logical, not emotional, buyers.

Here is the critical difference in their *motivation* (their 'Spin'), which is why they must have separate landing pages:

* **Sophie (The Skeptic)**  
  * **Motivation:** Her primary motivation is **TRUST**. She is *skeptical* of other garages (the "Common Enemy" is the dealer).  
  * **Action:** She is actively *searching for an honest mechanic* to get a second opinion.  
  * **The "Spin":** mgcreparation.ca/bilan offers her a "Free, Honest Health Check" to *prove* MGC's honesty.  
* **Martin (The Bundler)**  
  * **Motivation:** His primary motivation is **CONVENIENCE**. He is *not* skeptical or in pain.  
  * **Action:** He is actively *searching for a seasonal tire change*. This is a mandatory, routine task.  
  * **The "Spin":** mgcreparation.ca/pneus intercepts him during this task and offers the brake inspection as a logical "add-on" (a "smart bundle").

In short: Sophie is *looking for a mechanic she can trust*. Martin is *looking for a fast tire change*.  
We use the same free inspection to solve both their problems.

This distinction is critical for writing the ad copy. Shall we proceed with the Google Ads for these two "smart" avatars?

# Avatar 1: Alex l'Anxieux (Anxious Alex)

## Here is the explanation of the "Alex" avatar.

"Alex l'Anxieux" (Anxious Alex) is your most high-value target because his problem is immediate and emotional. He is the B2C "In-Pain" Driver

### His Pain (The "Why")

Alex's problem is **acute and emotional**. He is actively experiencing a "burning pain" right now:

* His brakes are grinding or making a terrifying noise.  
* He is **scared to drive** his car.  
* He fears a massive, surprise repair bill (e.g., "$2,000") and is deeply distrustful of being "ripped off" by a dealer.

**His Psychology (The "How")**

His mindset is defined by three things: **Fear, Urgency, and Distrust**.

* He is not shopping around for the best price in three weeks.  
* He is actively searching *right now* for someone to make the pain stop.  
* He is looking for a **rescuer**.

**The "Spin" (The "What")**

Because he is driven by fear, our marketing "spin" for him must be **SAFETY & URGENCY**.

* We don't talk about "long-term value" or "convenience."  
* We use direct, fast, and reassuring language.  
* The headline (Bruit de freins suspect?) grabs his exact pain.  
* The hook (Ne risquez pas votre sécurité.) validates his fear and offers a free, safe solution.

This avatar is the target for your /offre landing page. The goal is to capture his information, tag him in GHL as ppl\_lead\_brakes\_inspection, and get him on the phone with MGC immediately.

# L'Avatar "Alex l'Anxieux" : La Source de Vérité

Voici l'explication de l'avatar « Alex ».

« Alex l'Anxieux » est votre cible la plus précieuse (High-Value Target) car son problème est immédiat et émotionnel. Il est le pilote B2C « En Souffrance » (In-Pain Driver).

## Sa Douleur (Le « Pourquoi »)

Le problème d'Alex est **aigu et émotionnel**. Il ressent activement une « douleur brûlante » en ce moment:

* Ses freins grincent ou font un bruit terrifiant.  
* Il a **peur de conduire** sa voiture.  
* Il craint une facture de réparation massive et surprise (par exemple, « 2 000 $ ») et se méfie profondément d'être « arnaqué » par un concessionnaire.

## Sa Psychologie (Le « Comment »)

Son état d'esprit est défini par trois choses : **Peur, Urgence et Méfiance**.

* Il n'est pas en train de comparer les prix pour dans trois semaines.  
* Il cherche activement *maintenant* quelqu'un pour mettre fin à sa douleur.  
* Il cherche un **sauveur**.

## Le « Spin » Marketing (Le « Quoi »)

Parce qu'il est poussé par la peur, notre « angle » marketing (spin) pour lui doit être **SÉCURITÉ & URGENCE**.

* Nous ne parlons pas de « valeur à long terme » ou de « commodité ».  
* Nous utilisons un langage direct, rapide et rassurant.  
* Le titre (Bruit de freins suspect ?) s'attaque directement à sa douleur exacte.  
* L'accroche (Ne risquez pas votre sécurité.) valide sa peur et offre une solution gratuite et sûre.

Cet avatar est la cible de votre page de destination `/offre`. L'objectif est de capturer ses informations, de le taguer dans GHL comme `ppl_lead_brakes_inspection`, et de le faire téléphoner immédiatement à MGC.

# GHL Landing Page: Avatar 1 \- Brakes /offre

**\[BLUEPRINT\] GHL Landing Page: Avatar 1 \- Brakes /offre**

**PAGE URL:** mgcreparation.ca/offre

**CORE PRINCIPLE:** No navigation menu. No social media links. No "About Us." No distractions. The only way out is through the form.

---

### **SECTION 1: "ABOVE THE FOLD" (90% OF THE BATTLE)**

*This is everything a user sees before scrolling. It must contain the promise (Attention), the problem* 

| COLONNE 1 : HEADLINE & HOOK | COLONNE 2 : LE FORMULAIRE |
| ----- | ----- |
| **\[H1 \- ATTENTION\]** Bruit de freins suspect? Obtenez votre inspection 100% GRATUITE à Terrebonne. | **\[Titre du formulaire\]** OUI\! Je veux mon inspection GRATUITE\! |
| **\[H3 \- INTÉRÊT\]** "Les concessionnaires vous facturent 150$ juste pour *regarder* votre auto. Oubliez ça. Obtenez un diagnostic honnête et gratuit de nos experts certifiés à Terrebonne, et sachez *exactement* ce qui ne va pas avant de payer un sou." | **\[Champ 1\]** Prénom |
|  | **\[Champ 2\]** Téléphone (Requis) |
|  | **\[BOUTON CTA \- COULEUR ORANGE VIF\]** OUI\! JE VEUX MON INSPECTION GRATUITE\! |
|  | **\[Texte de réassurance (sous le bouton)\]** *Garanti 100% gratuit. Sans obligation. Réponse rapide assurée.* |

### **SECTION 2: "BELOW THE FOLD" (DESIRE & SOCIAL PROOF)**

*This section is for the "scanners." They need more convincing. We hit them with benefits and proof.*

\[H2 \- DESIRE\]

Reprenez la route l'esprit tranquille. Votre inspection gratuite inclut :

* **Sachez le vrai problème:** Recevez un diagnostic précis et honnête, sans jargon.  
* **Économisez instantanément:** Obtenez **10% de rabais** sur toutes les pièces nécessaires si une réparation est requise.  
* **Conduisez en sécurité:** Reprenez la route en sachant que vos freins sont 100% sécuritaires.  
* **Pas de surprises:** Nous ne faisons *jamais* de réparations sans votre approbation claire.

---

\[H2 \- SOCIAL PROOF\]

Ce que nos clients de Terrebonne disent :

\[Témoignage 1\]

"Service rapide et honnête. Ils ont trouvé le problème que mon ancien garage ne voyait pas. Je leur fais confiance les yeux fermés."

– Julie P., Terrebonne

\[Témoignage 2\]

"J'ai sauvé 200$ par rapport à la soumission du concessionnaire. Mon seul garage maintenant. Merci MGC\!"

– Marc L., Mascouche

\[Témoignage 3\]

"Mes freins grinçaient et j'avais peur. Ils m'ont pris le jour-même. Service incroyable. Je recommande à 100%."

– Sophie B., Terrebonne

---

---

### **SECTION 3: "FINAL ACTION" (THE LAST CHANCE)**

*A simple, clean section at the bottom to catch anyone who scrolled all the way down. Restate the offer and the action.*

**\[H3\] Ne risquez pas votre sécurité un jour de plus.**

\[BOUTON CTA (DUPLICATA) \- COULEUR ORANGE VIF\]

RÉSERVEZ VOTRE INSPECTION 100% GRATUITE MAINTENANT\!

---

### **FOOTER (LEGAL & MINIMAL)**

© 2024 mgcreparation.ca | Tous droits réservés | Politique de confidentialité

Propulsé par \[Votre Agence\]

*(Note: The "Politique de confidentialité" is the only external link on the entire page, and it's legally required. Do not add any other links.)*

---

# Avatar 2: Sophie la Sage (Smart Sophie)

## Sophie la Sage (Smart Sophie)1. Her Pain (The "Why")

# Sophie's problem is logical and financial. She is not in acute pain. Instead, she is a "Proactive Planner."

* Her car is older, likely out of warranty.  
* She knows a big repair is coming and wants to catch a small problem before it becomes a big, expensive one.  
* She distrusts the dealer's expensive, high-pressure "inspections."

**2\. Her Psychology (The "How")**  
Her mindset is defined by three things: Prudence, Skepticism, and Value.

* She is actively searching for a trusted expert.  
* She is skeptical of other garages and is looking for a "second opinion" to validate what she's been told.  
* She is a logical buyer, not an emotional one. She is looking for an expert she can trust for the long term.

**3\. The "Spin" (The "What"**  
Because she is driven by skepticism, our marketing "spin" for her must be **TRUST & VALUE**.

* We use language that directly challenges her "Common Enemy" (the overcharging dealer).  
* The headline (**Votre concessionnaire vous charge-t-il trop cher?**) validates her skepticism.  
* The hook (**Obtenez un diagnostic honnête... Zéro jargon. Juste la vérité.**) promises transparency, which is exactly what she wants.

This avatar is the target for your **/bilan** landing page. The goal is to capture her information, tag her in GHL as `ppl_lead_health_check`, and build a long-term, high-trust relationship.

# GHL Landing Page: Avatar 2 \- Bilan /bilan

**BLUEPRINT\] GHL Landing Page: Avatar 2 \- Bilan /bilan**

**PAGE URL:** mgcreparation.ca/bilan

**CORE PRINCIPLE:** Zero distractions. The entire page is built to counter skepticism and establish MGC as the "trusted expert." The only exit is the form.

---

---

### **SECTION 1: "ABOVE THE FOLD" (ATTENTION, INTEREST, ACTION)**

*This section must immediately validate her skepticism of other garages and present a high-value, no-risk alternative.*

| (COLONNE 1: HEADLINE & HOOK) | (COLONNE 2: THE FORM) |
| :---- | :---- |
| **\[H1 \- ATTENTION\]**  **Votre concessionnaire vous charge-t-il trop cher? Obtenez un bilan de santé 100% GRATUIT pour vos freins.** | **\[Titre du formulaire\]**  **Obtenez votre bilan GRATUIT** |
| **\[H3 \- INTEREST (The "Common Enemy")\]**  "Les concessionnaires adorent les 'inspections' à 150$ pour vous vendre des réparations inutiles. Oubliez ça. Obtenez un diagnostic honnête de nos experts certifiés. Zéro obligation. Zéro jargon. Juste la vérité sur l'état de votre véhicule." | **\[Champ 1\]**  Prénom |
|  | **\[Champ 2\]**  Téléphone (Requis) |
|  | **\[BOUTON CTA \- COULEUR ORANGE VIF\]**  **OUI\! JE VEUX MON BILAN HONNÊTE\!** |
|  | **\[Texte de réassurance (sous le bouton)\]**  *Garanti 100% gratuit. Sans obligation. Pas de vente sous pression.* |

---

---

### **SECTION 2: "BELOW THE FOLD" (DESIRE & SOCIAL PROOF)**

*This section reinforces the "Desire" for Sophie, which is **prevention** and **financial control**, not just immediate safety.*

\[H2 \- DESIRE\]

Prenez les devants. Évitez les grosses factures.

* **Détectez les problèmes AVANT** qu'ils ne deviennent des catastrophes à 2000$.  
* **Obtenez un plan d'entretien clair** et sans pression. Nous vous disons ce qui est urgent et ce qui peut attendre.  
* **Validez (ou contestez) le devis** de votre concessionnaire. Notre bilan est 100% gratuit et sans engagement.  
* **Économisez 10% sur les pièces** si une maintenance préventive est nécessaire.

---

\[H2 \- SOCIAL PROOF\]

Nos clients apprécient notre transparence :

\[Témoignage 1\]

"Fatigué de me faire avoir par le concessionnaire. L'équipe de MGC m'a donné l'heure juste. Honnêtes et professionnels. Je ne vais plus ailleurs."

– David R., Terrebonne

\[Témoignage 2\]

"Ils m'ont expliqué clairement ce qui devait être fait maintenant et ce qui pouvait attendre 6 mois. J'ai enfin un garage de confiance à Mascouche. Ça n'a pas de prix."

– Sophie L.

\[Témoignage 3\]

"L'inspection gratuite m'a permis d'économiser sur une réparation que mon autre garage jugeait 'urgente'. Merci pour l'honnêteté. Je recommande MGC."

– Michel P.

---

---

### **SECTION 3: "FINAL ACTION" (THE LAST CHANCE)**

*Simple, clean, and reinforces the core value proposition for this avatar: "Smart" and "Free."*

**\[H3\] La tranquillité d'esprit n'a pas de prix. Surtout quand elle est gratuite.**

\[BOUTON CTA (DUPLICATA) \- COULEUR ORANGE VIF\]

RÉSERVEZ VOTRE BILAN DE SANTÉ GRATUIT\!

---

### **FOOTER (LEGAL & MINIMAL)**

© 2024 mgcreparation.ca | Tous droits réservés | Politique de confidentialité

Propulsé par \[Votre Agence\]

*(Note: Again, "Politique de confidentialité" is the only external link.)*

# Avatar 3: Martin le Prévoyant (Planner)

# Martin le Prévoyant (The Seasonal Planner) 

### His Pain (The "Why")

Martin's problem is about **convenience and bundled value**. He is a "Seasonal Driver."

* He is already in the market for a mandatory, routine service: his seasonal tire change.  
* His "pain" is the hassle of going to the garage. He sees it as a chore.  
* He wants to be as efficient as possible and "kill two birds with one stone."

### His Psychology (The "How")

His mindset is defined by three things: **Efficiency, Practicality, and Deal-Seeking**.

* He is not in pain and not skeptical. He is a logical "bundler."  
* He is actively searching for "tire change" services, not "brake repair."  
* He will see a free inspection while the wheels are already off as a "smart" and logical add-on.

### The "Spin" (The "What")

Because he is driven by convenience, our marketing "spin" for him must be **CONVENIENCE & BUNDLED VALUE**.

* We "intercept" his search for tire changes.  
* The headline (**Temps de changer vos pneus? Ajoutez une Inspection de Freins GRATUITE...**) anchors our offer to his primary goal.  
* The hook (**Pendant que vos pneus sont changés...**) emphasizes the efficiency and logic of doing it all at once.

This avatar is the target for your */pneus* landing page. The goal is to capture his information, tag him in GHL as *ppl\_lead\_seasonal*, and upsell him from a low-margin tire change to a high-margin brake service.

# GHL Landing Page: Avatar 3 \- Pneus /pneus

This blueprint is strategically different. It does not lead with pain or skepticism. It leads with **convenience**. It intercepts a customer who is *already* in the market for a mandatory service (tire change) and bundles our "Carrot" (the free brake inspection) as a high-value, logical, and "smart" add-on.

**The goal is to anchor our offer to the seasonal tire change rush.**

Here is the blueprint for this third landing page.

---

### **\[COPIER ET COLLER DANS VOTRE GOOGLE DOCS\]**

**DOCUMENT TITLE: \[BLUEPRINT\] GHL Landing Page: Avatar 3 \- Pneus /pneus**

**PAGE URL:** mgcreparation.ca/pneus

**CORE PRINCIPLE:** Zero distractions. The page is designed to feel like an efficient "combo" offer. The only exit is the form.

---

---

### **SECTION 1: "ABOVE THE FOLD" (ATTENTION, INTEREST, ACTION)**

*This section immediately connects our offer to the seasonal event (tire change) and highlights the convenience.*

| (COLONNE 1: HEADLINE & HOOK) | (COLONNE 2: THE FORM) |
| :---- | :---- |
| **\[H1 \- ATTENTION\]**  **Temps de changer vos pneus? Ajoutez une Inspection de Freins GRATUITE (Valeur 99$).** | **\[Titre du formulaire\]**  **Réservez votre "Combo" Pneus \+ Freins\!** |
| **\[H3 \- INTEREST (The "Common Enemy" \= Wasting Time)\]**  "Pourquoi faire deux voyages au garage? Pendant que vos pneus sont changés à Terrebonne, nos experts inspecteront vos freins gratuitement. Repartez en toute sécurité pour la nouvelle saison." | **\[Champ 1\]**  Prénom |
|  | **\[Champ 2\]**  Téléphone (Requis) |
|  | **\[BOUTON CTA \- COULEUR ORANGE VIF\]**  **OUI\! JE VEUX MON "COMBO" SAISONNIER\!** |
|  | **\[Texte de réassurance (sous le bouton)\]**  *Inspection gratuite avec votre changement de pneus. Service rapide garanti.* |

---

---

### **SECTION 2: "BELOW THE FOLD" (DESIRE & SOCIAL PROOF)**

*This section reinforces the "Desire" for Martin, which is **efficiency**, **logic**, and **safety**.*

\[H2 \- DESIRE\]

Soyez prêt pour la route. C'est simple, rapide et intelligent.

* **Économisez du temps:** Faites tout en un seul rendez-vous. C'est la solution la plus efficace à Terrebonne.  
* **C'est logique:** Les roues sont *déjà* enlevées pour les pneus. C'est le moment idéal pour une inspection visuelle complète de vos freins.  
* **Repartez en sécurité:** Après vos pneus, les freins sont l'élément de sécurité \#1 à vérifier avant l'hiver (ou l'été).  
* **Économisez 10% sur les pièces:** Si vos plaquettes ou disques sont usés, obtenez **10% de rabais** sur les pièces de remplacement.

---

\[H2 \- SOCIAL PROOF\]

Nos clients adorent l'efficacité de notre service saisonnier :

\[Témoignage 1\]

"Je vais chez MGC pour mes pneus chaque saison. Le service est rapide, et l'inspection gratuite des freins m'a donné la paix d'esprit pour l'hiver."

– Martin V., Terrebonne

\[Témoignage 2\]

"Super service\! J'ai pu faire mon changement de pneus et une vérification en même temps. Équipe efficace et honnête."

– Isabelle D., Mascouche

\[Témoignage 3\]

"Ils ont remarqué que mes plaquettes de frein étaient presque finies pendant mon changement de pneus. Ça m'a sauvé un autre voyage\! Je recommande."

– Patrick G.

---

---

### **SECTION 3: "FINAL ACTION" (THE LAST CHANCE)**

*Simple, clean, and reinforces the core value proposition for this avatar: "Smart" and "Ready."*

**\[H3\] Soyez prêt pour la nouvelle saison. Ne laissez rien au hasard.**

\[BOUTON CTA (DUPLICATA) \- COULEUR ORANGE VIF\]

RÉSERVEZ VOTRE CHANGEMENT DE PNEUS \+ INSPECTION GRATUITE\!

---

### **FOOTER (LEGAL & MINIMAL)**

© 2024 mgcreparation.ca | Tous droits réservés | Politique de confidentialité

Propulsé par \[Votre Agence\]

*(Note: "Politique de confidentialité" remains the only external link.)*

# Google Ads Groups for Specific Avatars

Understood. Ads are weapons. They must be forged for a *specific* target. A single ad for all three avatars is a waste of money.

We will create three distinct ad groups. Each ad's promise will **perfectly mirror** the headline of its corresponding landing page. This is "message match," and it is non-negotiable. If the user clicks an ad about a "free inspection," they must land on a page about a "free inspection."

All copy is **French-first** for maximum conversion in your market.

---

### **Ad Group 1: Alex l'Anxieux (The "In-Pain" Driver)**

This ad group targets keywords of *immediate, acute pain*. (e.g., bruit freins voiture, réparation freins terrebonne, mécanicien urgent).

**➡️ Landing Page:** mgcreparation.ca/offre

**Ad Copy 1 (Pain \+ Offer)**

* **H1:** Freins qui Grincent?  
* **H2:** Inspection 100% Gratuite  
* **H3:** MGC Réparation Terrebonne  
* **Description 1:** Bruit suspect? Obtenez un diagnostic honnête et gratuit de nos experts. Réponse rapide.  
* **Description 2:** Ne risquez pas votre sécurité. Réservez votre inspection 100% gratuite. Zéro obligation.

**Ad Copy 2 (Urgency \+ Solution)**

* **H1:** Problème de Freins?  
* **H2:** Réponse Rapide Garantie  
* **H3:** Inspection Gratuite (Terrebonne)  
* **Description 1:** Service le jour-même. Ne conduisez pas avec des freins dangereux. Appelez nos experts.  
* **Description 2:** Diagnostic 100% gratuit. Sachez exactement ce qui ne va pas avant de payer.

---

### **Ad Group 2: Sophie la Sage (The "Skeptical" Planner)**

This ad group targets keywords of *distrust and research*. (e.g., mécanicien honnête terrebonne, avis garage terrebonne, deuxième avis mécanicien, inspection auto concessionnaire).

**➡️ Landing Page:** mgcreparation.ca/bilan

**Ad Copy 1 (Trust \+ Offer)**

* **H1:** Dealer Trop Cher?  
* **H2:** Obtenez un 2e Avis Gratuit  
* **H3:** Bilan de Freins 100% Gratuit  
* **Description 1:** Fatigué de payer trop cher? Obtenez un diagnostic honnête et gratuit de nos experts.  
* **Description 2:** Pas de vente sous pression, pas de jargon. Juste la vérité. Réservez votre bilan gratuit.

**Ad Copy 2 (Value \+ Honesty)**

* **H1:** Bilan de Santé Auto Gratuit  
* **H2:** Mécanicien de Confiance  
* **H3:** Garage Honnête Terrebonne  
* **Description 1:** Évitez les réparations inutiles. Obtenez un diagnostic gratuit avant de payer le concessionnaire.  
* **Description 2:** Zéro obligation. Zéro pression. 10% rabais sur pièces si une maintenance est requise.

---

### **Ad Group 3: Martin le Prévoyant (The "Seasonal" Bundler)**

This ad group targets keywords of *seasonal convenience*. (e.g., changement pneu terrebonne, pose de pneu mascouche, garage pneus hiver, service pneus).

**➡️ Landing Page:** mgcreparation.ca/pneus

**Ad Copy 1 (Bundle \+ Offer)**

* **H1:** Changement Pneus Terrebonne  
* **H2:** Inspection Freins Gratuite  
* **H3:** Combo Saisonnier 2-en-1  
* **Description 1:** Changez vos pneus et obtenez une inspection de freins 100% gratuite. Service 2-en-1.  
* **Description 2:** Ne faites pas deux voyages. Pendant que vos roues sont enlevées, nos experts vérifient tout.

**Ad Copy 2 (Efficiency \+ Value)**

* **H1:** Pose de Pneus \+ Inspection  
* **H2:** Offre Gratuite (Valeur 99$)  
* **H3:** MGC Réparation Terrebonne  
* **Description 1:** Service 2-en-1. Faites votre changement de pneus et repartez l'esprit tranquille.  
* **Description 2:** Service rapide. Économisez temps et argent. Réservez votre combo saisonnier aujourd'hui.

---

These three ad sets are now ready to be built in your Google Ads account, each linking to its respective, high-conversion landing page.

Would you like to review the GHL automation workflows that will capture these leads?

# Facebook Meta Business Setup

Understood. We will make this dead simple. No room for error.

Follow these exact clicks. We are turning this page into a lead machine, one button at a time.

---

### **1\. The Main Button (Your "Sign Up" Button)**

This is the most important button on your page. We will point it to your GHL funnel.

1. Go to your main MGC Réparation Facebook page.  
2. Look right under your big cover photo. You will see a blue button. It might say **"Send Message"** or **"Call Now"**.  
3. Click that button.  
4. A small menu will pop up. Click the option that says **"Edit Button"**.  
5. A new menu appears. Choose the button type **"Learn More"**.  
6. It will ask for a website. In that box, type the link to your GHL funnel: `mgcreparation.ca/bilan`  
7. Click **"Save"**.

**✅ Result:** This button now sends people *directly* to your highest-converting GHL landing page.

---

### **2\. The Cover Photo (Your 24/7 Billboard)**

This is the giant picture at the top. We will make it an advertisement for your free offer.

1. Go to your MGC Page.  
2. Move your mouse over the big banner picture.  
3. A button will appear in the corner. Click **"Edit Cover Photo"**.  
4. Select **"Upload Photo"**.  
5. Upload the new image you created (the one with the text "MÉCANICIEN HONNÊTE..." and "Bilan de Santé de Freins GRATUIT").  
6. Click **"Save Changes"**.

**✅ Result:** Your page now *advertises* your free offer to every single visitor, instantly.

---

### **3\. The "About" Info (Your Sales Pitch)**

This is where skeptics go to see if you're real. We will sell them on your honesty.

1. Go back to the **Meta Business Suite** (the link you sent me).  
2. On the far left, find the menu. Click **"All Tools"** (it looks like a grid of 9 small squares).  
3. A big menu opens. Find the section named "Manage".  
4. Click on **"Page Settings"**.  
5. A new menu appears on the left. Click **"Page Info"**.  
6. You will see a box called **"Description"**.  
7. Delete anything that's in that box.  
8. Paste in this **exact text**:  
   `MGC Réparation: Votre garage honnête et certifié à Terrebonne/Mascouche. Fini les surfacturations de concessionnaires. Nous offrons un diagnostic transparent pour éliminer le stress des réparations. Obtenez votre Bilan de Freins GRATUIT ici: mgcreparation.ca/bilan`  
9. This will save automatically.

**✅ Result:** Skeptical customers (Avatar 2\) are now instantly sold on your honesty and your free offer.

---

### **4\. The Pinned Post (Your \#1 Ad)**

This makes your best ad "stick" to the top of your page feed.

1. Go to your main MGC Page (the one customers see).  
2. Find the box where you write a new post ("What's on your mind?").  
3. Paste in the "Skeptic" ad copy we wrote. (The one that starts: **"ARRÊTEZ de Payer Trop Cher\! 🛑..."**).  
4. Add a simple picture to the post (even just your logo is fine).  
5. Click the **"Post"** button.  
6. **IMMEDIATE NEXT STEP:** Find the post you just made on your feed.  
7. In the top-right corner *of that post*, click the **three little dots (...)**.  
8. A menu will drop down. Click **"Pin to Top of Page"**.

**✅ Result:** This powerful ad is now the *first thing* anyone sees when they scroll your page.

---

### **5\. The Messenger Auto-Reply (Your 24/7 Secretary)**

This captures leads who message you, even at 3 AM.

1. Go back to the **Meta Business Suite**.  
2. On the main menu on the left, click **"Inbox"**.  
3. At the top of the Inbox screen, you will see some small icons. Click the one that says **"Automations"**.  
4. Find **"Instant Reply"** in the list. Click on it.  
5. Make sure the little switch at the top is turned **"On"**.  
6. Make sure the box for **"Messenger"** is checked.  
7. Find the text box labeled **"Message"**.  
8. Delete anything that's in there. Paste in this **exact text**:  
   `Merci d'avoir contacté MGC Réparation! Pour un service plus rapide ou pour réclamer votre Bilan de Santé de Freins 100% GRATUIT (Valeur 99$), vous pouvez réserver directement ici: mgcreparation.ca/bilan`  
   `(Si c'est urgent, appelez-nous au [YOUR-PHONE-NUMBER].)`  
9. Click the blue **"Save Changes"** button (top right).

**✅ Result:** Anyone who messages you is automatically sent to your GHL funnel. You are now capturing leads in your sleep.

---

You have just re-tooled this entire Facebook page for one purpose: **conversion**.

What's next?

1. **Confirm Execution:** Tell me when you have completed all 5 steps.  
2. **Google Business Profile (Tactical Cleanup):** Let's apply this same conversion logic to your MGC Google Business Profile (GBP) next.  
3. **Generate Post Templates:** I can generate 3 new "Pain/Offer" post templates (for "Anxious Alex") for you to use.  
4. **Generate Social Proof Templates:** I can generate 3 new "Testimonial" post templates to build trust.  
5. **Move to GHL Build:** Let's write the "Bulldog" Nurture Sequence (the follow-up SMS/Emails) that your GHL will send to these new leads.

# the Google Business Profile (GBP)

 the Google Business Profile (GBP).

This is a critical asset. When a driver has an *urgent* problem (Alex l'Anxieux), their first stop is not Facebook; it is **Google Search**.

Your GBP is not a business card. It is a **lead-capture weapon**. We will now re-tool it to capture all 3 avatars and funnel them directly into your GHL pipeline.

Execute this 5-step checklist.

---

### **🔨 Phase 0.5: Google Business Profile (GBP) Conversion Re-Tooling**

To do this, log in to your Google Business Profile Manager, or simply search for "MGC Réparation" on Google while logged into your owner account. You will see an "Edit Profile" panel.

#### **1\. The Appointment Link (The Main Funnel)**

This is the most important link. We must send searchers directly to our "Bait."

1. In your GBP editor, click **"Edit Profile"**.  
2. Go to the **"Contact"** section.  
3. Find the **"Website"** link.  
4. **CRITICAL:** Set this URL to your highest-trust landing page: `mgcreparation.ca/bilan`  
5. Find the **"Appointment Link"** (or "Booking Link"). Set this to the *exact same* URL: `mgcreparation.ca/bilan`  
6. Click **"Save"**.

**✅ Result:** The two biggest CTA buttons on your profile ("Website" and "Appointments") now send all traffic directly to your GHL funnel.

---

#### **2\. The Business Description (The 750-Character Sales Pitch)**

This is your USP. It must sell your honesty and the "Bait" in the first sentence.

1. In your GBP editor, click **"Edit Profile"**.  
2. Go to the **"About"** section.  
3. Find the **"Description"** field.  
4. Paste in this **exact text**. It is optimized to front-load the USP and "Bait" within the 750-character limit.  
   `MGC Réparation: Votre garage HONNÊTE et certifié à Terrebonne/Mascouche. Fini les surfacturations de concessionnaires.`  
   `Nous offrons un Bilan de Santé de Freins 100% GRATUIT (Valeur 99$).`  
   `Notre mission est de vous donner un diagnostic transparent et sans jargon. Zéro survente. Zéro surprise. Juste la vérité pour vous aider à prendre la bonne décision.`  
   `Spécialistes en: ✅ Diagnostics de Freins ✅ Entretien Préventif ✅ Changements de Pneus ✅ Mécanique Générale`  
   `Réclamez votre Bilan de Freins GRATUIT sur notre site web. Cliquez sur le lien "Rendez-vous" pour réserver.`  
5. Click **"Save"**.

**✅ Result:** You now have a hard-hitting sales pitch that filters for "Skeptics" (Avatar 2\) and "In-Pain" (Avatar 1\) searchers.

---

#### **3\. The "Services" List (Your "Bait" Menu)**

We will list our funnels as your primary services. This targets all 3 avatars.

1. In your GBP editor, find and click the **"Edit Services"** button.  
2. Add the following 3 services. This is how we message-match our funnels directly on Google.  
* **Service \#1 (For "Anxious Alex")**  
  * **Service Name:** `Inspection de Freins GRATUITE (Urgence Bruit)`  
  * **Price:** `Gratuit`  
  * **Description:** `Bruit de freins suspect? Craquement? Ne risquez pas votre sécurité. Obtenez un diagnostic de sécurité urgent et 100% gratuit. Réservation rapide. Cliquez sur notre site web pour réserver.`  
* **Service \#2 (For "Smart Sophie")**  
  * **Service Name:** `Bilan de Santé de Freins GRATUIT (Prévention)`  
  * **Price:** `Gratuit`  
  * **Description:** `Évitez les grosses factures de concessionnaire. Obtenez un diagnostic honnête et transparent de nos experts. Zéro survente, zéro jargon. Parfait pour l'entretien préventif. Réservez sur notre site.`  
* **Service \#3 (For "Martin the Bundler")**  
  * **Service Name:** `Combo Pneus + Inspection Freins GRATUITE`  
  * **Price:** `Gratuit (avec changement de pneus)`  
  * **Description:** `Maximisez votre visite! Pendant votre changement de pneus, nous inspectons vos freins gratuitement (valeur 99$). Repartez 100% prêt pour la saison. Réservez sur notre site.`

**✅ Result:** Your GBP "Services" tab is now a high-conversion menu that speaks to each of your three avatars.

---

#### **4\. The "Update" Post (Your Google Pinned Post)**

This acts like your pinned Facebook post. It's an ad that shows up right on your profile.

1. In your GBP editor, click **"Add Update"** (or "Create Post").  
2. Select **"Add Offer"** (this is better than a simple update).  
3. **Offer Title:** `Bilan de Santé de Freins 100% GRATUIT`  
4. **Start & End Dates:** Set it to run for 30 days. (You must redo this every 30 days to keep it active).  
5. **Offer Details (The Post):** Paste in this copy:  
   `ARRÊTEZ de Payer Trop Cher! Obtenez un diagnostic de freins honnête et transparent de MGC Réparation, vos experts certifiés à Terrebonne. Zéro survente. Zéro jargon. Juste la vérité. (Valeur de 99$).`  
6. **Button (CRITICAL):** Add a button. Choose **"Book"** or **"Learn More"**.  
7. **Link for Button:** `mgcreparation.ca/bilan`  
8. Add a simple, high-contrast photo (the same "trust" photo from Facebook works perfectly).  
9. Click **"Post"**.

**✅ Result:** You now have a permanent ad for your "Bait" right on your Google search result.

---

#### **5\. Pre-Seed the Q\&A (The Objection Killer)**

This builds massive trust by answering questions *before* they are asked. You must do this from a *different* Google account (your personal one, a friend's, etc.).

1. Log out of your owner account. Go to Google Maps and find MGC Réparation.  
2. Scroll down to **"Questions & Answers"**.  
3. Click **"Ask a Question"** and post this question:  
   `Est-ce que l'inspection de freins est VRAIMENT gratuite, ou il y a des frais cachés?`  
4. Now, log back into your **Owner Account**. Find the question and **Answer it** like this:  
   `Excellente question. Elle est 100% gratuite. C'est notre façon de vous montrer notre transparence. Vous recevrez un bilan clair, sans jargon et sans aucune obligation de faire les réparations avec nous. Notre but est de vous donner la vérité. - L'équipe MGC`

**✅ Result:** You have just overcome the \#1 objection from "Smart Sophie" (The Skeptic) and built instant credibility.

---

Execute these 5 steps. Your Google Business Profile is now a conversion-focused asset, ready to capture leads.

What's next?

1. **Confirm Execution:** Tell me when you have completed all 5 GBP setup steps.  
2. **Generate GBP "Photo" Strategy:** I'll give you a 3-point plan for photos to upload that build trust (e.g., "Clean Bay," "Certified Mechanic," "Happy Customer").  
3. **Generate Post Templates (Facebook):** I'll generate 3 "Pain/Offer" post templates (for "Anxious Alex").  
4. **Generate Social Proof Templates (Facebook/Google):** I'll generate 3 "Testimonial" post templates to build trust.  
5. **Move to GHL Build:** We write the "Bulldog" Nurture Sequence (the follow-up SMS/Emails) that GHL will send to these new leads.

# Tab 13

MGC Réparation Inc. \- Plan de Mots-Clés PPL  
Ce plan de mots-clés est conçu pour les campagnes Pay-Per-Lead (PPL) de MGC Réparation Inc. à Mascouche, QC. Il vise à attirer des leads qualifiés en ciblant les intentions de recherche des clients potentiels pour les services d'entretien et de réparation automobile.  
---

## 1\. Mots-Clés par Catégorie

### 1.1 Services Essentiels (Core Services)

Cette catégorie inclut les services mécaniques généraux et l'entretien courant des véhicules.

* Réparation automobile  
* Entretien voiture  
* Changement d'huile  
* Réparation freins  
* Pneus  
* Alignement roues  
* Suspension automobile  
* Diagnostic moteur  
* Mise au point voiture  
* Réparation échappement  
* Remplacement batterie auto  
* Inspection pré-achat

  #### Exemples de Match Types:

* Exact Match:  
  * \[réparation automobile\]  
  * \[changement d'huile\]  
  * \[diagnostic moteur\]  
*   
* Phrase Match:  
  * "entretien voiture"  
  * "réparation freins"  
  * "remplacement batterie auto"  
*   
* Broad Match Modifier:  
  * \+réparation \+automobile  
  * \+entretien \+véhicule \+léger  
  * \+service \+pneus  
* 

### 1.2 Services Spécialisés

Cette catégorie couvre les services uniques et spécialisés offerts par MGC Réparation Inc.

* Services de Climatisation Automobile  
  * réparation climatisation auto  
  * recharge air climatisé voiture  
  * entretien AC auto  
*   
* Mécanique Véhicules Lourds  
  * mécanique camion  
  * réparation poids lourds  
  * mécanicien diesel  
  * entretien flotte véhicules lourds  
*   
* Réparation de Remorques  
  * réparation remorque  
  * réparation remorque utilitaire  
  * réparation remorque bateau  
  * réparation essieu remorque  
*   
* Services de Génératrices  
  * réparation génératrice  
  * entretien génératrice  
  * service génératrice portable  
*   
* Soudure et Assemblage  
  * soudure automobile  
  * soudure échappement  
  * fabrication métal auto  
* 

  #### Exemples de Match Types:

* Exact Match:  
  * \[réparation climatisation auto\]  
  * \[mécanique poids lourds\]  
  * \[réparation remorque\]  
*   
* Phrase Match:  
  * "recharge air climatisé voiture"  
  * "mécanicien diesel"  
  * "soudure automobile"  
*   
* Broad Match Modifier:  
  * \+réparation \+climatisation \+auto  
  * \+entretien \+génératrice  
  * \+service \+soudure \+véhicule  
* 

### 1.3 Mots-Clés Locaux (Location-Based)

Ces mots-clés ciblent les clients recherchant des services dans la région de Mascouche et les villes avoisinantes.

* mécanicien Mascouche  
* garage auto Mascouche  
* réparation automobile Mascouche  
* services mécanique Mascouche  
* garage poids lourds Mascouche  
* réparation remorque Mascouche  
* air climatisé auto Mascouche  
* mécanicien Terrebonne  
* garage auto Lachenaie  
* réparation voiture La Plaine  
* MGC Réparation Mascouche

  #### Exemples de Match Types:

* Exact Match:  
  * \[mécanicien Mascouche\]  
  * \[garage auto Mascouche\]  
  * \[réparation automobile Mascouche\]  
*   
* Phrase Match:  
  * "services mécanique Mascouche"  
  * "garage poids lourds Mascouche"  
  * "réparation remorque Mascouche"  
*   
* Broad Match Modifier:  
  * \+mécanicien \+auto \+Mascouche  
  * \+réparation \+véhicule \+Terrebonne  
  * \+entretien \+voiture \+Lachenaie  
* 

### 1.4 Mots-Clés Orientés Problèmes (Problem-Oriented)

Ces mots-clés ciblent les utilisateurs qui recherchent des solutions à des problèmes spécifiques de leur véhicule.

* voiture ne démarre pas  
* bruit anormal voiture  
* voyant moteur allumé  
* perte de puissance voiture  
* surchauffe moteur  
* odeur de brûlé voiture  
* fuite liquide refroidissement  
* freins qui grincent  
* vibrations volant  
* problème climatisation auto  
* fumée sous le capot  
* pneu à plat  
* fuite d'huile voiture

  #### Exemples de Match Types:

* Exact Match:  
  * \[voiture ne démarre pas\]  
  * \[voyant moteur allumé\]  
  * \[freins qui grincent\]  
*   
* Phrase Match:  
  * "bruit anormal voiture"  
  * "perte de puissance voiture"  
  * "problème climatisation auto"  
*   
* Broad Match Modifier:  
  * \+voiture \+ne \+démarre \+pas  
  * \+résoudre \+problème \+moteur  
  * \+réparer \+freins \+bruit  
* 

### 1.5 Mots-Clés de Marque (Brand)

Ces mots-clés ciblent directement la marque de l'entreprise.

* MGC Réparation  
* MGC Réparation Inc.  
* garage Maxime Caron  
* Maxime Caron mécanicien  
* avis MGC Réparation

---

## 2\. Mots-Clés Négatifs (Negative Keywords)

Pour éviter de gaspiller le budget publicitaire sur des recherches non pertinentes.

* \-emploi  
* \-formation  
* \-carrière  
* \-prix (si l'objectif n'est pas de concurrencer sur le prix)  
* \-gratuit  
* \-DIY (Do It Yourself)  
* \-faire soi-même  
* \-tutoriel  
* \-guide  
* \-pièces (pour éviter les recherches de pièces détachées si l'entreprise ne vend pas au détail)  
* \-acheter (pour éviter les recherches d'achat de véhicules ou de pièces)  
* \-occasion  
* \-vendre  
* \-location  
* \-forum  
* \-avis (si les avis sont négatifs ou si l'objectif n'est pas de gérer la réputation en ligne via la publicité)  
* \-vidéo  
* \-images  
* \-photo

---

Stratégie Additionnelle:

* Localisation: Utiliser le ciblage géographique pour Mascouche et les zones environnantes (Terrebonne, Lachenaie, La Plaine) pour maximiser la pertinence des annonces.  
* Extensions d'annonce: Mettre en œuvre des extensions d'appel, de lieu, de liens annexes vers des pages de services spécifiques (ex: "Réparation Poids Lourds", "Entretien Climatisation") et d'accroche pour améliorer la visibilité et le taux de clics.  
* Copie d'annonce: Mettre en avant la réputation (4.8 étoiles, entreprise familiale depuis 2012\) et les services spécialisés de MGC Réparation Inc.

Ce plan devrait servir de base solide pour lancer des campagnes PPL efficaces pour MGC Réparation Inc.  
Gemini 2.5 FlashRunning for 203s  
lightbulbThought for 25 seconds  
Okay, this is a fantastic keyword plan\! It's structured well and covers all the essential aspects: core services, specialized services, local focus, problem-oriented searches, and brand keywords. The negative keywords list is also robust, which is crucial for efficient ad spend.  
Now, let's combine this with long-tail buyer keywords tailored to each avatar and then outline concrete frontend changes.  
---

## 1\. Mots-Clés par Avatar (Long-Tail Buyer Keywords)

Here's an expanded list of long-tail buyer keywords, integrating your plan and targeting the specific intent of each avatar:

### Avatar 1: Alex Anxieux (Anxious Alex)

* Pain Points: Urgent, unknown problem, fear of cost, looking for trustworthy diagnosis, immediate solution.  
* Your Keywords: voiture ne démarre pas, bruit anormal voiture, voyant moteur allumé, perte de puissance voiture, surchauffe moteur, odeur de brûlé voiture, fuite liquide refroidissement, freins qui grincent, vibrations volant, problème climatisation auto, fumée sous le capot, pneu à plat, fuite d'huile voiture.  
* Expanded Long-Tail Buyer Keywords:  
  * diagnostic rapide voyant moteur allumé Mascouche  
  * mécanicien urgence voiture ne démarre pas Terrebonne  
  * coût réparation bruit anormal voiture Mascouche  
  * solution fuite liquide refroidissement auto rapide  
  * expert réparation freins qui grincent Lachenaie  
  * garage ouvert aujourd'hui pour problème voiture  
  * symptômes problème transmission automatique  
  * estimation réparation perte de puissance moteur Mascouche  
  * mécanicien qui trouve les pannes électriques auto  
  * tarif diagnostic automobile Mascouche  
* 

### Avatar 2: Sophie Sage (Wise Sophie)

* Pain Points: Proactive maintenance, seeking second opinions, value for money, quality service, long-term reliability.  
* Your Keywords: entretien voiture, changement d'huile, alignement roues, mise au point voiture, inspection pré-achat, entretien AC auto, entretien flotte véhicules lourds, entretien génératrice.  
* Expanded Long-Tail Buyer Keywords:  
  * meilleur garage entretien préventif Mascouche avis  
  * forfait changement d'huile synthétique \+ filtre Mascouche  
  * inspection complète avant achat voiture usagée Terrebonne  
  * service d'alignement des roues 4x4 Mascouche  
  * plan d'entretien annuel climatisation auto  
  * avis sur garage pour entretien flotte véhicules lourds  
  * certification mécanicien pour entretien véhicule haut de gamme  
  * bilan de santé automobile gratuit vs payant  
  * où faire vérifier son véhicule pour un long voyage  
  * coût révision automobile complète Mascouche  
* 

### Avatar 3: Martin Prévoyant (Foresight Martin)

* Pain Points: Scheduled maintenance, seasonal tasks, combining services for efficiency, planning ahead, reliable scheduling.  
* Your Keywords: pneus, changement d'huile (if scheduled), inspection pré-achat (if planned), services de génératrices (scheduled maintenance), entretien flotte véhicules lourds, réparation remorque, soudure automobile.  
* Expanded Long-Tail Buyer Keywords:  
  * rendez-vous changement pneus hiver \+ freins Mascouche  
  * installation pneus cloutés Mascouche prise de rendez-vous  
  * planification entretien saisonnier génératrice résidentielle  
  * service de réparation structurelle remorque Mascouche  
  * garage qui fait soudure châssis auto Terrebonne  
  * optimisation entretien flotte véhicules commerciaux Lachenaie  
  * disponibilité changement d'huile et inspection Mascouche  
  * où entreposer mes pneus à Mascouche (indirect, but related to tire service)  
  * calendrier entretien véhicule lourd  
  * réparation remorque cargo Mascouche devis  
* 

---

## 2\. Proposed Next Steps: Frontend Implementation Plan

Based on this comprehensive keyword list and avatar understanding, here are the concrete frontend changes to optimize your application for SEO and user experience.  
Goal: Integrate keywords naturally, improve content relevance, enhance meta descriptions for CTR, and refine UI elements to match user intent.  
---

### A. Global / Core SEO Elements

1\. 

* Description: Enhance with broader and specialized services, plus local focus.  
  * Current: "MGC Réparation Inc. is your trusted, family-owned expert for car, truck, and heavy vehicle repair in Mascouche, QC. We offer honest, guaranteed general mechanics, AC service, trailer repair, and more."  
  * Proposed (EN): "MGC Réparation Inc. in Mascouche, QC: Your trusted, family-owned expert for comprehensive auto, heavy truck, trailer, and generator repair. Honest diagnostics, guaranteed service, from general mechanics to specialized welding. Get your free quote today\!"  
  * Proposed (FR): "MGC Réparation Inc. à Mascouche, QC : Votre expert familial de confiance pour la réparation d'autos, camions lourds, remorques et génératrices. Diagnostics honnêtes, service garanti, de la mécanique générale à la soudure spécialisée. Demandez votre soumission gratuite\!"  
*   
* Keywords: Expand significantly to include long-tail, problem-oriented, and specialized terms.  
  * Current: "auto repair mascouche, mechanic mascouche, heavy vehicle repair, truck repair mascouche, garage mascouche, MGC Réparation, car service, trailer repair"  
  * Proposed: auto repair mascouche, mechanic mascouche, heavy vehicle repair mascouche, truck repair mascouche, garage mascouche, MGC Réparation, car service mascouche, trailer repair mascouche, soudure automobile, réparation génératrice, diagnostic moteur Mascouche, entretien voiture, remplacement freins, air climatisé auto, mécanicien Terrebonne, garage auto Lachenaie, pneus Mascouche, voiture ne démarre pas, voyant moteur allumé, réparation poids lourds (and many more from the combined list, aim for diversity but keep it concise for the meta tag).  
*   
* Title: Ensure it's compelling and includes core local keywords.  
  * Current: "MGC Réparation | Honest & Guaranteed Auto Repair in Mascouche"  
  * Proposed (EN): "MGC Réparation | Auto & Camion Mascouche | Réparations Honnêtes & Garanties"  
  * Proposed (FR): "MGC Réparation | Auto & Camion Mascouche | Réparations Honnêtes & Garanties" (or adjust for language if needed)  
* 

2\. 

* Description: Sync with the index.html meta description for consistency and clarity.  
  * Proposed (EN): "A professional website for MGC Réparation Inc., your trusted auto and heavy vehicle repair shop in Mascouche, QC. Showcasing expert services from general mechanics to specialized heavy truck, trailer, and generator repair, the site builds trust and generates leads through clear calls-to-action and an immersive quote wizard."  
  * Proposed (FR): "Un site web professionnel pour MGC Réparation Inc., votre garage de confiance pour l'auto et les véhicules lourds à Mascouche, QC. Présentant des services experts, de la mécanique générale à la réparation spécialisée de camions lourds, remorques et génératrices, le site inspire confiance et génère des leads via des appels à l'action clairs et un assistant de soumission immersif."  
* 

---

### B. 

This file is central for keyword integration.  
1\. 

* Review and ensure all navigation links use clear, keyword-rich language. (Current uppercase is good, just check underlying text.)  
* subLinks: Ensure these accurately reflect service page keywords. (They already do quite well.)

2\. 

*  (Crucial for CTR):  
  * General Mechanics: "Comprehensive general mechanics in Mascouche: MGC Réparation Inc. offers expert oil changes, brake repair, diagnostic services, and vehicle tune-ups for all cars & light trucks. Book now\!"  
  * AC Service: "Professional auto AC repair and recharge services in Mascouche. MGC Réparation Inc. handles leak detection, compressor replacement, and complete system diagnostics for comfortable driving. Get a quote\!"  
  * Heavy Vehicle Mechanics: "Expert heavy truck and commercial vehicle mechanics in Mascouche. MGC Réparation Inc. offers specialized diesel engine repair, fleet maintenance, and SAAQ inspections for minimal downtime. Request a quote\!"  
  * Trailer Repair: "Complete trailer repair services in Mascouche. MGC Réparation Inc. handles axle repair, wiring, brakes, and structural welding for utility, boat, and commercial trailers. Fast service available\!"  
  * Generator Services: "Reliable generator repair and maintenance in Mascouche for residential, commercial, and portable units. MGC Réparation Inc. ensures your power is always on. Schedule service today\!"  
  * Welding & Assembly: "Expert welding and custom fabrication services in Mascouche. MGC Réparation Inc. offers vehicle frame repair, custom exhaust welding, and structural assembly for automotive & heavy equipment needs. Get a quote\!"  
*   
*  /  Infuse more long-tail and problem-oriented keywords.  
  * General Mechanics:  
    * FR: "Mécanique Générale Complète & Diagnostic Moteur pour tous les Véhicules à Mascouche"  
    * EN: "Complete General Mechanics & Engine Diagnostics for All Vehicles in Mascouche"  
    * Subtitle: Add "freins, pneus, entretien préventif" in FR, "brakes, tires, preventative maintenance" in EN.  
  *   
  * Heavy Vehicle Mechanics:  
    * FR: "Mécanique de Véhicules Lourds Expert: On Garde Votre Flotte de Camions & Poids Lourds sur la Route à Mascouche"  
    * EN: "Expert Heavy Vehicle Mechanics: Keeping Your Truck Fleet & Heavy Equipment On The Road in Mascouche"  
    * Subtitle: Add "diagnostic diesel, entretien flotte, réparations spécialisées" in FR, "diesel diagnostics, fleet maintenance, specialized repairs" in EN.  
  *   
*   
* : Naturally weave in additional keywords (e.g., in General Mechanics, mention "changement d'huile Mascouche", "réparation freins Mascouche").  
* : Ensure these are specific and keyword-rich.  
  * General Mechanics: Add "Diagnostic moteur avancé", "Réparation silencieux et échappement".  
  * AC Service: "Détection et réparation de fuites AC", "Remplacement compresseur air climatisé".  
  * Heavy Vehicle Mechanics: "Inspection SAAQ véhicules lourds", "Réparation moteur diesel camion".  
  * Trailer Repair: "Réparation essieu remorque", "Soudure structurelle remorque".  
  * Generator Services: "Entretien préventif génératrice", "Réparation génératrice portable".  
  * Welding & Assembly: "Soudure châssis auto", "Fabrication pièces sur mesure".  
*   
* : Reinforce trust, expertise, and local advantages with keywords.

3\. 

* ,   
  * FR: title1: 'RÉPARATIONS HONNÊTES.', title2: 'TRAVAIL GARANTI.', subtitle: 'Votre garage familial de confiance à Mascouche pour des services experts pour autos, camions, remorques et génératrices. On fait la job comme il faut, du premier coup. Diagnostic rapide disponible.'  
  * EN: title1: 'HONEST REPAIRS.', title2: 'GUARANTEED WORK.', subtitle: 'Your trusted, family-owned shop in Mascouche for expert car, truck, trailer, and generator services. We get it done right, the first time. Fast diagnostics available.'  
*   
* ,  Add more umbrella terms for services.  
  * FR: title: 'NOS SERVICES EXPERTS DE MÉCANIQUE AUTO ET VÉHICULES LOURDS', subtitle: 'De l\\'entretien de routine au diagnostic moteur et aux réparations spécialisées, nous sommes équipés pour répondre à tous vos besoins...'  
  * EN: title: 'OUR EXPERT AUTO & HEAVY VEHICLE MECHANICS SERVICES', subtitle: 'From routine maintenance to engine diagnostics and specialized repairs, we are equipped to handle all your vehicle and equipment needs...'  
*   
* ,  Reinforce local trust and expertise.  
  * FR: title: 'POURQUOI MGC RÉPARATION EST LE CHOIX DES CHAUFFEURS DE MASCOUCHE', subtitle: 'Plus que des mécaniciens, nous sommes vos partenaires pour des véhicules sécuritaires et fiables à Mascouche, Terrebonne et Lachenaie.'  
  * EN: title: 'WHY MGC REPAIR IS THE CHOICE FOR MASCOUCHE DRIVERS', subtitle: 'More than just mechanics, we’re your partners in keeping your vehicles safe and reliable in Mascouche, Terrebonne, and Lachenaie.'  
*   
* : More specific.  
  * FR: "Obtenir ma soumission gratuite et rendez-vous"  
  * EN: "Get My Free Quote & Book Appointment"  
*   
* : Use a stronger call to action.  
  * FR: "Prêt pour une Réparation de Confiance à Mascouche?"  
  * EN: "Ready for Trusted Auto Repair in Mascouche?"  
* 

4\. 

*  /   
  * FR: title: 'Contactez MGC Réparation à Mascouche', subtitle: 'Planifiez votre service, demandez une soumission ou posez une question à nos experts mécaniciens.'  
  * EN: title: 'Contact MGC Repair in Mascouche', subtitle: 'Schedule your service, request a quote, or ask a question to our expert mechanics.'  
*   
* : Guide users to use descriptive, problem-oriented language.  
  * FR: "Décrivez le problème (ex: bruit de freins, voyant moteur, changement d'huile, panne...) ou le service dont vous avez besoin."  
  * EN: "Describe the issue (e.g., brake noise, check engine light, oil change, breakdown...) or the service you need."  
* 

5\. 

* ,   
  * FR: title: 'Obtenez un diagnostic ou une soumission précise en quelques minutes.', subtitle: 'Notre assistant intelligent vous guide vers le bon service et vous permet de planifier votre rendez-vous rapidement.'  
  * EN: title: 'Get an accurate diagnostic or quote in just a few minutes.', subtitle: 'Our smart assistant guides you to the right service and helps you schedule your appointment quickly.'  
*   
* : Similar to Contact Form, encourage keyword-rich input.  
  * FR: "Décrivez le problème (ex: bruit de freins, voyant moteur allumé, besoin de changement de pneus, entretien AC) ou le service que vous cherchez..."  
  * EN: "Describe the issue (e.g., brake noise, check engine light, tire change, AC maintenance) or the service you're looking for..."  
* 

6\. 

* ,  (Already quite good, but can emphasize speed/ease).  
  * FR: title: 'Trouvez rapidement le service parfait pour vos besoins mécaniques.', subtitle: 'Notre formulaire intelligent vous connecte au meilleur expert et vous donne un prix juste, sans engagement.'  
  * EN: title: 'Quickly find the perfect mechanical service for your needs.', subtitle: 'Our smart form connects you to the best expert and provides fair pricing, without obligation.'  
*   
* : "Décrivez le problème urgent de votre véhicule"  
* : "Quel type d'entretien ou d'inspection recherchez-vous?"  
* : "Quelle est la date approximative pour votre service planifié?"

---

### C. 

1\. 

* The h1 and p content comes from i18n.ts. Ensure the updated i18n.ts content is reflected.  
* ctaBook: Uses t.home.hero.ctaBook.

2\. 

* h2 and p (from i18n.ts) should reflect updated service keyword descriptions.  
* Anchor text for \<a\> tags (service.title\[language\]) are already keyword-rich, which is great.

3\. 

* h2 and p (from i18n.ts) for title and subtitle.  
* The points themselves (via WHY\_CHOOSE\_US\_POINTS in i18n.ts) should be reviewed to subtly include keywords like "mécanicien certifié Mascouche," "garage honnête," "réparation garantie."

4\. 

* h3 (t.home.contactMap.visitTitle) and p for address. Ensure a clear, keyword-rich message.

---

### D. 

1\. Main Headings: h1 and p (from i18n.ts) should reflect brand and expertise keywords.  
2\. Body Paragraphs: The t.about.p1 to t.about.p5 content should be reviewed to naturally integrate brand keywords (MGC Réparation, Maxime Caron), local keywords (Mascouche, Terrebonne), and keywords related to trustworthiness, expertise, and service breadth (e.g., "mécanique auto et camions lourds," "diagnostic," "réparation de remorques").  
3\. 

* Uses t.about.ctaTitle and t.about.ctaSubtitle. Ensure these are updated with conversion-focused keywords like "soumission précise," "experts en mécanique."

---

### E. 

1\. Main Headings: h1 and p (from i18n.ts) should reflect updated contact and service keywords.  
2\. 

* The fields themselves (placeholders) are already tied to i18n.ts contactForm section. Ensure descriptionPlaceholder is updated as suggested above.  
* Input field styling already good.

---

### F. 

1\. Main Headings: h1 and p (from i18n.ts) should reflect a broader range of service keywords.  
2\. Service Cards:

* h2 (service.title\[language\]) and p (service.shortDescription\[language\]) are already effective.  
* Ensure the internal links (a href={/services/${service.slug}}) are keyword-rich, reinforcing the specific service page.

---

### G. 

1\. Breadcrumbs: Are dynamically generated, which is good.  
2\. Hero Section: h1 (service.headline\[language\]) and p (service.subHeadline\[language\]) should be dynamically updated from i18n.ts service definitions as suggested.  
3\. Main Content (

* The main p (service.pageContent\[language\]) needs a thorough review for keyword integration.  
* h3 (t.serviceDetail.includesTitle): Ensure specific service name is used.  
* ul points (service.servicePoints): Each point should be a mini-keyword phrase (e.g., "Réparation et remplacement de freins de voiture").

4\. 

* h3 (t.serviceDetail.whyTrustTitle): Ensure specific service name is used.  
* h4 and p for whyChoosePoints: Reinforce expertise and trust specifically for that service.

---

### H. Landing Pages (

These are critical for PPL campaigns and require direct keyword injection.  
1\. 

* : "Bruit de freins suspect? Obtenez votre inspection des freins \<span className="text-orange-500"\>100% GRATUITE\</span\> à Mascouche (valeur 99$). Réponse en 5 minutes\!"  
* : "Les concessionnaires vous facturent 150$ juste pour regarder vos freins. Oubliez ça. Sachez \<span className='font-bold text-white'\>exactement\</span\> ce qui ne va pas, comme un mécanicien honnête, avant de payer un sou. Diagnostic rapide et fiable."  
* CTA Button: "OUI\! JE VEUX MON DIAGNOSTIC FREINS GRATUIT MAINTENANT\!"  
* Reassurance: "Garanti 100% gratuit. Sans obligation. Diagnostic rapide. Mécanicien de confiance Mascouche."

2\. 

* : "Votre concessionnaire vous charge-t-il trop cher pour l'entretien? Obtenez un bilan de santé automobile \<span className="text-orange-500"\>100% GRATUIT\</span\> à Mascouche."  
* : "Les concessionnaires adorent les 'inspections' à 150$. Zéro obligation. Zéro jargon mécanique. Juste la vérité sur l'état de votre véhicule par un expert fiable. Idéal pour un deuxième avis ou avant un long voyage."  
* CTA Button: "OUI\! JE VEUX MON BILAN DE SANTÉ HONNÊTE ET GRATUIT\!"  
* Reassurance: "Garanti 100% gratuit. Sans obligation. Pas de vente sous pression. Expert mécanicien Mascouche."

3\. 

* : "Temps de changer vos pneus à Mascouche? Ajoutez une Inspection de Freins \<span className="text-orange-500"\>GRATUITE\</span\> (Valeur 99$) avec votre changement de pneus."  
* : "Pourquoi faire deux voyages au garage? Pendant que vos pneus d'hiver ou d'été sont changés, nos experts inspecteront vos freins gratuitement. Repartez en toute sécurité et avec un entretien optimisé. Rendez-vous rapide disponible."  
* CTA Button: "OUI\! JE VEUX MON CHANGEMENT DE PNEUS \+ INSPECTION GRATUITE\!"  
* Reassurance: "Inspection gratuite avec votre changement de pneus. Service rapide garanti. Pose pneus hiver et été Mascouche."

---

### I. 

1\. Success Message:

* : "Merci\! Votre demande de service a été envoyée avec succès à MGC Réparation."  
* : "Un expert mécanicien de notre équipe vous appellera d'ici 5 minutes pour discuter de votre demande et confirmer votre rendez-vous à Mascouche."

---

### J. Forms (

* Placeholders: As mentioned, refine placeholders to prime users for keyword-rich input (descriptionPlaceholder).  
* Validation Messages: Keep them concise and actionable.  
* Vehicle Options: (Already good: "Car", "SUV", "Light Truck", "Heavy Truck", "Trailer", "Generator", "Other"). This covers many keyword types.

---

### K. 

* :  
  * : Can be slightly more verbose to include more specific keywords.  
  * Current: RDV: ${data.fullName || 'Client'} \- ${data.vehicleType} (${data.serviceCategory})  
  * Proposed: RDV MGC Réparation: ${data.fullName || 'Client'} \- ${data.vehicleType} (${data.serviceCategory}) à Mascouche  
  * : Ensure the details clearly state the service, potentially including problem keywords from the description.  
* 

---

This detailed plan ensures that your keyword strategy is deeply integrated into the frontend, optimizing your application for search engines and providing a highly relevant experience for your target avatars.  
I am ready to implement these changes. Please confirm if you'd like me to proceed\!  
---

Confirmation: I will ONLY return the XML in the specified format for the file updates. I will not provide additional conversational text after this point, unless you ask another question.

# les 3 offres de feu

# **🚨 OFFER 1 — FOR ALEX L’ANXIEUX**

**Avatar: Fear. Urgency. Suspicion.**  
 **Offer Goal: Get him to raise his hand *right now* and trust us with his brakes.**

### **🎯 STRATEGIC MIX**

For Alex, we combine:

* **Trojan Horse → Oil change \+ brake inspection included**

* **Cash-Back → If repairs are needed, his inspection value becomes a credit**  
   This creates a “safe rescue” frame:  
   No pressure. No surprise. No guessing.  
   Just *certainty*.

---

## **🔥 SUPER OFFER NAME**

### **L’Offre “Résurrection Sécurisée”**

(Seulement chez MGC Reparation)

---

## **🧨 HEADLINE**

### **\*\*Bruit de freins suspect? Votre sécurité mérite mieux.**

Obtenez un Bilan Freins VIP (150$) — INCLUS avec votre changement d’huile.\*\*

---

## **💥 BODY COPY (High-Tension, High-Reassurance)**

« Si vos freins font un bruit étrange, vous ne pouvez pas ignorer ça.  
 Mais vous n’avez pas besoin de paniquer non plus.

Chez MGC, on vous protège **avant** que la facture explose et **sans jamais profiter de vous**.

Réservez simplement votre changement d’huile régulier et recevez :

✅ **Inspection Freins 50 points (Valeur : 150$)** — INCLUS  
✅ **Rapport clair, sans jargon**  
✅ **Aucun engagement**  
✅ **Et si une réparation est nécessaire… votre inspection devient un CRÉDIT de 150$ sur la facture.**

Vous payez pour l’huile.  
 Vous recevez la tranquillité d’esprit.  
 Et vous ne risquez pas votre sécurité. »

---

## **🚀 CTA**

### **JE RÉSERVE MA SÉCURITÉ MAINTENANT**  **🔥 HEADLINES**

1. ### **Freins Qui Font Du Bruit? Inspection Incluse.**

2. ### **Ne Risquez Pas Votre Sécurité — Vérification Freins**

3. ### **Bruit Suspect? Inspection Freins GRATUITE**

4. ### **Changement d’Huile \+ Bilan Freins (150$ Inclus)**

5. ### **Diagnostic Freins Rapide et Fiable**

6. ### **Problème Urgent? On Vous Prend Aujourd’hui**

7. ### **Inspection Freins Valeur 150$ — Offerte**

8. ### **Freins Dangereux? On Vérifie Sans Frais**

9. ### **Mécanique Honnête à Mascouche**

10. ### **Rapport Clair, Zéro Jargon** 

## **💥 DESCRIPTIONS**

1. ### **Bruit de freins inquiétant? Réservez votre changement d’huile et recevez un Bilan Freins 50 points inclus. Sécurisez votre voiture dès aujourd’hui.** 

2. ### **Inspection Freins (150$) incluse avec votre changement d’huile. Pas de surprise, pas de pression. Réservez maintenant.** 

3. ### **Problème urgent? On vous prend rapidement. Rapport clair, mécanique honnête, sécurité garantie.** 

4. ### **Freins qui grincent? On vérifie tout sans frais supplémentaires. Réservez votre place immédiatement** 

### **SMS \#1 — Immediate (0 min)**

### **“Salut\! C’est MGC. On a reçu votre demande pour une inspection de freins. Ne conduisez pas inutilement — on peut vous prendre rapidement. Quelle heure fonctionne pour vous aujourd’hui ou demain?”**

### **Email \#1 — 5 minutes later**

### **Subject: Votre sécurité avant tout.**  **Body:**  **“Merci pour votre demande.**  **Si vos freins font un bruit suspect, c’est important de ne pas attendre.**  **On peut vous voir rapidement et votre inspection freins (valeur 150$) est incluse avec votre huile.**  **Répondez simplement à ce message pour confirmer une heure.”**

### **SMS \#2 — 1 hour later**

### **“On peut vous prendre aujourd’hui pour votre inspection freins. 30 minutes suffisent pour diagnostiquer. Une heure vous convient?”**

### **Email \#2 — 3 hours later**

### **Subject: Ne prenez pas de risque inutile**  **Short and direct:**  **“Une vérification aujourd’hui peut vous éviter une facture beaucoup plus élevée demain.**  **Votre inspection est incluse — réservez en répondant ici.”**

### **SMS \#3 — Next morning**

### **“Bon matin\! On a encore des places aujourd’hui pour votre inspection freins incluse. Voulez-vous une heure AM ou PM?”**

### 

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
      
**OFFER 2 — FOR SOPHIE LA SAGE**

**Avatar: Smart. Skeptical. Logical.**  
 **Offer Goal: Build trust, destroy dealer positioning, and get her into the shop for a diagnostic.**

### **🎯 STRATEGIC MIX**

For Sophie, the Cash-Back Strategy dominates — she loves transparency and hates wasted money.  
 But we also Trojan-Horse it by positioning it as a **“Second Opinion Elite” package**.

---

## **🔥 SUPER OFFER NAME**

### **Le Bilan “Deuxième Opinion” 100% Crédité**

---

## **🧨 HEADLINE**

### **Votre concessionnaire vous charge trop? Obtenez un diagnostic honnête pour 49$… entièrement crédité.**

---

## **💥 BODY COPY (Smart, Transparent, Anti-Dealer Positioning)**

« Les concessionnaires facturent 150$ juste pour regarder votre voiture… et vous poussent ensuite vers des réparations douteuses.

Chez MGC, on fait les choses différemment.

Obtenez notre **Bilan de Santé Complet 50 points** pour seulement **49$**, et voici la partie importante :

👉 **100% de ces 49$ est crédité sur n’importe quelle réparation ou entretien que vous choisissez ensuite.**  
 Aucun jargon.  
 Aucune pression.  
 Juste la vérité — par des experts qui travaillent pour vous, pas pour la commission.

Si vous cherchez un garage fiable, transparent, et honnête… commencez ici. »

---

## **🚀 CTA**

### **JE VEUX MON BILAN 100% CRÉDITÉ**  **🔥 HEADLINES**

1. ### **Diagnostic Auto 49$ — 100% Crédité**

2. ### **Votre Concessionnaire Vous Charge Trop?**

3. ### **Obtenez la Vraie Vérité sur Votre Véhicule**

4. ### **Bilan 50 Points — Juste la Vérité**

5. ### **Zéro Jargon. Zéro Pression.** 

6. ### **Inspection Complète — Crédit Sur Réparation** 

7. ### **Besoin d’un Deuxième Avis?** 

8. ### **Garage Honnête Mascouche** 

9. ### **Confiance. Transparence. Aucune Surfacturation.** 

10. ### **49$ Aujourd’hui, Crédit Immédiat Ensuite** 

## **💥 DESCRIPTIONS**

1. ### **Diagnostic complet 49$ entièrement crédité sur votre réparation. Zéro pression, juste la vérité.** 

2. ### **Parfait pour obtenir un deuxième avis. Inspection détaillée, rapport clair, techniciens experts.** 

3. ### **Votre concessionnaire charge trop? Vérifiez avant de payer. Bilan complet et honnête.** 

4. ### **49$ aujourd’hui, crédit demain. Le choix intelligent pour protéger votre budget.** 

### 

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**OFFER 3 — FOR MARTIN LE PRÉVOYANT**

**Avatar: Practical. Efficient. Deal-seeker.**  
 **Offer Goal: Turn tire changes into high-value brake inspections.**

### **🎯 STRATEGIC MIX**

Martin loves convenience and bundles.  
 We Trojan Horse his tire change by stacking a **high-value inspection** on top of a service he’s *already searching for*.

Then we add a **$49 cash-back option** IF we need repairs later — giving him a feeling of “smart planning.”

---

## **🔥 SUPER OFFER NAME**

### **Le Combo Pneus \+ Inspection Freins**

(L’Effet “2 Services en 1 Déplacement”)

---

## **🧨 HEADLINE**

### **Temps de changer vos pneus? Obtenez une Inspection de Freins GRATUITE pendant qu’on y est.**

---

## **💥 BODY COPY (Efficient, Logical, Bundled Value)**

« Vous devez déjà venir pour votre changement de pneus.  
 Alors autant en profiter.

Chez MGC, pendant qu’on remplace vos pneus, on ajoute :

🛠️ **Inspection Freins Complète — GRATUITE**  
 (Valeur : 150$)

Pourquoi?  
 Parce que c’est logique. Vos roues sont déjà retirées.  
 Donc l’inspection coûte moins cher à faire — alors on vous l’offre.

Et si jamais on trouve quelque chose, vous pouvez même profiter de notre **crédit de 49$** sur votre réparation.

2 services.  
1 déplacement.  
0 perte de temps.  
C’est l’efficacité version MGC. »

---

## **🚀 CTA**

### **JE RÉSERVE MON COMBO PNEUS \+ INSPECTION**

**🔥 HEADLINES**

1. Changement de Pneus \+ Inspection Freins GRATUITE

2. 2 Services en 1 — Gagnez du Temps

3. Bilan Freins Offert Pendant Vos Pneus

4. Combo Pneus \+ Inspection Valeur 150$

5. Service Rapide & Efficace à Mascouche

6. Pneus \+ Sécurité \= Offre Parfaite

7. Rendez-Vous Simple, Service Double

8. Tire Change \+ Brake Check Included

9. L’Efficacité à Son Meilleur

10. Inspection Freins Offerte Avec Vos Pneus

## **💥 DESCRIPTIONS**

1. Pendant votre changement de pneus, obtenez une inspection complète des freins — gratuitement.

2. 2 services en 1 déplacement. Gagnez du temps et vérifiez l’état de vos freins.

3. Rapport clair, aucune pression. Service rapide, efficace et intelligent.

4. L’offre parfaite pour la saison: pneus \+ freinage vérifié sans frais.

