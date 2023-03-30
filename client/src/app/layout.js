import './globals.css'

export const metadata = {
  title: 'Color Precog',
  description: 'Color image recognition',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
