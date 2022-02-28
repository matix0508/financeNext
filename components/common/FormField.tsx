import React, { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from '../../styles/Form.module.scss';
import { IField } from "../../types/IField";

interface IFormField {
    register: UseFormRegister<FieldValues> ,
    item: IField

}

export const FormField:FC<IFormField> = ({register, item}) => {
  return (
    <div className={styles.form__item}>
    <label>{item.label}</label>
    <input
      type={item.inputType}
      placeholder={item.placeholder}
      autoFocus={item.autofocus}
      {...register(item.label, { required: true })}
    />
  </div>
  );
};
