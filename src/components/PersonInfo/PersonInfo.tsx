import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

import { Person } from "typings/Person";

import styles from "./PersonInfo.module.css";

export type PersonInfoProps = Omit<ComponentPropsWithoutRef<"button">, "onClick"> & {
  onClick: (id: string) => void;
  data: Person;
  isSelected?: boolean;
};

export const PersonInfo = forwardRef<HTMLButtonElement, PersonInfoProps>(
  ({ data, isSelected, className, onClick, ...props }, ref) => {
    const computedClassName = clsx(styles.personInfo, isSelected && styles.selected, className);

    const handleClick = () => onClick(data.id);

    return (
      <button
        data-testid="PersonInfo"
        type="button"
        className={computedClassName}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <div className={styles.firstNameLastName}>{data.firstNameLastName}</div>
        <div className={styles.jobTitle}>{data.jobTitle}</div>
        <div className={styles.emailAddress}>{data.emailAddress}</div>
      </button>
    );
  },
);
