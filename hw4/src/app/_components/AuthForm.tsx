'use client';

import { useState } from 'react';

import Image from 'next/image';

// Run: npx shadcn-ui@latest add button
import { Button } from '@/components/ui/button';
// Run: npx shadcn-ui@latest add card
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import AuthInput from './AuthInput';

function AuthForm() {
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [isSignUp, setIsSignUp] = useState<boolean>(false);

	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	//   e.preventDefault();
	//   // TODO: sign in logic
	//   signIn("credentials", {
	//     email,
	//     username,
	//     password,
	//     callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`,
	//   });
	// };
	return (
		<Card className="min-w-[300px]">
			<CardHeader>
				<CardTitle>Sign {isSignUp ? 'Up' : 'In'}</CardTitle>
			</CardHeader>
			<CardContent className=" flex flex-col gap-2">
				{/* <form onSubmit={handleSubmit} className="flex flex-col gap-2"> */}
				<form className="flex flex-col gap-2">
					<AuthInput
						label="Email"
						type="email"
						value={email}
						setValue={setEmail}
					/>
					{isSignUp && (
						<AuthInput
							label="Username"
							type="text"
							value={username}
							setValue={setUsername}
						/>
					)}
					<AuthInput
						label="Password"
						type="password"
						value={password}
						setValue={setPassword}
					/>
					{isSignUp && (
						<AuthInput
							label="Confirm Password"
							type="password"
							value={confirmPassword}
							setValue={setConfirmPassword}
						/>
					)}
					<div className="text-sm text-gray-500">
						{isSignUp ? (
							<span>
								Already have an account?{' '}
								<a
									className="cursor-pointer hover:underline"
									onClick={() => setIsSignUp(false)}>
									Sign In
								</a>
							</span>
						) : (
							<span>
								Do not have an account?{' '}
								<a
									className="cursor-pointer hover:underline"
									onClick={() => setIsSignUp(true)}>
									Sign Up
								</a>
							</span>
						)}
					</div>

					<Button type="submit" className="w-full">
						Sign {isSignUp ? 'Up' : 'In'}
					</Button>
				</form>
				<div className="flex w-full items-center gap-1 py-2">
					<div className="h-[1px] grow border-t"></div>
					<p className="text-xs text-gray-400">or</p>
					<div className="h-[1px] grow border-t"></div>
				</div>

				<Button className="flex w-full" variant={'outline'}>
					{/* Remember to copy "github.png" to ./public folder */}
					<Image src="/github.png" alt="github icon" width={20} height={20} />
					<span className="grow">Sign In with Github</span>
				</Button>
			</CardContent>
		</Card>
	);
}

export default AuthForm;
