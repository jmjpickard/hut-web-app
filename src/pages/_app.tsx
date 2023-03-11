import "../../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { BaseLayout } from "../components/BaseLayout/BaseLayout";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <UserProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </UserProvider>
  );
};
export default trpc.withTRPC(MyApp);
