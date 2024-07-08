import useDebounce from '../../hooks/use-debounce'

const SearchField = ({ value, onChange }) => {

    const handleSearch = useDebounce((event) => {
        const _value = event.target.value === "" ? null : event.target.value;
        onChange(_value);
    }, 500);

    return (
        <input type="search" className="form-control" placeholder="Search" value={value} onChange={handleSearch} />
    )
}

export default SearchField