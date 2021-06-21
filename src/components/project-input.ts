import { Component } from "./base-components";
import { projectState } from "../state/project-state";
import { validate } from "../utils/validation";
import { Validatable } from "../utils/validation";
import { AutoBind } from "../decorators/autobind";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptorInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {

        super("project-input", "app", "afterbegin", "user-input");

        this.titleInputElement = this.element.querySelector("#title")! as HTMLInputElement;
        this.descriptorInputElement = this.element.querySelector("#description")! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people")! as HTMLInputElement;
        this.configure();

    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {

    }
    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const input = this.gatherInput();
        if (Array.isArray(input)) {
            const [title, description, people] = input;
            projectState.addProject(title, description, people);
        }
        this.clearInputs();

    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptorInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    private gatherInput(): [string, string, number] | void {
        const title = this.titleInputElement.value;
        const description = this.descriptorInputElement.value;
        const people = this.peopleInputElement.value;

        const validatableTitle: Validatable = {
            value: title,
            required: true,
            maxLength: 10
        }

        const validatableDescription: Validatable = {
            value: description,
            required: true,
            minLength: 5
        }

        const validatablePeople: Validatable = {
            value: +people,
            required: true,
            min: 0,
            max: 10
        }
        if (validate(validatableTitle) && validate(validatableDescription) && validate(validatablePeople)) {
            return [title, description, +people];
        } else {
            alert("please enter correct input")
        }
    }



}