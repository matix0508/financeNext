import React, { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ISelect } from "../../../../types/ISelect";
import { FormItem } from "./FormItem";

interface IFormSelectField {
  register: UseFormRegister<FieldValues>;
  item: ISelect;
}

export const FormSelectField: FC<IFormSelectField> = ({ register, item }) => {
  return (
    <FormItem>
      <label>{item.label}</label>
      <select
        {...register(!!item.name ? item.name : item.label)}
        
      >
        {item.choices.map((c, j) => (
          <option key={j} value={c.key}>
            {c.value}
          </option>
        ))}
      </select>
    </FormItem>
  );
};
