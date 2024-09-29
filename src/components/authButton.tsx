import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from "../styles/components/authButton";
import { LoginModal } from './loginModal';

interface AuthButtonProps {
	user: string;
}

export function AuthButton({ user }: AuthButtonProps) {
	const { signOut, authenticated } = useContext(AuthContext);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleAuthAction = () => {
		if (authenticated) {
			signOut()
		}
	}

	const handleModalClose = () => {
		setIsModalOpen(false);
	}


	return (
		<Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
			{
				authenticated ? (
					<Button onClick={handleAuthAction}>{user} (Sair)</Button>
				) : (
					<>
						<Dialog.Trigger asChild>
							<Button>{authenticated ? user : 'Fazer Login'}</Button>
						</Dialog.Trigger>
						<LoginModal onModalClose={handleModalClose} />
					</>
				)
			}

		</Dialog.Root>
	)
}