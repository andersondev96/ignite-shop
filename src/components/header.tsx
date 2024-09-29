import Image from 'next/image';
import Link from "next/link";



import logoImg from '../assets/logo.svg';
import { AuthButton } from "../components/authButton";
import { CartButton } from "../components/cartButton";
import { ButtonsContainer, HeaderContainer } from "../styles/components/header";

import { useContext, useEffect, useState } from 'react';
import { SearchInput } from "../components/searchInput";
import { AuthContext } from '../contexts/AuthContext';

export function Header() {
  const [userAuthenticated, setUserAuthenticated] = useState("")
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      setUserAuthenticated(user.name)
    }
  }, [user])

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