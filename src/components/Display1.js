import React,{useState, useEffect} from 'react'
import { Container, Table, Button,Form } from 'react-bootstrap';
import ls from 'localstorage-slim';

export default function Display1() {
    let [expense, setExpense] = useState([]);
    let [balance, setBalance] = useState(0)


    useEffect(()=>{
        let exp = ls.get('expense', {decrypt: true});
        setExpense(exp);
        setBalance(parseInt(ls.get('balance', {decrypt:true})));

        console.log(expense);
    },[]);

    const update=(index)=>{

        const amt = parseInt(prompt("Update an amount"));
        if(balance < amt){
            alert("Your balance is low");
        }
        else{
        let exp = expense;
        exp[index].amount = amt;
        setExpense(exp);
        ls.set('expense', expense, {encrypt: true});
        alert("Amount updated successfully");
    }};

    const delete1=(index)=>{
        let exp = expense;
        exp.splice(index, 1)
        setExpense(exp);
        ls.set('expense', expense, {encrypt: true});
        alert("Expense deleted successfully");
    }

    return (
        <Container fluid>
            {expense!==null && <Table striped bordered hover  style={{marginLeft:50,marginTop:100}}>
  <thead>
    <tr>
      <th>Expense title</th>
      <th>Expense amount</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
   {expense.map((exp, ind)=>
    <tr key={ind}>
    <td style={{color:"red"}}>{exp.expense_title}</td>
    <td style={{color:"red"}}>${exp.amount}</td>
    <td><Form><Button variant="info" type="submit" onClick={()=>{update(ind)}}><i  className="fa fa-pencil"></i></Button>&nbsp;
    <Button variant="danger" type="submit" onClick={()=>{delete1(ind)}}><i className="fa fa-trash"></i></Button></Form></td>
  </tr>
   )}
    
  </tbody>
</Table>}
        </Container>
    )
}
