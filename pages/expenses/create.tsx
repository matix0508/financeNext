import React, { FC } from "react";
import { Form } from "../../components/common/Form";
import { IField } from "../../types/IField";
import styles from "../../styles/Common.module.scss";
import { useRouter } from "next/router";
import { queryClient } from "../_app";
import { ISelect } from "../../types/ISelect";
import { useQuery } from "react-query";
import { Category, Merchant } from "@prisma/client";

const Create: FC = () => {
  const router = useRouter();
  const {
    isLoading: isLoadingCat,
    error: errorCat,
    data: categories,
  } = useQuery<Category[], Error>("categories", () =>
    fetch("/api/categories").then((res) => res.json())
  );
  const {
    isLoading: isLoadingMerch,
    error: errorMerch,
    data: merchants,
  } = useQuery<Merchant[], Error>("merchants", () =>
    fetch("/api/merchants").then((res) => res.json())
  );
  if (isLoadingCat || isLoadingMerch) return <>Loading...</>;

  if (errorCat || errorMerch)
    return (
      <>
        An error has occurred:{" "}
        {!!errorCat ? errorCat.message : !!errorMerch ? errorMerch.message : ""}
      </>
    );
    let cats: Category[] = []
    if (categories !== undefined) cats = categories
    let merchs: Merchant[] = []
    if (merchants !== undefined) merchs = merchants

  const fields: IField[] = [
    {
      label: "name",
      inputType: "text",
      placeholder: "Name",
      autofocus: true,
    },
    {
      label: "cost",
      inputType: "number",
      placeholder: "",
      step: 0.01
    },
    {
      label: "description",
      inputType: "text",
      placeholder: "",
    },
    {
      label: "date",
      inputType: "date",
      placeholder: "",
    },
  ];
  const selects: ISelect[] = [
    {
      label: "Category",
      name: "categoryId",
      choices: cats?.map(cat => ({key: cat.id, value: cat.name})),
    },
    {
      label: "Merchant",
      name: "merchantId",
      choices: merchs?.map(merch => ({key: merch.id, value: merch.name})),
    },
  ];
  const onSubmit = (data: any) => {
    fetch("/api/expenses/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userId: 1 }), // TODO: user for tests
    })
      .then((response) => response.json())
      .then((item) => console.log(item));
    queryClient.refetchQueries("expenses");
    router.push("/expenses");
  };
  return (
    <div className={styles.create}>
      <Form
        title="New Expense"
        fields={fields}
        selects={selects}
        btnText="Add New"
        onSubmit={onSubmit}
        back="/expenses"
      />
    </div>
  );
};

export default Create;
