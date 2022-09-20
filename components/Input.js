export default function Input({
  value,
  name,
  placeholder,
  type,
  label,
  onChange,
  onBlur,
  onReset,
  error,
}) {
  return (
    <>
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        className="input input-bordered w-full max-w-xs"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onReset={onReset}
      />
      {error && <p className="text-left text-red-500">{error}</p>}
    </>
  );
}
