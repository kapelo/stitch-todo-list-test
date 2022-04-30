import { And, Then, When } from "cypress-cucumber-preprocessor/steps";

const apiUrl = Cypress.env("apiUrl");
let expectedResponse = [
  { "todo": "Write app for QA assessment", "status": "inprogress", "id": 1 },
  { "todo": "Write up for QA assessment", "status": "done", "id": 2 }
];

When(/^I get all todo items$/, () => {
  cy.request({
		method: "GET",
		url: `${apiUrl}/todos`,
	}).then((response) => {
		expect(response.status).to.eq(200);

		cy.wrap(response.body).as("todoItems");
	});
});

Then(/^the list of todo items should be returned as an array$/, () => {
  cy.get("@todoItems").then(actualTodoItems => {
		const actualItemsCount = Number(actualTodoItems.length);

    expect(actualTodoItems).to.be.a("array");
		expect(actualItemsCount).to.eql(2);

    for (let i = 0; i < actualItemsCount; i++) {
      expect(actualTodoItems[i].id).to.not.be.null;
      expect(actualTodoItems[i].id).to.eql(expectedResponse[i].id);
      // @ts-ignore
      expect(actualTodoItems[i].todo).to.eql(expectedResponse[i].todo);
      // @ts-ignore
      expect(actualTodoItems[i].status).to.eql(expectedResponse[i].status);
    }
	});
});

When(/^I add "(.+)" todo item$/, (expectedTodoItem: string) => {
  expectedResponse.push( { "todo": expectedTodoItem, "status": "inprogress", "id": 3 } );

  cy.request({
		method: "POST",
		url: `${apiUrl}/todos`,
    body: {
      "id": 3,
      "todo": expectedTodoItem,
      "status": "inprogress"
    },
	}).then((response) => {
		expect(response.status).to.eq(200);
    expect(response.body).to.be.a("array");
    expect(response.body.length).to.eq(3);

		cy.wrap(response.body).as("todoItems");
	});
});

Then(/^the item should be added$/, () => {
  cy.get("@todoItems").then(actualTodoItems => {
		const actualItemsCount = Number(actualTodoItems.length);

    for (let i = 0; i < actualItemsCount; i++) {
      expect(actualTodoItems[i].id).to.not.be.null;
      expect(actualTodoItems[i].id).to.eql(expectedResponse[i].id);
      // @ts-ignore
      expect(actualTodoItems[i].todo).to.eql(expectedResponse[i].todo);
      // @ts-ignore
      expect(actualTodoItems[i].status).to.eql(expectedResponse[i].status);
    }

    expectedResponse.pop();
	});
});

And(/^I edit todo item to "(.+)"$/, (expectedTodoItem: string) => {
  expectedResponse[2].todo = expectedTodoItem;

  cy.request({
		method: "POST",
		url: `${apiUrl}/edit-todos`,
    body: {
      "id": 3,
      "todo": expectedTodoItem,
      "status": "inprogress"
    },
	}).then((response) => {
		expect(response.status).to.eq(200);
    expect(response.body).to.be.a("array");
    expect(response.body.length).to.eq(3);

		cy.wrap(response.body).as("todoItems");
	});
});

Then(/^the item should be edited$/, () => {
  cy.get("@todoItems").then(actualTodoItems => {
		const actualItemsCount = Number(actualTodoItems.length);

    for (let i = 0; i < actualItemsCount; i++) {
      expect(actualTodoItems[i].id).to.not.be.null;
      expect(actualTodoItems[i].id).to.eql(expectedResponse[i].id);
      // @ts-ignore
      expect(actualTodoItems[i].todo).to.eql(expectedResponse[i].todo);
      // @ts-ignore
      expect(actualTodoItems[i].status).to.eql(expectedResponse[i].status);
    }

    expectedResponse.pop();
	});
});

And(/^I delete todo item$/, () => {
  cy.request({
		method: "POST",
		url: `${apiUrl}/del-todos`,
    body: {
      "id": 3
    },
	}).then((response) => {
		expect(response.status).to.eq(200);
    expect(response.body).to.be.a("array");
    expect(response.body.length).to.eq(2);

		cy.wrap(response.body).as("todoItems");
	});
});

Then(/^the item should be deleted$/, () => {
  cy.get("@todoItems").then(actualTodoItems => {
		const actualItemsCount = Number(actualTodoItems.length);

    for (let i = 0; i < actualItemsCount; i++) {
      expect(actualTodoItems[i].id).to.not.be.null;
      expect(actualTodoItems[i].id).to.eql(expectedResponse[i].id);
      // @ts-ignore
      expect(actualTodoItems[i].todo).to.eql(expectedResponse[i].todo);
      // @ts-ignore
      expect(actualTodoItems[i].status).to.eql(expectedResponse[i].status);
    }

    expectedResponse.pop();
	});
});

And(/^I complete todo item$/, () => {
  expectedResponse[2].status = "done";
  cy.log("expectedResponse.length: " + expectedResponse.length)

  cy.request({
		method: "POST",
		url: `${apiUrl}/edit-todos`,
    body: {
      "id": 3,
      "todo": expectedResponse[2].todo,
      "status": "done"
    },
	}).then((response) => {
		expect(response.status).to.eq(200);
    expect(response.body).to.be.a("array");
    expect(response.body.length).to.eq(3);

		cy.wrap(response.body).as("todoItems");
	});
});

Then(/^the item should be completed$/, () => {
  cy.get("@todoItems").then(actualTodoItems => {
		const actualItemsCount = Number(actualTodoItems.length);

    for (let i = 0; i < actualItemsCount; i++) {
      expect(actualTodoItems[i].id).to.not.be.null;
      expect(actualTodoItems[i].id).to.eql(expectedResponse[i].id);
      // @ts-ignore
      expect(actualTodoItems[i].todo).to.eql(expectedResponse[i].todo);
      // @ts-ignore
      expect(actualTodoItems[i].status).to.eql(expectedResponse[i].status);
    }

    expectedResponse.pop();
	});
});
