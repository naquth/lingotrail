import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-12 gap-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/mascot/compa.svg" alt="" width={48} height={48} />
        <span className="font-display font-bold text-2xl text-trail-deep">
          LingoTrail
        </span>
      </Link>

      <div className="flex flex-col items-center gap-6 w-full">
        <h1 className="font-display text-2xl font-bold">Masuk lagi, yuk!</h1>
        <LoginForm />
        <p className="text-sm text-ink/60">
          Belum punya akun?{" "}
          <Link href="/register" className="text-trail font-semibold">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
