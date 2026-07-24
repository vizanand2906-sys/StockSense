"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingDown, IndianRupee, Clock, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MarkdownsPage() {
  const markdowns = [
    { id: 1, name: "Cotton Kurta Unknown", health: "slow", weeksOnShelf: 6, sellRate: 0.5, discount: 15, prob: 78, costOfWaiting: 2400 },
    { id: 2, name: "Heavy Georgette Saree", health: "dead", weeksOnShelf: 10, sellRate: 0.1, discount: 30, prob: 85, costOfWaiting: 5600 },
  ];

  const history = [
    { id: 1, name: "Pastel Silk Suit", date: "2026-06-15", discount: 20, outcome: "cleared" },
    { id: 2, name: "Embroidered Lehenga", date: "2026-05-20", discount: 15, outcome: "still slow" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <header>
        <h1 className="text-2xl font-heading font-bold">Markdowns</h1>
        <p className="text-sm text-muted-foreground mt-1">Review slow-moving stock before it becomes dead stock.</p>
      </header>

      {/* Summary */}
      <Card className="bg-destructive/10 border-destructive/20 shadow-none">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="bg-destructive/20 p-3 rounded-full">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <p className="font-bold text-lg text-destructive">2 items need attention</p>
            <p className="text-sm text-muted-foreground">₹8,000 at risk if no action is taken this week.</p>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="space-y-4">
        <h2 className="text-lg font-heading font-semibold">Recommended Actions</h2>
        
        {markdowns.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Item Info */}
              <div className="p-5 flex-1 border-b md:border-b-0 md:border-r bg-muted/20">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <Badge variant="outline" className={item.health === 'slow' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-muted text-muted-foreground border-muted-foreground/20'}>
                    {item.health.charAt(0).toUpperCase() + item.health.slice(1)}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> Weeks on shelf</p>
                    <p className="font-medium">{item.weeksOnShelf} weeks</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1"><TrendingDown className="w-3 h-3"/> Current sell rate</p>
                    <p className="font-medium">{item.sellRate} units/week</p>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="flex-1 p-0 flex flex-col sm:flex-row">
                <div className="flex-1 p-5 border-b sm:border-b-0 sm:border-r hover:bg-muted/10 transition-colors flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-1"><TrendingDown className="w-4 h-4"/> Mark down {item.discount}% now</h4>
                    <p className="text-sm text-muted-foreground">Probability of clearing by end of month: <strong className="text-foreground">{item.prob}%</strong></p>
                  </div>
                  <Button className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground">Apply Markdown</Button>
                </div>
                
                <div className="flex-1 p-5 hover:bg-muted/10 transition-colors flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-1"><Clock className="w-4 h-4 text-muted-foreground"/> Wait 2 more weeks</h4>
                    <p className="text-sm text-muted-foreground">Additional cost: <strong className="text-destructive">₹{item.costOfWaiting.toLocaleString()}</strong> in deeper discount needed later.</p>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Wait</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* History */}
      <div className="pt-8">
        <h2 className="text-lg font-heading font-semibold mb-4">Markdown History</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Discount Applied</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((h) => (
                <TableRow key={h.id}>
                  <TableCell>{h.date}</TableCell>
                  <TableCell className="font-medium">{h.name}</TableCell>
                  <TableCell>{h.discount}%</TableCell>
                  <TableCell>
                    {h.outcome === 'cleared' ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20 flex w-fit items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Cleared</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Still slow</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
