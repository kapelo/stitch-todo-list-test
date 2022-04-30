@todo-api

Feature: Todo List - API

    As a Stitch developer I want to ensure the app endpoints work as expected

    Scenario: Can get todo items
        When I get all todo items
        Then the list of todo items should be returned as an array

    Scenario: Can add todo item
        When I add "Create API tests for the backend for the mentioned features" todo item
        Then the item should be added

    Scenario: Can edit todo item
        When I add "Create API tests for the backend for the mentioned features" todo item
        And I edit todo item to "Create API tests for the backend for the mentioned features to be edited"
        Then the item should be edited

    Scenario: Can delete todo item
        When I add "Create API tests for the backend for the mentioned features" todo item
        And I delete todo item
        Then the item should be deleted

    Scenario: Can complete todo item
        When I add "Create API tests for the backend for the mentioned features" todo item
        And I complete todo item
        Then the item should be completed

    @ignore
    Scenario: Todo items should not be empty (buggy)
        # Skipped this scenario as there's a bug and the response should come with an error message instead of array

    @ignore
    Scenario: Cannot delete completed todo item (buggy)
        # Skipped this scenario as there's a bug and the response should come with an error message instead of array

    @ignore
    Scenario: Cannot add todo item with more than 100 characters (buggy)
        # Skipped this scenario as there's a bug and the response should come with an error message instead of array
