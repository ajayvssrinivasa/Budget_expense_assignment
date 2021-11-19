import React,{useState, useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import ls from 'localstorage-slim';
import budget1 from '../budget1.jpg'
import card from '../card.png'
import dollar from '../dollar.jpg'
export default function Expense() {
    let [budget, setBudget] = useState(0);
    let [expense, setExpense] = useState(0);
        useEffect(()=>{

        let bgd = ls.get('budget', {decrypt: true});
        if(bgd!== null){
        setBudget(bgd);
        }        
        let exp = ls.get('expense', {decrypt:true});
        
        let arr = exp.map(ex=> parseInt(ex.amount));
        function reducer(total, sum){
            return total + sum    
    }
    setExpense(arr.reduce(reducer))
   ls.set('balance', budget - expense, {encrypt:true});
    },[])
    const balance = budget - expense;
    ls.set('balance', balance, {encrypt:true});
    return (
        <Container className="mt-3">
            <Row>
                <Col sm={4}>
                    <h5>Budget</h5>
                    <img src={budget1} alt="budget" width="200" height="200"/>
                <h5>${budget}</h5>
                    </Col>
                    <Col sm={4}>
                        <h5>Expense:</h5>
                    <img src={card} alt="budget" width="200" height="200"/>
                    <h5>${expense}</h5>
                    </Col>
                    <Col sm={4}>
                        <h5>Balance</h5>
                    <img src={dollar} alt="budget" width="200" height="200"/>
                    <h5> ${budget - expense}</h5>
                    </Col>
           
            </Row>
            </Container>
    )
}
