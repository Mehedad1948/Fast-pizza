import Label from './Label';
import FormError from './Error';

function InputContainer({ label, error, children }) {
  return (
    <div className='grid grid-cols-[0.8fr,_3fr] items-center gap-3'>
      {label && <Label className='mr-4' htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <FormError >{error}</FormError>}
    </div>
  );
}

export default InputContainer;
