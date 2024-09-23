import Image from 'next/image';
import Link from "next/link";

import { auth } from '../lib/firebase';


import logoImg from '../assets/logo.svg';
import { AuthButton } from "../components/authButton";
import { CartButton } from "../components/cartButton";
import { ButtonsContainer, HeaderContainer } from "../styles/components/header";

import { useEffect, useState } from 'react';
import { SearchInput } from "../components/searchInput";

export function Header() {
  const [userAuthenticated, setUserAuthenticated] = useState("")
  useEffect(() => {
    const user = auth.currentUser;
    
    if (user) {
      setUserAuthenticated(user.email)
    }
  }, [userAuthenticated])

	return (
		<HeaderContainer>
          <Link href="/" prefetch={false}>
            <Image src={logoImg} alt="" />
          </Link>
          <ButtonsContainer>
            <SearchInput />
            <CartButton />
            <AuthButton user={userAuthenticated} />
          </ButtonsContainer>

        </HeaderContainer>
	)
}