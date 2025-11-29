'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Clipboard, ClipboardCheck, Loader2 } from 'lucide-react';
import { generateGuestAccessCode } from '@/ai/flows/generate-guest-access-code';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  guestName: z.string().min(2, { message: 'Guest name must be at least 2 characters.' }),
  guestPhoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid phone number.' }),
});

export function GenerateCodeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{ accessCode: string; accessLink: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: '',
      guestPhoneNumber: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedCode(null);
    try {
      const result = await generateGuestAccessCode(values);
      setGeneratedCode(result);
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Code",
        description: "There was a problem generating the access code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(`Your access link for Eden Estate: ${generatedCode.accessLink}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: "The access link and message has been copied.",
      })
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="guestName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John Doe" {...field} />
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
                  <Input placeholder="+2348012345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Code
          </Button>
        </form>
      </Form>
      {generatedCode && (
        <Card className="mt-6 bg-secondary">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Access Code</p>
            <p className="text-2xl font-bold tracking-widest">{generatedCode.accessCode}</p>
            <p className="text-sm text-muted-foreground mt-2">Access Link</p>
            <div className="flex items-center gap-2">
              <Input value={generatedCode.accessLink} readOnly className="text-sm" />
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              </Button>
            </div>
             <p className="text-xs text-muted-foreground mt-2">A message with the access link has been prepared for you to share via SMS or WhatsApp.</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
