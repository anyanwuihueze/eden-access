import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, LogOut, Search } from "lucide-react";

const approvedGuests = [
    { name: "Alice Johnson", resident: "Mr. Adebayo (Apt 2B)", accessCode: "123456", arrivalTime: "10:00 AM", status: "Expected" },
    { name: "Bob Williams", resident: "Mrs. Okoro (C-Wing)", accessCode: "789012", arrivalTime: "11:30 AM", status: "Checked In" },
    { name: "Charlie Brown", resident: "Chief Alabi (Penthouse)", accessCode: "345678", arrivalTime: "3:00 PM", status: "Expected" },
];

export default function GuardDashboard() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Verify Access Code</CardTitle>
          <CardDescription>Enter the guest's access code to verify their entry.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex items-center gap-4">
            <Input
              id="access-code"
              placeholder="Enter 6-digit code"
              className="max-w-xs text-lg tracking-widest"
              maxLength={6}
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Verify
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Today's Approved Guests</CardTitle>
          <CardDescription>List of guests expected and currently on the premises.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Access Code</TableHead>
                <TableHead>Expected Arrival</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedGuests.map((guest) => (
                <TableRow key={guest.accessCode}>
                  <TableCell className="font-medium">{guest.name}</TableCell>
                  <TableCell>{guest.resident}</TableCell>
                  <TableCell className="font-mono">{guest.accessCode}</TableCell>
                  <TableCell>{guest.arrivalTime}</TableCell>
                  <TableCell>
                    <Badge variant={guest.status === 'Checked In' ? "default" : "outline"}>
                      {guest.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {guest.status === 'Expected' ? (
                      <Button size="sm">
                        <Check className="mr-2 h-4 w-4" /> Check In
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <LogOut className="mr-2 h-4 w-4" /> Check Out
                      </Button>
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
