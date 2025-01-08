import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="en" className="overscroll-none overscroll-x-none">
      <Head />
      <body className="bg-BackgroundColor">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}