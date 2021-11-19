import React,{useState} from 'react'
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from 'axios';
import SocialButton from './SocialButton';
import imag2 from '../imag2.jpg'
const regforEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Login() {
   
        let [email, setEmail] = useState('');
        let [password,setpassword]=useState('');
        let [error,setError]=useState({
            email:'',
            password:''
        })
        const navigate = useNavigate();

        const handle = (event)=>{
            let{name, value} = event.target;
            switch(name){
                case 'email': setEmail(value);
                setError({...error, email: regforEmail.test(value) ? "": "Email is not valid"});
                break;
                case 'password': setpassword(value);
                setError({...error, password: value.length<8 ? "password is not valid": ""});
                break;
                default:
                    break;
            }
        }
        const handleSocialLogin = (user) => {
            console.log(user);
            setEmail(user._profile.email);
            setpassword(user._profile.password);
          navigate('/home')
          };
          
          const handleSocialLoginFailure = (err) => {
            console.error(err);
           
          };
        const handleSubmit = async() =>{
           
            if(validate(error)){
            const res= await axios.get("http://localhost:3001/Registration")
            let data=res.data;
            if (data.find(x=>x.email === email) && data.find(x=>x.password === password)) {
                let user = [];
                user.push(email);
               localStorage.setItem('users', JSON.stringify(user));
                alert('Login successful');
                navigate("/home");
            } else {
                alert('Incorrect Credntials!');
                }
            }
            else{
                alert("Fill all the fields correctly");
            }
        }

        const validate = (error) =>{
            let valid = true;
            Object.values(error).find(er=>er.length > 1) && (valid = false);
            return valid;
        } 
    return (
        <Container>
            <Row>
                   <Col md={5} >
                <img src={imag2} alt="imag" width="500"height="700"/>
                </Col>
                <Col md={5}>
                <h2 className="p-4 bg-primary"style={{width:700}} >Registration form</h2>
           <Form style={{backgroundColor:"lightskyblue",width:700,height:580 ,textAlign:"justify",paddingLeft:100,paddingTop:100}}>
           <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                    Email
                    </Form.Label>
                    <Col sm="6">
                    <Form.Control type="email" name="email" placeholder="Enter Email" onChange={handle} />
                    {error.email.length > 0 && <Alert variant="danger" className="mt-2">
                    {error.email}
                     </Alert>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                    password
                    </Form.Label>
                    <Col sm="6">
                    <Form.Control type="number" name="password" placeholder="Enter password" onChange={handle}  />
                    {error.password.length > 0 && <Alert variant="danger" className="mt-2">
                    {error.password}
                     </Alert>}
                    </Col>
                </Form.Group>
                <Button onClick={()=>{handleSubmit()}} variant="primary" style={{marginLeft:150}}>Login</Button>
                
                <SocialButton
                        provider="facebook"
                        appId="1050755129046065"
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                        variant="danger"
                     style={{padding:10}}
                        >
                        Login with Facebook
                        </SocialButton>
                        <SocialButton
                        provider="google"
                        appId="1061401315399-d3jlfpd3c4phv7so9a5aqabcen8qp2ge.apps.googleusercontent.com"
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                        variant="primary"
                        style={{padding:10}}
                        >
                        Login with Gmail
                </SocialButton>
                </Form> 
                </Col>
                </Row>
                 </Container>
    )
}
