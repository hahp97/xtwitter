import { Controller, useForm, type FieldValues } from 'react-hook-form';
import { LoginModel } from '@/types/auth';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import CommonInput from '@/components/input';
import CommonButton from '@/components/button';
import { loginMutation } from '@/apis/auth';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

const resolver = classValidatorResolver(LoginModel);

const PageLogin = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>({
    values: {
      email: '',
      password: '',
    },
    resolver,
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    console.log(data);
    const res = await mutate('login', loginMutation(data));

    if (res) {
      const cookies = new Cookies();
      cookies.set('token', res.token, { path: '/' });
      router.replace('/dashboard');
    } else {
      console.log('Login failed');
    }
  });

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CommonInput
              name="email"
              value={value}
              onChange={onChange}
              placeholder="Username@gmail.com"
              className="rounded-full border-gray-200 py-6 focus-visible:ring-none text-base my-2 "
              errors={errors}
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
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
              className="rounded-full border-gray-200 py-6 focus-visible:ring-none text-base my-2"
              errors={errors}
            />
          )}
        />
      </div>

      <CommonButton
        label={'Sign Up'}
        onClick={handleSubmitForm}
      />
    </form>
  );
};

export default PageLogin;
