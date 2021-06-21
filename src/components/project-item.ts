import { Component } from "./base-components";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { AutoBind } from "../decorators/autobind";
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        } else {
            return `${this.project.people} persons`;
        }
    }
    constructor(hostId: string, project: Project) {

        super('single-project', hostId, "beforeend", project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    @AutoBind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';

    }
    @AutoBind
    dragEndHandler(_: DragEvent): void {


    }

    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = `${this.persons} persons assigned`;
        this.element.querySelector('p')!.textContent = this.project.description;

    }
}