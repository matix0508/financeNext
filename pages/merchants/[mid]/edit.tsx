import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { Form } from "../../../components/common/Form/Form";
import { IField } from "../../../types/IField";
import { Merchant } from "@prisma/client";

export const MerchantEdit: FC = () => {
    const router = useRouter();
    const {mid} = router.query
    const [merchant, setMerchant] = useState<Merchant>();
    const fetchMerchant = async () => {
        const response = await fetch(`/api/merchants/${mid}`);
        const data: Merchant = await response.json();
        setMerchant(data);
      };
    useEffect(() => {
        fetchMerchant();
    })

    if (!merchant) {
        return <></>
    }


  const fields: IField[] = [
    {
      label: "name",
      inputType: "text",
      placeholder: "merchant",
      autofocus: true,
      default: merchant.name
    },
  ];

  const onSubmit = (data: any) => {
    fetch(`/api/merchants/${merchant.id}`, {
      method: "PUT",
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
    <Form
      title="Edit Merchant"
      fields={fields}
      btnText="Add New"
      back="/merchants"
      onSubmit={onSubmit}
    />
  );
};


export default MerchantEdit;