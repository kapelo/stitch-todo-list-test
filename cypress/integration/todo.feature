@todo

Feature: Todo List - Frontend

    As a user I want to create todo items so that I can manage my time more efficiently

    Background: User is on Todo List homepage
        Given that user is on homepage

    Scenario: Page title is displayed
        Then "Stitch Todo List" is displayed as the page title

    Scenario: Page header is displayed
        Then "Stitch Todo List" is displayed as the page header

    Scenario: Todo item text field should have placeholder text
        Then todo item text field should have placeholder text "Add new todo"

    Scenario Outline: Can add todo item
        When I enter "<todo_item>"
        And I submit item
        Then "<todo_item>" should display in the list of todo items

        Examples:
			| todo_item                   |
			| Quality Engineer assessment |
            | Update readme               |

    Scenario: Can add todo item by pressing enter key
        When I enter "Item to be completed" and press enter
        Then "Item to be completed" should display in the list of todo items

    Scenario: Text field clears after adding todo item
        When I enter "Item to be cleared"
        And I submit item
        Then "Item to be cleared" should display in the list of todo items
        And todo item text field is cleared

    Scenario: Can complete todo item
        When I enter "Item to be completed"
        And I submit item
        Then "Item to be completed" should display in the list of todo items
        When I mark "Item to be completed" as completed
        Then "Item to be completed" should have a strike through

    Scenario: Can delete todo item
        When I enter "Item to be deleted"
        And I submit item
        Then "Item to be deleted" should display in the list of todo items
        And "Item to be deleted" is not completed
        When I delete "Item to be deleted" todo item
        Then "Item to be deleted" should not display in the list of todo items

    @ignore
    Scenario: Todo item should not be empty (buggy)
        When I enter "   " and press enter
        Then "   " should not display in the list of todo items

    @ignore
    Scenario: Cannot delete completed todo item (buggy)
        When I enter "Item to be deleted"
        And I submit item
        Then "Item to be deleted" should display in the list of todo items
        When I mark "Item to be deleted" as completed
        And I delete "Item to be deleted" todo item
        Then "Item to be deleted" should display in the list of todo items

    @ignore
    Scenario: Cannot add todo item of more than 100 characters (buggy)
        When I enter item with "101" character
        And I submit item
        # Then an error message "Todo item should not be more than 100 characters" should be displayed
        And todo item should not display in the list of todo items

    

    # Todo:
    # - Browser testing; chrome, firefox
    # - Set vewport for mobile responsiveness testing
