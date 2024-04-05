import { getProfile } from '@/apis/auth';
import { CiMenuKebab } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import useSWR from 'swr';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ProfileButton = () => {
  const token = cookies.get('token');

  const { data, isLoading, error } = useSWR('profile', () => getProfile(token));

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <button className="flex justify-between items-center py-5 px-4 mb-[5px] leading-[1.2] text-base font-medium hover:font-bold ">
      <div className="flex flex-row space-x-2 items-center">
        <RxAvatar size={'26'} />
        <div className="flex flex-col items-start">
          <text className="text-sm">{data?.email}</text>
          <text className="text-sm">{data?.userName}</text>
        </div>
      </div>
      <CiMenuKebab />
    </button>
  );
};

export default ProfileButton;
