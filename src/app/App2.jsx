import { useState } from "react";
import InputBox from "../components/shared/inputs/InputBox";
import Button from "../components/ui/buttons/Button";
import checkValidity from "../utils/checkValidity";

const init = {
    title: '',
    bio: '',
    skills: '',
}

const initFocus = {
    title: false,
    bio: false,
    skills: false,
}

const App = () => {
    const [values, setValues] = useState({...init});
    const [errors, setErrors] = useState({...init});
    const [focuses, setFocuses] = useState({...initFocus});

    const handleChange = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));

        const key = event.target.name;
        const {errors} = checkValidity(values);

        if(!errors[key]) {
            setErrors(prev => ({
                ...prev,
                [key]: ''
            }));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const {errors, isValid} = checkValidity(values);

        if(!isValid) {
            setErrors({...errors});
            console.log(errors);
            return 
        }
        console.log(values);
        setErrors({...init});
        setFocuses({...initFocus})
        setValues({...init});
    }

    const handleFocus = (event) => {
        setFocuses(prev => ({
            ...prev,
            [event.target.name]: true,
        }))
    }

    const handleBlur = (event) => {
        const key = event.target.name;
        const {errors} = checkValidity(values);

        if(errors[key] && focuses[key]) {
            setErrors(prev => ({
                ...prev,
                [key]: errors[key],
            }))
            return
        }
        setErrors(prev => ({
            ...prev,
            [key]: ''
        }));
    }

  return (
    <div className="root">
        <form onSubmit={handleSubmit}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <InputBox 
                    label={'Title: '}
                    type={'text'}
                    name={'title'}
                    value={values.title}
                    placeholder={'Full-stack developer'}
                    onChange={handleChange}
                    error={errors.title}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <InputBox 
                    label={'Bio: '}
                    type={'text'}
                    name={'bio'}
                    value={values.bio}
                    placeholder={'I am a ...'}
                    onChange={handleChange}
                    error={errors.bio}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <InputBox 
                    label={'Skills: '}
                    type={'text'}
                    name={'skills'}
                    value={values.skills}
                    placeholder={'Javascript, python'}
                    onChange={handleChange}
                    error={errors.skills}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <br />
            <Button type="submit">Submit</Button>
        </form>
    </div>
  )
}

export default App;