import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, X } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

interface ImageDropZoneProps {
  value?: File | null;
  onChange: (file: File | null) => void;
}

function ImageDropZone({ value, onChange }: ImageDropZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onChange(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
  };

  return (
    <div>
      {!value ? (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="w-full text-center h-20 border-dashed border flex justify-center items-center bg-accent rounded-lg cursor-pointer">
            {isDragActive ? (
              <CloudUpload className="w-10 h-10 text-foreground" />
            ) : (
              <p className="text-sm text-gray-500">
                Drop your image here or click to browse
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="relative w-40 h-40 mx-auto mt-4">
          <Image
            src={preview || URL.createObjectURL(value)}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border"
            width={200}
            height={200}
          />
          <Button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
          >
            <X className="w-4 h-4 text-white" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ImageDropZone;
