import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import Budget from './Budget';
import Display1 from './Display1';
import Expense from './Expense';

export default function Home() {
    return (
        <Container fluid>
         
  <Container>
  <Row>
  <Col md={5}>
  <Budget/>
  </Col>
  <Col md={7}>
      <Expense/>
<Display1/>
  </Col>
  </Row>
  </Container>
        </Container>
    )
}
