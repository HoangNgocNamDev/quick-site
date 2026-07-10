import { LoginForm } from "../../_components/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA] px-4 py-12">
      <LoginForm
        role="admin"
        title="Đăng nhập Admin"
        description="Dành cho người vận hành nền tảng QuickSite."
        redirectTo="/admin"
        otherLoginHref="/cms/login"
        otherLoginLabel="Đăng nhập CMS khách hàng →"
      />
    </div>
  );
}
