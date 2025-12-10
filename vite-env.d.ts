/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_PLACES_API_KEY: string;
    readonly VITE_GOOGLE_MAPS_EMBED_KEY: string;
    readonly VITE_GOOGLE_CHAT_WEBHOOK_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
