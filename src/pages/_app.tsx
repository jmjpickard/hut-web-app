import "../../styles/globals.css";
import type { NextPage } from "next";
import type { AppType, AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { trpc } from "../utils/trpc";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { BaseLayout } from "../components/BaseLayout/BaseLayout";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);

  return getLayout(
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
