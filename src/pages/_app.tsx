import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>KeepUp – Build Habits That Stick</title>
        <meta
          name="description"
          content="KeepUp is a social habit-tracking app to help you stay consistent and accountable with friends."
        />
      </Head>

      <Component {...pageProps} />
    </SessionProvider>
  );
}
