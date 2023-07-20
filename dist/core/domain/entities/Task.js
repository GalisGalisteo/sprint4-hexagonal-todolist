export default class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }
    markCompleted() {
        this.completed = true;
    }
}
