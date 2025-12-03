'use client';

import { useState } from 'react';
import {
  Users, Clock, Shield, TrendingUp,
  Calendar, MapPin, MessageSquare, BarChart3,
  Download, Bell, Eye, Filter, Settings,
  LogOut, Home, UserCheck, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState('today');

  // Mock data - replace with real API calls
  const dashboardData = {
    currentGuests: 12,
    todayCheckins: 24,
    avgGateTime: '47s',
    aiSuccessRate: '98.7%',
    gateEfficiency: 85,
    revenue: 24500,
    recentActivity: [
      { id: 1, guest: 'James Okoro', time: '2 min ago', action: 'Checked in', status: 'success' },
      { id: 2, guest: 'Sarah Chen', time: '5 min ago', action: 'Selfie verified', status: 'success' },
      { id: 3, guest: 'Michael Ade', time: '12 min ago', action: 'Checked out', status: 'success' },
      { id: 4, guest: 'Visitor #452', time: '18 min ago', action: 'Gate delay', status: 'warning' },
    ],
    kpis: [
      { label: 'Peak Hour', value: '7-9 PM', change: '+12%' },
      { label: 'Selfie Compliance', value: '96%', change: '+4%' },
      { label: 'Avg Verification', value: '2.3s', change: '-0.8s' },
      { label: 'Guest Satisfaction', value: '4.8/5', change: '+0.3' },
    ]
  };

  const handleLogout = () => {
    // TODO: Implement logout
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">EDEN ACCESS COMMAND CENTER</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Property Intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="border-border">
              <Bell className="w-4 h-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-border">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full" />
                  <span>Admin User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-border">
                <DropdownMenuLabel>Estate Manager</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 md:px-6">
        {/* Time Filter & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {['today', 'week', 'month', 'quarter'].map((period) => (
              <Button
                key={period}
                variant={timeFilter === period ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeFilter(period)}
                className={timeFilter === period 
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-primary" 
                  : "border-border"
                }
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 border-border">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Main KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Guests</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.currentGuests}</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-sm text-green-500">+2 from yesterday</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today&apos;s Check-Ins</CardTitle>
              <Calendar className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.todayCheckins}</div>
              <p className="text-sm text-muted-foreground mt-2">Projected: 38 total</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Gate Time</CardTitle>
              <Clock className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.avgGateTime}</div>
              <p className="text-sm text-muted-foreground mt-2">Down from 3 minutes!</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Success Rate</CardTitle>
              <Shield className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.aiSuccessRate}</div>
              <Progress value={98.7} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Different Views */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="border-border bg-card">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Live Activity */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Activity Feed
                </CardTitle>
                <CardDescription>Real-time guest movements and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.status === 'success' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {activity.status === 'success' ? <UserCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.guest}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                        <Badge variant={activity.status === 'success' ? 'default' : 'secondary'} 
                          className={activity.status === 'success' 
                            ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30' 
                            : 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border-yellow-500/30'
                          }>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dashboardData.kpis.map((kpi, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <span className={`text-sm ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Gate Efficiency */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Gate Efficiency</CardTitle>
                <CardDescription>How quickly guests are processed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Efficiency</span>
                    <span className="font-bold">{dashboardData.gateEfficiency}%</span>
                  </div>
                  <Progress value={dashboardData.gateEfficiency} className="h-2" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-bold">Fast</p>
                      <p className="text-muted-foreground">&lt; 30s</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">Average</p>
                      <p className="text-muted-foreground">30-60s</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">Slow</p>
                      <p className="text-muted-foreground">&gt; 60s</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Advanced analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Advanced analytics coming soon</p>
                    <p className="text-sm text-muted-foreground mt-2">AI-powered insights and predictive analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Reports & Exports</CardTitle>
                <CardDescription>Generate reports for board meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="h-auto py-4 flex-col gap-2 border-border bg-card hover:bg-secondary">
                      <Calendar className="w-6 h-6" />
                      <span>Daily Report</span>
                    </Button>
                    <Button className="h-auto py-4 flex-col gap-2 border-border bg-card hover:bg-secondary">
                      <Calendar className="w-6 h-6" />
                      <span>Weekly Summary</span>
                    </Button>
                    <Button className="h-auto py-4 flex-col gap-2 border-border bg-card hover:bg-secondary">
                      <Calendar className="w-6 h-6" />
                      <span>Monthly Analytics</span>
                    </Button>
                  </div>
                  <Separator />
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Export reports as CSV or PDF for board meetings</p>
                    <Button className="mt-4 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Full Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats Footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Peak Day</p>
              <p className="text-lg font-semibold">Saturday</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Most Active Resident</p>
              <p className="text-lg font-semibold">Mrs. Okoro</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue (Monthly)</p>
              <p className="text-lg font-semibold">${dashboardData.revenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">System Uptime</p>
              <p className="text-lg font-semibold">99.8%</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="flex justify-around py-3">
          <Button variant="ghost" size="icon">
            <Home className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <BarChart3 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
