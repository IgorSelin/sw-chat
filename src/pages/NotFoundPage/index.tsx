import React from "react";
import { MainLayout } from "layouts";
import styles from "./styles.module.scss";

const NotFound = () => (
  <MainLayout>
    <div className={styles.container}>Not Found :(</div>
  </MainLayout>
);

export default NotFound;
