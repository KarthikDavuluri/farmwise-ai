import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Wheat, Mail, Loader2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto p-3 rounded-xl bg-primary w-fit">
            <Wheat className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Enter your email to receive a reset link</CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center space-y-3">
              <Mail className="h-12 w-12 mx-auto text-primary" />
              <p className="text-foreground font-medium">Check your email</p>
              <p className="text-sm text-muted-foreground">We sent a password reset link to {email}</p>
              <Link to="/login" className="text-primary hover:underline text-sm">Back to login</Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" placeholder="farmer@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Send Reset Link
              </Button>
              <p className="text-center text-sm">
                <Link to="/login" className="text-muted-foreground hover:underline">Back to login</Link>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
