'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { generateGuestAccessCode } from '@/ai/flows/generate-guest-access-code';

const formSchema = z.object({
  guestName: z.string().min(2, 'Name must be at least 2 characters'),
  guestPhoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  residentName: z.string().min(2, 'Your name is required'),
  residentPhone: z.string().min(10, 'Your phone number is required'),
});

type FormValues = z.infer<typeof formSchema>;

export function GenerateCodeForm() {
  const [generatedCode, setGeneratedCode] = useState<{ accessCode: string; accessLink: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: '',
      guestPhoneNumber: '',
      residentName: '',
      residentPhone: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      const result = await generateGuestAccessCode({
        guestName: values.guestName,
        guestPhoneNumber: values.guestPhoneNumber,
      });

      // Save to database
      await fetch('/api/guest-visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessCode: result.accessCode,
          guestName: values.guestName,
          guestPhone: values.guestPhoneNumber,
          residentName: values.residentName,
          residentPhone: values.residentPhone,
        }),
      });

      // TODO: Trigger Voice Agent Call #1 to guest
      // await fetch('/api/voice-agent/welcome-guest', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     guestPhone: values.guestPhoneNumber,
      //     guestName: values.guestName,
      //     accessLink: result.accessLink,
      //   }),
      // });

      setGeneratedCode(result);
    } catch (error) {
      console.error('Error generating code:', error);
      alert('Failed to generate access code');
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode.accessLink);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="guestName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guestPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+234..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="residentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="residentPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+234..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Generating...' : 'Generate Access Code'}
          </Button>
        </form>
      </Form>

      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle>Access Code Generated!</CardTitle>
            <CardDescription>Share this code and link with your guest</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Access Code</p>
              <p className="text-2xl font-bold tracking-widest">{generatedCode.accessCode}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Access Link</p>
              <div className="flex gap-2">
                <Input value={generatedCode.accessLink} readOnly className="text-sm" />
                <Button size="icon" variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
