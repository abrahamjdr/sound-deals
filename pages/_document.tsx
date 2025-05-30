// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body className="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text transition-colors duration-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
