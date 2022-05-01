import { BasicLoader } from "components";
import { useState } from "react";
import styles from "./styles.module.scss";

interface TProps {
  src?: string;
}
const ImageLoader = ({ src }: TProps) => {
  const [loading, setLoading] = useState<boolean>(!!src);

  return (
    <div className={styles.container}>
      {loading && <BasicLoader />}
      {src ? (
        <img
          src={src}
          alt="upload"
          style={loading ? { display: "none" } : {}}
          onLoad={() => {
            setLoading(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default ImageLoader;
