import Image from 'next/image';
import Link from "next/link";

import logoImg from '../assets/logo.svg';
import { AuthButton } from "../components/authButton";
import { CartButton } from "../components/cartButton";
import { ButtonsContainer, HeaderContainer } from "../styles/components/header";

import { SearchInput } from "../components/searchInput";

export function Header() {
	return (
		<HeaderContainer>
          <Link href="/" prefetch={false}>
            <Image src={logoImg} alt="" />
          </Link>
          <ButtonsContainer>
            <SearchInput />
            <CartButton />
            <AuthButton />
          </ButtonsContainer>

        </HeaderContainer>
	)
}