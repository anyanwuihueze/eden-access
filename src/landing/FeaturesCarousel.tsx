
'use client';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const features = [
  {
    title: "Effortless Guest Arrival",
    description: "A smiling guard assists a guest using a tablet.",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=3735&auto=format&fit=crop",
    hint: "customer service interaction"
  },
  {
    title: "Intelligent Command Center",
    description: "An estate manager reviewing a dashboard on a large screen.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=3474&auto=format&fit=crop",
    hint: "man data dashboard"
  },
  {
    title: "Seamless Resident Experience",
    description: "A resident smiling while using their smartphone.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=3798&auto=format&fit=crop",
    hint: "man smiling phone"
  },
  {
    title: "Premium Security, 24/7",
    description: "A modern, secure estate gate at night.",
    image: "https://images.unsplash.com/photo-1588698188724-034a364d2b9a?q=80&w=3870&auto=format&fit=crop",
    hint: "modern gate night"
  },
];

export default function FeaturesCarousel() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-white">
          A Five-Star Experience for Everyone
        </h2>
        <Carousel 
          opts={{ loop: true, align: "start" }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {features.map((feature, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2">
                <div className="p-1">
                  <Card className="overflow-hidden border-border bg-card rounded-2xl shadow-lg transition-all duration-300 hover:shadow-yellow-400/20 hover:border-yellow-400/50">
                    <CardContent className="flex flex-col p-0">
                      <Image 
                        src={feature.image}
                        alt={feature.description}
                        width={1280}
                        height={720}
                        className="object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={feature.hint}
                      />
                      <div className="p-6 bg-card/50 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-50px] hidden sm:flex" />
          <CarouselNext className="right-[-50px] hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
