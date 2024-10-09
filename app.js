// Initialize Firebase using the global firebase object from CDN
const firebaseConfig = {
    apiKey: "AIzaSyAfXEFnQ4Im7EQbT6LuHlXuYuzxFQBcvrk",
    authDomain: "disaster-management-cbfff.firebaseapp.com",
    databaseURL: "https://disaster-management-cbfff-default-rtdb.firebaseio.com",
    projectId: "disaster-management-cbfff",
    storageBucket: "disaster-management-cbfff.appspot.com",
    messagingSenderId: "1085480797085",
    appId: "1:1085480797085:web:1f3733f17c28dfa33ea574",
    measurementId: "G-FKR2JP176P"
  };
  
  // Initialize Firebase app and analytics
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  // Add event listener for form submission
  document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
  
    // API key for WeatherAPI
    const apiKey = '8e9393ad27ee408bab76415524031';
    
    // Weather API URL
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    
    // Fetch weather data for the entered city
    fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        const isRaining = data.current.condition.text.toLowerCase().includes('rain');
        
        // Determine eligibility based on weather condition
        const eligibilityStatus = isRaining ? 'eligible' : 'non-eligible';
  
        // Update Firebase Realtime Database
        firebase.database().ref('beneficiaries/' + name).set({
          city: city,
          eligible: eligibilityStatus
        });
  
        // Provide feedback to the user
        alert(`The weather in ${city} is ${data.current.condition.text}. You are ${eligibilityStatus}.`);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('There was an error checking the weather. Please try again.');
      });
  });
  
