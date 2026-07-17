function FilterDropdown({ value, onChange }) {

    return (

        <select
            className="resume-select"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >

            <option value="all">
                All Templates
            </option>

            <option value="professional">
                Professional
            </option>

            <option value="modern">
                Modern
            </option>

            <option value="creative">
                Creative
            </option>

            <option value="minimal">
                Minimal
            </option>

        </select>

    );

}

export default FilterDropdown;