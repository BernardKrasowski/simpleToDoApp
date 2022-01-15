export class UI {
  UiSelectors = {
    input: "[data-input_search]",
    btnSubmit: "[data-button_submit]",
    list: "[data-list]",
    listTasks: "[data-list_tasks]",
    clearList: "[data-clear_list]",
    editBtn: "[data-editBtn]",
    saveBtn: "[data-saveBtn]",
    deleteBtn: "[data-deleteBtn]",
  };

  getElement(selector) {
    return document.querySelector(selector);
  }
  getElements(selector) {
    return document.querySelectorAll(selector);
  }
}
