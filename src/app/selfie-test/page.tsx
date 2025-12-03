'use client';

import { useState } from 'react';
import { uploadSelfie } from './uploadSelfie'; // Import the function from separate file

export default function SelfieTestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    try {
      const url = await uploadSelfie(file);
      if (url) {
        setImageUrl(url);
        alert('Upload successful!');
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold mb-6">Selfie Test Page</h1>
      
      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Selfie
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-primary-foreground
              hover:file:bg-primary/90"
          />
        </div>

        {file && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Selected: {file.name}
            </p>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Selfie'}
            </button>
          </div>
        )}

        {imageUrl && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Uploaded Image:</h2>
            <img 
              src={imageUrl} 
              alt="Uploaded selfie" 
              className="max-w-xs rounded-lg shadow-md"
            />
            <p className="text-sm text-muted-foreground mt-2">
              URL: <a href={imageUrl} className="text-primary hover:underline break-all">{imageUrl}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
