import { useState } from 'react';
import axios from 'axios';
import useUserInfo from '@/hooks/userInfor';
import { RxAvatar } from 'react-icons/rx';
import Upload from './uploadFile';

export default function PostForm({
  onPost,
  compact,
  parent,
  placeholder = "What's happening?",
}: {
  onPost: () => void;
  compact: boolean;
  parent: any;
  placeholder?: string;
}) {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handlePostSubmit = async (e: any) => {
    // todo
  };

  if (status === 'loading') {
    return '';
  }
  return (
    <form
      className="mx-5"
      onSubmit={handlePostSubmit}
    >
      <div className={(compact ? 'items-center' : '') + ' flex'}>
        <div className="">
          <RxAvatar size={'26'} />
        </div>
        <div className="grow pl-2">
          <Upload onUploadFinish={(src: string) => setImages((prev: string[]) => [...prev, src])}>
            {({ isUploading }) => (
              <div>
                <textarea
                  className={(compact ? 'h-10 mt-1' : 'h-24') + ' w-full p-2 bg-transparent text-twitterWhite'}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={placeholder}
                />
                <div className="flex -mx-2">
                  {images.length > 0 &&
                    images.map((img) => (
                      <div
                        className="h-24 m-2"
                        key={img}
                      >
                        <img
                          src={img}
                          alt=""
                          className="h-24"
                        />
                      </div>
                    ))}
                  {isUploading && (
                    <div className="h-24 w-24 m-2 bg-twitterBorder flex items-center justify-center">loading</div>
                  )}
                </div>
              </div>
            )}
          </Upload>
          {!compact && (
            <div className="text-right border-t border-twitterBorder pt-2 pb-2">
              <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
            </div>
          )}
        </div>
        {compact && (
          <div className="pl-2">
            <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
          </div>
        )}
      </div>
    </form>
  );
}
