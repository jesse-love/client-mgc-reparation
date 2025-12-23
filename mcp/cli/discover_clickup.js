import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;

const discoverSpace = async () => {
    console.log('🔍 Discovering ClickUp Spaces...');

    try {
        // First, get teams (workspaces)
        const teamsResp = await axios.get(`https://api.clickup.com/api/v2/team`, {
            headers: { Authorization: CLICKUP_API_TOKEN }
        });

        for (const team of teamsResp.data.teams) {
            console.log(`\n🏢 Team: ${team.name} (ID: ${team.id})`);

            // Get spaces in this team
            const spacesResp = await axios.get(`https://api.clickup.com/api/v2/team/${team.id}/space`, {
                headers: { Authorization: CLICKUP_API_TOKEN }
            });

            for (const space of spacesResp.data.spaces) {
                console.log(`  🚀 Space: ${space.name} (ID: ${space.id})`);

                // Get folders in this space
                const foldersResp = await axios.get(`https://api.clickup.com/api/v2/space/${space.id}/folder`, {
                    headers: { Authorization: CLICKUP_API_TOKEN }
                });

                for (const folder of foldersResp.data.folders) {
                    console.log(`    📁 Folder: ${folder.name} (ID: ${folder.id})`);
                    for (const list of folder.lists) {
                        console.log(`      📋 List: ${list.name} (ID: ${list.id})`);
                    }
                }

                // Get folderless lists in this space
                const listsResp = await axios.get(`https://api.clickup.com/api/v2/space/${space.id}/list`, {
                    headers: { Authorization: CLICKUP_API_TOKEN }
                });

                for (const list of listsResp.data.lists) {
                    console.log(`    📋 List (Folderless): ${list.name} (ID: ${list.id})`);
                }
            }
        }
    } catch (err) {
        console.error('❌ Discovery Failed:', err.response?.data || err.message);
    }
};

discoverSpace();
