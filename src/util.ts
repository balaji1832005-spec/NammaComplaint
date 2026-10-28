export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

// Identity emails (invites, password resets, confirmations) link to the site root.
// Forward them to the officials' page, which knows how to finish the flow.
export function forwardAuthCallback() {
  if (/(invite|recovery|confirmation|email_change)_token=/.test(location.hash)) {
    location.replace(`/admin${location.hash}`);
  }
}
