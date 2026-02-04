from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory storage for demo purposes
tasks = []

@app.route('/')
def home():
    """Home page"""
    return render_template('index.html')

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """Get all tasks"""
    return jsonify({'tasks': tasks})

@app.route('/api/tasks', methods=['POST'])
def add_task():
    """Add a new task"""
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    
    task = {
        'id': len(tasks) + 1,
        'title': data['title'],
        'completed': False
    }
    tasks.append(task)
    return jsonify(task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Update a task"""
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    data = request.get_json()
    if 'title' in data:
        task['title'] = data['title']
    if 'completed' in data:
        task['completed'] = data['completed']
    
    return jsonify(task)

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Delete a task"""
    global tasks
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    tasks = [t for t in tasks if t['id'] != task_id]
    return jsonify({'message': 'Task deleted successfully'})

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
