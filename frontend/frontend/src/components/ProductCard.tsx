import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface ProductCardProps {
	image: string | StaticImageData;
	title: string;
	price: string;
	location: string;
	condition: string;
}

export const ProductCard = ({ image, title, price, location, condition }: ProductCardProps) => {
	return (
		<Card className="group cursor-pointer overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
			<div className="aspect-square overflow-hidden bg-muted relative">
				<Image
					src={image}
					alt={title}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-300"
				/>
			</div>
			<div className="p-4 space-y-2">
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-medium text-sm leading-tight">{title}</h3>
					<Badge variant="secondary" className="shrink-0 text-xs">
						{condition}
					</Badge>
				</div>
				<p className="text-lg font-semibold">{price}</p>
				<div className="flex items-center gap-1 text-xs text-muted-foreground">
					<MapPin className="h-3 w-3" />
					<span>{location}</span>
				</div>
			</div>
		</Card>
	);
};
