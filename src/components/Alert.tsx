import { ReactNode } from 'react';

interface AlertProps {
  // ReactNode is a type that can be used to describe anything that can be rendered in a React component.
  // By using children as a prop, you can pass any JSX elements as children to the component and you can use the
  // component as a wrapper around other JSX elements, e.g., <Alert><p>Some text</p></Alert>.
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: AlertProps) => {
  return (
    <div
      className='alert alert-warning alert-dismissible fade show'
      role='alert'
    >
      {children}
      <button
        type='button'
        className='btn-close'
        data-bs-dismiss='alert'
        aria-label='Close'
        onClick={onClose}
      ></button>
    </div>
  );
};
export default Alert;
