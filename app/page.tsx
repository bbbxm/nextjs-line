import LineChart from "./component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-12">
      <h1 className="text-4xl font-old mb-8">Line Chart</h1>
      <LineChart />
    </main>
  );
}
