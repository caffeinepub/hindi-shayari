# Hindi Shayari App

## Current State
New project with no existing application logic.

## Requested Changes (Diff)

### Add
- Hindi shayari app with dark glassmorphism + neon purple theme
- Categories: Love, Sad, Attitude, Friendship, Motivational
- Shayari cards with like, copy, share (WhatsApp) actions
- Generate Shayari button (generates random shayari per category)
- Trending Shayari section
- Search bar to filter shayari
- Liked/favorites stored in backend per user
- Splash screen / loading animation
- Load more / infinite scroll
- Offline fallback shayari collection
- Daily auto-refresh of shayari feed

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: store shayari (text, category, likes), like/unlike endpoints, get by category, search, trending (sorted by likes), seed with offline fallback shayari corpus
2. Frontend: splash screen on load, sticky glassmorphism navbar with search, hero with category selector + generate button, trending section, cards grid with like/copy/share, load more pagination, local state synced with backend likes
