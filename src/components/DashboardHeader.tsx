import { Wheat } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent">
            <Wheat className="h-7 w-7 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">FarmPrice AI</h1>
            <p className="text-sm opacity-80">Intelligent Crop Market Analysis & Price Prediction</p>
          </div>
        </div>
      </div>
    </header>
  );
}
