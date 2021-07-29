import React from 'react'
import {Jumbotron } from 'react-bootstrap'
import Layout from '../../components/Layouts'

 const home = (props) => {
    return (
        <div>
            <Layout>
                <Jumbotron style={{margin: '5rem', background: 'lightblue'}} className='text-center' >
                    <h1>E-commerce</h1>
                </Jumbotron>
            </Layout>
        </div>
    )
}

export default home
