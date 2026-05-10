/** Converts a section heading like "§03 · The Work" to a clean DOM id: "the-work" */
export function sectionId(headingText: string): string {
  return headingText
    .replace(/^§\d+\s*·\s*/, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Strips the "§XX · " prefix, leaving just the label: "The Work" */
export function sectionLabel(headingText: string): string {
  return headingText.replace(/^§\d+\s*·\s*/, '');
}
