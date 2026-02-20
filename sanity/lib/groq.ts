/**
 * Re-export for defining GROQ queries as plain strings.
 *
 * defineQuery is a no-op: it returns the same string you pass in. It exists so
 * editor integrations (e.g. Sanity VS Code extension) can treat the string as
 * GROQ and provide syntax highlighting and other features.
 *
 * Ideally the `groq` template tag would be used, but we cannot infer types from
 * it until microsoft/TypeScript#33304 is resolved. Otherwise there is no
 * difference between this and the groq template tag — same input, same string
 * output.
 */
export { defineQuery } from "next-sanity";
