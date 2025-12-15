'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, LineChart, ShieldAlert, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/resident/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/resident/approvals', icon: ShieldAlert, label: 'Approvals', badge: '3' },
  { href: '/resident/analytics', icon: LineChart, label: 'Analytics' },
  { href: '/resident/profile', icon: User, label: 'Profile' },
];

export function ResidentSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === item.href && 'bg-muted text-primary'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
          {item.badge && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {item.badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  );
}
