import './tailwind.css'

export const metadata = {
  metadataBase: new URL('https://himanshu-saini.com'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#0d0d0d]">
      <body>{children}</body>
    </html>
  )
}
