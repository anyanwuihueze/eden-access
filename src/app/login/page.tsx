import { AuthForm } from '@/components/app/auth/auth-form';
import { Logo } from '@/components/app/logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function LoginPage({ searchParams }: { searchParams: { role?: string } }) {
  const defaultTab = searchParams.role === 'guard' ? 'guard' : 'resident';

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
            <Link href="/">
                <Logo />
            </Link>
        </div>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="resident">Resident</TabsTrigger>
            <TabsTrigger value="guard">Guard</TabsTrigger>
          </TabsList>
          <TabsContent value="resident">
            <AuthForm role="Resident" />
          </TabsContent>
          <TabsContent value="guard">
            <AuthForm role="Guard" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
