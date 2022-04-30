import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { TodoListPage } from "../page_objects/todo-list.page-object";
import { generateRandomString } from "../helpers/util.helper";

const todoListPage = new TodoListPage();
let randomText: string;

Given(/^that user is on homepage$/, () => {
    cy.visit("");
});

When(/^"(.+)" is displayed as the page title$/, (title: string) => {
    cy.title()
      .should("eq", title);
});

When(/^"(.+)" is displayed as the page header$/, (header: string) => {
    cy.get(todoListPage.getPageHeader())
      .should("be.visible")
      .should("have.text", header);
});

When(/^todo item text field should have placeholder text "(.+)"$/, (expectedPlaceholderText: string) => {
    cy.get(todoListPage.getTodoItemInputField())
      .should("be.visible")
      .invoke("attr", "placeholder").then(actualPlaceholderText => {
        expect(actualPlaceholderText).to.eql(expectedPlaceholderText);
      });
});

When(/^I enter "(.+)"$/, (todoItem: string) => {
    cy.get(todoListPage.getTodoItemInputField())
      .should("be.visible")
      .type(todoItem);
});

When(/^I enter "(.+)" and press enter$/, (todoItem: string) => {
    cy.get(todoListPage.getTodoItemInputField())
      .should("be.visible")
      .type(`${todoItem}{enter}`);
});

When(/^I submit item$/, () => {
    cy.get(todoListPage.getSubmitButton())
      .should("be.visible")
      .click();
});

Then(/^"(.+)" should display in the list of todo items$/, (todoItem: string) => {
    cy.contains(todoListPage.getTodoItemsList(), todoItem);
    cy.reload();
    cy.contains(todoListPage.getTodoItemsList(), todoItem);
});

Then(/^"(.+)" is not completed$/, (todoItem: string) => {
    cy.contains(todoListPage.getTodoItemsList(), todoItem)
      .should("not.have.attr", "text-decoration: line-through;");
});

Then(/^todo item text field is cleared$/, () => {
    cy.get(todoListPage.getTodoItemInputField())
      .should("be.visible")
      .invoke("val").then(text => {
          expect(text).to.eql("");
      });
});

Then(/^I mark "(.+)" as completed$/, (todoItem: string) => {
    cy.contains(todoListPage.getTodoItemsList(), todoItem)
      .siblings()
      .find(".btn-outline-success")
      .click();
});

Then(/^"(.+)" should have a strike through$/, (todoItem: string) => {
    cy.contains(todoListPage.getTodoItemsList(), todoItem)
      .invoke("attr", "style").then(actualStyleAttribute => {
        expect(actualStyleAttribute).to.eql("text-decoration: line-through;");
      });
    cy.reload();
    cy.contains(todoListPage.getTodoItemsList(), todoItem)
      .invoke("attr", "style").then(actualStyleAttribute => {
        expect(actualStyleAttribute).to.eql("text-decoration: line-through;");
      });
});

Then(/^I delete "(.+)" todo item$/, (todoItem: string) => {
    cy.contains(todoListPage.getTodoItemsList(), todoItem)
      .siblings()
      .find(".btn-outline-danger")
      .click();
});

Then(/^"(.+)" should not display in the list of todo items$/, (todoItem: string) => {
    if (todoItem.trim().length === 0 ) {
        cy.get(todoListPage.getTodoItemsList()).each(element => {
            if (element.text() === todoItem) {
                throw new Error("Todo item should not be empty");
            }
        });
        cy.reload();
    } else {
        cy.contains(todoListPage.getTodoItemsList(), todoItem)
          .should("not.exist");
        cy.reload();
        cy.contains(todoListPage.getTodoItemsList(), todoItem)
          .should("not.exist");
    }
});

Then(/^I enter item with "(.+)" character$/, (noOfCharacters: string) => {
    randomText = generateRandomString(Number(noOfCharacters));
    cy.get(todoListPage.getTodoItemInputField())
      .should("be.visible")
      .type(randomText);
});

Then(/^todo item should not display in the list of todo items$/, () => {
    cy.wait(500);
    cy.contains(todoListPage.getTodoItemsList(), randomText)
      .should("not.exist");
    cy.reload();
    cy.contains(todoListPage.getTodoItemsList(), randomText)
      .should("not.exist");
});
