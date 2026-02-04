# Flask Task Manager Application

A simple and elegant task manager built with Flask, featuring a modern dark-themed UI with smooth animations.

## Features

- ✨ Create, read, update, and delete tasks
- 🎨 Modern dark theme with gradient accents
- 📱 Responsive design for all devices
- ⚡ Smooth animations and transitions
- 🔄 RESTful API endpoints
- ✅ Task completion tracking

## Project Structure

```
flask-application/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css     # Styling
│   └── js/
│       └── app.js        # Frontend JavaScript
└── README.md             # This file
```

## Installation

1. **Create a virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the Flask server**:
   ```bash
   python app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Render the main page |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/<id>` | Update a task |
| DELETE | `/api/tasks/<id>` | Delete a task |
| GET | `/health` | Health check |

## Usage

1. **Add a task**: Type your task in the input field and click "Add Task" or press Enter
2. **Complete a task**: Click the checkbox next to the task
3. **Delete a task**: Click the delete (×) button on the right side of the task

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with CSS Variables, Gradients, and Animations
- **Font**: Inter (Google Fonts)

## Development

This is a simple Flask application using in-memory storage. For production use, consider:
- Adding a database (SQLite, PostgreSQL, etc.)
- Implementing user authentication
- Adding data persistence
- Deploying to a production server

## License

This project is open source and available for educational purposes.
