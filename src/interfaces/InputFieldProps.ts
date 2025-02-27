export default interface InputFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isPassword?: boolean;
  }
  