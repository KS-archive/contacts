import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

import styles from "./Button.module.css";

export type ButtonProps = ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ type = "button", className, ...props }, ref) => {
  return <button data-testid="Button" ref={ref} type={type} className={clsx(styles.button, className)} {...props} />;
});
