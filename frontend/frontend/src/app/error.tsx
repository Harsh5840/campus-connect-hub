"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="text-center space-y-6 max-w-md">
				<div className="flex justify-center">
					<div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
						<AlertTriangle className="h-8 w-8 text-destructive" />
					</div>
				</div>
				<div className="space-y-2">
					<h1 className="text-2xl font-bold">Something went wrong</h1>
					<p className="text-muted-foreground">
						{error.message || "An unexpected error occurred. Please try again."}
					</p>
				</div>
				<div className="flex gap-4 justify-center">
					<Button onClick={() => reset()}>Try again</Button>
					<Link href="/">
						<Button variant="outline">Go home</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
