import { WidgetGrid } from "@/app/components";


export const metadata = {
 title: 'Admin Dashboard',
 description: 'Admin Dashboard',
};

export default function MainPage() {
  return (
    <div>
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-xl">Informacion general</span>
      <WidgetGrid />
    </div>
  );
}