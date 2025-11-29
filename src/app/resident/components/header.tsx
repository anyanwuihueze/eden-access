'use client';

import Link from 'next/link';
import { CircleUser, Menu, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ResidentSidebarNav } from './sidebar-nav';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ResidentHeader() {
  const residentAvatar = PlaceHolderImages.find(p => p.id === 'resident-avatar');

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="">Eden Access</span>
            </Link>
            <ResidentSidebarNav />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        {/* Can add search here if needed */}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            {residentAvatar ? (
                <Image src={residentAvatar.imageUrl} width={36} height={36} alt="Resident Avatar" className="rounded-full" data-ai-hint={residentAvatar.imageHint}/>
            ) : (
                <CircleUser className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
