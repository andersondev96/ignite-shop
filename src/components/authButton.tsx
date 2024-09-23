import * as Dialog from '@radix-ui/react-dialog';
import { Button } from "../styles/components/authButton";
import { LoginModal } from './loginModal';

interface AuthButtonProps {
	user: string;
}

export function AuthButton({ user }: AuthButtonProps) {


	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button>{ user ? user : 'Fazer Login' }</Button>
			</Dialog.Trigger>
				<LoginModal />
		</Dialog.Root>
	)
}