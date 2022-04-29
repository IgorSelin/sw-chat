import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPersonDetailsRequestAction } from "store/reducers/userDetails/actions";
import { useAppSelector } from "hooks/hooks";
import { useParams } from "react-router-dom";
import Preloader from "components/Preloader";
import { linkItems } from "./constants";
import styles from "./styles.module.scss";
import { MainLayout } from "layouts";

const PersonDetails = () => {
  const { data, loading } = useAppSelector((s) => s.userDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadPersonDetailsRequestAction(id as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Preloader />;

  return (
    <MainLayout>
      <div className={`row ${styles.container}`}>
        <h4 className={styles.title}>{data.name}</h4>
        <ul className="collection">
          {Object.entries(data).map(([key, val]: any) =>
            val.length > 0 ? (
              <li
                key={key}
                className="collection-item"
                style={{ width: "100%" }}
              >
                <span style={{ textTransform: "capitalize", fontWeight: 500 }}>
                  {key.replaceAll("_", " ")}
                </span>
                :{" "}
                {linkItems.includes(key) ? (
                  <a href={typeof val === "string" ? val : val[0]}>link to</a>
                ) : (
                  val
                )}
              </li>
            ) : null
          )}
        </ul>
      </div>
    </MainLayout>
  );
};

export default PersonDetails;
