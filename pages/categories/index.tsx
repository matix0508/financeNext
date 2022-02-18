import React, { FC, useState } from "react";
import { CatList } from "../../components/categories/CatList";

export const Categories: FC = () => {
  const categories: string[] = ["Groceries", "Housing"];
  const [active, setActive] = useState(categories[0]);
  return (
    <>
      <CatList items={categories} active={active} setActive={setActive} />
      {active}
    </>
  );
};

export default Categories;
