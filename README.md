# Gold Gesso

This application interacts with the Gold Gesso/Canvas API to track assignments and provide a more personalized school planner experience.

The application uses Nuxt, Vue, and Typescript.
Check the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) for more information on the technologies used.

## Setup

Set the correct environment variables:
```bash
# See .env.default and set in the following file:
touch .env
```

Use the correct NPM version and install dependencies:

```bash
# Use correct npm version
nvm use
# Install dependencies
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Currently configured to deploy to Vercel

Application will automatically reploy when main branch is updated.

```bash
# Push git main branch
git checkout main
git push
```
