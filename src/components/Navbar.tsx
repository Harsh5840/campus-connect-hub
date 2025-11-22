import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <ShoppingBag className="h-5 w-5" />
          CampusThrift
        </Link>

        {!isAuthPage && (
          <div className="flex items-center gap-4">
            <Link to="/marketplace">
              <Button variant="ghost" size="sm">
                Marketplace
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
