interface IFilter {
  onChange(val: string): void;
  searchWord: string;
}

const Filter = ({ onChange, searchWord }: IFilter) => (
  <div className='row'>
    <div className='input-field col'>
      <input
        value={searchWord}
        onChange={({ target }) => onChange(target.value)}
        id='searchPeople'
        placeholder='Search people'
        type='text'
        className='validate'
      ></input>
      <label className='active' htmlFor='searchPeople'>
        Name
      </label>
    </div>
  </div>
);

export default Filter;
