import { LucideMoon } from 'lucide-react'

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
		</main>
	);
}
