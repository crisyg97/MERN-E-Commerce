import React from 'react';
import Header from '../Header'
import {Container } from 'react-bootstrap'

const Layout = (props) => {
    return(
        <div>
            <Header />
            <Container>
                {props.children}
            </Container>
            
        </div>
    )
}

export default Layout;
