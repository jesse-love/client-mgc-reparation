// FIX: Replaced `declare var process` with a namespace augmentation for `NodeJS.ProcessEnv`.
// This resolves the "Cannot redeclare block-scoped variable 'process'" error by extending
// the existing global types from `@types/node` instead of creating a conflicting declaration.
declare namespace NodeJS {
  interface ProcessEnv {
    VITE_GOOGLE_PLACES_API_KEY: string;
  }
}
