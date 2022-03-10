import { Category } from "@prisma/client";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { Form } from "../../../components/common/Form";
import { IField } from "../../../types/IField";
import { queryClient } from "../../_app";

export const CategoryEdit: FC = () => {
  const router = useRouter();
  const { cid } = router.query;
  // const [category, setCategory] = useState<Category>();
  // const fetchCategory = async () => {
  //     const response = await fetch(`/api/categories/${cid}`);
  //     const data: Category = await response.json();
  //     setCategory(data);
  //   };
  // useEffect(() => {
  //     fetchCategory();
  // }, [])
  const { isLoading, error, data } = useQuery<Category, Error>("category", () =>
    fetch(`/api/categories/${cid}`).then((res) => res.json())
  );

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: {error.message}</>;
  if (!data) return <>No data</>;

  const fields: IField[] = [
    {
      label: "name",
      inputType: "text",
      placeholder: "Category",
      autofocus: true,
      default: data.name,
    },
  ];

  const onSubmit = (content: any) => {
    fetch(`/api/categories/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...content, userId: 1 }), // TODO: user for tests
    })
      .then((response) => response.json())
      .then((item) => console.log(item));
    queryClient.refetchQueries("categories");
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
