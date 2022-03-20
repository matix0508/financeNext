import { Merchant } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { MerchList } from "../../components/merchants/MerchList";
import { ReadMerchant } from "../../components/merchants/ReadMerchant";
import styles from '../../styles/Merchants.module.scss';


export const Merchants: FC = () => {
  const {isLoading, error, data} = useQuery<Merchant[], Error>("merchants", () => fetch("/api/merchants").then(res => res.json()))
  const [active, setActive] = useState<Merchant>();
  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: {error.message}</>;
  if (!data) return <>No data</>;
  return (
    <div className={styles.merchants}>
      <MerchList
        items={data}
        active={active}
        setActive={setActive}
      />
      <ReadMerchant merchant={active} />
    </div>
  );
};

export default Merchants;
