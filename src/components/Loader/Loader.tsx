import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

import styles from "./Loader.module.css";

export type LoaderProps = Omit<ComponentPropsWithoutRef<"div">, "children">;

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(({ className, ...props }, ref) => {
  return (
    <div data-testid="Loader" className={clsx(styles.loader, className)} ref={ref} {...props}>
      <div className={styles.loaderDot} />
      <div className={styles.loaderDot} />
      <div className={styles.loaderDot} />
    </div>
  );
});
