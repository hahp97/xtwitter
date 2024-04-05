import Image from 'next/image';
import { Inter } from 'next/font/google';
import Container from '@/components/layout/container';
import PageLogin from './auth/login';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactNode } from 'react';
import Head from 'next/head';
import CoreDashboard from '@/components/layout/dashboard';
import useSWR from 'swr';
import { getPost } from '@/apis/post';
import type { Post } from '@/types/post';
import PostContent from '@/components/post/postContent';
import LayoutPost from '@/components/layout/layoutPost';

const Home = () => {
  const cookies = new Cookies();

  const router = useRouter();
  const tokenize = cookies.get('token'); // TODO: check naming

  const { data, isLoading } = useSWR('/posts', getPost);

  useEffect(() => {
    if (tokenize) {
      router.replace('/');
    } else {
      router.replace('/auth/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <CoreDashboard>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Image
              src="/loading.gif"
              alt="loading"
              width={50}
              height={50}
            />
          </div>
        ) : (
          <div className="flex flex-row flex-1">
            <LayoutPost>
              <h1 className="text-xl font-bold">Home</h1>
              <div className="mt-5">
                {data?.map((post: Post) => (
                  <div
                    className="border-t border-twitterBorder p-5"
                    key={post._id}
                  >
                    <PostContent {...post} />
                  </div>
                ))}
              </div>
            </LayoutPost>
            <div className="flex items-center justify-center w-1/3">
              <button className="bg-blue-600 px-5 py-2 rounded-lg">ADS</button>
            </div>
          </div>
        )}
      </CoreDashboard>
    </>
  );
};

export default Home;
