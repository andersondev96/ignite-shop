import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getCEP, getCNPJ } from "../pages/api/brasil-api";
import { ButtonContainer, CompleteRegistrationContainer, Form } from "../styles/components/completeRegistration";
import { FormField } from "./formField";

interface AddressProps {
	cep: string,
	street: string,
	neighborhood: string,
	number: number | string,
	state: string,
	city: string
}

export function CompleteRegistration() {
	const { user } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		cpf: "",
		phone: "",
		cep: "",
		street: "",
		neighborhood: "",
		complement: "",
		number: "",
		state: "",
		city: "",
	});

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
			} else {
				throw new Error(data.error || "Erro ao buscar o cliente")
			}

		} catch (error) {
			console.error("Erro ao carregar o cliente do stripe: ", error)
			setError("Erro ao carregar o cliente");
		} finally {
			setLoading(false);
		}
	}

	const loadAddress = async (document: string) => {
		try {
			let addressInfo: AddressProps = {
				cep: "",
				city: "",
				neighborhood: "",
				number: "",
				state: "",
				street: ""
			}

			if (document.length === 14) {
				addressInfo = await getCNPJ(document);
			} else if (document.length === 8) {
				addressInfo = await getCEP(document);
			}

			console.log(addressInfo);

			if (addressInfo) {
				setFormData((prev) => ({
					...prev,
					street: addressInfo.street || '',
					neighborhood: addressInfo.neighborhood || '',
					city: addressInfo.city || '',
					state: addressInfo.state || '',
					cep: addressInfo.cep || ''
				}));
			}

		} catch (err) {
			console.log("CNPJ ou CEP não encontrado.")
		}

	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		const valueFormatted = value.replace(/[^a-zA-Z0-9 ]/g, '');

		console.log(valueFormatted);

		if (name === 'cpf' || name === 'cep') {
			if (valueFormatted.length === 14 || valueFormatted.length === 8) {
				loadAddress(valueFormatted);
			}
		}
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		const data = {
			cpf: formData.get('cpf'),
			phone: formData.get('phone'),
			cep: formData.get('cep'),
			street: formData.get('street'),
			neighborhood: formData.get('neighborhood'),
			complement: formData.get('complement'),
			number: formData.get('number'),
			state: formData.get('state'),
			city: formData.get('city'),
		};
	}

	useEffect(() => {
		if (user) {
			loadCustomer()
		}
	}, [user]);



	return (
		<CompleteRegistrationContainer>
			<span>Para finalizar a sua compra, complete o seu cadastro</span>

			<Form onSubmit={handleSubmit}>
				<div>
					<FormField
						name="cpf"
						label="CPF/CNPJ"
						type="text"
						placeholder="CPF/CNPJ"
						value={formData.cpf}
						onChange={handleInputChange}
					/>

				</div>

				<div>
					<FormField
						name="phone"
						label="Telefone"
						type="text"
						placeholder="Telefone"
						value={formData.phone}
						onChange={handleInputChange}
					/>

					<FormField
						name="cep"
						label="CEP"
						type="text"
						placeholder="CEP"
						value={formData.cep}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					<FormField
						name="street"
						label="Endereço"
						type="text"
						placeholder="Endereço"
						value={formData.street}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					<FormField
						name="neighborhood"
						label="Bairro"
						type="text"
						placeholder="Bairro"
						value={formData.neighborhood}
						onChange={handleInputChange}
					/>

					<FormField
						name="complement"
						label="Complemento"
						type="text"
						placeholder="Complemento"
						value={formData.complement}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					<FormField
						name="number"
						label="Número"
						type="text"
						placeholder="Número"
						value={formData.number}
						onChange={handleInputChange}
					/>

					<FormField
						name="state"
						label="Estado"
						type="text"
						placeholder="Estado"
						value={formData.state}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					<FormField
						name="city"
						label="Cidade"
						type="text"
						placeholder="Cidade"
						value={formData.city}
						onChange={handleInputChange}
					/>
				</div>

				<ButtonContainer>
					Salvar
				</ButtonContainer>
			</Form>
		</CompleteRegistrationContainer>


	)
}