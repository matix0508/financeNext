import { Category } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CatList } from "../../components/categories/CatList";
import { ReadCategory } from "../../components/categories/ReadCategory";
import styles from "../../styles/Categories/Categories.module.scss";

export const Categories: FC = () => {
  const { isLoading, error, data } = useQuery<Category[], Error>(
    "categories",
    () => fetch("/api/categories").then((res) => res.json())
  );
  const [active, setActive] = useState<Category>();
  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: {error.message}</>;
  if (!data) return <>No data</>;
  return (
    <div className={styles.categories}>
      <CatList
        items={data}
        active={active}
        setActive={setActive}
      />
      <ReadCategory category={active} />
    </div>
  );
};

export default Categories;
