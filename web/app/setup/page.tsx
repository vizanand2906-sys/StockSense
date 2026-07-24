"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, Store, ArrowRight, Loader2 } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate setting up store and seeding data
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard/today");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Store className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Let's set up your store</h1>
          <p className="text-muted-foreground mt-2">Tell us a bit about your boutique so we can personalize your insights.</p>
        </div>

        <form onSubmit={handleSetup}>
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle>Store Details</CardTitle>
              <CardDescription>This helps us compare your performance with similar stores.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Store Name</label>
                  <Input placeholder="e.g. Elegance Boutique" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input defaultValue="Bangalore" disabled />
                    <p className="text-xs text-muted-foreground">Currently invite-only in Bangalore.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Neighbourhood Type</label>
                    <Select required>
                      <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential Area</SelectItem>
                        <SelectItem value="commercial">Commercial / High Street</SelectItem>
                        <SelectItem value="college">Near College</SelectItem>
                        <SelectItem value="office">Near Tech Park / Office</SelectItem>
                        <SelectItem value="market">Traditional Market</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Category</label>
                  <Select required>
                    <SelectTrigger><SelectValue placeholder="What do you sell the most?" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethnic">Ethnic Wear</SelectItem>
                      <SelectItem value="western">Western Wear</SelectItem>
                      <SelectItem value="fusion">Fusion Wear</SelectItem>
                      <SelectItem value="kids">Kids Wear</SelectItem>
                      <SelectItem value="multi">Multi-category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3">Upload your first data</h3>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium text-sm mb-1">Upload Vyapar CSV (Optional)</p>
                  <p className="text-xs text-muted-foreground">If skipped, we'll load synthetic demo data for you to explore.</p>
                </div>
              </div>

            </CardContent>
            <CardFooter className="bg-muted/30 border-t p-6">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Preparing your dashboard...</>
                ) : (
                  <>Complete Setup <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
