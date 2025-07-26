import { convexQuery } from "@convex-dev/react-query";
import { api } from "@repo/server/convex/_generated/api";
import type { Id } from "@repo/server/convex/_generated/dataModel";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { createFileRoute } from "@tanstack/react-router";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/user/account")({
	component: AccountSettings,
});

function AccountSettings() {
	const { data: currentUser } = useSuspenseQuery(
		convexQuery(api.auth.getCurrentUser, {}),
	);

	const [name, setName] = useState(currentUser?.name || "");
	const [isUploading, setIsUploading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const updateProfileMutation = useMutation(api.auth.updateUserProfile);

	const generateUploadUrlMutation = useMutation(api.files.generateUploadUrl);

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Validate file type
			if (!file.type.startsWith("image/")) {
				toast.error("Please select an image file");
				return;
			}

			// Validate file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				toast.error("File size must be less than 5MB");
				return;
			}

			setSelectedFile(file);

			// Create preview URL
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}
	};

	const handleRemoveFile = () => {
		setSelectedFile(null);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const uploadFile = async (file: File): Promise<Id<"_storage">> => {
		// Get upload URL from Convex
		const uploadUrl = await generateUploadUrlMutation();

		// Upload file to Convex storage
		const result = await fetch(uploadUrl, {
			method: "POST",
			headers: { "Content-Type": file.type },
			body: file,
		});

		if (!result.ok) {
			throw new Error("Failed to upload file");
		}

		const { storageId } = await result.json();
		return storageId as Id<"_storage">;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsUpdating(true);

		try {
			let avatarStorageId: Id<"_storage"> | undefined;

			// Upload new avatar if selected
			if (selectedFile) {
				setIsUploading(true);
				avatarStorageId = await uploadFile(selectedFile);
				setIsUploading(false);
			}

			// Update user profile
			await updateProfileMutation({
				name: name || undefined,
				avatarStorageId: avatarStorageId,
			});

			toast.success("Profile updated successfully!");

			// Clean up preview URL
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
				setPreviewUrl(null);
			}
			setSelectedFile(null);
		} catch (error) {
			console.error("Profile update failed:", error);
			toast.error("Failed to update profile. Please try again.");
		} finally {
			setIsUploading(false);
			setIsUpdating(false);
		}
	};

	const currentAvatar = previewUrl || currentUser?.avatar || currentUser?.image;

	return (
		<div className="max-w-2xl">
			<Card>
				<CardHeader>
					<CardTitle>Account Settings</CardTitle>
					<CardDescription>
						Update your profile information and avatar
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Avatar Section */}
						<div className="space-y-4">
							<Label>Profile Picture</Label>
							<div className="flex items-center space-x-4">
								<Avatar className="h-20 w-20">
									<AvatarImage src={currentAvatar} alt="Profile picture" />
									<AvatarFallback className="text-lg">
										{currentUser?.name?.charAt(0)?.toUpperCase() ||
											currentUser?.email?.charAt(0)?.toUpperCase() ||
											"U"}
									</AvatarFallback>
								</Avatar>
								<div className="space-y-2">
									<div className="flex space-x-2">
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => fileInputRef.current?.click()}
											disabled={isUploading}
										>
											<Upload className="mr-2 h-4 w-4" />
											Upload Image
										</Button>
										{selectedFile && (
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={handleRemoveFile}
												disabled={isUploading}
											>
												<X className="mr-2 h-4 w-4" />
												Remove
											</Button>
										)}
									</div>
									<p className="text-xs text-muted-foreground">
										JPG, PNG or GIF. Max size 5MB.
									</p>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handleFileSelect}
									className="hidden"
								/>
							</div>
						</div>

						{/* Name Field */}
						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Enter your full name"
								disabled={isUploading}
							/>
						</div>

						{/* Email Field (Read-only) */}
						<div className="space-y-2">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								value={currentUser?.email || ""}
								disabled
								className="bg-muted"
							/>
							<p className="text-xs text-muted-foreground">
								Email address cannot be changed
							</p>
						</div>

						{/* Submit Button */}
						<div className="flex justify-end space-x-2">
							<Button
								type="submit"
								disabled={isUploading || isUpdating}
							>
								{isUploading || isUpdating
									? "Saving..."
									: "Save Changes"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
