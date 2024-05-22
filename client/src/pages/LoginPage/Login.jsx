import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import '../style.scss'
import {Outlet, Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { API_LOGIN } from '../../urls';


export default function Login() {
    const validationSchemaLogin = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const navigate = useNavigate();
    const send = async (values) => {
        const postData = {
            values
        }

        await axios.post(API_LOGIN, postData)
            .then(response => {
                if (response.data.check) {
                    if (response.data.token) {
                        const t = response.data.token
                        navigate(`/secure/user/list/?${t}`,{state:{token:t}})
                    }
                } else {
                    alert(response.data.message);
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (<>

            <div className='SignInForm'>
                <h2 className={'title'}>Login Form</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    onSubmit={(values) => {
                        send(values).then()
                    }}
                    validationSchema={validationSchemaLogin}
                >
                    <Form>
                        <div className={'input-element'}>
                            <label htmlFor="username">Username</label>
                            <Field type="text" id="username" name="username"/>
                            <ErrorMessage name="username" component="div" className={"error"}/>
                        </div>
                        <div className={'input-element'}>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password"/>
                            <ErrorMessage name="password" component="div" className={"error"}/>
                        </div>
                        <button type="submit">Log In</button>
                        <nav>
                            <ul>
                                <li>
                                    Press <Link to="/registration">here</Link> to create account...
                                </li>
                            </ul>
                        </nav>
                    </Form>
                </Formik>
            </div>
            <Outlet/>
        </>
    )
}