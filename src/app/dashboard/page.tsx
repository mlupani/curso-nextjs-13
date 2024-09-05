import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await getServerSession();
  if(!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="flex flex-col">
      <WidgetItem title="Usuario Server Side">
        {
          <div className="flex flex-col mt-4">
            <span>{session.user?.name}</span>
            <span>{session.user?.email}</span>
            <span>{session.user?.image}</span>
          </div>
        }
      </WidgetItem>
    </div>
  );
}