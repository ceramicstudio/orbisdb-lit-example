import Head from "next/head";
import Nav from "../components/Navbar";
import styles from "./index.module.css";
import Chat from "../components/Chat";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useOrbisContext } from "@/context/OrbisContext";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ILitNodeClient } from "@lit-protocol/types";
import { set } from "zod";

const Home: NextPage = () => {
  const { orbis, isAuthenticated } = useOrbisContext();
  const { address, isConnecting, isConnected } = useAccount();
  const [loggedIn, setLoggedIn] = useState(false);
  const [lit, setLit] = useState<ILitNodeClient>();

  const startLitClient = (window: Window): ILitNodeClient => {
    // connect to lit
    console.log("Starting Lit Client...");
    const client = new LitJsSdk.LitNodeClient({
      url: window.location.origin,
    });
    client.connect();
    return client as ILitNodeClient;
  };

  useEffect(() => {
    window.addEventListener("loaded", function () {
      try {
        if (localStorage.getItem("orbis:session") && isConnected) {
          const thisLit = startLitClient(window);
          setLit(thisLit);
          setLoggedIn(true);  
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [address, isConnected]);

  return (
    <>
      <Nav />
      <Head>
        <title>Ceramic Message Board with LIT</title>
        <meta
          name="description"
          content="A proof-of-concept application that uses LIT Protocol with storage on Ceramic using ComposeDB."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loggedIn ? (
        <main className={styles.main}>
          <h1 className={styles.title}>
            ComposeDB <span className={styles.pinkSpan}>with</span> LIT
          </h1>
          {lit && <Chat address={address as string} lit={lit} />}
        </main>
      ) : (
        <main className={styles.main}>
          <h1 className={styles.title}>
            Please connect your wallet to continue
          </h1>
        </main>
      )}
    </>
  );
};

export default Home;
