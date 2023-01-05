import { useState } from "react";
import { deepClone, isEmpty, mapValueObj } from "../utils/objectFunc";

/**
 * @typedef {Object} Param
 * @property {Object} init
 * @property {(Object|Boolean)} validate
 * 
 * create forms using this hooks easily
 * @param {Param} param
 * @returns {
 *      object - formState,
 *      function - handleChange,
 *      function - handleFocus,
 *      function - handleBlur,
 *      function - handleSubmit,
 * }
 */
const useForm = ({ init, validate }) => {
    const [state, setState] = useState(mapValueObj(init, (obj, acc, cur) => {
        acc[cur] = {
            value: obj[cur],
            error: '',
            focused: false,
            touched: false,
        }
    }))

    const handleFocus = (event) => {
        const {name} = event.target;

        const oldState = deepClone(state);
        oldState[name].focused = true;

        if(!oldState[name].touched) {
            oldState[name].touched = true;
        }

        setState(oldState);
    }

    const handleChange = (event) => {
        const {name: key, value, type, checked} = event.target;

        const oldState = deepClone(state);

        if (type === 'checkbox') {
            oldState[key].value = checked;
        } else {
            oldState[key].value = value;
        }

        const {errors} = getErrors(oldState);

        if(oldState[key].touched && errors[key]) {
            oldState[key].error = errors[key];
        } else {
            oldState[key].error = '';
        }

        setState(oldState);
    }

    const handleBlur = (event) => {
        const {name} = event.target;

        // const values = mapValueObj(state, (obj, acc, cur) => acc[cur] = obj[cur].value)
        const {errors} = getErrors(state);
        const oldState = deepClone(state);

        if(oldState[name].touched && errors[name]) {
            oldState[name].error = errors[name]
        } else {
            oldState[name].error = ''
        }

        oldState[name].focused = false;

        setState(oldState);
    }

    const handleSubmit = (event, cb) => {
        event.preventDefault();

        const {values, errors, hasError} = getErrors(state);

        cb({
            values,
            errors,
            hasError,
            focused: mapValueObj(state, (obj, acc, cur) => acc[cur] = obj[cur].focused),
            touched: mapValueObj(state, (obj, acc, cur) => acc[cur] = obj[cur].touched),
        })
    }

    const clear = () => {
        setState(mapValueObj(init, (_obj, acc, cur) => {
            acc[cur] = {
                value: '',
                error: '',
                focused: false,
                touched: false,
            }
        }))
    }

    const getErrors = (state) => {
        let hasError = null, errors = null;

        const values = mapValueObj(state, (obj, acc, cur) => acc[cur] = obj[cur].value);

        if(typeof validate === 'boolean') {
            hasError = validate,
            errors = mapValueObj(state, (obj, acc, cur) => acc[cur] = obj[cur].error);
        } else if(typeof validate === 'function') {
            const { errors: errorsFromCb, isValid } = validate(values);
            hasError = !isValid;
            errors = errorsFromCb;
        } else {
            throw new Error('validate property must be boolean or function');
        }

        return {
            values,
            errors,
            hasError,
        }
    }

    return {
        formState: state,
        handleFocus,
        handleChange,
        handleBlur,
        handleSubmit,
        clear,
    }
}

export default useForm;