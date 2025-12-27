import { Command } from 'commander';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();
const GHL_API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

program
    .name('ghl-setup')
    .description('Utilities to setup GHL Backend in French')
    .version('1.0.0');

program
    .command('create-pipeline')
    .description('Create the MGC Pipeline in French')
    .action(async () => {
        console.log('🚀 Creating GHL Pipeline: [MGC] Tunnel de Ventes...');

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
            console.log('✅ Pipeline created successfully!');
            console.log(JSON.stringify(resp.data, null, 2));
        } catch (err: any) {
            console.error('❌ Error creating pipeline:', err.response?.data || err.message);
        }
    });

program.parse();
