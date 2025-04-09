import { Button } from '@/components/ui/button';
import { LucideMoon } from 'lucide-react'
import Link from 'next/link';

export default async function Home() {

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
			<div className='flex items-center'>
				<h1 className="text-5xl italic font-black">
					MINIGHT
				</h1>
				<LucideMoon/>
			</div>
			<p>The self-hosted vercel</p>
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
		</main>
	);
}
