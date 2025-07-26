import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Generate upload URL for file uploads
export const generateUploadUrl = mutation(async (ctx) => {
	return await ctx.storage.generateUploadUrl();
});

// Get file URL by storage ID
export const getFileUrl = query({
	args: { storageId: v.id("_storage") },
	handler: async (ctx, args) => {
		return await ctx.storage.getUrl(args.storageId);
	},
});

// Store uploaded file metadata
export const saveFile = mutation({
	args: {
		storageId: v.id("_storage"),
		fileName: v.string(),
		fileType: v.string(),
		fileSize: v.number(),
	},
	handler: async (_ctx, args) => {
		// You can extend this to save file metadata to your database if needed
		return {
			storageId: args.storageId,
			fileName: args.fileName,
			fileType: args.fileType,
			fileSize: args.fileSize,
		};
	},
});

// Delete file from storage
export const deleteFile = mutation({
	args: { storageId: v.id("_storage") },
	handler: async (ctx, args) => {
		await ctx.storage.delete(args.storageId);
		return { success: true };
	},
});
