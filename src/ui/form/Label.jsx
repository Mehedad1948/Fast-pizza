function Label({ children, htmlFor }) {
  return <label htmlFor={htmlFor} className="font-semibold mr-4 text-slate-700">{children}</label>;
}

export default Label;
