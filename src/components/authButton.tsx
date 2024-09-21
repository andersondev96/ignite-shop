import * as Dialog from '@radix-ui/react-dialog';
import { Button } from "../styles/components/authButton";
import { LoginModal } from './loginModal';

export function AuthButton() {


	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button>Fazer login</Button>
			</Dialog.Trigger>
				<LoginModal />
		</Dialog.Root>
	)
}