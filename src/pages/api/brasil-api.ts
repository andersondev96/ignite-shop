import axios from "axios";

export async function getCNPJ(cnpj: string) {

	try {
		const result = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)

		const data = result.data

		return {
			cep: data.cep,
			street: data.logradouro,
			neighborhood: data.bairro,
			complement: data.complemento,
			number: data.number,
			state: data.uf,
			city: data.municipio

		}
	} catch (err) {
		throw new Error(`Erro ao carregar o CNPJ: ${err.message}`)
	}
}

export async function getCEP(cep: string) {
	try {
		const result = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)

		const data = result.data

		return {
			cep: data.cep,
			street: data.street,
			neighborhood: data.neighborhood,
			number: data.number ?? '',
			complement: data.complement ?? '',
			state: data.state,
			city: data.city
		}
	} catch (err) {
		throw new Error(`Erro ao carregar o cep ${err.message}`)
	}
}