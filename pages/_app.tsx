import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import io from 'socket.io-client'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const socket = io()
    return () => {
      socket.disconnect()
    }
  }, [])
  return <Component {...pageProps} />;
}
