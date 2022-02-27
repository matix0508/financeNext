import "../styles/globals.scss";
import type { AppProps } from "next/app";
import styles from "../styles/Nav.module.scss";
import { NavItem } from "../components/common/NavItem";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className={styles.header}>
        <ul className={styles.navbar}>
          <NavItem page="Home" />
          <NavItem page="Expenses" />
          <NavItem page="Categories" />
        </ul>
        <ul className={styles.logging}>
          <div className={styles.logging__btn}>Log In</div>
        </ul>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>

      <footer>@Copywrites...</footer>
    </>
  );
}

export default MyApp;
