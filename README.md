# Catch me 
Welcome to **Catch Me**, an interactive game where you must catch a randomly moving cat image within 30 seconds! The game features real-time score tracking, a leader board of top scores, and user account management (login, logout, and account deletion).

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/DianaEP/catch-me.git
    ```
2. **Navigate to the project directory:**
    ```sh
    cd catch-me
    ```
3. **Install dependencies:**
    ```sh
    npm install
    ```
4. **Start the development server:**
    ```sh
    npm run dev
    ```
5. **Start JSON Server :**
    ```sh
    npm run server
    ```

## Technologies Used

### **Frontend:**

- **React.js:**
  - **useState**: Manages local component state (e.g., timer, game state, messages).
  - **useEffect**: Handles side effects (e.g., fetching data, starting intervals).
  - **useContext**: Provides global state management for user and score data.
  - **useCallback**: Optimizes performance by memoizing functions to avoid unnecessary re-renders.
  - **React Router**: Manages navigation between different views.
  - **CSS**: Includes media queries for responsive design.

### **Backend:**

- **JSON Server**: Simulates a mock API for handling user data, scores, and authentication during development.

## Features

**Catch the cat game:**
1. Players must click on the randomly appearing cat image within 30 seconds.
2. If successful, the player's score is based on how fast they caught the cat.
3. If time runs out, the game ends with a "Game Over" message.

**Score Tracking:**
1. After each game, the player's score is saved and displayed.
2. A leader board is available, showing the best scores from all users.

**User Account Management:**
1. Login/logout functionality.
2. Ability to delete the account, with confirmation before deletion.

**Responsive Design:**
1. Optimized for different screen sizes, from mobile to desktop, using media queries.

## Game Instructions
1. **Create an account:**  Go to Register page, fill the required fields and submit the form
2. **Start the Game:** Click the "Play" button on the welcome screen.
3. **Catch the Cat**: The cat image will appear at random locations. Click it as quickly as possible.
4. **Game Over:** If the time runs out, the game ends
5. **View Scores:** Check out the leader board to see how your score compares to others.

