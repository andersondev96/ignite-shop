import {
	createUserWithEmailAndPassword,
	signOut as firebaseSignOut,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from '../lib/firebase';

interface User {
	name: string;
	email: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
}

interface SignInCredentials {
	name?: string;
	email: string;
	password: string;
}

interface AuthContextData {
	user: User | null;
	createUser: (data: SignInCredentials) => Promise<void>;
	signIn: (data: SignInCredentials) => Promise<void>;
	signInWithGoogle: () => Promise<void>;
	signOut: () => void;
	authenticated: boolean;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [data, setData] = useState<AuthState>(() => {
		return { token: null, user: null };
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem("@web:token");
			const user = localStorage.getItem("@web:user");

			setData({
				token,
				user: user ? JSON.parse(user) : null
			})
		}
	}, []);

	async function signIn({ email, password }: SignInCredentials) {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			const token = await user.getIdToken();

			const userData: User = {
				name: user.displayName || '',
				email: user.email!,
			};

			localStorage.setItem("@web:token", token);
			localStorage.setItem("@web:user", JSON.stringify(userData));

			setData({ token, user: userData });
		} catch (error) {
			console.error('Erro ao fazer login:', error);
		}
	}

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider()

		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken
				const user = result.user

				const userData: User = {
					name: user.displayName || '',
					email: user.email
				}

				localStorage.setItem("@web:token", token);
				localStorage.setItem("@web:user", JSON.stringify(userData));

				setData({ token, user: userData });
			}).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message

				const email = error.customData.email

				const credential = GoogleAuthProvider.credentialFromError(error)
			})

	}

	async function signOut() {
		await firebaseSignOut(auth);

		localStorage.removeItem("@web:token");
		localStorage.removeItem("@web:user");

		setData({ token: null, user: null });
	}

	async function createUser({ name, email, password }: SignInCredentials) {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		const user = userCredential.user

		if (user && name) {
			await updateProfile(user, { displayName: name })
		}

		console.log(`User Created: ${user}`)
	}

	const authenticated = !!data.token;

	return (
		<AuthContext.Provider value={{ user: data.user, signIn, signInWithGoogle, signOut, createUser, authenticated }}>
			{children}
		</AuthContext.Provider>
	);
}
