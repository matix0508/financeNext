import React, { FC } from "react";
import { Form } from "../../components/common/Form";
import { IField } from "../../types/IField";
import styles from "../../styles/Merchants.module.scss";
import { useRouter } from "next/router";

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
    router.push("/merchants");
  };
  return (
    <div className={styles.merchants__create}>
      <Form
        title="New Merchant"
        fields={fields}
        btnText="Add New"
        onSubmit={onSubmit}
        back="/merchants"
      />
    </div>
  );
};

export default Create;
