const Filter = ({ filterString, handleFilterChange }) => {
  return <p>filter shown with <input value={filterString} onChange={handleFilterChange} /></p>
}

export default Filter