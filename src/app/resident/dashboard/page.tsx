import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GenerateCodeForm } from "./components/generate-code-form";
import { GuestLog } from "./components/guest-log";

export default function ResidentDashboard() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Today's Guests</CardDescription>
            <CardTitle className="text-4xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+5 since yesterday</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Approvals</CardDescription>
            <CardTitle className="text-4xl text-amber-400">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Approve them now</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tips This Month</CardDescription>
            <CardTitle className="text-4xl">₦5,000</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+10% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Unpaid Dues</CardDescription>
            <CardTitle className="text-4xl text-destructive">₦12,500</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Due since last week</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Generate Guest Access</CardTitle>
            <CardDescription>Enter your guest's details to generate a unique access code.</CardDescription>
          </CardHeader>
          <CardContent>
            <GenerateCodeForm />
          </CardContent>
        </Card>
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Guest Log</CardTitle>
            <CardDescription>A log of your recent guest entries and exits.</CardDescription>
          </CardHeader>
          <CardContent>
            <GuestLog />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
