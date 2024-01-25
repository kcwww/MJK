export const metadata = {
  title: '메조쿠',
  description: '메조쿠 CyberStalker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
