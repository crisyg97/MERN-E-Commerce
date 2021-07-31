import React from 'react'
import Layout from '../../components/Layouts'
import Input from '../../components/UI/Input'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

export default function signin(props) {
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={{span: 6, offset:3 }}>
                        <Form>
                            <Input 
                                label="Email adress"
                                type="email"
                                placeholder="Enter email"
                                value=""
                                onChange=""
                            />
                            <Input 
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value=""
                                onChange=""
                            />
                            <Button variant="primary" type="submit">
                                Signin
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>

    )
}
