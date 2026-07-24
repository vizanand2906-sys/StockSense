"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin, TrendingUp, TrendingDown, Minus, Package, Clock, RefreshCcw, Lightbulb } from "lucide-react";

export default function SuppliersPage() {
  const [sort, setSort] = useState("score");

  const suppliers = [
    {
      id: 1, name: "Vikas Textiles", location: "Surat", category: "Ethnic",
      sellThroughSpeed: 4.5, returnRate: 2.1, reliability: 98,
      score: 9.2, trend: "improving"
    },
    {
      id: 2, name: "Fashion Hub", location: "Mumbai", category: "Western",
      sellThroughSpeed: 6.2, returnRate: 5.4, reliability: 85,
      score: 7.4, trend: "stable"
    },
    {
      id: 3, name: "Local Creations", location: "Local", category: "Fusion",
      sellThroughSpeed: 8.5, returnRate: 8.2, reliability: 70,
      score: 5.8, trend: "declining"
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "bg-success/20 text-success border-success/30";
    if (score >= 7.0) return "bg-secondary/20 text-secondary-foreground border-secondary/30";
    return "bg-destructive/20 text-destructive border-destructive/30";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-success" />;
    if (trend === 'stable') return <Minus className="w-4 h-4 text-muted-foreground" />;
    return <TrendingDown className="w-4 h-4 text-destructive" />;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Suppliers</h1>
          <p className="text-sm text-muted-foreground mt-1">Scores last recalculated: 2026-07-08</p>
        </div>
        <div className="flex gap-3">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Sort by Score</SelectItem>
              <SelectItem value="category">Sort by Category</SelectItem>
              <SelectItem value="location">Sort by Location</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add Supplier
          </Button>
        </div>
      </header>

      {/* Insight */}
      <Card className="border-l-4 border-l-primary shadow-sm bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex gap-4 items-start">
          <div className="bg-primary/20 p-2 rounded-full">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-primary mb-1">Supplier Insight</h3>
            <p className="text-sm">Your 3 Surat suppliers have 40% better sell-through than your Mumbai suppliers for ethnic wear. Consider consolidating your ethnic orders to Surat.</p>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Cards */}
      <div className="space-y-4">
        {suppliers.map(sup => (
          <Card key={sup.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Header Info */}
              <div className="p-5 flex-[2] border-b md:border-b-0 md:border-r bg-muted/10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-xl">{sup.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {sup.location}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">{sup.category}</Badge>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Score</p>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-lg px-3 py-1 ${getScoreColor(sup.score)}`} variant="outline">
                        {sup.score.toFixed(1)} / 10
                      </Badge>
                      {getTrendIcon(sup.trend)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex-[3] p-5 grid grid-cols-3 gap-4 divide-x">
                <div className="px-2 flex flex-col justify-center items-center text-center">
                  <Package className="w-5 h-5 text-muted-foreground mb-2" />
                  <p className="font-mono text-xl font-bold">{sup.sellThroughSpeed}</p>
                  <p className="text-xs text-muted-foreground mt-1">Avg weeks to 80% sell-through</p>
                </div>
                <div className="px-2 flex flex-col justify-center items-center text-center">
                  <RefreshCcw className="w-5 h-5 text-muted-foreground mb-2" />
                  <p className="font-mono text-xl font-bold">{sup.returnRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Return/exchange rate</p>
                </div>
                <div className="px-2 flex flex-col justify-center items-center text-center">
                  <Clock className="w-5 h-5 text-muted-foreground mb-2" />
                  <p className="font-mono text-xl font-bold">{sup.reliability}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Delivery on-time reliability</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
