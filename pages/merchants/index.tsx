import { Merchant } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { List } from "././../../components/common/List/List";
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
      <List
        items={data}
        active={active}
        setActive={setActive}
        itemsName="merchants"
      />
      <ReadMerchant merchant={active} />
    </div>
  );
};

export default Merchants;
