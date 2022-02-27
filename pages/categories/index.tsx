import { Category } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { CatList } from "../../components/categories/CatList";

export const Categories: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data: Category[] = await response.json();
    setCategories(data);
  };
  useEffect(() => {
    let timer1 = setTimeout(() => fetchCategories(), 100);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  const [active, setActive] = useState("");
  return (
    <>
      <CatList
        items={categories}
        active={active}
        setActive={setActive}
        onChange={() => {
          fetchCategories();
        }}
      />
      {active}
    </>
  );
};

export default Categories;
