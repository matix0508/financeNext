import { Category } from "@prisma/client";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { Form } from "../../../components/common/Form";
import { IField } from "../../../types/IField";


export const CategoryEdit: FC = () => {
    const router = useRouter();
    const {cid} = router.query
    const [category, setCategory] = useState<Category>();
    const fetchCategory = async () => {
        const response = await fetch(`/api/categories/${cid}`);
        const data: Category = await response.json();
        setCategory(data);
      };
    useEffect(() => {
        fetchCategory();
    }, [])

    if (!category) {
        return <></>
    }


  const fields: IField[] = [
    {
      label: "name",
      inputType: "text",
      placeholder: "Category",
      autofocus: true,
      default: category.name
    },
  ];

  const onSubmit = (data: any) => {
    fetch(`/api/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userId: 1 }), // TODO: user for tests
    })
      .then((response) => response.json())
      .then((item) => console.log(item));
    router.push("/categories");
  };
  return (
    <Form
      title="Edit Category"
      fields={fields}
      btnText="Add New"
      back="/categories"
      onSubmit={onSubmit}
    />
  );
};


export default CategoryEdit;