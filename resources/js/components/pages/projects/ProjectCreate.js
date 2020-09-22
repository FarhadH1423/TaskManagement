import Axios from 'axios';
import React from 'react';
import {Card, Button, Badge, Spinner, Form} from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import {  storeNewProject } from '../../../services/ProjectService';

class ProjectCreate extends React.Component {
    state = { 
        
        isLoading : false,
        name: '',
        description: '',
        errors: {},
     };

     componentDidMount() {}

     chnageInput =(e) => {
         this.setState({
             [e.target.name]: e.target.value,
         });
             
    };

    submitForm = async (e) => {
        e.preventDefault();
        const{history} = this.props;
       

        this.setState({isLoading: true})
        const postBody ={
            name: this.state.name,
            description: this.state.description,
            
        };
       const response = await storeNewProject(postBody);
        if(response.success){
            this.setState({
                name: "",
                description:"",
                isLoading :false,
            });
            history.push(`${PUBLIC_URL}projects`);
        } else{
            this.setState({
                errors: response.errors,
                isLoading :false,
            });
           
        }
    };

    render() { 
        return ( <>
            <div className="header-part">

                <div className="float-left">  
                <h2>New Project</h2>  
                </div>

                <div className="float-right">
                    
                        <Link to={`${PUBLIC_URL}projects`} className="btn btn-info">See All Projects</Link>
                    
                </div>
                <div className="clearfix"></div>
            </div>
            <hr/>
         

                    
           <Card>
               <Card.Body>
               <Form onSubmit={this.submitForm}>    

                      

                    <Form.Group controlId="name">
                        <Form.Label>Project Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Project Title"
                        value={this.state.name}
                        name="name"
                        onChange={(e) => this.chnageInput(e)}  
                        />     
                           
                    </Form.Group>

                            {this.state.errors &&
                               this.state.errors.name && (
                              <p className="text-danger">{this.state.errors.name[0]}</p> 
                               )}

                    <Form.Group controlId="description">
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter Project Description"
                        as="textarea"
                        rows="5"
                        value={this.state.description}
                        name="description"
                        onChange={(e) => this.chnageInput(e)} 
                        
                        />
                    </Form.Group>

                            {this.state.errors &&
                               this.state.errors.description && (
                              <p className="text-danger">{this.state.errors.description[0]}</p> 
                            )}

                   {
                       this.state.isLoading && (
                        <Button variant="primary" type="button" disabled>
                        <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                        Saving...
                        </Button>
                       )
                   }

                   {
                       !this.state.isLoading && (
                        <Button variant="primary" type="submit" >
                        Save Project
                        </Button>
                       )
                   }

                   
                    </Form>

               </Card.Body>
           </Card>

               
            </> );
    }
}
 
export default withRouter(ProjectCreate);

