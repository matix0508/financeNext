import { Merchant } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { MerchList } from "../../components/merchants/MerchList";
import { ReadMerchant } from "../../components/merchants/ReadMerchant";
import styles from '../../styles/Merchants.module.scss';

export const Merchants: FC = () => {
  const [merchant, setMerchants] = useState<Merchant[]>([]);
  const fetchMerchants = async () => {
    const response = await fetch("/api/merchants");
    const data: Merchant[] = await response.json();
    setMerchants(data);
  };
  useEffect(() => {
    let timer1 = setTimeout(() => fetchMerchants(), 100);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  const [active, setActive] = useState<Merchant>();
  return (
    <div className={styles.merchants}>
      <MerchList
        items={merchant}
        active={active}
        setActive={setActive}
        onChange={() => {
          fetchMerchants();
        }}
      />
      <ReadMerchant merchant={active} />
    </div>
  );
};

export default Merchants;
