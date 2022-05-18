// import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { CryptoForm } from "../modules/home";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hello</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/design">
        <a className="cursor-pointer">Go to Design</a>
      </Link>
      {/* <CryptoForm /> */}
    </div>
  );
};

export default Home;
