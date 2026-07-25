# अन्नData

India's premium agritech platform — organizing the country's agricultural future.

## What it does

- Digital marketplace for crops (wheat, rice, cotton, tobacco, chicory, vegetables, fruits, pulses, oilseeds)
- Direct farm-gate procurement by अन्नData
- Agri-input store (seeds, fertiliser, pesticides, tools)
- AI crop advisory
- Weather forecasting and mandi price tracking
- Warehouse and logistics booking
- Farmer loan and government scheme guidance
- Image-based crop disease detection

## Tech stack

- TanStack Start
- React + TypeScript
- Tailwind CSS
- Cloud backend (database, auth, storage)

## Development

```sh
npm i
npm run dev
```

## Environment variables

Set these in production:

- `SUPABASE_URL` — project URL
- `SUPABASE_PUBLISHABLE_KEY` — anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — server-only service role key
- `AI_API_KEY` — OpenAI-compatible API key for the AI advisor
- `AI_API_BASE_URL` — optional, defaults to `https://api.openai.com/v1`
- `AI_MODEL` — optional, defaults to `gpt-4o-mini`
