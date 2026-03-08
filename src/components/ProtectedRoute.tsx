import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  requiredRole?: "admin" | "farmer";
}

export function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "admin" ? "/admin" : "/"} replace />;
  }

  return <>{children}</>;
}
