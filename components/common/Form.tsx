import { useRouter } from "next/router";
import React, { FC } from "react";
import styles from "../../styles/Form.module.scss";
import { IField } from "../../types/IField";
import { ISelect } from "../../types/ISelect";

interface IForm {
  title: string;
  fields: IField[];
  selects?: ISelect[];
  btnText: string;
  back: string;
}

export const Form: FC<IForm> = ({ title, fields, selects, btnText, back }) => {
  const router = useRouter();
  return (
    <form className={styles.form}>
      <div className={styles.form__title}>{title}</div>
      {fields.map((f, i) => (
        <div key={i} className={styles.form__item}>
          <label>{f.label}</label>
          <input
            type={f.inputType}
            placeholder={f.placeholder}
            autoFocus={f.autofocus}
          />
        </div>
      ))}
      {selects?.map((s, i) => (
        <div key={i} className={styles.form__item}>
          <label>{s.label}</label>
          <select className={styles.form__item}>
            {s.choices.map((c, j) => (
              <option key={j} value={c.key}>
                {c.value}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className={styles.form__btns}>
        <button type="reset" className={styles.form__btns__cancel} onClick={() => router.push(back)}>Cancel</button>
        <button className={styles.form__btns__submit} type="submit">{btnText}</button>
      </div>
    </form>
  );
};
