import { useRouter } from "next/router";
import React, { FC } from "react";
import styles from "../../styles/Form.module.scss";
import { IField } from "../../types/IField";
import { ISelect } from "../../types/ISelect";
import { useForm, SubmitHandler } from "react-hook-form";

interface IForm {
  title: string;
  fields: IField[];
  selects?: ISelect[];
  btnText: string;
  back: string;
}

export const Form: FC<IForm> = ({ title, fields, selects, btnText, back }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    fetch("/api/categories/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userId: 1 } ), // TODO: user for tests
    })
      .then((response) => response.json())
      .then((item) => console.log(item));
    router.push(back);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__title}>{title}</div>
      {fields.map((f, i) => (
        <div key={i} className={styles.form__item}>
          <label>{f.label}</label>
          <input
            type={f.inputType}
            placeholder={f.placeholder}
            autoFocus={f.autofocus}
            {...register(f.label, { required: true })}
          />
        </div>
      ))}
      {selects?.map((s, i) => (
        <div key={i} className={styles.form__item}>
          <label>{s.label}</label>
          <select {...register(s.label)} className={styles.form__item}>
            {s.choices.map((c, j) => (
              <option key={j} value={c.key}>
                {c.value}
              </option>
            ))}
          </select>
        </div>
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
