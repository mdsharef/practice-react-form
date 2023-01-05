import InputBox from "../components/shared/inputs/InputBox";
import Task from "../components/tasks/Task";
import Button from "../components/ui/buttons/Button";
import useForm from "../hooks/useForm";
import checkValidity from "../utils/checkValidity";

const init = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}



const App = () => {
    const { 
        formState: state, 
        handleChange, 
        handleFocus, 
        handleBlur, 
        handleSubmit,
        clear
    } = useForm({ init, validate: checkValidity })

    const submitCB = ({ values, errors, hasError }) => {
        if(hasError) {
            alert(JSON.stringify(errors));
        } else {
            alert(JSON.stringify(values));
        }
    }

  return (
    <div>
        <h1>Registration Form</h1>
        <form onSubmit={(event) => handleSubmit(event, submitCB)}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <InputBox 
                    label={'First Name: '}
                    type={'text'}
                    name={'firstName'}
                    value={state.firstName.value}
                    placeholder={'Md Muaz'}
                    onChange={handleChange}
                    error={state.firstName.error}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <InputBox 
                    label={'Last Name: '}
                    type={'text'}
                    name={'lastName'}
                    value={state.lastName.value}
                    placeholder={'Ahmed'}
                    onChange={handleChange}
                    error={state.lastName.error}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <InputBox 
                    label={'Email: '}
                    type={'email'}
                    name={'email'}
                    value={state.email.value}
                    placeholder={'muaz@example.com'}
                    onChange={handleChange}
                    error={state.email.error}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <InputBox 
                    label={'Password: '}
                    type={'password'}
                    name={'password'}
                    value={state.password.value}
                    placeholder={'******'}
                    onChange={handleChange}
                    error={state.password.error}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <br />
            <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '1rem'}}>
                <Button type="reset" onClick={clear}>Clear</Button>
                <Button type="submit">Submit</Button>
            </div>
        </form>
        <hr />
        <br />
        <Task />
    </div>
  )
}

export default App;