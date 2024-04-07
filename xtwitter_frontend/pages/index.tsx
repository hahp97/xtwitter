import Header from "@/components/layout/header";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import LoginModal from "@/components/modal/loginModal";
import Form from "@/components/form";

export default function Home() {
  const cookies = new Cookies();
  const [openLoginModal, setOpenLoginModaal] = useState(false);

  useEffect(() => {
    if (!cookies.get("token")) {
      setOpenLoginModaal(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Header label={"Home"} />
      <Form placeholder="What's happening?" />

      {openLoginModal && (
        <LoginModal
          onClose={() => {
            setOpenLoginModaal(false);
          }}
        />
      )}
    </>
  );
}
