'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/app/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, TrendingUp, MessageSquare, Loader2, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().optional(),
  companyName: z.string().min(2, 'Company name is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function DemoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const backgroundImage = PlaceHolderImages.find(p => p.id === 'card-corporate-office');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      companyName: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    console.log('Demo Request:', values);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  }
  
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "See the AI in Action",
      description: "Witness our AI voice concierge, Eve, handle a guest check-in live.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "Quantify the Impact",
      description: "Explore the admin dashboard and see how you can reduce costs and improve efficiency.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Q&A Session",
      description: "Get all your specific questions answered by one of our access control specialists.",
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage.imageUrl}
          alt={backgroundImage.description}
          fill
          className="object-cover opacity-10"
          data-ai-hint={backgroundImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      {/* Header */}
      <header className="relative z-10 py-6 px-4 sm:px-8">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Schedule Your Personalized Demo
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              In just 15 minutes, see how Eden Access can transform your property's security and guest experience.
            </p>
            <div className="space-y-6">
              {benefits.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                >
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg border border-primary/20">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
             <motion.blockquote 
                className="mt-12 border-l-4 border-primary pl-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
              <p className="text-lg italic text-foreground">
                "Eden Access didn't just upgrade our security; it elevated our entire brand. Our residents and their guests have never been happier."
              </p>
              <footer className="mt-4 text-sm text-muted-foreground">— Femi Adebayo, Manager, The Azure Enclave</footer>
            </motion.blockquote>
          </motion.div>
          
          {/* Right Column: Booking Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Card className="bg-card/70 border-border backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Find a Time That Works For You</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                    <p className="text-muted-foreground mt-2">Your demo request has been received. A member of our team will contact you shortly to schedule your personalized session.</p>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="e.g., Ada Okoro" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Email</FormLabel>
                          <FormControl><Input type="email" placeholder="you@company.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="companyName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estate or Company Name</FormLabel>
                          <FormControl><Input placeholder="e.g., The Azure Enclave" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl><Input type="tel" placeholder="+234..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full !mt-8 h-12 text-lg !bg-primary hover:!bg-primary/90 !text-primary-foreground font-bold">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Request Your Demo"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}