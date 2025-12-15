'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type AuthFormProps = {
  role: 'Resident' | 'Guard' | 'Admin';
};

export function AuthForm({ role }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError('');
    
    console.log(' Attempting sign in:', values.email);
    
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        values.email, 
        values.password
      );
      
      console.log('✅ SUCCESS! Signed in:', userCredential.user.email);
      
      // Redirect based on role
      if (role === 'Resident') {
        router.push('/resident/dashboard');
      } else if (role === 'Guard') {
        router.push('/guard/dashboard');
      } else if (role === 'Admin') {
        router.push('/admin');
      }
      
    } catch (err: any) {
      console.error('❌ Sign in FAILED:', err.code, err.message);
      
      // User-friendly error messages
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Incorrect email or password. Check your credentials and try again.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait a few minutes and try again.');
      } else {
        setError(`Sign in failed: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Demo credentials - MUST match Firebase exactly
  const demoCredentials = {
    Resident: { email: 'resident@test.com', password: 'resident123' },
    Guard: { email: 'guard@edenestate.com', password: 'guard123' },
    Admin: { email: 'admin@edenestate.com', password: 'admin123' }
  };

  const handleDemoLogin = () => {
    const demo = demoCredentials[role];
    form.setValue('email', demo.email);
    form.setValue('password', demo.password);
    setTimeout(() => form.handleSubmit(onSubmit)(), 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{role} Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center font-medium">{error}</p>
              </div>
            )}
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="name@example.com" 
                      {...field} 
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>

            <div className="pt-4 border-t space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Demo credentials:
                </p>
                <div className="text-sm bg-secondary/50 p-3 rounded-lg space-y-1">
                  <p><strong>Email:</strong> <code className="bg-black/5 px-1 py-0.5 rounded">{demoCredentials[role].email}</code></p>
                  <p><strong>Password:</strong> <code className="bg-black/5 px-1 py-0.5 rounded">{demoCredentials[role].password}</code></p>
                </div>
              </div>
              
              <Button
                type="button"
                onClick={handleDemoLogin}
                variant="outline"
                className="w-full"
                size="sm"
                disabled={isLoading}
              >
                Quick Demo Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
