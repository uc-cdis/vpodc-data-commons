

This is the NextJS Application for VPODC


## Getting Started
Gen3 Data Commons using the Gen3 Frontend Framework is a matter of the following:


Please see [Styling and Theming](https://github.com/uc-cdis/gen3-frontend-framework/blob/develop/docs/Local%20Development/Styling%20and%20Theming.md) and [Local Development with Helm Charts](https://github.com/uc-cdis/gen3-frontend-framework/blob/develop/docs/Local%20Development/Using%20Helm%20Charts/Local%20Development%20with%20Helm%20Charts.md)
for more information on setting up and configuring the Gen3 Data Commons Application.
This documentation is currently less complete than we would like, but we will be adding to it as development progresses.

## Installation

The minimum node version is set to v20.11.0 only from an LTS perspective.
Node can be downloaded from the official Node.js site. You may also consider using a [Node version manager](https://docs.npmjs.com/cli/v7/configuring-npm/install#using-a-node-version-manager-to-install-nodejs-and-npm).
Your version of Node may not ship with npm v10. To install it, run:

If using NVM run
```bash
nvm use
```

Otherwise
```bash
npm install npm@10.2.4 -g
```

Note: if you see this error:
```
npm ERR! code ENOWORKSPACES
npm ERR! This command does not support workspaces.
```
you can run ```npx next telemetry disable```

Alternatively, you can use `nvm` to install the correct version of npm:
```bash
nvm install 20.11.0
```

### Install Dependencies

From the root of the project, install dependencies by running:

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Docker

You build a Docker image by:

```bash
docker build .
```
