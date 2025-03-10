import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  
  const [currentstate, setcurrentstate] = useState('Login')

  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')


  const { token, settoken, navigate, backendurl } = useContext(ShopContext)

  const onsubmithandle = async (e) => {

    e.preventDefault();

    try {

      if (currentstate == 'Sign Up') {

        const res = await axios.post(backendurl + '/api/user/register', { name, email, password })

        if (res.data.success) {
          settoken(res.data.token)
          localStorage.setItem('token', res.data.token)
          toast.success("Sign-Up Success ||")
        }
        else {
          toast.error(res.data.message)
        }

      }

      else {

        const res = await axios.post(backendurl + '/api/user/login', { email, password })

        if (res.data.success) {
          settoken(res.data.token)
          localStorage.setItem('token', res.data.token)
          toast.success("Log-In Success ||")
        }
        else {
          toast.error(res.data.message)
        }

      }



    } catch (error) {

      console.log(error);

      toast.error(error.message)

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [])

  return (
    <div>
      <form onSubmit={onsubmithandle} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentstate}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        {currentstate === 'Login' ? '' : <input onChange={(e) => setname(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
        <input onChange={(e) => setemail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
        <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password ?</p>
          {
            currentstate === 'Login'
              ? <p onClick={() => setcurrentstate('Sign Up')} className='cursor-pointer'>Create account</p>
              : <p onClick={() => setcurrentstate('Login')} className='cursor-pointer'>Login Here</p>
          }
        </div>

        <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentstate === 'Login' ? 'Sign In' : 'Sign Up'}</button>

      </form>
    </div>
  )
}

export default Login