"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, TrendingUp, TrendingDown } from "lucide-react";
import { syntheticGmroiData as gmroiData } from "@/lib/syntheticData";

export default function FinancialsPage() {
  const [timeframe, setTimeframe] = useState("this-season");


  const overallGmroi = 2.2;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-heading font-bold">Financials</h1>
          <p className="text-sm text-muted-foreground mt-1">Gross Margin Return on Inventory Investment</p>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-season">This season</SelectItem>
            <SelectItem value="last-season">Last season</SelectItem>
            <SelectItem value="last-90-days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </header>

      {/* Top Metric */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-primary-foreground/80 font-medium mb-2">Overall Store GMROI</p>
            <h2 className="text-5xl font-bold font-mono">₹{overallGmroi.toFixed(1)}</h2>
          </div>
          <div className="bg-white/10 p-4 rounded-lg md:max-w-xs text-sm">
            For every <strong>₹1</strong> invested in inventory across your store, you earn <strong>₹{overallGmroi.toFixed(1)}</strong> in gross margin over this period.
          </div>
        </CardContent>
      </Card>

      {/* Insight Card */}
      <Card className="border-l-4 border-l-primary shadow-sm bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex gap-4 items-start">
          <div className="bg-primary/20 p-2 rounded-full">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-primary mb-1">Budget Optimization</h3>
            <p className="text-sm">Fusion wear is your highest GMROI category (₹3.1). Consider shifting 10% of your buying budget from Western to Fusion in your next cycle to maximize returns.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">GMROI by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gmroiData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} width={80} />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'GMROI']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="gmroi" fill="#C84B31" radius={[0, 4, 4, 0]} barSize={30}>
                    {gmroiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#C84B31" : "#E8A87C"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Invested</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
                  <TableHead className="text-right">GMROI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gmroiData.map((row) => (
                  <TableRow key={row.category}>
                    <TableCell className="font-medium">{row.category}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">₹{(row.invested/1000).toFixed(1)}k</TableCell>
                    <TableCell className="text-right font-mono text-foreground">₹{(row.margin/1000).toFixed(1)}k</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-bold font-mono text-primary">₹{row.gmroi.toFixed(1)}</span>
                        <span className="text-xs flex items-center gap-0.5 text-muted-foreground">
                          {row.vsLast > 0 ? <TrendingUp className="w-3 h-3 text-success"/> : <TrendingDown className="w-3 h-3 text-destructive"/>}
                          {Math.abs(row.vsLast)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
