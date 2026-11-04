# Kotoba — React + Node.js

N2 Japanese–Sinhala dictionary, grammar notes සහ searchable PDF / DOCX documents.

## Run කිරීම

Node.js 22 හෝ ඉහළ version එකක් අවශ්‍යයි. ZIP එක extract කර Kotoba folder එක VS Code එකෙන් open කරන්න.

```sh
npm ci
npm run dev
```

Terminal එකේ පෙන්වන local URL එක browser එකෙන් open කරන්න (සාමාන්‍යයෙන් http://localhost:5173).
Source code වෙනස් කළාම Vite මගින් UI update වේ. HTML file එක double-click කර run නොකරන්න.

## Production / Node server

```sh
npm run build
npm start
```

http://localhost:3000 විවෘත කරන්න. Node server එක build කළ React app එක සහ PDF assets serve කරයි.
`GET /api/health` → app status. `PORT` සහ `HOST` environment variables මගින් server address වෙනස් කළ හැක.

Online Kotoba version එක compiled React static build එක serve කරයි. Node server එක local/self-hosted deployment සඳහා ඇතුළත්.
**Node server එකට entries/documents save කරන database API එකක් තවම නැහැ.**

## Project structure

| Path | කාර්යය |
| --- | --- |
| `src/App.jsx` | ප්‍රධාන state සහ screen composition |
| `src/components/` | Sidebar, cards, editor, document details, uploads, backup dialog |
| `src/hooks/useCollection.js` | Collection loading සහ save/delete/refresh |
| `src/services/storage.js` | IndexedDB persistence; පසුව API/database adapter එකක් යෙදිය හැක |
| `src/services/documents.js` | PDF.js / JSZip භාවිතයෙන් document text extraction |
| `src/services/search.js` | Japanese/Sinhala search, snippets, highlights |
| `src/services/backup.js` | Backup validation, export/import |
| `src/data/seed.js` | ආරම්භක vocabulary / grammar entries 12 |
| `src/styles.css` | Responsive UI styles |
| `public/vendor/` | PDF.js, fonts, CMaps, WASM, JSZip සහ licenses |
| `server/app.mjs` | Node HTTP server; API routes පසුව මෙහි එක් කරන්න |
| `server/index.mjs` | Production Node startup |
| `tests/` | Search, backup validation සහ server checks |
| `dist/` | Build කළ app එක; source edit කර නැවත build කරන්න |

## Commands

```sh
npm run dev       # Vite development server
npm run build     # React production build → dist/
npm run preview   # Build preview
npm start         # Node production server
npm test          # Automated checks; build first for server smoke test
```

## පරණ දත්ත

Database name `kotoba-dictionary` සහ schema එක නොවෙනස්ව තබා ඇත. එකම browser/domain එකේ පරණ entries, documents සහ favourites පවතී.
පරණ `{app: "kotoba", version: 1}` backups import කළ හැක.

Browser, device, domain හෝ localhost port මාරු කළොත් පරණ app එකෙන් **Backup & restore → Export backup** කර නව app එකේ **Import backup** කරන්න.
පුද්ගලික uploaded documents source ZIP එකේ ඇතුළත් නැහැ.

## Features සහ සීමාවන්

- Entries add/edit/delete; Japanese, reading සහ සිංහල search.
- Favourites සහ vocabulary/grammar/custom filters.
- PDF/DOCX/TXT content search; page/section cards, match highlighting, original download.
- Document details වල සිංහල summary, explanation සහ manual search text.
- ගොනුවකට උපරිම 20 MB.
- Scanned PDFs/images සඳහා OCR ඇතුළත් නැහැ. Search text අතින් paste කරන්න.
- පරණ `.doc` ගොනු Word/LibreOffice හරහා `.docx` බවට save කර upload කරන්න.
- දත්ත browser IndexedDB තුළ පමණක් සුරැකේ. Cloud sync/login/database තවම නැහැ; backup ගන්න.
- PDF/Word processing browser එකේ සිදු වේ. Uploads server එකට යවන්නේ නැහැ.
- Starter collection එක සම්පූර්ණ N2 syllabus එක නොවේ.

## පසුව develop කිරීම

අලුත් UI සඳහා `src/components/` වෙනස් කරන්න. Database/Firebase/Node API එක් කිරීමේදී `storage.js` සහ `useCollection.js` service boundary භාවිත කරන්න.
PDF parsing වෙනස් කිරීමට `documents.js`; search behavior සඳහා `search.js` වෙනස් කරන්න.

## Static hosting

`npm run build` පසුව `dist/` අන්තර්ගතය deploy කරන්න. `.mjs` JavaScript MIME type සහ `.wasm` application/wasm serve කළ යුතුය.
React, React DOM සහ Vite package versions `package-lock.json` වල lock කර ඇත.
PDF.js 5.6.205 (Apache-2.0) සහ JSZip 3.10.1 (MIT/GPL dual license); license files `public/vendor/` තුළ ඇත.

## Popup quotation update

Search results හි **Read excerpt** click කළ විට PDF/DOCX හි අදාළ වාක්‍ය වෙනම popup card එකක පෙන්වයි. Search term එක කහ පැහැයෙන් highlight නොකරයි. **Document details** මගින් සම්පූර්ණ source එක බලන්න.
Noto Sans Sinhala font files `public/fonts/` තුළ ඇතුළත් (SIL Open Font License); අන්තර්ජාල font service එකක් අවශ්‍ය නැහැ.

## Professional workspace update

- Sidebar counts, four overview cards, refreshed responsive layout and Sinhala typography.
- Light/dark mode (preference saved on this browser).
- `/` keyboard shortcut to focus search, Escape to clear, clear-search button.
- Results load in groups of 24 to keep large collections responsive.
- Remove confirmation and Undo while the removal notification is open. Undo is session-only; export backups for long-term recovery.
- Per-file upload results, document reading progress, password-PDF feedback, storage error messages and reload recovery screen.
- Existing entries, documents, popup quotes and version-1 backups remain compatible. Storage is still browser-local.
