export async function uploadFile(file: File): Promise<string | null> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDNAME;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset || "");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.url;
  } catch {
    return null;
  }
}
