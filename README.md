# wardrobe-ui

Svelte-based frontend for https://github.com/abhiandthetruth/wardrobe-api

## Running locally:

Make sure your backend server is running at localhost:8000, if running on some other port then modify the `generate-client` script in `package.json` to point to that port.

1. First time setup:
```bash
npm run setup
```
2. Daily development:
```bash
npm run dev
```
3. Regenerate when API changes:
```bash
npm run generate
```