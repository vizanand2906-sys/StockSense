import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

export default function StockHealthPage() {
  // Skeleton / Dummy data
  const skus = [
    { id: 1, name: "Pastel Anarkali Set", style: "anarkali", colour: "pastel", occasion: "festive", size: "M", health: "fast", stock: 12, st4wk: 75, weeksOnShelf: 2, coverWeeks: 1.5, locked: 0, needsReview: false },
    { id: 2, name: "Mirror Work Lehenga", style: "lehenga", colour: "bright", occasion: "bridal", size: "L", health: "healthy", stock: 8, st4wk: 45, weeksOnShelf: 4, coverWeeks: 4, locked: 0, needsReview: false },
    { id: 3, name: "Cotton Kurta Unknown", style: "kurta", colour: "printed", occasion: "casual", size: "S", health: "slow", stock: 24, st4wk: 20, weeksOnShelf: 6, coverWeeks: 12, locked: 12000, needsReview: true },
    { id: 4, name: "Heavy Georgette Saree", style: "saree", colour: "dark", occasion: "formal", size: "free", health: "dead", stock: 15, st4wk: 5, weeksOnShelf: 10, coverWeeks: 40, locked: 35000, needsReview: false },
  ];

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "fast": return <Badge className="bg-primary text-primary-foreground">Fast</Badge>;
      case "healthy": return <Badge className="bg-secondary text-secondary-foreground">Healthy</Badge>;
      case "slow": return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Slow</Badge>;
      case "dead": return <Badge className="bg-muted text-muted-foreground border-muted-foreground/20">Dead</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-heading font-bold">Stock Health</h1>
          <p className="text-sm text-muted-foreground mt-1">Last updated: today at 2:14 AM</p>
        </div>
      </header>

      {/* Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total SKUs</p><p className="text-xl font-bold">847</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Fast</p><p className="text-xl font-bold text-primary">254</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Healthy</p><p className="text-xl font-bold text-secondary">338</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Slow</p><p className="text-xl font-bold text-yellow-600">169</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Dead</p><p className="text-xl font-bold text-muted-foreground">86</p></CardContent></Card>
        <Card className="border-l-4 border-l-destructive"><CardContent className="p-4"><p className="text-sm text-muted-foreground">₹ Locked (Slow+Dead)</p><p className="text-xl font-bold text-destructive">₹1.2L</p></CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center bg-card p-4 rounded-lg shadow-sm border">
        <Input placeholder="Search SKUs..." className="max-w-xs" />
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="fast">Fast</SelectItem><SelectItem value="healthy">Healthy</SelectItem><SelectItem value="slow">Slow</SelectItem><SelectItem value="dead">Dead</SelectItem></SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent><SelectItem value="ethnic">Ethnic Wear</SelectItem><SelectItem value="western">Western Wear</SelectItem></SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
          <SelectContent><SelectItem value="health">Health Score</SelectItem><SelectItem value="locked">₹ Locked</SelectItem><SelectItem value="weeks">Weeks on Shelf</SelectItem></SelectContent>
        </Select>
      </div>

      {/* SKU Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Attributes</TableHead>
                <TableHead>Health</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Sell-through (4w)</TableHead>
                <TableHead className="text-right">Shelf Wks</TableHead>
                <TableHead className="text-right">Cover Wks</TableHead>
                <TableHead className="text-right">₹ Locked</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skus.map((sku) => (
                <TableRow key={sku.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {sku.name}
                      {sku.needsReview && (
                        <div title="AI wasn't sure about this item's category. Confirm?" className="text-warning cursor-help">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">{sku.style}</Badge>
                      <Badge variant="outline" className="text-xs">{sku.colour}</Badge>
                      <Badge variant="outline" className="text-xs">{sku.occasion}</Badge>
                      <Badge variant="outline" className="text-xs">{sku.size}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{getHealthBadge(sku.health)}</TableCell>
                  <TableCell className="text-right">{sku.stock}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="w-8">{sku.st4wk}%</span>
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${sku.st4wk}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{sku.weeksOnShelf}</TableCell>
                  <TableCell className="text-right">{sku.coverWeeks}</TableCell>
                  <TableCell className="text-right font-mono">{sku.locked > 0 ? `₹${sku.locked.toLocaleString()}` : '-'}</TableCell>
                  <TableCell className="text-right">
                    {sku.health === 'dead' || sku.health === 'slow' ? (
                      <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/10">Mark down</Button>
                    ) : sku.health === 'fast' ? (
                      <Button size="sm" variant="outline" className="text-success border-success hover:bg-success/10">Reorder</Button>
                    ) : (
                      <Button size="sm" variant="ghost">Review</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
