import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useShoppingCart } from "use-shopping-cart";
import { AuthContext } from "../contexts/AuthContext";
import { getCEP, getCNPJ } from "../pages/api/brasil-api";
import { ButtonContainer, CompleteRegistrationContainer, Form } from "../styles/components/completeRegistration";
import { FormField } from "./formField";

interface AddressProps {
	cep: string,
	street: string,
	neighborhood: string,
	number: number | string,
	complement: string,
	state: string,
	city: string
}

export function CompleteRegistration() {
	const { user } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		document: "",
		phone: "",
		cep: "",
		street: "",
		neighborhood: "",
		complement: "",
		number: "",
		state: "",
		city: "",
	});

	const { cartDetails, clearCart } = useShoppingCart()

	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

	const getCartItems = () => {
		return Object.keys(cartDetails).map((itemId) => {
			const item = cartDetails[itemId]

			return {
				name: item.name,
				image: item.image,
				price: item.price,
				quantity: item.quantity
			}
		});
	}

	const loadAddress = async (document: string) => {
		try {
			let addressInfo: AddressProps = {
				cep: "",
				city: "",
				neighborhood: "",
				number: "",
				complement: "",
				state: "",
				street: ""
			}

			if (document.length === 14) {
				addressInfo = await getCNPJ(document);
			} else if (document.length === 8) {
				addressInfo = await getCEP(document);
			}

			if (addressInfo) {
				setFormData((prev) => ({
					...prev,
					street: addressInfo.street || '',
					neighborhood: addressInfo.neighborhood || '',
					complement: addressInfo.complement,
					city: addressInfo.city || '',
					state: addressInfo.state || '',
					cep: addressInfo.cep || ''
				}));
			}

		} catch (err) {
			console.error("CNPJ ou CEP não encontrado.")
		}

	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		const valueFormatted = value.replace(/[^a-zA-Z0-9 ]/g, '');

		if (name === 'document' || name === 'cep') {
			if (valueFormatted.length === 14 || valueFormatted.length === 8) {
				loadAddress(valueFormatted);
			}
		}
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const formData = new FormData(event.target as HTMLFormElement);

			const data = {
				name: user?.name,
				email: user?.email,
				phone: formData.get('phone'),
				document: formData.get('document'),
				cep: formData.get('cep'),
				street: formData.get('street'),
				neighborhood: formData.get('neighborhood'),
				complement: formData.get('complement'),
				number: formData.get('number'),
				state: formData.get('state'),
				city: formData.get('city'),
			};

			const response = await axios.post('/api/create-customer', data);

			if (response.status === 200) {
				toast.success("Cliente cadastrado com sucesso!");

				setIsCreatingCheckoutSession(true);

				const cartItems = getCartItems();

				const response = await axios.post('/api/checkout', { cartItems })

				const { checkoutUrl } = response.data;

				window.location.href = checkoutUrl
				clearCart();
			}

		} catch (err) {
			throw new Error("Erro ao cadastrar o cliente: ", err.message);
		}
	}

	return (
		<CompleteRegistrationContainer>
			<span>Para finalizar a sua compra, complete o seu cadastro</span>

			<Form onSubmit={handleSubmit}>
				<div>
					<FormField
						name="document"
						label="CPF/CNPJ"
						type="text"
						placeholder="CPF/CNPJ"
						value={formData.document}
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

				<ButtonContainer disabled={isCreatingCheckoutSession}>
					Salvar
				</ButtonContainer>
			</Form>
		</CompleteRegistrationContainer>


	)
}