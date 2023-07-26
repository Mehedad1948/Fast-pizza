function Select({ options, value, onChange, ...props }) {
  return (
    <div>
      <select
        className="rounded border border-yellow-400 px-1 py-2"
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
