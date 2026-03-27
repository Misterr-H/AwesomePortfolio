import '../styles/index.css'

export const metadata = {
  metadataBase: new URL('https://himanshu-saini.com'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
