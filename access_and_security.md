# Access & Security — Imperial DSMS Fabric App

> **Status:** Testing / preview. Fabric Apps is a **preview** feature; the access
> model below reflects what Microsoft documents as of June 2026 and is expected
> to change. This document records how access is wired in *this* project, the
> Entra ID synchronisation approach we adopted, and the official documentation
> that backs it.

---

## 1. How access works in this app today

Access is decided at **two layers**:

| Layer | Controls | Where it lives | Enforced by |
|---|---|---|---|
| **Fabric platform** | Whether a person can open the app at all | Workspace roles + item sharing in the Fabric portal | Fabric / Entra SSO |
| **In-app (this repo)** | Which **pages** of the console a signed-in user sees | `imperial-dsms/src/lib/page-access.ts` | App code (UX layer) |

> **Important:** the in-app layer is a **UX convenience**, not a security boundary.
> It hides rail pages a user isn't provisioned for, but anyone who can open the
> app reaches the same backend. Real data enforcement must come from the Fabric
> platform layer (workspace/item permissions) and, where applicable, the
> semantic model. RLS was deliberately removed from the model for this project,
> so page-access is currently presentation-only.

### Runtime flow

1. `imperial-dsms/src/services/rayfin-auth.service.ts` runs the Fabric brokered
   (iframe) auth handoff → returns an `OpaqueSession`.
2. `imperial-dsms/src/hooks/use-auth.tsx` puts the session in React context;
   `imperial-dsms/src/components/auth-gate.component.tsx` blocks anyone not
   signed in through Fabric.
3. `imperial-dsms/src/AppShell.tsx` reads `session.user.email` and calls
   `allowedPageIds(email, …)` from `page-access.ts`.
4. `page-access.ts` maps **lower-cased email → page grant** (`"all"`, a list of
   page ids, or `[]`). Unknown email → `[]` → "Access Not Provisioned" screen.

### Key constraint — no group claim at runtime

The Rayfin session (`@microsoft/rayfin-auth` → `OpaqueSession.user`) exposes only
`id`, `email`, and a coarse `role` of `'Anonymous' | 'Authenticated'`. **It carries
no Entra ID group-membership claim.** In-app row authorization (`@role` decorators)
is evaluated against token **claims** (e.g. `claims.sub`), not Entra groups.

➡️ Because the app can't ask "which security groups is this user in?", granular
in-app access **cannot** be driven directly from Entra group membership. This is
the gap that forces the email-list approach below.

---

## 2. The source files

| File | Role | Enforced? |
|---|---|---|
| `user_security_roles.csv` | Human-maintained roster (the source of truth) | No — reference only |
| `imperial-dsms/src/lib/page-access.ts` | The `PAGE_ACCESS` map the app reads at runtime | **Yes** |

The CSV columns: `displayName`, `userPrincipalName`, `Worspace Access` *(sic)*,
`DimRole`/`DimVendor`/`DimLocation`/`DimItem`/`DimDepartment` *(legacy RLS columns,
no longer enforced)*, `Pages viewable`, and `Group` (the Entra security group).

---

## 3. Entra ID synchronisation approach (Option B — Azure CLI)

Because group membership isn't available at runtime, we **synchronise out-of-band**:
pull the membership of the relevant Entra security groups via the Azure CLI,
maintain the CSV as the editable source of truth, and (planned) generate
`page-access.ts` from it. Suboptimal, but acceptable while Apps is in preview.

### Tenant & identity

- **Tenant:** `8a0f87d8-f522-4f9b-8f4e-cf9d2f11c784`
- **Azure CLI:** v2.87.0, signed in as `Otto@timosborn6gmail.onmicrosoft.com`

### Security groups (verified against the CSV)

| CSV `Group` | Entra display name | Object ID |
|---|---|---|
| `Security Group1` | `Security Group1` | `e3dcfcdd-ca11-417a-a0e6-8e5315280eb9` |
| `Security Group 2` | `Security Group 2` | `4fc57151-c7f0-4473-ac63-18fac69018b2` |

> **Naming gotcha:** the CSV originally read `Security Group 1` (with a space) but
> the Entra group is `Security Group1` (no space). The CSV was corrected to match.
> **Match groups by object ID, not display name** in any sync script — IDs are
> immutable and survive renames/spacing changes.

### Verified membership (matches the CSV exactly)

**Security Group1** (`e3dcfcdd…`) — full console (`"all"`):

| Member | UPN | `mail` |
|---|---|---|
| Otto Totland | `Otto@…onmicrosoft.com` | — |
| Tim Osborn | `timosborn6@…onmicrosoft.com` | `timosborn6@gmail.com` |
| Happy Smurf | `hSmurf@…onmicrosoft.com` | — |

