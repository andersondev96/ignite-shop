import { MagnifyingGlass } from "phosphor-react";
import { SearchInputContainer } from "../styles/components/searchInput";

export function SearchInput() {
	return (
		<SearchInputContainer>
			<MagnifyingGlass size={24} />
			<input type="text" placeholder="Buscar produtos..." />	
		</SearchInputContainer>
	)
}