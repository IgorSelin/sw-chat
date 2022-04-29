import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPersonDetailsRequestAction } from "store/reducers/userDetails/actions";
import { useAppSelector } from "hooks/hooks";
import { Link, useParams } from "react-router-dom";
import Preloader from "components/Preloader";
import { linkItems } from "./constants";
import Paths from "constants/path";
import styles from "./styles.module.scss";

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
    <div className={`row ${styles.container}`}>
      <div
        className="card blue-grey darken-1"
        style={{ margin: "0px", height: "100vh" }}
      >
        <div className="card-content white-text">
          <span className="card-title">{data.name}</span>
        </div>
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
        <div className="card-action" style={{ marginTop: "45px" }}>
          <Link to={Paths.HOME}>Go back</Link>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