**Security Group 2** (`4fc57151…`) — restricted (Operations Command only, per CSV):

| Member | UPN | `mail` |
|---|---|---|
| License Admin | `LAdmin@…onmicrosoft.com` | — |
| Not Admin | `NotAdmin@…onmicrosoft.com` | — |
| ServiceSupport Admin | `SSupport@…onmicrosoft.com` | — |

`User Admin` (`UAdmin@…`) is in **neither** group, matching its blank `Group` cell
(→ no access).

### Commands used

```powershell
# Confirm CLI + identity
az version
az account show --query "{name:name, user:user.name, tenantId:tenantId}" -o json

# List Entra security groups (find names + object IDs)
az ad group list --query "sort_by([].{displayName:displayName, id:id, securityEnabled:securityEnabled, mail:mail}, &displayName)" -o json

# Pull membership of each group (match by object ID)
az ad group member list --group "e3dcfcdd-ca11-417a-a0e6-8e5315280eb9" `
  --query "sort_by([].{displayName:displayName, userPrincipalName:userPrincipalName, mail:mail}, &displayName)" -o json
az ad group member list --group "4fc57151-c7f0-4473-ac63-18fac69018b2" `
  --query "sort_by([].{displayName:displayName, userPrincipalName:userPrincipalName, mail:mail}, &displayName)" -o json
```

### Things any sync script MUST handle

1. **Match groups by object ID**, never display name.
2. **Capture both `userPrincipalName` and `mail`.** The app keys access off
   `session.user.email`; Tim signs in with `timosborn6@gmail.com` but his UPN is
   `…onmicrosoft.com`. `page-access.ts` already lists **both** of his addresses —
   matching on UPN alone would lock him out. Emit every known address per user.
3. **Lower-case emails** before use (the map is lower-cased).
4. **Default deny:** any user not in a mapped group → `[]`.

### Known discrepancy to reconcile

The CSV says Security Group 2 = "Operations command only", but `page-access.ts`
currently grants `ssupport@…` `["workforce"]` while the other group-2 members get
`["ops"]`. The CSV and the code disagree for ServiceSupport Admin. **Decide which
is correct before generating `page-access.ts` from the CSV** (a generator would
force a single answer and end the drift).

---

## 4. What Microsoft documents about Fabric App access via Entra groups

**Bottom line:** Microsoft has **not** documented (current or roadmap) any way to
drive *granular, in-app* access for a Fabric App from Entra security group
membership. No published "will be able to" commitment exists as of June 2026.

### Documented today

- **App-level access (coarse) — workspace roles + item sharing.** A deployed app
  is governed by item permissions: **Run and interact** (default for all workspace
  members), **Edit (Write)**, **Reshare**. Per the general permission model,
  workspace roles and item sharing **can be assigned to Entra security groups** —
  so you *can* gate *whether a group can open the app at all*, today. But it's
  all-or-nothing for the whole app, not per-page.
- **Security groups appear once in the Apps docs** — the *tenant admin* toggle:
  "enable for the entire organization or specific security groups." That controls
  who can **create** Fabric App items, **not** who can access a running one.
- **In-app authorization is claims-based**, via `@role` decorators against token
  claims — no Entra group claim is surfaced to app code.

### Documentation links

| Topic | URL |
|---|---|
| Fabric Apps overview / **Item permissions** (definitive app-access doc) | https://learn.microsoft.com/fabric/apps/overview#management-in-the-fabric-portal |
| Permission model (groups on workspace roles / sharing) | https://learn.microsoft.com/fabric/security/permission-model |
| Roles in workspaces | https://learn.microsoft.com/fabric/fundamentals/roles-workspaces |
| Preview features hub (watch for GA/roadmap changes) | https://learn.microsoft.com/fabric/fundamentals/preview |
| Fabric release plan | https://learn.microsoft.com/fabric/release-plan/ |

---

## 5. Recommendation for the client

- **Supported now:** gate *entry to the whole app* by Entra security group via
  workspace role / item share — good for "can this group use the app: yes/no."
- **Not supported / not documented:** mapping group membership to *granular roles
  inside the app* (the per-page access this console uses).
- **Interim approach (this project):** retrieve group membership via Azure CLI,
  keep `user_security_roles.csv` as the source of truth, and generate
  `page-access.ts` from it. Re-run the sync whenever group membership changes.
- **Watch:** the preview hub and release plan — if/when Entra group claims reach
  app code, replace the static email list with runtime group-based checks.
