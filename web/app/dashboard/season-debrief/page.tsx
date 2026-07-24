"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, ThumbsUp, ThumbsDown, Target, ArrowRight } from "lucide-react";

export default function SeasonDebriefPage() {
  const [season, setSeason] = useState("summer-2026");

  const summary = {
    revenue: "₹45.2L",
    units: "2,450",
    deadStockPct: "8.5%",
    markdownDepth: "12%",
    accuracy: "82%"
  };

  const whatWorked = [
    { cluster: "Pastel Anarkalis (Festive)", st: "92%", reason: "Captured early Eid demand, priced well under ₹3000." },
    { cluster: "Mirror-work Co-ords (Casual)", st: "88%", reason: "Highly trending on Instagram locally." },
    { cluster: "Linen Kurtas (Daily)", st: "85%", reason: "Perfect fabric for early summer heatwave." }
  ];

  const whatDidnt = [
    { cluster: "Heavy Georgette Sarees (Formal)", st: "35%", reason: "Missed wedding season window, arrived late." },
    { cluster: "Neon Western Tops (Party)", st: "42%", reason: "Trend faded faster than expected." }
  ];

  const accuracyBreakdown = [
    { rec: "Buy 50 Pastel Anarkalis", predicted: "45 sales", actual: "48 sales", status: "accurate" },
    { rec: "Avoid Heavy Georgette", predicted: "Low demand", actual: "Stagnant", status: "accurate" },
    { rec: "Buy 30 Neon Tops", predicted: "25 sales", actual: "12 sales", status: "inaccurate" }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Season Debrief</h1>
          <p className="text-sm text-muted-foreground mt-1">Based on data from March 2026 to June 2026</p>
        </div>
        <div className="flex gap-3">
          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summer-2026">Summer 2026</SelectItem>
              <SelectItem value="winter-2025">Winter 2025</SelectItem>
              <SelectItem value="summer-2025">Summer 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Download className="w-4 h-4 mr-2" /> Download Report
          </Button>
        </div>
      </header>

      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Revenue</p><p className="text-2xl font-bold font-mono">{summary.revenue}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Units Sold</p><p className="text-2xl font-bold font-mono">{summary.units}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Dead Stock %</p><p className="text-2xl font-bold font-mono">{summary.deadStockPct}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Avg Markdown</p><p className="text-2xl font-bold font-mono">{summary.markdownDepth}</p></CardContent></Card>
        <Card className="border-primary"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Forecast Accuracy</p><p className="text-2xl font-bold font-mono text-primary">{summary.accuracy}</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What Worked */}
        <Card className="border-t-4 border-t-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2"><ThumbsUp className="w-5 h-5 text-success"/> What Worked</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {whatWorked.map((item, idx) => (
                <li key={idx} className="border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold">{item.cluster}</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">{item.st} ST</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* What Didn't */}
        <Card className="border-t-4 border-t-destructive">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2"><ThumbsDown className="w-5 h-5 text-destructive"/> What Didn't</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {whatDidnt.map((item, idx) => (
                <li key={idx} className="border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold">{item.cluster}</span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">{item.st} ST</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Forecast Accuracy Breakdown */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Target className="w-5 h-5 text-muted-foreground"/> Forecast Accuracy Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accuracyBreakdown.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-muted/30 rounded-lg border">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-medium text-sm">Guide: {item.rec}</p>
                    <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                      <span>Predicted: {item.predicted}</span>
                      <span>Actual: {item.actual}</span>
                    </div>
                  </div>
                  <Badge variant={item.status === 'accurate' ? 'default' : 'destructive'} className={item.status === 'accurate' ? 'bg-success hover:bg-success text-white' : ''}>
                    {item.status === 'accurate' ? 'Accurate' : 'Inaccurate'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carry-Forward */}
        <Card className="border-l-4 border-l-primary shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Carry-Forward to Next Season</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm font-medium">Shift 15% budget from Heavy Georgette to Linen/Cotton blends.</p>
              </li>
              <li className="flex gap-3 items-start">
                <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm font-medium">Increase Size M buying ratio from 25% to 40% for ethnic wear.</p>
              </li>
              <li className="flex gap-3 items-start">
                <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm font-medium">Prioritize Surat suppliers for Co-ords (avg 88% ST this season).</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
