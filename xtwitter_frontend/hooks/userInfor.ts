import { getProfile } from '@/apis/auth';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Cookies from 'universal-cookie';

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState<{ username: string; email: string } | undefined>();
  const [status, setStatus] = useState('loading');

  const cookies = new Cookies();

  const token = cookies.get('token');

  const { data, isLoading } = useSWR('profile', () => getProfile(token));

  useEffect(() => {
    if (!isLoading) {
      setUserInfo(data);
      setStatus('authenticated');
    }
  }, [data, isLoading]);

  return { userInfo, setUserInfo, status };
}
