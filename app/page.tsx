import SINInput from "@/components/SINInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="navbar bg-neutral items-center justify-center">
        <div className="navbar-center">
          <p className="text-xl">Brian Hui - SIN Validation</p>
        </div>
      </div>
      <div className="m-10">
        <SINInput />
      </div>
    </main>
  );
}
