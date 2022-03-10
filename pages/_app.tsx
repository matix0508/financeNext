import "../styles/globals.scss";
import type { AppProps } from "next/app";
import styles from "../styles/Nav.module.scss";
import { NavItem } from "../components/common/NavItem";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <nav className={styles.header}>
        <ul className={styles.navbar}>
          <NavItem page="Home" />
          <NavItem page="Expenses" />
          <NavItem page="Categories" />
          <NavItem page="Merchants" />
        </ul>
        <ul className={styles.logging}>
          <div className={styles.logging__btn}>Log In</div>
        </ul>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>

      <footer>@Copywrites...</footer>
    </QueryClientProvider>
  );
}

export default MyApp;
