import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function MarketingPage() {
  const session = await auth();
  if (session?.user) redirect("/learn");

  return (
    <div className="flex flex-col min-h-full">
      <header className="h-20 flex items-center justify-between px-6 lg:px-12 border-b border-line">
        <div className="flex items-center gap-2">
          <Image src="/mascot/compa.svg" alt="" width={40} height={40} />
          <span className="font-display font-bold text-xl text-trail-deep">
            LingoTrail
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Masuk
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 lg:px-12 py-16 max-w-6xl mx-auto w-full">
        <div className="flex-1 flex justify-center animate-float-slow">
          <Image
            src="/mascot/compa.svg"
            alt="Compa, maskot LingoTrail, menyapa"
            width={320}
            height={320}
            priority
          />
        </div>

        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-md">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink leading-tight">
            Susuri jalur baru,{" "}
            <span className="text-trail">satu kata setiap hari.</span>
          </h1>
          <p className="text-ink/70 text-lg">
            Belajar bahasa dengan cara yang nempel — misi singkat, jalur
            visual, dan alasan buat balik lagi besok.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Link href="/register" className="w-full">
              <Button size="lg" full>
                Mulai sekarang
              </Button>
            </Link>
            <Link href="/login" className="w-full">
              <Button variant="outline" size="lg" full>
                Saya sudah punya akun
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <section className="bg-trail-deep text-white py-14 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display text-3xl font-bold text-sun">5 menit</p>
            <p className="text-white/70 text-sm mt-1">
              cukup buat satu pelajaran singkat
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-sun">
              Jalur visual
            </p>
            <p className="text-white/70 text-sm mt-1">
              tiap unit terlihat sebagai rute yang bisa kamu tuntaskan
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-sun">
              Streak harian
            </p>
            <p className="text-white/70 text-sm mt-1">
              pengingat lembut biar kebiasaan belajar nggak putus
            </p>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 lg:px-12 text-center text-sm text-ink/50">
        LingoTrail — dibangun untuk yang suka jalan pelan tapi konsisten.
      </footer>
    </div>
  );
}
