'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Search } from "lucide-react";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckoutButton } from './components/checkout-button';

interface Guest {
  id: string;
  access_code: string;
  guest_name: string;
  guest_phone: string;
  resident_name: string;
  resident_phone: string;
  selfie_url: string | null;
  status: string;
  created_at: string;
  checked_in_at: string | null;
  checked_out_at: string | null;
}

export default function GuardDashboard() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [accessCode, setAccessCode] = useState('');
  const [verifiedGuest, setVerifiedGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTodaysGuests();
  }, []);

  const loadTodaysGuests = async () => {
    const res = await fetch('/api/guest-visits/today');
    const data = await res.json();
    setGuests(data);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`/api/guest-visits/verify/${accessCode}`);
      const guest = await res.json();
      
      if (guest.error) {
        alert('❌ Invalid access code');
        setVerifiedGuest(null);
      } else {
        setVerifiedGuest(guest);
      }
    } catch (error) {
      alert('❌ Error verifying code');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (code: string) => {
    await fetch('/api/guest-visits/check-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode: code }),
    });

    loadTodaysGuests();
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Verify Access Code</CardTitle>
          <CardDescription>Enter the guest's access code to verify entry</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="flex items-center gap-4">
            <Input
              placeholder="Enter 6-digit code"
              className="max-w-xs text-lg tracking-widest"
              maxLength={6}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              <Search className="mr-2 h-4 w-4" /> Verify
            </Button>
          </form>

          {verifiedGuest && (
            <div className="mt-4 p-6 border rounded-lg bg-green-50">
              <h3 className="font-bold text-xl mb-2">✅ Guest Verified</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Guest Name</p>
                  <p className="font-semibold text-lg">{verifiedGuest.guest_name}</p>
                  
                  <p className="text-sm text-gray-600 mt-2">Visiting</p>
                  <p className="font-semibold">{verifiedGuest.resident_name}</p>
                  
                  <p className="text-sm text-gray-600 mt-2">Phone</p>
                  <p className="font-mono">{verifiedGuest.guest_phone}</p>
                </div>
                {verifiedGuest.selfie_url && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Verification Photo</p>
                    <Image 
                      src={verifiedGuest.selfie_url} 
                      alt="Guest selfie" 
                      width={200} 
                      height={200}
                      className="rounded-lg shadow-md border-4 border-green-500"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Guests</CardTitle>
          <CardDescription>Current and expected guests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">{guest.guest_name}</TableCell>
                  <TableCell>{guest.resident_name}</TableCell>
                  <TableCell className="font-mono">{guest.access_code}</TableCell>
                  <TableCell>
                    <Badge variant={guest.status === 'checked_in' ? "default" : "outline"}>
                      {guest.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {guest.status === 'approved' || guest.status === 'pending' ? (
                      <Button size="sm" onClick={() => handleCheckIn(guest.access_code)}>
                        <Check className="mr-2 h-4 w-4" /> Check In
                      </Button>
                    ) : guest.status === 'checked_in' ? (
                      <CheckoutButton 
                        accessCode={guest.access_code}
                        guestName={guest.guest_name}
                        guestPhone={guest.guest_phone}
                        onCheckoutComplete={loadTodaysGuests}
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">Completed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
