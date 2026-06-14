/**
 * Page-level access map for the console, mirroring user_security_roles.csv.
 *
 * Access is now governed purely at the page level (RLS was removed from the
 * semantic model). This map decides which pages render in the rail; every
 * granted page shows full, unfiltered data.
 *
 * Keyed by lowercased sign-in email. "all" grants every page; a list grants
 * those page ids; unknown users get NOTHING (default deny).
 */
export type PageGrant = "all" | string[];

const PAGE_ACCESS: Record<string, PageGrant> = {
  // Full console
  "otto@timosborn6gmail.onmicrosoft.com": "all",
  "timosborn6@timosborn6gmail.onmicrosoft.com": "all",
  "timosborn6@gmail.com": "all",
  "hsmurf@timosborn6gmail.onmicrosoft.com": "all",

  // No access — lands on the access-denied screen
  "uadmin@timosborn6gmail.onmicrosoft.com": [],

  // Operations Command only
  "ladmin@timosborn6gmail.onmicrosoft.com": ["ops"],
  "notadmin@timosborn6gmail.onmicrosoft.com": ["ops"],

  // Workforce & Personnel only
  "ssupport@timosborn6gmail.onmicrosoft.com": ["workforce"],
};

/** Page ids the user may see. Unknown / missing email → [] (default deny). */
export function allowedPageIds(email: string | null | undefined, allIds: string[]): string[] {
  if (!email) return [];
  const grant = PAGE_ACCESS[email.trim().toLowerCase()];
  if (grant === "all") return allIds;
  if (Array.isArray(grant)) return grant.filter((id) => allIds.includes(id));
  return [];
}
