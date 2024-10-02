import axios from "axios";

export async function getCNPJ(cnpj: string) {

	try {
		const result = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)

		return result.data
	} catch (err) {
		throw new Error(`Erro ao carregar o CNPJ: ${err.message}`)
	}
}

export async function getCEP(cep: string) {
	try {
		const result = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)

		return result.data
	} catch (err) {
		throw new Error(`Erro ao carregar o cep ${err.message}`)
	}
}