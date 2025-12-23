import { VertexAI } from "@google-cloud/vertexai";
import path from "path";

const KEY_FILE = path.join(process.cwd(), 'gcloud-key.json');

const testVertex = async () => {
    console.log('🧠 Testing Vertex AI Strategic Brain...');

    try {
        const project = "gen-lang-client-0992117425";
        const location = "us-central1";
        const vertexAI = new VertexAI({ project, location, keyFilename: KEY_FILE });
        const model = vertexAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Propose une stratégie de 3 mots pour augmenter les conversions de MGC Réparation à Mascouche.";
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });

        const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        console.log('✅ Success! Strategic Suggestion:');
        console.log(responseText);
    } catch (err) {
        console.error('❌ Vertex AI Failed:', err.message);
    }
};

testVertex();
