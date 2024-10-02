import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getCNPJ } from "../pages/api/brasil-api";
import { ButtonContainer, CompleteRegistrationContainer, Form } from "../styles/components/completeRegistration";
import { FormField } from "./formField";

export function CompleteRegistration() {
	const { user } = useContext(AuthContext);
	const [customer, setCustomer] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const loadCustomer = async () => {
		try {
			setLoading(true);
			setError(null);

			if (!user?.name) {
				throw new Error("Nome do usuário indisponível");
			}

			const response = await axios.post('/api/stripe-customer', { userName: user.name });

			const data = await response.data;

			if (response.status === 200) {
				setCustomer(data.customer)

				if (customer.data.length === 0) {
					const cnpj = await getCNPJ("19131243000197")

					console.log(cnpj)
				}
			} else {
				throw new Error(data.error || "Erro ao buscar o cliente")
			}

		} catch (error) {
			console.log("Erro ao carregar o cliente do stripe: ", error)
			setError("Erro ao carregar o cliente");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (user) {
			loadCustomer()
		}
	}, [user]);

	

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
					<FormField name="neighborhood" label="Bairro" type="text" placeholder="Bairro" />
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