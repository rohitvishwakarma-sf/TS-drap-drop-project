export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}


export function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required)
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    if (typeof validatableInput.value === "string") {
        if (validatableInput.minLength)
            isValid = isValid && validatableInput.value.trim().length >= validatableInput.minLength;

        if (validatableInput.maxLength)
            isValid = isValid && validatableInput.value.trim().length <= validatableInput.maxLength;
    }
    if (typeof validatableInput.value === "number") {
        if (validatableInput.min)
            isValid = isValid && validatableInput.value >= validatableInput.min;

        if (validatableInput.max)
            isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
}