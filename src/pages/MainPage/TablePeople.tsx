import { Link } from "react-router-dom";
import { useAppSelector } from "hooks/hooks";
import { HorizonalLoader } from "components";
import styles from "./styles.module.scss";

const TablePeople = () => {
  const { loading, data } = useAppSelector(({ people }) => people);

  if (loading) return <HorizonalLoader />;
  if (data!.results.length === 0)
    return <span className={styles.emptyList}>Emply list</span>;

  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>Name</th>
          <th>Birth year</th>
          <th>Gender</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {data!.results.map(({ name, birth_year, gender, url }) => {
          const id = url.replaceAll(/\D/g, "");
          return (
            <tr key={name}>
              <td>{name}</td>
              <td>{birth_year}</td>
              <td>{gender}</td>
              <th>
                <Link to={`/people/${id}`}>Details</Link>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TablePeople;
