import { Label } from "@/components/ui/label";
import { Input, InputProps } from "@/components/ui/input";
import React from "react";

interface FormFieldProps extends InputProps {
	label: string;
	error?: string;
	helperText?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
	({ label, error, helperText, ...props }, ref) => {
		const id = props.id || label.toLowerCase().replace(/\s+/g, "-");

		return (
			<div className="space-y-2">
				<Label htmlFor={id}>{label}</Label>
				<Input
					ref={ref}
					id={id}
					className={error ? "border-destructive" : ""}
					aria-invalid={!!error}
					aria-describedby={error ? `${id}-error` : helperText ? `${id}-help` : undefined}
					{...props}
				/>
				{error && (
					<p id={`${id}-error`} className="text-sm text-destructive">
						{error}
					</p>
				)}
				{helperText && !error && (
					<p id={`${id}-help`} className="text-sm text-muted-foreground">
						{helperText}
					</p>
				)}
			</div>
		);
	},
);

FormField.displayName = "FormField";
