![Screenshot_20-6-2024_21924_sailorvirgo github io](https://github.com/SailorVirgo/My-TO-DO-list/assets/153470839/b72385ac-e05c-4943-8ccb-d339b819fb57)


# Task Board

A simple Kanban board for task management, built with HTML, CSS, and JavaScript.

## Features

- **Task Management Columns**: Display tasks in columns representing their progress state: "Not Yet Started," "In Progress," and "Completed."
- **Color Coding for Deadlines**: Color-code tasks based on deadlines (yellow for nearing, red for overdue).
- **Modal Dialog for New Tasks**: Use a modal dialog for entering new task details (title, description, deadline).
- **Save Tasks to LocalStorage**: Save task properties to localStorage.
- **Drag-and-Drop Functionality**: Enable dragging tasks between columns and update their state.
- **Delete Tasks**: Allow tasks to be deleted and ensure they do not reappear after refreshing.
- **Persistent Data**: Ensure tasks persist after refreshing the page.
- **Day.js for Date Management**: Utilize the Day.js library for date management.
- **Random Task Colors**: Each task is assigned a random background color when added.

## Technologies Used

- HTML
- CSS
- JavaScript
- [Day.js](https://day.js.org/)

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Day.js library)

### Installation

1. Clone the repository to your local machine:

    ```sh
    git clone git@github.com:SailorVirgo/My-TO-DO-list.git
    ```

2. Navigate to the project directory:

    ```sh
    cd task-board
    ```

3. Open `index.html` in your web browser:

    ```sh
    open index.html
    ```

## Usage

1. Click the "Add Task" button to open the task creation modal.
2. Fill in the task details (title, description, deadline) and click "Save Task."
3. The new task will appear in the "Not Yet Started" column with a random background color.
4. Drag and drop tasks between columns to update their progress state.
5. Click the "Delete" button on a task to remove it.
6. Tasks and their states are saved to localStorage, so they persist after refreshing the page.

## Project Structure

task-board
├── index.html
├── styles.css
├── todo.js
├── drag.js
└── README.md


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Day.js](https://day.js.org/) for date management
- [Unsplash](https://unsplash.com/) for background images

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact

For questions or feedback, please reach out to [your email address].

