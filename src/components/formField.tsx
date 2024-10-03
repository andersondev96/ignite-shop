import { FormContainer } from "../styles/components/formField";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	type: string;
	placeholder: string;
	name: string;
}

export function FormField({ label, name, type, placeholder, ...rest }: FormFieldProps) {
	return (
		<FormContainer>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} placeholder={placeholder} {...rest} />
    </FormContainer>	
	)
}