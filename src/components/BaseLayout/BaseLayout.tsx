import Head from "next/head";
import { ReactNode } from "react";

type BaseLayoutProps = { children: ReactNode };

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <title>The Hut</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  );
};
