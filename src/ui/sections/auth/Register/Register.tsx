import React, { FC, FormEvent, useState } from 'react';
import styles from './Register.module.scss';
import { useDispatch } from 'react-redux';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Done from '@mui/icons-material/Done';
import { Input, FormHelperText, Checkbox, Button } from '@mui/joy';
import Link from 'next/link';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  
  
  
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoding] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {


    console.log("handleSubmit",formData.email )

    event.preventDefault();
    if (!formData.email) {
      setError({ ...error, email: "Email Field is Required" })
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: "Password Field is required" })
      return;
    }

    setLoding(true);
    
  }
  
  return (
  <div className={styles.Register}>
      <Box className="td-py-6 td-px-6 td-bg-white td-rounded-2xl td-shadow-xl" sx={{
        display: "flex",
        flexDirection: "column",

        // gap: 2
      }}>

        <h1 className="td-text-xl td-text-center td-font-bold td-leading-tight td-tracking-tight td-text-gray-900 md:text-2xl ">
          Sign in to your account
        </h1>
        
        <Box sx={{ p: { xs: 1, sm: 2, md: 2 } }} ></Box>
        <form onSubmit={handleSubmit} className="td-space-y-4 md:td-space-y-6" action="#">
          <FormControl required>
            <FormLabel>Name</FormLabel>
            <Input placeholder="type name " name="name" type='name' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            {/* <FormHelperText >This is a helper text.</FormHelperText> */}
            {/* {error.email && <FormHelperText className="td-red-500">{error.email}</FormHelperText>} */}
           </FormControl>
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

          <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}>

           




          </Box>

          {
            <Button loading={loading} type="submit" className="td-w-full">Sign up</Button>
          }

          <p className="td-text-sm  td-text-center text-black ">
            Already have an account? <Link href={"/auth/login"} className="td-font-medium td-text-orange-600 hover:td-underline ">Sign In</Link>
          </p>
        </form>



      </Box>
  </div>
);
  }

export default Register;
