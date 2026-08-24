import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-12 gap-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/mascot/compa.svg" alt="" width={48} height={48} />
        <span className="font-display font-bold text-2xl text-trail-deep">
          LingoTrail
        </span>
      </Link>

      <div className="flex flex-col items-center gap-6 w-full">
        <h1 className="font-display text-2xl font-bold">Mulai perjalananmu</h1>
        <RegisterForm />
        <p className="text-sm text-ink/60">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-trail font-semibold">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
