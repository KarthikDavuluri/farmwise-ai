import { Wheat, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { profile, signOut } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent">
              <Wheat className="h-7 w-7 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">FarmPrice AI</h1>
              <p className="text-sm opacity-80">Intelligent Crop Market Analysis & Price Prediction</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {profile && (
              <div className="hidden sm:flex items-center gap-2 text-sm opacity-90">
                <User className="h-4 w-4" />
                <span>{profile.name}</span>
                {profile.state && <span className="opacity-70">• {profile.state}</span>}
              </div>
            )}
            <Button variant="secondary" size="sm" onClick={signOut} className="gap-1">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
