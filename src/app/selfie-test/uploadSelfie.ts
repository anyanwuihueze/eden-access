import { supabase } from "@/lib/supabaseClient";

export async function uploadSelfie(file: File) {
  const fileName = `selfies/${Date.now()}.jpg`;

  const { data, error } = await supabase.storage
    .from("my-selfies") // bucket name
    .upload(fileName, file);

  if (error) {
    console.error("Upload failed:", error);
    return null;
  }

  const { data: publicData } = supabase.storage
    .from("my-selfies")
    .getPublicUrl(fileName);

  return publicData?.publicUrl;
}
