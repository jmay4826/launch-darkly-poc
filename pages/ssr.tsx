import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getClient } from "../utils/launch-darkly-server";

const SSR: NextPage<{ ldPogEditor: boolean | "defaultValue" }> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {JSON.stringify(props.ldPogEditor)}
        {props.ldPogEditor === "defaultValue" && "flag couldnt be loaded"}
        {props.ldPogEditor ? "flag is on" : "flag is off"}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export const getServerSideProps = async () => {
  const client = await getClient();
  const ldPogEditor = await client.variation(
    "ld-pog-editor",
    {
      key: "anonymous",
    },
    "defaultValue"
  );

  return {
    props: {
      ldPogEditor,
    },
  };
};

export default SSR;