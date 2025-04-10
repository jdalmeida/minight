export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="flex items-center justify-center min-h-[100dvh] transition-all">
      {children}
    </section>
  );
}