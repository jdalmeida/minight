import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { LucideMoon } from 'lucide-react'
import Link from 'next/link';
import { FaGithub, FaGitlab, FaBitbucket } from 'react-icons/fa6';

export default async function Home() {

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className='flex flex-col items-center'>
				<LucideMoon className='relative translate-x-3'/>
				<h1 className="text-5xl italic font-black">
					MINIGHT
				</h1>
			</div>
			<div className='flex gap-2 mb-4'>
				<FaGithub/>
				<FaGitlab/>
				<FaBitbucket/>
			</div>	
			<p>The self-hosted vercel</p>
			<SignedIn>
					<Link className='mt-6' href={'/dashboard'}>
						<Button>
							Deploy your app
						</Button>
					</Link>
			</SignedIn>
			<SignedOut>
				<div className='flex gap-2 items-center mt-4'>
					<Link href={'/sign-up'}>
						<Button>
							Criar conta
						</Button>
					</Link>

					<Link href={'/sign-in'}>
						<Button variant={'ghost'}>
							Fazer login
						</Button>
					</Link>
				</div>
			</SignedOut>
		</main>
	);
}
