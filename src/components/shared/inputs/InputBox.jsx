import Container from "../../ui/commons/Container";
import Error from "../../ui/commons/Error";
import Input from "../../ui/inputs/Input";
import Label from "../../ui/inputs/Label";

const InputBox = ({
    label,
    type,
    name,
    value,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    error,
}) => {
    return (
        <Container>
            <Label htmlFor={name}>{label}</Label>
            <Input 
                type={type}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder ? placeholder : ''}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                error={error}
            />
            {error && <Error>{error}</Error>}
        </Container>
    )
}

export default InputBox;