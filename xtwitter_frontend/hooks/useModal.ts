import { useState, useCallback } from "react";

interface SignupModalHookReturn {
  isSignupModalOpen: boolean;
  openSignupModal: () => void;
  closeSignupModal: () => void;
}

interface LoginModalHookReturn {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useSignupModal = (): SignupModalHookReturn => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  const openSignupModal = useCallback(() => {
    setIsSignupModalOpen(true);
  }, []);

  const closeSignupModal = useCallback(() => {
    setIsSignupModalOpen(false);
  }, []);

  return { isSignupModalOpen, openSignupModal, closeSignupModal };
};

export const useLoginModal = (): LoginModalHookReturn => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  return { isLoginModalOpen, openLoginModal, closeLoginModal };
};
