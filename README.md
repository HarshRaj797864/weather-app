# Weather App 🌦️

A responsive weather application that displays current weather conditions for any location, with Celsius/Fahrenheit toggle functionality.

## Features ✨

- Real-time weather data from WeatherAPI
- Location search with error handling
- Toggle between Celsius and Fahrenheit
- Displays: current temp, feels-like, wind speed, humidity
- Responsive design for all devices
- Smooth animations and transitions

## Technologies Used 🛠️

- HTML5, CSS3, JavaScript
- WeatherAPI
- Google Fonts
- Font Awesome

## Setup Instructions 🚀

1. Get API key from [WeatherAPI.com](https://www.weatherapi.com/)
2. Clone repository:
   ```bash
   git clone https://github.com/HarshRaj797864/weather-app.git
   ```
3. Add API key to `script.js`:
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```
4. Open `index.html` in browser

## Project Structure 📁

```
weather-app/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── night.jpg
```

## Code Customization 🎨

**Change default location:**
```javascript
// In script.js
getWeatherData('Your City')
```

**Modify colors:**
```css
/* In style.css */
:root {
  --text-primary: #f3f3f3;
  --text-error: #ff3333;
}
```

## Future Enhancements 🔮

- 5-day forecast
- Geolocation
- Weather icons
- Dark/light mode

## Troubleshooting 🐛

**Blank screen?**  
✔ Verify API key is correct  
✔ Check browser console for errors  

**Unit toggle not working?**  
✔ Ensure all elements have proper classes  


