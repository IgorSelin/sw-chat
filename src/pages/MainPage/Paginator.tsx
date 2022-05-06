interface IPaginator {
  count: number;
  page: number;
  onChange: (val: number) => void;
}

const Paginator = ({ count, onChange, page }: IPaginator) => {
  const LIMIT = 10;
  const totalPages = Math.ceil(count / LIMIT);
  if (!totalPages) return null;
  return (
    <ul
      className='pagination'
      style={{ display: 'flex', marginBottom: '15px' }}
    >
      {page - 1 > 0 ? (
        <li className='disabled'>
          <i className='material-icons' onClick={() => onChange(page - 1)}>
            chevron_left
          </i>
        </li>
      ) : null}
      {Array.from({ length: totalPages }, (_, index) => index + 1)?.map((p) => (
          <li className={p !== page ? 'waves-effect' : 'active'} key={p}>
            <a
              href='#!'
              onClick={(e) => {
                e.preventDefault();
                onChange(p);
              }}
            >
              {p}
            </a>
          </li>
        ))}
      {page + 1 < totalPages ? (
        <li className='waves-effect' onClick={() => onChange(page + 1)}>
          <i className='material-icons'>chevron_right</i>
        </li>
      ) : null}
    </ul>
  );
};

export default Paginator;
