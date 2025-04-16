### 🧠 Project Task Board – Real-time Chat App

| **Category**       | **Task**                                                                   | **Status**            | **Notes**                                                               |
| ------------------ | -------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------- |
| **Project Setup**  | Initialize monorepo using Nx with React (frontend) and ExpressJS (backend) | ✅ Completed          | Structured for scalability and separation of concerns                   |
|                    | Setup basic working server and UI connection                               | ✅ Completed          | Functional MVP for quick feedback loop                                  |
| **UI/UX**          | Create a polished, functional UI                                           | ✅ Completed          | Clean design with intuitive layout                                      |
|                    | Add real-time typing event indicator                                       | ✅ Completed          | Live feedback to enhance user experience                                |
|                    | Refactor UI components                                                     | ✅ Completed          | Focused on modularity and maintainability                               |
|                    | Implement connection status indicator                                      | ✅ Completed          | Shows WebSocket connection state in real time                           |
|                    | Run accessibility (a11y) checks                                            | ✅ Completed          | Ensures inclusive design                                                |
|                    | Perform performance check                                                  | ✅ Completed          | Verified app responsiveness under usage                                 |
| **State & Data**   | Use `localStorage` to persist username only                                | ✅ Completed          | Prevents outdated messages from being shown after reload                |
|                    | Use shared types and mocks between frontend and backend                    | ✅ Completed          | Type safety and consistency throughout the stack                        |
|                    | Sanitize inputs                                                            | ✅ Completed          | Prevents XSS and bad user input                                         |
|                    | Separate WebSocket/server logic into reusable hooks/modules                | ✅ Completed          | Clean architecture and testability                                      |
|                    | Add database integration for message history                               | 🕒 Optional / Backlog | Would improve message persistence; not included due to time constraints |
| **Testing**        | Setup code coverage to 80%                                                 | ✅ Completed          | Ensures high-quality and reliable code                                  |
|                    | Write unit and integration tests using custom mocks                        | ✅ Completed          | Reusable test mocks from shared directory                               |
| **Error Handling** | Implement validation for inputs (max length, required fields)              | ✅ Completed          | Prevents unexpected behavior and poor UX                                |
| **Documentation**  | Add detailed README with run instructions                                  | ✅ Completed          | Ensures easy onboarding for reviewers                                   |
|                    | Add README section with architectural overview and setup commands          | ✅ Completed          | Clearly explains key design decisions and usage                         |
|                    | Add link to full documentation                                             | ⏳ In Progress        | Pending final documentation review                                      |

---

### 🛠 Possible Improvements

- Add full database integration for persistent message history across sessions.
- Enhance E2E test coverage with more edge cases and network simulations.
- Deploy the app using Docker for portability and CI pipeline testing.
