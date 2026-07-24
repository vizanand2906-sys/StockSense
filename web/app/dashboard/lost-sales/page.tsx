"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Ban, Plus, Minus, Info, Calendar } from "lucide-react";

export default function LostSalesPage() {
  const [customerCount, setCustomerCount] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const topRequested = [
    { item: "Black Linen Co-ord Sets", freq: 14 },
    { item: "Plus Size Anarkalis (XXL+)", freq: 11 },
    { item: "Organza Sarees under ₹2000", freq: 8 },
    { item: "Indo-western Crop Tops", freq: 5 },
    { item: "Silk Dupattas (Standalone)", freq: 4 },
  ];

  const recentFeed = [
    { date: "Today", entries: [
      { id: 1, text: "Customer asked for plus size Anarkalis.", customers: 2, outcome: "Left without buying" },
      { id: 2, text: "Wanted black linen co-ords.", customers: 1, outcome: "Bought something else" }
    ]},
    { date: "Yesterday", entries: [
      { id: 3, text: "Organza saree in budget range.", customers: 3, outcome: "Left without buying" },
    ]}
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Lost Sales</h1>
          <p className="text-sm text-muted-foreground mt-1">Log what customers ask for but you don't have.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base shadow-md">
              <Plus className="w-5 h-5 mr-2" /> Log Lost Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log Lost Sale</DialogTitle>
              <DialogDescription>
                Record customer requests you couldn't fulfill. This directly informs your next Buyer Guide.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">What did they ask for?</label>
                <Input placeholder="e.g. Black Linen Co-ords or Plus Size Anarkali" autoFocus />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">How many customers asked today?</label>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={() => setCustomerCount(Math.max(1, customerCount - 1))}><Minus className="w-4 h-4"/></Button>
                  <span className="text-lg font-bold w-4 text-center">{customerCount}{customerCount >= 4 ? '+' : ''}</span>
                  <Button variant="outline" size="icon" onClick={() => setCustomerCount(Math.min(4, customerCount + 1))}><Plus className="w-4 h-4"/></Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Did they leave without buying?</label>
                <Select defaultValue="yes">
                  <SelectTrigger><SelectValue placeholder="Outcome" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, left without buying</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="bought_else">Bought something else</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="button" onClick={() => setIsDialogOpen(false)} className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aggregate View */}
        <div className="space-y-4">
          <h2 className="text-lg font-heading font-semibold">Top Missing Items</h2>
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 pb-3">
              <div className="flex items-center gap-2 text-primary text-sm font-medium">
                <Info className="w-4 h-4" /> These gaps automatically feed into your next buyer guide
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {topRequested.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center p-4">
                    <span className="font-medium">{item.item}</span>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">{item.freq} requests</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent Feed */}
        <div className="space-y-4">
          <h2 className="text-lg font-heading font-semibold">Recent Log</h2>
          <div className="space-y-6">
            {recentFeed.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4" /> {group.date}
                </h3>
                <div className="space-y-3">
                  {group.entries.map(entry => (
                    <Card key={entry.id} className="shadow-sm">
                      <CardContent className="p-4">
                        <p className="font-medium mb-2">"{entry.text}"</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <Badge variant="outline" className="text-muted-foreground bg-muted/50 border-muted">{entry.customers} customer{entry.customers > 1 ? 's' : ''}</Badge>
                          <Badge variant="outline" className={entry.outcome === 'Left without buying' ? 'text-destructive border-destructive/30 bg-destructive/5' : 'text-secondary-foreground border-secondary/30 bg-secondary/10'}>
                            {entry.outcome}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
