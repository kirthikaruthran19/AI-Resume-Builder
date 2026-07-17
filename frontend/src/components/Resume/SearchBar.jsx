import { FiSearch } from "react-icons/fi";

function SearchBar({ value, onChange }) {

    return (

        <div className="resume-search">

            <FiSearch className="resume-search-icon" />

            <input
                type="text"
                placeholder="Search resumes..."
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />

        </div>

    );

}

export default SearchBar;