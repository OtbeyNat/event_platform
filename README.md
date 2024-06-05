npx shadcn-ui@latest init
npm install uploadthing @uploadthing/react
npm install @clerk/nextjs
https://clerk.com/docs/references/nextjs/clerk-middleware
https://clerk.com/docs/references/nextjs/custom-signup-signin-pages
https://ui.shadcn.com/docs/components/sheet

npm install mongoose mongodb
lib/database/index.ts --> mongodb databse cache function
mongodb Atlas -> node.js -> network access -> allow access from anywhere for dev
lib/database/models

webhook - event triggers
https://clerk.com/docs/integrations/webhooks/sync-data
- deploy application and add deployed webhook/endpoint on clerk
- DONT BOTHER DOING NGROK
npm install svix
- app/api/webhooks/route.ts -> new user -> lib/actions/user.actions.ts
- user updated
- user deleted webhooks

lib/actions
- user
- category
- event
- order
types folder for the lib/action params

lib/utils.ts -> utility functions for extra help
npm install query-string
