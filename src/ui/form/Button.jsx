function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={ className +` self-end w-fit h-fit rounded-full bg-yellow-400 px-6 py-3.5 font-semibold text-slate-800 
                 transition-colors duration-300 hover:bg-yellow-500`}
    >
      {children}
    </button>
  );
}

export default Button;
