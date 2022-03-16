import { Category, Expense, Merchant } from "@prisma/client";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { Form } from "../../../components/common/Form";
import { IField } from "../../../types/IField";
import { ISelect } from "../../../types/ISelect";
import { queryClient } from "../../_app";

export const ExpenseEdit: FC = () => {
  const router = useRouter();
  const { eid } = router.query;
  console.log(`eid=${eid}`);

  const {
    isLoading: isLoadingCat,
    error: errorCat,
    data: categories,
  } = useQuery<Category[], Error>(
    "categories",
    () => fetch("/api/categories").then((res) => res.json())
  );
  const {
    isLoading: isLoadingMerch,
    error: errorMerch,
    data: merchants,
  } = useQuery<Merchant[], Error>("merchants", () =>
    fetch("/api/merchants").then((res) => res.json())
  );

  const { isLoading, error, data } = useQuery<Expense, Error>("expense", () =>
    fetch(`/api/expenses/${eid}`).then((res) => res.json())
  );

  if (isLoadingCat || isLoadingMerch) return <>Loading...</>;

  if (errorCat || errorMerch)
    return (
      <>
        An error has occurred:{" "}
        {!!errorCat ? errorCat.message : !!errorMerch ? errorMerch.message : ""}
      </>
    );
  let cats: Category[] = [];
  if (categories !== undefined) cats = categories;
  let merchs: Merchant[] = [];
  if (merchants !== undefined) merchs = merchants;

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: {error.message}</>;
  if (!data) return <>No data</>;

  const fields: IField[] = [
    {
      label: "name",
      inputType: "text",
      placeholder: "Name",
      autofocus: true,
      default: data.name
    },
    {
      label: "cost",
      inputType: "number",
      placeholder: "",
      step: 0.01,
      default: data.cost.toString()
    },
    {
      label: "description",
      inputType: "text",
      placeholder: "",
      default: data.description
    },
    {
      label: "date",
      inputType: "date",
      placeholder: "",
      default: new Date(data.date).toISOString().substring(0, 10)
    },
  ];
  const selects: ISelect[] = [
    {
      label: "Category",
      name: "categoryId",
      choices: cats?.map((cat) => ({ key: cat.id, value: cat.name })),
    },
    {
      label: "Merchant",
      name: "merchantId",
      choices: merchs?.map((merch) => ({ key: merch.id, value: merch.name })),
    },
  ];

  const onSubmit = (content: any) => {
    fetch(`/api/expenses/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...content, userId: 1 }), // TODO: user for tests
    })
      .then((response) => response.json())
      .then((item) => console.log(item));
    queryClient.refetchQueries("expenses");
    router.push("/expenses");
  };
  return (
    <Form
      title="Edit Expense"
      fields={fields}
      selects={selects}
      btnText="Update"
      back="/expenses"
      onSubmit={onSubmit}
    />
  );
};

export default ExpenseEdit;
