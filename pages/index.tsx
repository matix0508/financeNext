import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { MyLineChart } from "../components/common/MyLineChart";
import { useQuery } from "react-query";
import { ISummaryResponse } from "./api/summary/[year]";

// const data = [
//   { name: "Page A", height: 400 },
//   { name: "Page A", height: 600 },
//   { name: "Page A", height: 120 },
//   { name: "Page A", height: 18 },
// ];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Home: NextPage = () => {
  const {
    isLoading,
    error,
    data: rawData,
  } = useQuery<ISummaryResponse, Error>("summary", () =>
    fetch("/api/summary/2021").then((res) => res.json())
  );
  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: {error.message}</>;
  if (!rawData) return <>No data</>;
  console.log(rawData)
  const data = rawData.months.map((item, i) => ({
    name: monthNames[i],
    height: item,
  }));
  console.log(data)
  return (
    <div className={styles.container}>
      <Head>
        <title>Finance App</title>
        <meta name="description" content="Finance App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.home}>
        <div className={styles.home__chart}>
          <MyLineChart data={data} />
        </div>
      </main>
    </div>
  );
};

export default Home;
