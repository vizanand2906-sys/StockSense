import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Package, IndianRupee, AlertCircle } from "lucide-react";

export default function TodayPage() {
  // Placeholder data for UI skeleton
  const storeName = "Demo Store";
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <p className="text-muted-foreground text-sm">Good morning,</p>
          <h1 className="text-2xl font-heading font-bold">{storeName}</h1>
          <p className="text-sm text-muted-foreground mt-1">{today}</p>
        </div>
        <div className="text-xs text-muted-foreground">
          Revenue data as of yesterday &middot; Trends updated Monday
        </div>
      </header>

      {/* Primary Action Card */}
      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Priority action today</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <p className="text-lg font-medium text-foreground">
            3 items crossed 8 weeks on shelf today &mdash; review markdowns before they become losses
          </p>
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            View Markdowns
          </Button>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <p className="text-sm text-muted-foreground mb-1">Yesterday's Revenue</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold">₹14,500</span>
              <span className="text-xs text-success flex items-center"><TrendingUp className="w-3 h-3 mr-1"/>+12%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">vs 7-day average</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <p className="text-sm text-muted-foreground mb-1">Units Sold</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold">18</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <p className="text-sm text-muted-foreground mb-1">Dead Stock Value</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-destructive">₹45,000</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Capital locked right now</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <p className="text-sm text-muted-foreground mb-1">Fast-Moving SKUs</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-primary">12</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Currently in stock</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Expected Busy Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
              <div className="bg-primary/10 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-lg">Today: 4 PM - 7 PM</p>
                <p className="text-sm text-muted-foreground">Based on your day-of-week transaction history</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center gap-2">
              <Package className="w-5 h-5 text-secondary" />
              <span>View Stock Health</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center gap-2">
              <IndianRupee className="w-5 h-5 text-secondary" />
              <span>Generate Guide</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5 text-secondary" />
              <span>Log Lost Sale</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
