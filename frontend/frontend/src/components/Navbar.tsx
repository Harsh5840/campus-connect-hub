"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const isAuthPage = pathname === "/auth";

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
					<ShoppingBag className="h-5 w-5" />
					<span className="hidden sm:inline">CampusThrift</span>
				</Link>

				{!isAuthPage && (
					<>
						{/* Desktop Menu */}
						<div className="hidden sm:flex items-center gap-4">
							<Link href="/marketplace">
								<Button
									variant={pathname === "/marketplace" ? "default" : "ghost"}
									size="sm"
								>
									Marketplace
								</Button>
							</Link>
							<Link href="/auth">
								<Button size="sm">Sign In</Button>
							</Link>
						</div>

						{/* Mobile Menu Button */}
						<button
							className="sm:hidden p-2"
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
						>
							{isOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</>
				)}
			</div>

			{/* Mobile Menu */}
			{!isAuthPage && isOpen && (
				<div className="sm:hidden border-t border-border bg-card">
					<div className="container mx-auto px-4 py-4 space-y-2">
						<Link href="/marketplace" onClick={() => setIsOpen(false)}>
							<Button variant="ghost" className="w-full justify-start">
								Marketplace
							</Button>
						</Link>
						<Link href="/auth" onClick={() => setIsOpen(false)}>
							<Button className="w-full">Sign In</Button>
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};
