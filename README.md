# Merkur-frontend

This is the code behind https://posthus.netpunkt.dk, written in Next.js

## Getting started

The development environment may be set up using either npm or docker-compose.

### Set up your local environment

To run this locally you need to set some environment variables.

Create a file in the root of the project called `.env.local`

> This file is ignored by git and will and should not be added to the GitHub repository. This is a local environment file for your personal workspace.

.env.local

```properties
NEXTAUTH_URL="http://localhost:3000"
CLIENT_ID="<Client id from adgangsplatformen/smaug>"
CLIENT_SECRET="<Client secret from adgangsplatformen/smaug>"
APIKEYS="{"111111":{"apikey":"password","created":"2018-04-30T07:24:27+02:00"},"222222":{"apikey":"anotherpassword","created":"2018-04-30T07:24:27+02:00"}}"
```

### npm

- `npm install`
- `npm run dev:storybook` starts a Storybook development server for developing React components in isolation
- `npm run dev:next` starts Next.js development server that runs the actual application
- `npm run cy:open` runs the test suite

### docker-compose

- `docker-compose -f docker-compose-dev.yml up` will start Storybook on port 4000, Next.js on port 3000
- `docker run --network="host" -ti --rm -v $(pwd)/e2e:/app/e2e -e CYPRESS_baseUrl=http://localhost:4000 docker.dbc.dk/cypress:latest npm run cy` runs tests (only headless mode supported via docker)

### Environment Variables

The following environment variables must be set in the application

- **CLIENT_ID**
  Client id from adgangsplatformen/smaug
- **CLIENT_SECRET**
  Client secret from adgangsplatformen/smaug
- **NEXTAUTH_URL**
  This is the return url from adgangsplatformen
- **APIKEYS**
  JSON array of valid API logins
- **FILESTORE_URL**
  Full URL to the filestore API

The following environment variables can be set in the application

- **PORT**
  Port on which Next.js runs. Default is 3000.
- **STORYBOOK_PORT**
  Port on which storybook runs. Defaults is 4000.

### Start application

Then start the next development environment

```bash
npm run dev:next
```
