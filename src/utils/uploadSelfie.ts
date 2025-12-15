// src/utils/uploadSelfie.ts
import { supabase } from "@/lib/supabaseClient";

export async function uploadSelfie(file: File, accessCode: string) {
  // Check if supabase client is initialized
  if (!supabase) {
    console.error("Supabase client not initialized");
    return null;
  }

  const fileName = `selfies/${accessCode}.jpg`;
  
  // Upload file
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("my-selfies")
    .upload(fileName, file, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (uploadError) {
    console.error("Upload failed:", uploadError);
    return null;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("my-selfies")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}