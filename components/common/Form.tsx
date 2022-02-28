import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import styles from "../../styles/Form.module.scss";
import { IField } from "../../types/IField";
import { ISelect } from "../../types/ISelect";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormSelectField } from "./FormSelectField";
import { FormField } from "./FormField";

interface IForm {
  title: string;
  fields: IField[];
  selects?: ISelect[];
  btnText: string;
  back: string;
  onSubmit: (data: any) => void;
}

export const Form: FC<IForm> = ({
  title,
  fields,
  selects,
  btnText,
  back,
  onSubmit,
}) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const defaults = fields.filter((f) => !!f.default);
    defaults.forEach((item) => {
      setValue(item.label, item.default);
    });
    console.log(defaults);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__title}>{title}</div>
      {fields.map((f, i) => (
        <FormField key={i} item={f} register={register} />
      ))}
      {selects?.map((s, i) => (
        <FormSelectField item={s} key={i} register={register} />
      ))}
      <div className={styles.form__btns}>
        <button
          type="reset"
          className={styles.form__btns__cancel}
          onClick={() => router.push(back)}
        >
          Cancel
        </button>
        <button className={styles.form__btns__submit} type="submit">
          {btnText}
        </button>
      </div>
    </form>
  );
};
