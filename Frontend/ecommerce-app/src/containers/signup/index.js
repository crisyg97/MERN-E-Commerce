import React from 'react'
import Layout from '../../components/Layouts'
import Input from '../../components/UI/Input'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

export default function signup(props) {
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        
                        <Form>
                            <Row>
                                <Col md={4} >
                                    <Input
                                        label="FirstName"
                                        type="firstName"
                                        placeholder="Enter FirstName"
                                        value=""
                                        onChange=""
                                    />
                                </Col>
                                <Col md={4} >
                                    <Input
                                        label="LastName"
                                        type="lastName"
                                        placeholder="Enter LastName"
                                        value=""
                                        onChange=""
                                    />
                                </Col>
                                <Col md={4} >
                                    <Input
                                        label="Username"
                                        type="username"
                                        placeholder="Enter Username"
                                        value=""
                                        onChange=""
                                    />
                                </Col>
                            </Row>
                        </Form>

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
                                errorMessage=""
                                value=""
                                onChange=""
                            />
                            <Button variant="primary" type="submit">
                                Signup
                            </Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
        </Layout>
                )
}
