"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, AlertTriangle, UploadCloud, Store, Shield, Database, RefreshCw, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  const dataSources = [
    { name: "Google Trends", updated: "Monday 6:00 AM", status: "healthy", records: "23 keywords" },
    { name: "Myntra Bestsellers", updated: "Sunday 11:30 PM", status: "healthy", records: "50 items" },
    { name: "Instagram Hashtags", updated: "2 days ago", status: "warning", records: "12 of 18 hashtags" },
    { name: "Weather (Open-Meteo)", updated: "Today", status: "healthy", records: "7-day forecast" },
  ];

  const skuReview = [
    { id: 1, name: "Printed Unstitched Suit Material", tagged: "Ethnic / Printed" },
    { id: 2, name: "Summer Midi Dress YLW", tagged: "Western / Bright" },
  ];

  const handleUpload = () => {
    setUploadStatus("uploading");
    setUploadProgress(10);
    setTimeout(() => setUploadProgress(40), 1000);
    setTimeout(() => setUploadProgress(70), 2500);
    setTimeout(() => {
      setUploadProgress(100);
      setUploadStatus("done");
    }, 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <header>
        <h1 className="text-2xl font-heading font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your store profile, data uploads, and app preferences.</p>
      </header>

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full md:w-auto h-auto">
          <TabsTrigger value="data" className="py-2">Data & CSV</TabsTrigger>
          <TabsTrigger value="profile" className="py-2">Store Profile</TabsTrigger>
          <TabsTrigger value="skus" className="py-2 relative">
            SKU Review
            <Badge className="ml-2 bg-warning text-warning-foreground absolute -top-2 -right-2 px-1.5 min-w-[20px] h-5 flex items-center justify-center">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="py-2">Preferences</TabsTrigger>
          <TabsTrigger value="account" className="py-2 hidden lg:block">Account</TabsTrigger>
        </TabsList>
        
        {/* Data & CSV Tab */}
        <TabsContent value="data" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UploadCloud className="w-5 h-5"/> Upload Vyapar CSV</CardTitle>
              <CardDescription>Upload your latest sales and inventory export from Vyapar or offline Excel.</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadStatus === "idle" && (
                <div className="border-2 border-dashed rounded-lg p-12 text-center flex flex-col items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer" onClick={handleUpload}>
                  <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                  <p className="font-medium text-lg mb-1">Click or drag file to upload</p>
                  <p className="text-sm text-muted-foreground mb-4">Supports .csv and .xlsx up to 50MB</p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Select File</Button>
                </div>
              )}

              {uploadStatus === "uploading" && (
                <div className="border rounded-lg p-8">
                  <div className="flex justify-between items-end mb-2">
                    <p className="font-medium">
                      {uploadProgress < 30 ? "Uploading file..." : uploadProgress < 60 ? "Reading your data..." : uploadProgress < 90 ? "Tagging your items..." : "Calculating stock health..."}
                    </p>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-4">
                    <div className="bg-primary h-full transition-all duration-500 ease-out" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">
                    {uploadProgress > 60 && "47 of 100 items tagged"}
                  </p>
                </div>
              )}

              {uploadStatus === "done" && (
                <div className="border border-success bg-success/5 rounded-lg p-8 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-success mb-4" />
                  <p className="font-bold text-lg mb-1">Your data is ready</p>
                  <p className="text-muted-foreground mb-4">87 SKUs tagged. 2 items need a quick review.</p>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setUploadStatus("idle")}>Upload another</Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Review SKUs</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5"/> Data Sources</CardTitle>
              <CardDescription>Status of automated scrapers collecting market intelligence.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Records</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataSources.map((source, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{source.name}</TableCell>
                      <TableCell>{source.updated}</TableCell>
                      <TableCell>
                        {source.status === 'healthy' ? (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/30 flex w-fit items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Healthy</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning/30 flex w-fit items-center gap-1"><AlertTriangle className="w-3 h-3"/> Warning</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{source.records}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="text-destructive">Reset Demo Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">This will erase any uploaded CSV data and repopulate your store with realistic synthetic data for Bangalore.</p>
              <Button variant="destructive" className="bg-destructive hover:bg-destructive/90"><RefreshCw className="w-4 h-4 mr-2"/> Repopulate Demo Data</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Store className="w-5 h-5"/> Store Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Name</label>
                <Input defaultValue="Demo Store" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input defaultValue="Bangalore" disabled />
                <p className="text-xs text-muted-foreground">StockSense currently only supports Bangalore trends.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Neighbourhood Type</label>
                <Select defaultValue="commercial">
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial / High Street</SelectItem>
                    <SelectItem value="near-college">Near College</SelectItem>
                    <SelectItem value="market">Wholesale / Traditional Market</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Category</label>
                <Select defaultValue="multi">
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethnic">Ethnic Wear</SelectItem>
                    <SelectItem value="western">Western Wear</SelectItem>
                    <SelectItem value="fusion">Fusion Wear</SelectItem>
                    <SelectItem value="multi">Multi-category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SKU Review Tab */}
        <TabsContent value="skus" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-warning"/> Needs Review (2)</CardTitle>
              <CardDescription>Our AI wasn't fully confident tagging these items. Please confirm or correct them.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skuReview.map((sku) => (
                  <div key={sku.id} className="p-4 border rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-4 bg-muted/30">
                    <div>
                      <p className="font-semibold">{sku.name}</p>
                      <p className="text-sm text-muted-foreground">AI Tagged as: <strong className="text-foreground">{sku.tagged}</strong></p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Edit Tags</Button>
                      <Button className="bg-success text-success-foreground hover:bg-success/90 border-success/10"><CheckCircle2 className="w-4 h-4 mr-2"/> Looks Good</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Forecast Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dead Stock Threshold</label>
                <div className="flex items-center gap-3">
                  <Input type="number" defaultValue="8" className="w-20" />
                  <span className="text-sm text-muted-foreground">weeks on shelf</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Trend Alert Sensitivity</label>
                <Select defaultValue="medium">
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (Alert early)</SelectItem>
                    <SelectItem value="medium">Medium (Standard)</SelectItem>
                    <SelectItem value="low">Low (Wait for strong signals)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6 pt-4 block lg:hidden">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5"/> Account Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="owner@demostore.com" disabled />
              </div>
              <Button variant="outline">Change Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
