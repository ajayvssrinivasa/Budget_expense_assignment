import axios from 'axios';
import React,{useState} from 'react'
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import imag1 from '../imag1.jpg'
const regforEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Registration() {
    let [name, setname] = useState('');
    let [lname, setLname] = useState('');
    let [uname, setUname] = useState('');
        let [email, setEmail] = useState('');
        let [password, setpassword] = useState('');
        let [cpassword, setcpassword] = useState('');
        let [error, setError] = useState({
            name:'',
            lname:'',
            email:'',
            password:'',
            uname:'',
            cpassword:''
        });
    
        const navigate = useNavigate();

        const handle = (event)=>{
            let{name, value} = event.target;
            switch(name){
                case 'name': setname(value);
                setError({...error, name: value.length < 4 ? "name must be atleast 4 characters": ""});
                break;
                case 'lname': setLname(value);
                setError({...error, lname: value.length < 2 ? " lastname must be atleast 2 characters": ""});
                break;
                case 'uname': setUname(value);
                setError({...error, uname: value.length < 4 ? "username must be atleast 4 characters": ""});
                break;
                case 'email': setEmail(value);
                setError({...error, email: regforEmail.test(value) ? "": "Email is not valid"});
                break;
                case 'password': setpassword(value);
                setError({...error, password: value.length<8 ? "password is not valid": ""});
                break;
                case 'cpassword': setcpassword(value);
                setError({...error, cpassword: value!==password? "cpassword doesnt match": ""});
                break;
                default:
                    break;
            }
        }

        const handleSubmit = async() =>{
            let postData = {name: name,lname:lname,uname:uname, email: email, password: password};
            if(validate(error)){
                await axios.post("http://localhost:3001/Registration", postData)
                alert("Course registered successfully");
                navigate("/login");
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
        
        <>
        
           <Container  fluid className="mt-2">
               <Row>
                   <Col md={5} >
                <img src={imag1} alt="imag" width="500"height="700"/>
                </Col>
                <Col md={5}>
                <h2 className="p-4 bg-primary"style={{width:700}} >Registration form</h2>
           <Form style={{backgroundColor:"lightskyblue",width:700,height:580 ,textAlign:"justify",paddingLeft:100,paddingTop:100}}>
                <Form.Group as={Row} className="mb-3 pt-4">
                    <Form.Label column sm="3">
                    Name
                    </Form.Label>
                    <Col sm="6">
                    <Form.Control type="text" name="name" placeholder="Enter Name" onChange={handle} />
                    {error.name.length > 0 && <Alert variant="danger" className="mt-2">
                    {error.name}
                    </Alert>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                    Last Name
                    </Form.Label>
                    <Col sm="6">
                    <Form.Control type="text" name="lname" placeholder="Enter  last Name" onChange={handle} />
                    {error.lname.length > 0 && <Alert variant="danger" className="mt-2">
                    {error.lname}
                    </Alert>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                    User Name
                    </Form.Label>
                    <Col sm="6">
                    <Form.Control type="text" name="uname" placeholder="Enter  user Name" onChange={handle} />
                    {error.uname.length > 0 && <Alert variant="danger" className="mt-2">
                    {error.uname}
                    </Alert>}
                    </Col>
                </Form.Group>

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
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                    confirm password
                    </Form.Label>
                    <Col sm="6">
                    <Form.Control type="number" name="cpassword" placeholder="Enter password" onChange={handle}  />
                    {error.cpassword.length > 0 && <Alert variant="danger" className="mt-2">
                    {error.cpassword}
                     </Alert>}
                    </Col>
                </Form.Group>
                <Button onClick={()=>{handleSubmit()}} variant="success" style={{marginLeft:150}}>Register</Button>
                <Button href="/login" variant="success" style={{marginLeft:150}}>Login</Button>
                </Form> 
                </Col>
                </Row>
               </Container> 
        </>
    )
}
