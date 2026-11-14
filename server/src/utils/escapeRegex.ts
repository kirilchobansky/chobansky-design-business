// Escapes user input so it is matched literally inside a RegExp (prevents regex injection / ReDoS).
export const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
