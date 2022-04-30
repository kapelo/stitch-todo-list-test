const apiUrl = Cypress.env("apiUrl");

function deleteTodoItemViaApi(itemId: number) {
	cy.request({
		method: "POST",
		url: `${apiUrl}/del-todos`,
		body: {
			"id": itemId
		}
	}).then((response) => {
		expect(response.status).to.eq(200);
	});
}

export function deleteTodoItemsViaApi() {
	getNoOfTodoItems();

	cy.get("@noOfTodoItems").then(noOfTodoItems => {
		const itemsCount = Number(noOfTodoItems);

		if (itemsCount > 2) {
			for (let i = 3; i <= itemsCount; i++)
				deleteTodoItemViaApi(i);
		}
	});
}

export function getNoOfTodoItems() {
	cy.request({
		method: "GET",
		url: `${apiUrl}/todos`,
	}).then((response) => {
		expect(response.status).to.eq(200);

		cy.wrap(response.body.length).as("noOfTodoItems");
	});
}

export function generateRandomString(length: number): string {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	
	return text;
}
