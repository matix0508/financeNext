import React, { FC } from "react";
import { Form } from "../../components/common/Form/Form";
import { IField } from "../../types/IField";
import styles from "../../styles/Merchants.module.scss";
import { useRouter } from "next/router";
import { queryClient } from "../_app";
import { CreateStyle } from "../../components/common/CreateStyle/CreateStyle";

const Create: FC = () => {
  const router = useRouter();
  const fields: IField[] = [
    {
      label: "name",
      inputType: "text",
      placeholder: "Merchant",
      autofocus: true,
    },
  ];
  const onSubmit = (data: any) => {
    fetch("/api/merchants/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userId: 1 }), // TODO: user for tests
    })
      .then((response) => response.json())
      .then((item) => console.log(item));
    queryClient.refetchQueries("merchants");
    router.push("/merchants");
  };
  return (
    <CreateStyle>
      <Form
        title="New Merchant"
        fields={fields}
        btnText="Add New"
        onSubmit={onSubmit}
        back="/merchants"
      />
    </CreateStyle>
  );
};

export default Create;
