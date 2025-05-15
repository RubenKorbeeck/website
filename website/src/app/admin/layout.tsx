// src/app/admin/layout.tsx
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
