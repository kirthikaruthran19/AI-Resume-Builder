function SortDropdown({ value, onChange }) {

    return (

        <select
            className="resume-select"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >

            <option value="newest">
                Newest
            </option>

            <option value="oldest">
                Oldest
            </option>

            <option value="ats">
                Highest ATS
            </option>

            <option value="downloads">
                Most Downloaded
            </option>

        </select>

    );

}

export default SortDropdown;