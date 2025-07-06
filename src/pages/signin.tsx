import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";

export default function SignIn({
  providers,
}: {
  providers: Record<string, ClientSafeProvider>;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return { props: { providers } };
}
