export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">
        Commercial KPI Dashboard
      </h1>
      <p className="text-gray-600">
        Frontend is running! Connect to backend at {process.env.NEXT_PUBLIC_API_URL}
      </p>
    </main>
  );
}
