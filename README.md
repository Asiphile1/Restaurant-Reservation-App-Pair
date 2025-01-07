# Restaurant Reservation Platform

A comprehensive restaurant reservation platform with an admin dashboard built using React Native, Node.js, and MongoDB. This platform enables users to search for restaurants, make reservations, and allows restaurant administrators to manage their bookings and restaurant details.

## 🚀 Quick Links
- [Frontend Repository](https://github.com/Asiphile1/Restaurant-Reservation-App-Pair)
- [Backend Repository](https://github.com/Xoli-Nxiweni/ReservationAppServer)

## 👥 Project Team
- Xoli Nxiweni (xolinxiweni@gmail.com)
- Asiphile Mthethwa (asiphilemthethwa@gmail.com)

## 🌟 Features

### User Features
- Restaurant search by location, cuisine, and other criteria
- Real-time availability checking
- Table reservation system
- User profile management
- Reservation history
- Payment integration
- Review and rating system
- Push notifications for reservation reminders

### Admin Features
- Comprehensive dashboard for restaurant management
- Reservation management system
- Analytics and reporting
- Menu management
- Table layout configuration
- Customer feedback monitoring
- Revenue tracking
- Restaurant profile customization

## 🛠 Technology Stack

### Frontend
- React Native/Expo
- Redux for state management
- Tailwind CSS for styling
- React Navigation for routing
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Push notification service
- Payment gateway integration

## 📱 Application Structure

### User Navigation Stack
```
├── Splash Screen
├── Authentication
│   ├── Login
│   └── Signup
├── Main App
│   ├── Home
│   ├── Search
│   ├── Reservations
│   ├── Profile
│   └── Restaurant Details
```

### Admin Navigation Stack
```
├── Admin Login
├── Dashboard
│   ├── Reservation Management
│   ├── Analytics
│   ├── Menu Management
│   ├── Settings
│   └── Customer Feedback
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- MongoDB

### Installation Steps

1. Clone the repositories:
```bash
# Clone Frontend
git clone https://github.com/Asiphile1/Restaurant-Reservation-App-Pair

# Clone Backend
git clone https://github.com/Xoli-Nxiweni/ReservationAppServer
```

2. Install Frontend Dependencies:
```bash
cd Restaurant-Reservation-App-Pair
npm install
```

3. Install Backend Dependencies:
```bash
cd ReservationAppServer
npm install
```

4. Install Expo CLI globally:
```bash
npm install -g expo-cli
```

5. Start the Backend Server:
```bash
cd ReservationAppServer
npm start
```

6. Start the Frontend Application:
```bash
cd Restaurant-Reservation-App-Pair
expo start -c
```

## 🔐 User Roles and Access

### Regular Users Can:
- Create and manage their account
- Search for restaurants
- Make, modify, and cancel reservations
- Leave reviews and ratings
- View reservation history
- Make payments
- Receive notifications

### Admin Users Can:
- Manage restaurant profile
- View and manage reservations
- Access analytics dashboard
- Manage menu items
- View customer feedback
- Generate reports
- Configure table layouts
- Set availability and special offers

## 💻 Environment Variables

Create a `.env` file in both frontend and backend directories:

```env
# Frontend
API_URL=your_backend_url
STRIPE_PUBLIC_KEY=your_stripe_public_key

# Backend
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```


## 📚 App Documentation:

(https://docs.google.com/document/d/1-WjoM2FFmADOAS0e_Wpe3NMByHYroZUS-fxQC6Y7P8I/edit?usp=sharing)


## 🧪 Testing

```bash
# Run frontend tests
cd Restaurant-Reservation-App-Pair
npm test

# Run backend tests
cd ReservationAppServer
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

Please report any bugs or issues in the respective repositories' issue trackers.

## 🙏 Acknowledgments

- Thanks to all contributors who participated in this project
- Special thanks to our mentors and reviewers
