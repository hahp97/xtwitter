import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Avatar from "../avatar";
import CommonButton from "../button";
import useCurrentUser from "@/hooks/useCurrentuser";
import { notify } from "@/utils/toast";
import { Controller, useForm } from "react-hook-form";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const { data: currentUser } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, getValues } = useForm({
    values: {
      content: "",
    },
  });

  const onSubmit = handleSubmit(() => {
    console.log("onSubmit");
  });

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <div>
          <Avatar />
        </div>
        <div className="w-full">
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <textarea
                disabled={isLoading}
                onChange={onChange}
                value={value}
                style={{ resize: "none" }}
                className="
                peer
                mt-3
                w-full 
                resize-none 
                bg-black 
                text-[20px] 
                text-white 
                placeholder-neutral-500 
                outline-none 
                ring-0 
                disabled:opacity-80
              "
                placeholder={placeholder}
              />
            )}
          />
          <hr
            className="
                h-[1px] 
                w-full 
                border-neutral-800 
                opacity-0 
                transition 
                peer-focus:opacity-100"
          />
          <div className="mt-4 flex flex-row justify-end">
            <CommonButton
              disabled={isLoading || !!getValues()}
              onClick={onSubmit}
              label="Tweet"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
