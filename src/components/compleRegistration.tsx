import { ButtonContainer, CompleteRegistrationContainer, Form } from "../styles/components/completeRegistration";
import { FormField } from "./formField";

export function CompleteRegistration() {
	return (
		<CompleteRegistrationContainer>
			<span>Para finalizar a sua compra, complete o seu cadastro</span>

			<Form>
				<div>
					<FormField name="cpf" label="CPF/CNPJ" type="text" placeholder="CPF/CNPJ" />

				</div>

				<div>
					<FormField name="phone" label="Telefone" type="text" placeholder="Telefone" />
					<FormField name="cep" label="CEP" type="text" placeholder="CEP" />
				</div>

				<div>
					<FormField name="street" label="Endereço" type="text" placeholder="Endereço" />
				</div>

				<div>
					<FormField name="neighboard" label="Bairro" type="text" placeholder="Bairro" />
					<FormField name="complement" label="Complemento" type="text" placeholder="Complemento" />
				</div>

				<div>
					<FormField name="number" label="Número" type="text" placeholder="Número" />
					<FormField name="state" label="Estado" type="text" placeholder="Estado" />
				</div>

				<div>
					<FormField name="city" label="Cidade" type="text" placeholder="Cidade" />
				</div>

				<ButtonContainer>
					Salvar
				</ButtonContainer>
			</Form>
		</CompleteRegistrationContainer>


	)
}