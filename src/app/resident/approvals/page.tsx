'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldX, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from '@/hooks/use-toast';

interface PendingApproval {
  id: string;
  guest_name: string;
  selfie_url: string;
  created_at: string;
  access_code: string;
}

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<PendingApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/guest-visits/pending');
      if (!res.ok) {
        throw new Error('Failed to fetch approvals');
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setApprovals(data);
      }
    } catch (error) {
      console.error("Failed to fetch pending approvals:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load pending approvals.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleApproval = async (approval: PendingApproval, decision: 'approved' | 'denied') => {
    setUpdatingId(approval.id);
    
    try {
      if (decision === 'denied') {
        const res = await fetch('/api/guest-visits/deny', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: approval.id, access_code: approval.access_code }),
        });
        if (!res.ok) throw new Error('Failed to deny visit');

        toast({
          title: "Visit Denied",
          description: `${approval.guest_name}'s request has been denied and their photo deleted.`,
        });

      } else {
        // TODO: Implement approve logic
        // This would call a different endpoint to set status to 'approved'
        console.log(`Visit ${approval.id} approved`);
         toast({
          title: "Visit Approved",
          description: `You have approved ${approval.guest_name}'s visit.`,
        });
      }
      
      // Optimistically remove from UI
      setApprovals(prev => prev.filter(app => app.id !== approval.id));

    } catch (error: any) {
      console.error(`Error handling visit:`, error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || `Could not ${decision} the visit. Please try again.`,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-4 text-muted-foreground">Loading approvals...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Guest Approvals</h1>
      {approvals.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {approvals.map((approval) => (
            <Card key={approval.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{approval.guest_name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                {approval.selfie_url ? (
                  <div className="relative aspect-square w-full">
                    <Image
                      src={approval.selfie_url}
                      alt={`Selfie of ${approval.guest_name}`}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full bg-secondary rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">No photo submitted</p>
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-2">{`Request received: ${new Date(approval.created_at).toLocaleString()}`}</p>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4">
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={() => handleApproval(approval, 'denied')}
                  disabled={updatingId === approval.id}
                >
                  {updatingId === approval.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldX className="mr-2 h-4 w-4" />}
                  Deny
                </Button>
                <Button 
                  className="w-full" 
                  onClick={() => handleApproval(approval, 'approved')}
                  disabled={updatingId === approval.id}
                >
                  {updatingId === approval.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                  Approve
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg mt-8">
          <h2 className="text-xl font-semibold">No Pending Approvals</h2>
          <p className="text-muted-foreground mt-2">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
