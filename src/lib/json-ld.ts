/**
 * Serializes JSON-LD for use inside a <script> via dangerouslySetInnerHTML.
 * Escapes `<` so content containing `</script>` (e.g. an admin-edited blog
 * title or FAQ answer) can't break out of the script tag and inject markup.
 */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
