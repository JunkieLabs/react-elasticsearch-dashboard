import React, { FC, FormEvent, useState } from 'react';
import styles from './Reset.module.scss';
import Done from '@mui/icons-material/Done';
import { Box, FormControl, FormLabel, Input, FormHelperText, Checkbox, Button } from '@mui/joy';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { toast, ToastContainer } from 'react-toastify';

interface ResetProps { }

const Reset: FC<ResetProps> = () => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoding] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {


    console.log("handleSubmit", formData.email)

    event.preventDefault();
    if (!formData.email) {
      setError({ ...error, email: "Email Field is Required" })
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: "Password Field is required" })
      return;
    }

    if (!formData.confirmPassword) {
      setError({ ...error, confirmPassword: "Confirm Password Field is required" })
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password does not match");
    }


    setLoding(true);
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
    <div className={styles.Reset}>
      <Box className="td-py-6 td-px-6 td-bg-white td-rounded-2xl td-shadow-xl" sx={{
        display: "flex",
        flexDirection: "column",

        // gap: 2
      }}>

        <h1 className="td-text-xl td-text-center td-font-bold td-leading-tight td-tracking-tight td-text-gray-900 md:text-2xl ">
          Change Password
        </h1>

        <Box sx={{ p: { xs: 1, sm: 2, md: 2 } }} ></Box>
        <form onSubmit={handleSubmit} className="td-space-y-4 md:td-space-y-6" action="#">
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input placeholder="type email " name="email" type='email' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            {/* <FormHelperText >This is a helper text.</FormHelperText> */}
            {error.email && <FormHelperText className="td-red-500">{error.email}</FormHelperText>}
          </FormControl>

          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input placeholder="••••••••" name="password" type='password' onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            {error.password && <FormHelperText className="td-red-500">{error.password}</FormHelperText>}
          </FormControl>

          <FormControl required>
            <FormLabel>Confirm Password</FormLabel>
            <Input placeholder="••••••••" name="password" type='password' onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            {error.password && <FormHelperText className="td-red-500">{error.password}</FormHelperText>}
          </FormControl>


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
            <Button loading={loading} type="submit" className="td-w-full">Reset</Button>
          }

         
        </form>



      </Box>
    </div>
  );
}

export default Reset;
