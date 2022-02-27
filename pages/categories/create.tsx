import React from "react";
import { Form } from "../../components/common/Form";
import { IField } from "../../types/IField";
import { ISelect } from "../../types/ISelect";
import styles from '../../styles/Categories.module.scss';

const Create = () => {
  const fields: IField[] = [
    { label: "name", inputType: "text", placeholder: "Category" ,
    autofocus: true,
},
  ];
  return (
    <div className={styles.create}>
      <Form
        title="New Category"
        fields={fields}
        btnText="Add New"
        back="/categories"
      />
    </div>
  );
};

export default Create;
