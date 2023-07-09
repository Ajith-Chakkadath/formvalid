import './App.css'
import { Button,Form,Row,Col,Card } from 'react-bootstrap';
import { useState } from 'react';

function App(){
  return (
    <div className='App'>
      <Row style={{justifyContent:'center'}}>
        <Col xs={8} className='mt-5'>
          <Card className="p-4">
            <h1 className='mb-4'>Sign up</h1>
            <RegistartionForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;

function RegistartionForm(){

  const {values,handelInput ,reset,formValid,errors} = useForm();

  const submitForm = (event) =>{
    event.preventDefault()
    if(formValid()){
      alert("form submitted")
    }
  }
  return (
    <Form onSubmit={submitForm}> 
      <Inputfiels 
      label = "Full name"
      type ="text"
      name ="fullname"
      placeholder="Enter your full name"
      value={values.fullname}
      onChange={handelInput}
      error ={errors.fullname}
      />
       <Inputfiels 
      label = "Email Address"
      type ="email"
      name ="email"
      placeholder="uer@example.com"
      value={values.email}
      onChange={handelInput}
      error ={errors.email}
      />
       <Inputfiels 
      label = "Password"
      type ="password"
      name ="password"
      placeholder="Enter your password"
      value={values.password}
      onChange={handelInput}
      error ={errors.password}
      />
       <Inputfiels 
      label = "Confirm password"
      type ="password"
      name ="confirmpassword"
      placeholder="Repeat your password"
      value={values.confirmpassword}
      onChange={handelInput}
      error ={errors.confirmpassword}
      />
      <div className='mt-3'>
      <Button type='submit' >submit</Button>
      {'  '}
      <Button variant="outline-secondary" onClick={reset}>Reset</Button>
      </div>
     
    </Form>
  )
}

const Inputfiels = ({label,error, ...props})=>{
return  <Form.Group className="mb-3" >
<Form.Label>{label}</Form.Label>
<Form.Control {...props} className ={error ? "is-valid" : ""}/>
{
  error &&
  <div className='text-danger'>{error}</div>
}
</Form.Group>
}

const useForm = () =>{
  const [values ,setValues]= useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: ""
  })
const [errors,setErrors] = useState({})

  const handelInput = (event) =>{
    setValues({
      ...values,
      [event.target.name] :event.target.value
    })
  }
  const reset = () =>{
    setValues({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: ""
    })
  }
const formValid = () =>{
  setErrors({});
  const newError ={}
  if(values.fullname.length < 3){
    newError.fullname = "Too short"
  }
  if (!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
   newError.email ="Not valid email"
  }

if(values.password.length < 8){
  newError.password =" Too short"
}
if(values.confirmpassword !== values.password){
  newError.confirmpassword = "Match not occur"
}
  setErrors(newError)

return Object.keys(newError).length === 0
}

  return [values,handelInput,reset,formValid,errors]
}