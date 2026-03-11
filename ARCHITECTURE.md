# Architecture Documentation

## Localization

### Overview
The application uses **next-intl** (v4.8.3) for internationalization with the Next.js App Router. Two locales are supported: `en` (English) and `uk` (Ukrainian, default).

### Key Files
- `/src/i18n/routing.ts` — Defines supported locales and default locale
- `/src/i18n/request.ts` — Server-side message loading
- `/src/i18n/navigation.ts` — Locale-aware `Link`, `useRouter`, `usePathname`
- `/src/messages/en.json` — English translations
- `/src/messages/uk.json` — Ukrainian translations

### How It Works
- All routes are under `/[locale]/` via the App Router
- **Client components** use `useTranslations('namespace')` hook from `next-intl`
- **Server components** use `getTranslations('namespace')` from `next-intl/server`
- Translation keys are organized by page/feature namespace (e.g., `login`, `profile`, `search`, `post`, `newPost`, `ideas`, `onboarding`, `share`, `xp`, `toast`, etc.)
- Language switching is handled by the locale prefix in the URL (`/en/...` vs `/uk/...`)

### Translation Namespaces
| Namespace | Purpose |
|-----------|---------|
| `meta` | Page metadata (title, description, OpenGraph) |
| `nav` | Navigation links |
| `notFound` | 404 page |
| `footer` | Footer content |
| `common` | Shared strings (Sign In, Back to Blog, etc.) |
| `home` | Home page (hero, stats, sections) |
| `categories` | Category labels |
| `blog` | Blog listing page |
| `login` | Login page form |
| `post` | Blog post detail page |
| `newPost` | New post editor page |
| `profile` | User profile page |
| `search` | Search page with filters |
| `ideas` | Ideas/Todo voting page |
| `onboarding` | Onboarding modal steps |
| `share` | Share buttons |
| `error` | Error boundary |
| `xp` | XP event descriptions |
| `toast` | Toast notifications |

---

## XP Deduplication

### Problem
Previously, users could earn XP multiple times for the same action (e.g., viewing the same article repeatedly, liking the same post).

### Solution
A **tracked actions** system was implemented in the Zustand gamification store using the pattern: `actionType + entityId`.

### Key Files
- `/src/types/index.ts` — `UserAction` interface definition
- `/src/store/gamificationStore.ts` — Core deduplication logic in `addXp()` and `hasAction()`
- `/src/hooks/usePosts.ts` — Passes `postId` as `entityId` for like/view actions
- `/src/hooks/useTodo.ts` — Passes `ideaId` as `entityId` for idea likes

### How It Works
1. **`UserAction` interface** tracks: `actionType`, `entityId`, `createdAt`
2. **`trackedActions`** array is stored in the Zustand gamification store (persisted to localStorage)
3. **Before granting XP**, `addXp(type, entityId?)` checks if a matching `actionType + entityId` record exists
4. **If exists** → returns `null` (no XP granted)
5. **If new** → grants XP, stores the action in `trackedActions`

### Deduplication Points
| Action | entityId | Description |
|--------|----------|-------------|
| `like_post` | `postId` | Liking a specific blog post |
| `read_post` | `postId` | Viewing/reading a specific post |
| `like_idea` | `ideaId` | Liking a specific idea |
| `daily_visit` | `daily-{YYYY-MM-DD}` | One daily visit bonus per day |

### Data Persistence
All tracked actions are persisted via Zustand's `persist` middleware to `localStorage` under the key `gamification-storage`. This ensures deduplication survives page refreshes and browser sessions.
