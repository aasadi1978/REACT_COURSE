interface ButtonProps {
  children: string;
  color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  onClick: () => void;
}
const Button = ({ children, color, onClick }: ButtonProps) => {
  return (
    <button className={'btn btn-' + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
