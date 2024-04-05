import type { Post } from '@/types/post';
import Link from 'next/link';

const PostContent = ({ ...post }: Post) => {
  const { _id, content, userName } = post;
  return (
    <div>
      <div className="flex w-full">
        {/* TODO: check image */}
        {/* <div>
          {!!userName?.image && (
            <Link href={'/' + author?.username}>
              <div className="cursor-pointer">
                <Avatar src={author.image} />
              </div>
            </Link>
          )}
        </div> */}
        <div className="pl-2 grow">
          <div>
            <Link href={'/' + userName}>
              <span className="font-bold pr-1 cursor-pointer">{userName}</span>
            </Link>
            <Link href={'/' + userName}>
              <span className="text-twitterLightGray cursor-pointer">@{userName}</span>
            </Link>
            {/* {createdAt && !big && (
              <span className="pl-1 text-twitterLightGray">
                <ReactTimeAgo
                  date={createdAt}
                  timeStyle={'twitter'}
                />
              </span>
            )} */}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Link href={`/${userName}/status/${_id}`}>
          <div>
            {content}
            {/* {showImages()} */}
          </div>
        </Link>
        {/* {createdAt && (
            <div className="text-twitterLightGray text-sm">
              {new Date(createdAt).toISOString().replace('T', ' ').slice(0, 16).split(' ').reverse().join(' ')}
            </div>
          )} */}
        {/* <PostButtons
            username={author?.username}
            id={_id}
            likesCount={likesCount}
            likedByMe={likedByMe}
            commentsCount={commentsCount}
          /> */}
      </div>
    </div>
  );
};

export default PostContent;
