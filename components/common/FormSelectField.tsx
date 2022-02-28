import React, { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from '../../styles/Form.module.scss';
import { ISelect } from "../../types/ISelect";

interface IFormSelectField {
    register: UseFormRegister<FieldValues> ,
    item: ISelect

}

export const FormSelectField:FC<IFormSelectField> = ({register, item}) => {
  return (
    <div className={styles.form__item}>
      <label>{item.label}</label>
      <select {...register(item.label)} className={styles.form__item}>
        {item.choices.map((c, j) => (
          <option key={j} value={c.key}>
            {c.value}
          </option>
        ))}
      </select>
    </div>
  );
};
