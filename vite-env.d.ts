/// <reference types="vite/client" />

// FIX: Augment the existing NodeJS.ProcessEnv interface instead of redeclaring `process`.
// This avoids conflicts with global types from packages like @types/node and resolves the redeclaration error.
declare namespace NodeJS {
  interface ProcessEnv {
    VITE_GOOGLE_PLACES_API_KEY: string;
  }
}
