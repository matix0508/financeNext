import React, { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IField } from "../../../../types/IField";
import { FormItem } from "./FormItem";

interface IFormField {
    register: UseFormRegister<FieldValues> ,
    item: IField

}

export const FormField:FC<IFormField> = ({register, item}) => {
  return (
    <FormItem>
    <label>{item.label}</label>
    <input
      type={item.inputType}
      placeholder={item.placeholder}
      autoFocus={item.autofocus}
      step={item.step}
      {...register(!!item.name ? item.name : item.label, { required: true })}
    />
  </FormItem>
  );
};
