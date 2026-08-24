import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PromoCard = () => {
  return (
    <div className="rounded-2xl border-2 border-line p-4 bg-white space-y-3">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 fill-coral text-coral-deep" />
        <h3 className="font-display font-bold text-lg">Hearts habis?</h3>
      </div>
      <p className="text-ink/60 text-sm">
        Isi ulang pakai gems, atau langganan Trail+ untuk hearts tanpa batas.
      </p>
      <Link href="/shop" className="block">
        <Button variant="coral" full size="sm">
          Ke toko
        </Button>
      </Link>
    </div>
  );
};
