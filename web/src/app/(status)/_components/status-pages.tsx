import Link from "next/link";

export function SuspendedSitePage({
  businessName = "Website",
}: {
  businessName?: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-50 text-2xl">
          ⏸
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-slate-900">
          Website đang tạm ngưng
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {businessName} hiện chưa thể truy cập công khai. Vui lòng quay lại sau
          hoặc liên hệ đơn vị vận hành để được hỗ trợ.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white"
        >
          Đến trang đăng nhập
        </Link>
      </div>
    </div>
  );
}

export function UnpublishedSitePage({
  businessName = "Website",
}: {
  businessName?: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-2xl">
          👁
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-slate-900">
          Website chưa được công khai
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {businessName} đang ở trạng thái tạm ẩn. Nội dung sẽ hiển thị lại sau
          khi chủ website bật công khai.
        </p>
        <Link
          href="/cms"
          className="mt-6 inline-flex rounded-full bg-teal-600 px-5 py-2.5 text-sm font-medium text-white"
        >
          Vào CMS
        </Link>
      </div>
    </div>
  );
}

export function ComingSoonPage({
  businessName = "Website",
}: {
  businessName?: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 to-white px-4">
      <div className="w-full max-w-lg rounded-3xl border border-teal-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-teal-50 text-2xl">
          ✨
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-slate-900">
          {businessName} sắp ra mắt
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Website đang được hoàn thiện. Hẹn gặp bạn sớm!
        </p>
      </div>
    </div>
  );
}
