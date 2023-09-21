'use client'
import React, { FC, FormEvent, useEffect, useState } from 'react';
import styles from './Login.module.scss';
import Box from '@mui/joy/Box';
import Link from 'next/link';
import Button from '@mui/joy/Button';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import FormHelperText from '@mui/joy/FormHelperText';
import Checkbox from '@mui/joy/Checkbox';
import 'react-toastify/dist/ReactToastify.css';

import Done from '@mui/icons-material/Done';
import { RootState } from '@/domain/store/store';
import { StoreConstants } from '@/domain/store/store.constants';
import { StoreActionAuth } from '@/domain/store/auth/reducer';


import { toast, ToastContainer } from 'react-toastify';

interface LoginProps { }

const Login: FC<LoginProps> = () => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  // const [loading, setLoding] = useState<boolean>(false);

  const runningStage = useSelector((state: RootState) => state.Auth.runningStage);
  const stateError = useSelector((state: RootState) => state.Auth.error);
  const token = useSelector((state: RootState) => state.Auth.token);

  useEffect(() => {
    
    console.log("useEffect stateError 1: ", stateError)
    if (stateError) {

      console.log("useEffect stateError: ", stateError)
      toast.error(stateError);
    }

  }, [stateError])

  useEffect(() => {
    
    // console.log("useEffect stateError 1: ", stateError)
  //  Router.navigate

  }, [token])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // console.log("handleSubmit", formData.email)

    event.preventDefault();
    if (!formData.email) {
      setError({ ...error, email: "Email Field is Required" })
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: "Password Field is required" })
      return;
    }
    
    dispatch(StoreActionAuth.setRunningStage(StoreConstants.runningStage.notRunning))
    dispatch(StoreActionAuth.login(formData))
    console.log("StoreActionAuth: ")
    // setLoding(true);
    // const res = await login_me(formData);
    // if (res.success) {
    //   setLoding(false);
    //   Cookies.set('token', res?.finalData?.token);
    //   localStorage.setItem('user', JSON.stringify(res?.finalData?.user));
    //   const userData = localStorage.getItem('user');
    //   const userDataString = typeof userData === 'string' ? userData : '';
    //   dispatch(setUserData(JSON.parse(userDataString)));
    //   if (res?.finalData?.user?.role === 'admin') {
    //     Router.push('/Dashboard')
    //   }
    //   else {
    //     Router.push('/')
    //   }
    // }
    // else {
    //   setLoding(false);
    //   toast.error(res.message);
    // }
  }


  return (
    <div className={styles.Login}>
      <ToastContainer />
      <Box className="td-py-6 td-px-6 td-bg-white td-rounded-2xl td-shadow-xl" sx={{
        display: "flex",
        flexDirection: "column",

        // gap: 2
      }}>

        <h1 className="td-text-xl td-text-center td-font-bold td-leading-tight td-tracking-tight td-text-gray-900 md:text-2xl ">
          Sign in to your account
        </h1>

        <Box sx={{ p: { xs: 1, sm: 2, md: 2 } }} ></Box>
        {/* action="#" */}
        <form onSubmit={handleSubmit} className="td-space-y-4 md:td-space-y-6" >
          <FormControl required >
            <FormLabel id="email-label">Email</FormLabel>
            <Input key={"in-1"} id='email-input' placeholder="type email " name="email" type='email' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            {/* <FormHelperText >This is a helper text.</FormHelperText> */}
            {error.email && <FormHelperText className="td-red-500">{error.email}</FormHelperText>}
          </FormControl>

          <FormControl required key={13}>
            <FormLabel id="password-label">Password</FormLabel>
            <Input key={"in-2"} id='password-input' placeholder="••••••••" name="password" type='password' onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            {error.password && <FormHelperText className="td-red-500">{error.password}</FormHelperText>}
          </FormControl>

          <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}>

            <Box sx={{
              flex: "1 1 0%"
            }}>

              {/* <Checkbox
              name="persistent"
                uncheckedIcon={<Done />}
                label="Remember Me"
                slotProps={{
                  root: ({ checked, focusVisible }) => ({
                    sx: !checked
                      ? {
                        '& svg': { opacity: focusVisible ? 1 : 0 },
                        '&:hover svg': {
                          opacity: 1,
                        },
                      }
                      : undefined,
                  }),
                }}
              /> */}
            </Box>

            <Link href="/auth/reset" className="td-font-medium td-text-orange-600 hover:td-underline ">Forgot password?</Link>



          </Box>

          {/* <div className='td-text-left'>
            <label htmlFor="email" className="block td-mb-2 td-text-sm td-font-medium td-text-gray-900 ">Your email</label>
            <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" name="email" id="email" className="bg-gray-50  border border-gray-300 td-text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 " placeholder="name@company.com" />
            {
              error.email && <p className="td-text-sm text-red-500">{error.email}</p>
            }
          </div> */}
          {/* <div className='td-text-left'>
            <label htmlFor="password" className="block td-mb-2 td-text-sm td-font-medium td-text-gray-900 ">Password</label>
            <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 td-text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5" />
            {
              error.password && <p className="td-text-sm text-red-500">{error.password}</p>
            }
          </div> */}

          {
            <Button loading={runningStage == StoreConstants.runningStage.running} type="submit" className="td-w-full">Sign in</Button>
          }

          <p className="td-text-sm  td-text-center text-black ">
            Don’t have an account yet? <Link href={"/auth/register"} className="td-font-medium td-text-orange-600 hover:td-underline ">Sign up</Link>
          </p>
        </form>



      </Box>
    </div>
  );
}

export default Login;
