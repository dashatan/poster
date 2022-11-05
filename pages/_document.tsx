import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html dir="ltr" lang="en">
      <Head />
      <body className="overflow-hidden">
        <Main />
        <div id="portal"/>
        <NextScript />
      </body>
    </Html>
  )
}