import { Category } from "@prisma/client";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { List } from "../../components/common/List/List";
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
      <List
        items={data}
        active={active}
        setActive={setActive}
        itemsName="categories"
      />
      <ReadCategory category={active} />
    </div>
  );
};

export default Categories;
