import {useState} from "react";
import { Form, Input, Button, Checkbox , message} from 'antd';
import { UserOutlined, LockOutlined , GoogleOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
import { getAuth , GoogleAuthProvider , signInWithPopup, signInWithEmailAndPassword  } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

import {showModalLogSign , hideModalLogSign, userLoginEmail} from '../../../redux/reducer'
import app from '../../Firebase/firebase'

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const { Title } = Typography;

const Modal_Tabs_logiin = () => {

    const [form] = Form.useForm();
    const state = useSelector((state) => state.ecommerce);
    const dispatch = useDispatch();

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const onFinish = (values) => {
        handleLoginEmailPassWord();
    };

    const handleLoginEmailPassWord = () => {
        // const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                message.success("Đăng nhập thành công !");
                localStorage.setItem("tk" , email);
                localStorage.setItem("mk" , password);
                dispatch(userLoginEmail({avatar : user.photoURL , email : user.email}));
                setEmail('');
                setPassword('');
                form.resetFields();
                dispatch(hideModalLogSign());
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                message.error(errorMessage);
            });
    };

    const handleLoginGoogle = () => {
        // const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                console.log(user , token)
                message.success("Đăng nhập thành công !");
                dispatch(userLoginEmail({avatar : user.photoURL , email : user.email}));
                // ...
                dispatch(hideModalLogSign());
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            message.error(errorMessage);
        });
    };

    return (
        <Form form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Input Email"
                value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Input Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {/*<a className="login-form-forgot" href="">*/}
                {/*    Forgot password*/}
                {/*</a>*/}
            </Form.Item>

            <Form.Item  >
                <Button type="primary" htmlType="submit" block >
                    Log in
                </Button>

                <Button type={'text'} block >Or</Button>

                <Button icon={<GoogleOutlined />} block type={"ghost"} onClick={()=> handleLoginGoogle()} >Google</Button>
            </Form.Item>
        </Form>
    );
};

export default Modal_Tabs_logiin;
