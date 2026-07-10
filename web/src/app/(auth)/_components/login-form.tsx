"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockCredentials } from "@/lib/mock/data";

interface LoginFormProps {
  role: "admin" | "owner";
  title: string;
  description: string;
  redirectTo: string;
  otherLoginHref: string;
  otherLoginLabel: string;
}

export function LoginForm({
  role,
  title,
  description,
  redirectTo,
  otherLoginHref,
  otherLoginLabel,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(
    role === "admin"
      ? mockCredentials.admin.email
      : mockCredentials.owner.email,
  );
  const [password, setPassword] = useState(
    role === "admin"
      ? mockCredentials.admin.password
      : mockCredentials.owner.password,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const expected =
    role === "admin" ? mockCredentials.admin : mockCredentials.owner;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }
    if (!password.trim()) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      if (email === expected.email && password === expected.password) {
        toast.success("Đăng nhập thành công (mock UI).");
        router.push(redirectTo);
      } else {
        setError("Email hoặc mật khẩu chưa đúng.");
        setLoading(false);
      }
    }, 450);
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-teal-600 text-lg font-bold text-white">
          Q
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-10"
          />
        </div>

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <Button
          type="submit"
          disabled={loading}
          className="h-10 w-full bg-teal-600 hover:bg-teal-700"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>

      <div className="mt-6 space-y-2 text-center text-sm text-slate-500">
        <p>
          Demo: <span className="font-medium text-slate-700">{expected.email}</span> /{" "}
          <span className="font-medium text-slate-700">{expected.password}</span>
        </p>
        <Link href={otherLoginHref} className="text-teal-700 hover:underline">
          {otherLoginLabel}
        </Link>
        <div>
          <Link href="/" className="text-slate-500 hover:underline">
            ← Về trang giới thiệu
          </Link>
        </div>
      </div>
    </div>
  );
}
