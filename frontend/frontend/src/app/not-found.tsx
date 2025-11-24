import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="text-center space-y-6 max-w-md">
				<div className="space-y-2">
					<h1 className="text-6xl font-bold">404</h1>
					<h2 className="text-2xl font-semibold">Page not found</h2>
					<p className="text-muted-foreground">
						Sorry, we couldn&apos;t find the page you&apos;re looking for.
					</p>
				</div>
				<Link href="/">
					<Button>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Go back home
					</Button>
				</Link>
			</div>
		</div>
	);
}
