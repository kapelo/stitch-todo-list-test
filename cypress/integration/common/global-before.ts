import { deleteTodoItemsViaApi } from "../helpers/util.helper";

before(() => {
  cy.log(
    "Starting Tests"
  );

  deleteTodoItemsViaApi();
});
