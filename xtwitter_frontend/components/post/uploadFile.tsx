import React, { useState, type ReactNode, type MouseEvent } from 'react';
import { FileDrop, type FileDropProps } from 'react-file-drop';

interface UploadProps {
  children: (props: { isUploading: boolean }) => ReactNode;
  onUploadFinish: (src: string) => void;
}

export default function Upload({ children, onUploadFinish }: UploadProps) {
  const [isFileNearby, setIsFileNearby] = useState<boolean>(false);
  const [isFileOver, setIsFileOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  function uploadImage(files: File[], e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsFileNearby(false);
    setIsFileOver(false);
    setIsUploading(true);
    const data = new FormData();
    if (files && files.length > 0) {
      data.append('post', files[0] as Blob);
    }
    fetch('/api/upload', {
      method: 'POST',
      body: data,
    }).then(async (response) => {
      const json = await response.json();
      const src = json.src;
      onUploadFinish(src);
      setIsUploading(false);
    });
  }

  return (
    <FileDrop
      onDrop={(files: FileList | null, e: MouseEvent<HTMLDivElement>) => uploadImage(Array.from(files || []), e)}
      onDragOver={() => setIsFileOver(true)}
      onDragLeave={() => setIsFileOver(false)}
      onFrameDragEnter={() => setIsFileNearby(true)}
      onFrameDragLeave={() => setIsFileNearby(false)}
      onFrameDrop={() => {
        setIsFileNearby(false);
        setIsFileOver(false);
      }}
    >
      <div className="relative">
        {(isFileNearby || isFileOver) && (
          <div className="bg-twitterBlue absolute inset-0 flex items-center justify-center">drop your images here</div>
        )}
        {children({ isUploading })}
      </div>
    </FileDrop>
  );
}
