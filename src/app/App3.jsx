import { useState } from "react";
import InputBox from "../components/shared/inputs/InputBox";
import Button from "../components/ui/buttons/Button";
import checkValidity from "../utils/checkValidity";
import { deepClone, mapValueObj } from "../utils/objectFunc";

const init = {
    title: {
        value: '',
        error: '',
        focus: false,
    },
    bio: {
        value: '',
        error: '',
        focus: false,
    },
    skills: {
        value: '',
        error: '',
        focus: false,
    },
}

const App = () => {
    const [state, setState] = useState(deepClone(init));

    const handleFocus = (event) => {
        const {name} = event.target;
        const oldState = deepClone(state);
        oldState[name].focus = true;
        setState(oldState);
    }

    const handleChange = (event) => {
        const {name: key, value} = event.target;
        const oldState = deepClone(state);
        oldState[key].value = value;
        const values = mapValueObj(oldState, (obj, acc, cur) => acc[cur] = obj[cur].value);
        const {errors} = checkValidity(values);

        if(oldState[key].focus && errors[key]) {
            oldState[key].error = errors[key];
        } else {
            oldState[key].error = '';
        }
        setState(oldState);

        // setState((prev)=> ({
        //     ...prev,
        //     [key]: {
        //         ...prev[key],
        //         value: value,
        //     }
        // }));
    }

    const handleBlur = (event) => {
        const {name} = event.target;

        const values = mapValueObj(state, (obj, acc, cur) => acc[cur] = obj[cur].value)
        const {errors} = checkValidity(values);
        const oldState = deepClone(state);

        if(oldState[name].focus && errors[name]) {
            oldState[name].error = errors[name]
        } else {
            oldState[name].error = ''
        }
        setState(oldState);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const values = mapValueObj(state, (obj, acc, cur) => acc[cur] = obj[cur].value);
        const {errors, isValid} = checkValidity(values);

        if(!isValid) {
            const oldState = deepClone(state);
            Object.keys(errors).forEach(key => oldState[key].error = errors[key]);
            setState(oldState);
            console.log(errors);
            return;
        }
        console.log(state);
        console.log(values);
        setState(deepClone(init));
    }

  return (
    <div className="root">
        <form onSubmit={handleSubmit}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <InputBox 
                    label={'Title: '}
                    type={'text'}
                    name={'title'}
                    value={state.title.value}
                    placeholder={'Full-stack developer'}
                    onChange={handleChange}
                    error={state.title.error}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <InputBox 
                    label={'Bio: '}
                    type={'text'}
                    name={'bio'}
                    value={state.bio.value}
                    placeholder={'I am a ...'}
                    onChange={handleChange}
                    error={state.bio.error}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <InputBox 
                    label={'Skills: '}
                    type={'text'}
                    name={'skills'}
                    value={state.skills.value}
                    placeholder={'Javascript, python'}
                    onChange={handleChange}
                    error={state.skills.error}
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