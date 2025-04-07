
export default function layout({ children }: Readonly<{  children: React.ReactNode }>) {
  return (
    <main className={"font-work-sans"}>
      {children}
    </main>
  )
}