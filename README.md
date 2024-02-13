# Inventory Management System - Kaizntree Application

This Inventory Management System is designed to streamline the process of managing stock, tracking orders, and handling sales and deliveries. Built with Django and Django REST Framework for the backend, React for the frontend, and SQLite as the database, it provides an all-encompassing solution for inventory management.

## Why This Tech Stack?
- **Django**: Offers a high-level Python web framework that encourages rapid development and clean, pragmatic design.
- **Django REST Framework**: A powerful toolkit for building Web APIs in Django, providing an easy way to create complex data-driven APIs.
- **React**: Known for its efficient update and rendering system, React allows us to create interactive UIs with ease.
- **SQLite**: A lightweight database engine that comes out of the box with Django, perfect for development and testing purposes.


## Features

### Components

- **CreateAccount**: Allows new users to register for an account.
- **Login**: Handles user authentication sessions.
```
username: user1
password: user1
```

or 
To test the login functionality locally, you can create a test user using Django's manage.py command. Here's how you can do it:

1. Ensure your development environment is running and you've applied all migrations.
2. Open your terminal and navigate to your project directory.
3. Run the following command:

```
python manage.py createsuperuser
```

- **Logout**: Provides users with the ability to securely end their session.
- **SearchBar**: Enables dynamic searching through inventory items.
- **Sidebar**: Offers navigation capabilities for the application.
- **Dashboard**: The main interface for users to interact with inventory data, including sorting and filtering capabilities.

## Getting Started

To set up this project locally, follow the instructions below:

### Prerequisites

Before starting, ensure you have the following installed:
- Python (3.8 or higher)
- Node.js (v14 or higher)
- npm or Yarn

### Installation

Clone the repository and set up the environment:

```
git clone https://github.com/manju1201/projectkaizntree.git
cd projectkaizntree
```

### Set up the backend
Navigate to the backend directory and install the required Python dependencies:
```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Set up the frontend
Open a new terminal window, navigate to the frontend directory, and install the required Node.js dependencies:
```
cd kaizntreeappfrontend
npm install
npm start
```
The React application will start and typically open in a new browser tab at http://localhost:3000.


## Deployment

For deploying this application to a live system, refer to [Django's deployment checklist](https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/) to ensure you cover all essential points for transitioning from a development environment to a production environment.

## Built With

- [Django](https://www.djangoproject.com/) 
- [Django REST Framework](https://www.django-rest-framework.org/) 
- [React](https://reactjs.org/)
- [SQLite](https://www.sqlite.org/index.html) 

## Contributing

Your contributions are welcome and greatly appreciated! Contributing to this project is not only a chance to make it better but also a great opportunity to learn and share knowledge with others. Here are some ways you can contribute:

- Reporting bugs
- Suggesting enhancements
- Adding new features
- Improving documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

