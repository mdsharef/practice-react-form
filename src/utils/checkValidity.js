const checkValidity = (values) => {
    const errors = {};
    // if(!values.title) {
    //     errors.title = 'Invalid Title!'
    // }
    // if(!values.bio) {
    //     errors.bio = 'Invalid Bio!'
    // }
    // if(!values.skills) {
    //     errors.skills = 'Invalid Skill!'
    // }

    Object.keys(values).forEach(value => {
        if(!values[value]) {
            errors[value] = `Invalid ${value}`
        }
        if(value === 'password' && values[value].length < 6 && values[value].length > 0) {
            errors[value] = `${value} must be at least 6 characters`
        }
    })

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    }
}

export default checkValidity;