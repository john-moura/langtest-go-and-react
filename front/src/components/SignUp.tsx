'use client';

import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import GoogleButton from './GoogleButton';
import FBButton from './FBButton';
import { FiXCircle } from "react-icons/fi";
import SignIn from "@/components/SignIn";
import { createUser } from '@/api/auth';
import { useRouter } from 'next/navigation';

const SignUp = NiceModal.create(() => {
  
  const modal = useModal();
  const router = useRouter();

  interface SignUpFormValues {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  const onFinish = async (values: SignUpFormValues) => {
  try {
    await createUser({
      Email: values.email,
      FirstName: values.firstName,
      LastName: values.lastName,
      Password: values.password,
    });
    message.success('Account created successfully!');
    NiceModal.hide(SignUp);
    NiceModal.hide(SignIn);
    router.push('/dashboard');

  } catch (err: unknown) {
    const error = err as Error;
    message.error(error.message);
  }

};
  
  const openSignIn = () => {
    NiceModal.hide(SignUp);
    NiceModal.show(SignIn);
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
          
          <DialogTitle className="text-lg font-bold">Create an account - It's free</DialogTitle>
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
              name="firstName"
              rules={[{ required: true, message: 'Name required' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="First name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Name required' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last name" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Password required' }]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            
            <Form.Item
              name="confirm"
              dependencies={['Password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} type="password" placeholder="Confirm password"/>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" className="h-10 flex-auto">
                Create account
              </Button>
            </Form.Item>

            <Form.Item>
              <a href="terms-and-conditions">By creating an account I accept the Terms and Conditions</a>
            </Form.Item>

            <Form.Item>
              <GoogleButton />
            </Form.Item>

            <Form.Item>
              <FBButton />
            </Form.Item>

            <Form.Item>
              <a onClick={openSignIn}>I already have an account</a>
            </Form.Item>
          </Form>
        </DialogPanel>
      </Dialog>
    </Transition>
  );
});

export default SignUp;
