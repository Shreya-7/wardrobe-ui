# wardrobe-ui

Svelte-based frontend for https://github.com/abhiandthetruth/wardrobe-api

## Running locally:

Make sure your backend server is running at localhost:8080, if running on some other port then modify the `generate-client` script in `package.json` to point to that port.
1. Generate the client for the server in the `src/client` dir, if not already present:
```bash
npm run generate-client
```
2. Modify the `OpenAPI.BASE` var to point to your backend server.
3. Run:
```bash
npm run dev
```