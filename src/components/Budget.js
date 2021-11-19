import React,{useState}from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import ls from 'localstorage-slim'
import './add.css'
export default function Budget() {
    const [budget,setbudget]=useState(0)
    const [title,setTitle]=useState(0)
    const [amount,setamount]=useState(0)
    let balance = useState(ls.get('balance', {decrypt: true}));

    const add=()=>{
        let check = ls.get('budget', {decrypt: true});
        if(check !== null){
            alert("Budget already fixed");

        }
        else{
            ls.set('budget', budget, {encrypt: true});
            alert("Budget fixed successfully")
        }
    }

    const addExpense=()=>{        
        let expense = ls.get('expense', {decrypt: true});
        console.log(expense);
        if(expense === null){
            expense = [];
        }
        if(balance < amount){
            alert("Your balance is low");
        }
        else{
        let addData = {expense_title: title, amount: amount};
        expense.push(addData);
        ls.set('expense', expense, {encrypt: true});
        alert("Expenses added successfully")
    }
}
    
   
    return (
       <Container className="mt-5"  fluid> 
           <h2 style={{marginRight:50}}>Budget App</h2>
        <Form className="mt-3 c p-3">
            <Form.Group className="mb-3">
                <Form.Label style={{marginRight:210}} >Please enter budegt Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter Amount" onChange={(e)=>{setbudget(e.target.value)}} />
                {budget.length<3?<span style={{color:"red"}}>please enter valid buget</span>:''}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={add}>
                    Add Amount
                </Button>
            </Form>
            <Container className="mt-5" >
            <Form className="mt-3 c p-3">
            <Form.Group className="mb-3">
                <Form.Label style={{marginRight:180}} >Please enter budegt Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" onChange={(e)=>{setTitle(e.target.value)}} />
                {title.length<3 ?<span style={{color:"red"}}>please enter valid title</span>:''}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label  style={{marginRight:150}}>Please enter budegt Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter Amount" onChange={(e)=>{setamount(e.target.value)}} />
                {amount.length<2?<span style={{color:"red"}}>please enter valid amount</span>:''}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addExpense}>
                    Add Expenses
                </Button>
            </Form>
            </Container>
           
       </Container>
    )
}
