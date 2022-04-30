export class TodoListPage {
    headerLocator = ".text-center.mb-4";

    getSubmitButton(): string {
        return "button[type=submit]";
    }

    getTodoItemInputField(): string {
        return "input[type=text]";
    }

    getPageHeader(): string {
        return ".text-center.mb-4";
    }

    getTodoItemsList(): string {
        return ".todo > span";
    }
}
