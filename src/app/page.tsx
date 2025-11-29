import { Button } from '@/components/ui/button';
import { Logo } from '@/components/app/logo';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Logo />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/80">
                    Seamless Access for Modern Estates
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Eden Access provides a premium, secure, and intuitive solution for managing guest access in high-end residential estates.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-6">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/login?role=resident">Resident Sign-In</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Link href="/login?role=guard">Guard Sign-In</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  width={600}
                  height={400}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
