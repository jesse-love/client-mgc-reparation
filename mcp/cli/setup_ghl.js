import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

const setupGHL = async () => {
    console.log('🚀 Démarrage du déploiement du backend GHL MGC...');

    const pipelineData = {
        name: '[MGC] Tunnel de Ventes',
        locationId: LOCATION_ID,
        stages: [
            { name: '📥 Prospect Entrant', showInPipeline: true, showInFunnel: true },
            { name: '📞 Contact Établi', showInPipeline: true, showInFunnel: true },
            { name: '📅 Rendez-vous Fixé', showInPipeline: true, showInFunnel: true },
            { name: '🛠️ Véhicule en Atelier', showInPipeline: true, showInFunnel: true },
            { name: '✅ Travaux Terminés', showInPipeline: true, showInFunnel: true },
            { name: '💰 Facturé / Payé', showInPipeline: true, showInFunnel: true },
            { name: '❌ Perdu / Annulé', showInPipeline: true, showInFunnel: true }
        ]
    };

    try {
        const resp = await axios.post('https://services.leadconnectorhq.com/opportunities/pipelines', pipelineData, {
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Pipeline [MGC] Tunnel de Ventes créé avec succès !');
        console.log('Pipeline ID:', resp.data.pipeline.id);
    } catch (err) {
        console.error('❌ Erreur lors de la création du pipeline:', err.response?.data || err.message);
    }

    // Tags Setup
    console.log('🚀 Création des Tags MGC...');
    const tags = [
        'ppl_lead_mecanique',
        'ppl_lead_freins',
        'ppl_lead_pneus',
        'ppl_lead_camion_lourd',
        'ppl_lead_generatrice',
        'ppl_lead_soudure'
    ];

    for (const tag of tags) {
        try {
            await axios.post(`https://services.leadconnectorhq.com/locations/${LOCATION_ID}/tags`, { name: tag }, {
                headers: {
                    Authorization: `Bearer ${GHL_API_KEY}`,
                    Version: '2021-07-28',
                    'Content-Type': 'application/json'
                }
            });
            console.log(`✅ Tag créé: ${tag}`);
        } catch (err) {
            if (err.response?.status === 409) {
                console.log(`ℹ️ Tag déjà existant: ${tag}`);
            } else {
                console.error(`❌ Erreur Tag ${tag}:`, err.response?.data || err.message);
            }
        }
    }

    console.log('\n✨ Configuration Backend GHL terminée avec succès !');
};

setupGHL();
