
import {IExpense} from "../../../types/IExpense"

import React, { FC } from "react";
import styles from "./Read.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Category, Merchant } from "@prisma/client";

export interface IRead {
  item: Category | Merchant | IExpense;
  onDelete: () => void;
  handleEdit: () => void;
}

export const Read: FC<IRead> = ({ item, children, handleEdit, onDelete }) => {
  return (
    <div className={styles.Read}>
      <FontAwesomeIcon
        onClick={() => handleEdit()}
        className={styles.Read__edit}
        icon={faPencil}
      />
            <FontAwesomeIcon
        onClick={onDelete}
        className={styles.read__icons__delete}
        icon={faTrash}
      />
      {children}
    </div>
  );
};
