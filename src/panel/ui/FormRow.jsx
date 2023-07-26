function FormRow({ label, children, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-yellow-950">{label}</label>
      {children}
      {error && <p className="font-semibold text-rose-500">Not Valid</p>}
    </div>
  );
}

export default FormRow;
