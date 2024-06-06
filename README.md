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
- once deployed on vercel and added endpoint on clerk, copy the signing secret to .env.local
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

https://ui.shadcn.com/docs/components/form
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add select
npx shadcn-ui@latest add alert-dialog


file uploader -> uploadthing
https://uploadthing.com/dashboard 
https://docs.uploadthing.com/getting-started/appdir
npm install uploadthing @uploadthing/react
- include env variables
UPLOADTHING_SECRET=
UPLOADTHING_APPID=

app/api/uploadthing/core.ts
app/api/uploadthing/route.ts
src/lib/uploadthing.ts
https://docs.uploadthing.com/api-reference/react#usedropzone

react-datepicker
https://www.npmjs.com/package/react-datepicker
npm install react-datepicker --save
npm i --save-dev @types/react-datepicker

category.actions.ts
- create + get category

events.actions.ts
- create,update,delete,get events, get by category, get by user

get clerk userid via

const { sessionClaims } = auth();
const userId = sessionClaims?.userId?.userId

sessionClaims EXAMPLE:
{
  azp: 'http://localhost:3000',
  exp: 1717705132,
  iat: 1717705072,
  iss: 'https://cuddly-wombat-47.clerk.accounts.dev',     
  jti: '4d58ef6a7d5c0f7a2c5b',
  nbf: 1717705062,
  sid: 'sess_2hUF3AVsHhg3oRmkUoAY2atz3RL',
  sub: 'user_2hUF3H43N0aVMvE2hYaPoRrAShA',
  userId: { userId: '66611d65c53d1ec43be3eb54' }
}

https://dashboard.clerk.com/apps/app_2hQjHjhhcBCfKTHe4X0sudlpUcj/instances/ins_2hQjHti0XOca3pTLkwwH3hRfmJj/sessions

CUSTOMIZE SESSION TOKEN
{
	"userId": "{{user.public_metadata.userId}}"
}

EVENT DETAILS

⨯ Error: Invalid src prop (https://utfs.io/f/777b03cb-0fd6-4e`, hostname "utfs.io" is not configured under e`, hostname "images in your `next.config.js`
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['utfs.io'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: ''
            }
        ]
    }
};

export default nextConfig;
