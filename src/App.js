import {useFormik} from 'formik'
import './App.css';
import * as yup from 'yup'

function App() {

  const initialValues = {
    username:'',
    password:'',
    email:'',
  }

  const onSubmit = (values,{resetForm}) => {
    console.log('Form data ',values)
    alert(`The form data for ${values.username} with ${values.email} is valid`)
    resetForm()
    }

    const passwordRules = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;// Aceasta este regular expression (Regex) pentru o parola cu un numar, un lowercase caracter, uppercase caracter si minim 4 caractere

  const validationSchema=yup.object().shape({ //Am declarat validation schema ca un obiect folosit pentru validare. Functia shape este folosita pentru a ne permite sa mentionam criteriile de validare
  username: yup.string().min(3).required('Required'),
  email: yup.string().email('Please enter a valid E-mail').required('Required'),
  password: yup.string().min(4).matches(passwordRules,{'message':'Please create a stronger password'}).required('Required'),
  })
  
  
  const formik = useFormik({
  initialValues,
  onSubmit,
  validationSchema,
  })

  console.log('The form data erros are ',formik.touched) // In obiectul/proprietatea touched retin daca campurile formularului au fost vizitate sau nu 
/* EX : touched = {
  username : true,
  password: false,
} Conculzie: Campul username al formularului a fost vizitat de utilizator iar campul password nu a fost 
*/
  return (
    <div className="Main-div">
      <div className='Form-BG'>
        <h1>Formular Rares</h1>
        <form onSubmit={formik.handleSubmit}>
          <label>Username</label>
          
          <input
          type='text'
          id='username'
          name='username'
          value={formik.values.username}
          onChange={formik.handleChange}
          minlength='3'
          required
          onBlur={formik.handleBlur}
          />
        {formik.errors.username &&formik.touched.username  ?
        <p style={{color:'red',fontWeight:'medium',position:'absolute',top:'42px',fontSize:'13px',textWrap:'nowrap'}}>{formik.errors.username}</p>
        :null}        
 
          <label>Password</label>
        <input
        type ='password'
        id='password'
        name='password'
        minlength='4'
        value={formik.values.password}
        onChange={formik.handleChange}
        required
        onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password  ?
        <p style={{color:'red',fontWeight:'medium',position:'absolute',top:'122px',fontSize:'13px',textWrap:'nowrap'}}>{formik.errors.password}</p>
        :null}        
 
        
        <label>Email</label>
        <input
        type='email'
        id='email'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        required
        onBlur={formik.handleBlur}
        />
        
        {formik.errors.email && formik.touched.email  ?
        <p style={{color:'red',fontWeight:'medium',position:'absolute',top:'210px',fontSize:'13px'}}>{formik.errors.email}</p>
        :null}        
 

        <button type='submit'>Submit</button>
        </form>
        
      </div>
    </div>
  );
}

export default App;
