import { SimpleWidget } from "@/app/components";

export default function MainPage() {
  return (
    <div>
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-xl">Informacion general</span>

      <div className="flex flex-wrap p-2 items-center justify-center mt-4">
        <SimpleWidget/>
      </div>
    </div>
  );
}