import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Nav } from "../components/common/Navigation/Nav/Nav";

export const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <main>
        <Component {...pageProps} />
      </main>

      <footer>@Copywrites...</footer>
    </QueryClientProvider>
  );
}

export default MyApp;
