'use client';

import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import GoogleButton from './GoogleButton';
import FBButton from './FBButton';
import { FiXCircle } from "react-icons/fi";
import SignUp from "@/components/SignUp";
import { message } from 'antd';
import { login } from '@/api/auth';
import { useRouter } from 'next/navigation';

const SignIn = NiceModal.create(() => {
  
  const modal = useModal();
  
  const router = useRouter();

  interface SignInFormValues {
    email: string;
    password: string;
  }

  const onFinish = async (values: SignInFormValues) => {
    try {
        await login({
          Email: values.email,
          Password: values.password,
        });
        message.success('Welcome');
        NiceModal.hide(SignUp);
        NiceModal.hide(SignIn);
        router.push('/dashboard');
    
      } catch (err: unknown) {
        const error = err as Error;
        message.error(error.message);
      }
  };
  const openSignUp = () => {
    NiceModal.hide(SignIn);
    NiceModal.show(SignUp);
    };

  return (
    <Transition 
        show={modal.visible} 
        as={Fragment}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >

      <Dialog open={modal.visible} onClose={modal.hide} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <DialogPanel className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">

          <div className='grid grid-cols-10 grid-cols-[9fr,1fr]'>
            <div></div>
            <button onClick={modal.hide} className="relative top-0 right-0 text-black rounded">
              <FiXCircle className='size-6'/>
            </button>
          </div>
          
          <DialogTitle className="text-lg font-bold">Sign in</DialogTitle>
            <br></br>
            <Form
              name="signUp"
              initialValues={{ remember: true }}
              className='flex-auto'
              onFinish={onFinish}
            >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Email required' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="email address" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Password required' }]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" className="h-10 flex-auto">
                Sign in
              </Button>
            </Form.Item>

            <Form.Item>
              <GoogleButton />
            </Form.Item>

            <Form.Item>
              <FBButton />
            </Form.Item>

            <Form.Item>
              <a onClick={openSignUp}>I don't have an account</a>
            </Form.Item>
          </Form>
        </DialogPanel>
      </Dialog>
    </Transition>
  );
});

export default SignIn;
