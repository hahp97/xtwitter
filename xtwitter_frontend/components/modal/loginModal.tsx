import { useCallback, useState } from "react";

import CommonInput from "../input";
import Modal from ".";
import { Controller, set, useForm } from "react-hook-form";
import { LoginModel } from "@/types/auth";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useLoginModal, useSignupModal } from "@/hooks/useModal";
import { loginMutation } from "@/apis/auth";
import Cookies from "universal-cookie";
import { Router } from "next/router";
import { notify } from "@/utils/toast";

import CommonButton from "../button";

const resolver = classValidatorResolver(LoginModel);

type LoginModalProps = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>({
    values: {
      email: "",
      password: "",
    },
    resolver,
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await loginMutation(data);

    if (res) {
      const cookies = new Cookies();
      cookies.set("token", res.token, { path: "/" });
      notify.success("Login successful");
      onClose();
    } else {
      notify.error("Login failed");
    }
  });

  const footerContent = (
    <div className="flex flex-row justify-between">
      <button
        onClick={() => {
          onClose();
        }}
        className="text-blue-500"
      >
        Sign up
      </button>
      <button
        onClick={() => {
          onClose();
        }}
        className="text-blue-500"
      >
        Forgot password?
      </button>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Login"
      actionLabel="Sign in"
      onClose={onClose}
      onSubmit={onSubmit}
      footer={footerContent}
    >
      <div className="flex flex-col gap-4">
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="email"
              value={value}
              onChange={onChange}
              placeholder="email"
              className="focus-visible:ring-none my-2 rounded-full border-gray-200 py-6 text-base "
              errors={errors}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="password"
              type="password"
              value={value}
              onChange={onChange}
              placeholder="Password"
              className="focus-visible:ring-none my-2 rounded-full border-gray-200 py-6 text-base"
              errors={errors}
            />
          )}
        />

        <CommonButton label={"Login "} onClick={onSubmit} />
      </div>
    </Modal>
  );
};

export default LoginModal;
