import useForm from "../../hooks/useForm";

const init = {
    checked: false,
    task: '',
    group: '',
    gender: '',
    file: '',
}

const Task = () => {
    const {formState, handleChange, handleSubmit} = useForm({init, validate: true});

    const submitCB = ({values}) => {
        alert(JSON.stringify(values));
    }

    return (
        <div>
            <h2>Task Form</h2>
            <form onSubmit={(e) => handleSubmit(e, submitCB)}>
                <input type="checkbox" name="checked" value={formState.checked.value} onChange={handleChange} />
                <input type="text" name="task" value={formState.task.value} onChange={handleChange} />
                <select name="group" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                </select>
                <input type="radio" name='gender' value='male' onChange={handleChange} /> Male
                <input type="radio" name='gender' value='female' onChange={handleChange} /> Female
                <input type="radio" name='gender' value='other' onChange={handleChange} /> Other
                <input type="file" name='file' value={formState.file.value} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Task;