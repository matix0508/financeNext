import "../styles/globals.ts";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Nav } from "../components/common/Navigation/Nav/Nav";
import { Layout } from "../components/common/Layout";
import {SessionProvider} from "next-auth/react";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
      <Layout>
      <Nav />
        <main>
          <Component {...pageProps} />
        </main>
        <footer>@Copywrites...</footer>
      </Layout>
      </SessionProvider>
      
      
    </QueryClientProvider>
  );
}

export default MyApp;
