import { FormContainer } from "../styles/pages/formField";

interface FormFieldProps {
	label: string;
	type: string;
	placeholder: string;
	name: string;
}

export function FormField({ label, name, type, placeholder}: FormFieldProps) {
	return (
		<FormContainer>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} placeholder={placeholder} />
    </FormContainer>	
	)
}