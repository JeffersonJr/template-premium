export type AgencySiteSettings = {
  /** Company-level Instagram profile URL supplied by the CRM when connected. */
  instagramUrl?: string | null;
};

// The template intentionally has no fallback profile: social links should only
// appear when the agency has configured a valid URL.
export const agencySiteSettings: AgencySiteSettings = {
  instagramUrl: undefined,
};

export function getInstagramProfileUrl(value: string | null | undefined) {
  if (!value?.trim()) return undefined;

  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== "https:" ||
      !["instagram.com", "www.instagram.com"].includes(
        url.hostname.toLowerCase(),
      )
    ) {
      return undefined;
    }
    return url.toString();
  } catch {
    return undefined;
  }
}
