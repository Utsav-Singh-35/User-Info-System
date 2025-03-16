# User Information Management System

A Django-based web application for managing user information with features for adding, viewing, and deleting user records, along with PDF export functionality.

## Features

- Add user information (name, email, phone, address)
- View all users in a responsive table
- Delete user records
- Export user records as PDF
- Modern and responsive UI
- Success/Error notifications
- Form validation

## Technologies Used

- Django 5.1.7
- HTML5/CSS3
- JavaScript (ES6+)
- Font Awesome 5.15.4

## Setup and Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Apply migrations:
```bash
python manage.py migrate
```

5. Run the development server:
```bash
python manage.py runserver
```

6. Visit http://127.0.0.1:8000/ in your browser

## Usage

1. Fill out the user information form with:
   - Full Name
   - Email Address
   - Phone Number
   - Address

2. Submit the form to add a new user

3. View all users in the table below the form

4. Use the "Delete" button to remove a user

5. Click "Download PDF" to export the user records as a PDF file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 