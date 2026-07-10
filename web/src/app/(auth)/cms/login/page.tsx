import { LoginForm } from "../../_components/login-form";

export default function CmsLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA] px-4 py-12">
      <LoginForm
        role="owner"
        title="Đăng nhập CMS"
        description="Dành cho chủ website chỉnh nội dung và xem khách để lại liên hệ."
        redirectTo="/cms"
        otherLoginHref="/admin/login"
        otherLoginLabel="Đăng nhập Platform Admin →"
      />
    </div>
  );
}
