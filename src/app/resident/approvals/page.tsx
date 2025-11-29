import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, ShieldX } from "lucide-react";
import Image from "next/image";

const pendingApprovals = [
  { id: 1, name: "Charlie Brown", time: "5 minutes ago", imageId: "guest-selfie-1" },
  { id: 2, name: "David Copperfield", time: "1 hour ago", imageId: "guest-selfie-2" },
];

export default function ApprovalsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Guest Approvals</h1>
      {pendingApprovals.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pendingApprovals.map((approval) => {
            const guestImage = PlaceHolderImages.find(p => p.id === approval.imageId);
            return (
              <Card key={approval.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{approval.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  {guestImage && (
                    <Image
                      src={guestImage.imageUrl}
                      alt={`Selfie of ${approval.name}`}
                      width={400}
                      height={400}
                      data-ai-hint={guestImage.imageHint}
                      className="rounded-lg aspect-square object-cover"
                    />
                  )}
                  <p className="text-sm text-muted-foreground mt-2">{`Request received ${approval.time}`}</p>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <ShieldX className="mr-2 h-4 w-4" /> Deny
                  </Button>
                  <Button className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Approve
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
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
