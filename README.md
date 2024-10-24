# OrbisDB with LIT Protocol: Message Board

Learn how to use LIT Protocol to encrypt and decrypt data based on on-chain condition logic while storing on OrbisDB, built on the Ceramic Network.

## Getting Started

Install your dependencies:

```bash
nvm use 20
npm install
```

### Environment Setup

You will need to create a copy of the example environment file:

```bash
cp .env.example .env
```

**WalletConnect**

You will also need to obtain a Client ID from WalletConnect as the demo uses it for its wallet provider. Log into your [WalletConnect Cloud Dashboard](https://cloud.walletconnect.com/) and create a new project (with the "App" type selected). Once created, copy the "Project ID" and assign it to `NEXT_PUBLIC_PROJECT_ID`.

**OrbisDB**

The next few values will be associated with OrbisDB. To make things simple, we will use the hosted [OrbisDB Studio](https://studio.useorbis.com/) and the shared node instance it provides for this demo, but keep in mind that you can set up your own instance whenever you want (more details at [OrbisDB](https://useorbis.com/)).

First, go ahead and sign in with your wallet.

Once signed in, the studio will default to the "Contexts" tab at the top. On the right-hand side you will see your environment ID. Go ahead and assign that value to `NEXT_PUBLIC_ENV_ID` in your new .env file.

Next, set up a context. These help developers segment their data models and usage based on the applications they are meant for. Create a new context (you can call it "forum-app" if you'd like), and assign the resulting string to `NEXT_PUBLIC_CONTEXT_ID` in your .env file.

Finally, you will create the post table using the OrbisDB model builder feature that this application will use for storing user data. 

In your Orbis Studio view, select the "Model Builder" tab at the top and create a new model named "post" using the post definition in [this document](models/tables.sql). Once created, assign the resulting identifier to `NEXT_PUBLIC_POST_ID`. 

*You can also optionally use the `NEXT_PUBLIC_POST_ID` already provided for you in the env.example file. You can find the definition on [Cerscan](https://cerscan.com/mainnet/stream/kjzl6hvfrbw6calfdu4psiffj36vtzjylox0n15vgejdr5jr8d3iotxsnfl3s1c)*

## Getting Started

You are now ready to run the application.

Running in developer mode:

```bash
npm run dev
```

## Learn More

To learn more about Ceramic please visit the following links

[Ceramic Documentation](https://developers.ceramic.network/learn/welcome/) - Learn more about the Ceramic Ecosystem.

To learn more about OrbisDB please visit the following links

[OrbisDB Overview](https://developers.ceramic.network/docs/orbisdb/overview)
[OrbisDB SDK](https://developers.ceramic.network/docs/orbisdb/orbisdb-sdk)
[OrbisDB Website](https://useorbis.com/)

## License

Dual licensed under [MIT](LICENSE-MIT) and [Apache 2](LICENSE-APACHE)