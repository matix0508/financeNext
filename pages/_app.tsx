import "../styles/globals.ts";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Nav } from "../components/common/Navigation/Nav/Nav";
import { Layout } from "../components/common/Layout";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
      <Nav />
        <main>
          <Component {...pageProps} />
        </main>
        <footer>@Copywrites...</footer>
      </Layout>
      
    </QueryClientProvider>
  );
}

export default MyApp;
