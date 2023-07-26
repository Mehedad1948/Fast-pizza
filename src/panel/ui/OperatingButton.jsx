function OperatingButton({ children, onClick }) {
  return (
    <button
      className="rounded bg-yellow-400 px-2 py-1 font-semibold text-yellow-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default OperatingButton;
