// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const toolSections = document.querySelectorAll('.tool-section');

// Navigation functionality
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        navButtons.forEach(btn => btn.classList.remove('active'));
        toolSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding section
        const toolId = button.getAttribute('data-tool');
        document.getElementById(toolId).classList.add('active');
    });
});

// Unit Converter
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

convertBtn.addEventListener('click', () => {
    const value = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    
    if (isNaN(value)) {
        resultDiv.textContent = 'Please enter a valid number';
        return;
    }
    
    let convertedValue;
    
    // Length conversions
    if (fromUnit === 'meters' && toUnit === 'feet') {
        convertedValue = value * 3.28084;
    } else if (fromUnit === 'feet' && toUnit === 'meters') {
        convertedValue = value / 3.28084;
    } else if (fromUnit === 'kilometers' && toUnit === 'miles') {
        convertedValue = value * 0.621371;
    } else if (fromUnit === 'miles' && toUnit === 'kilometers') {
        convertedValue = value / 0.621371;
    }
    // Weight conversions
    else if (fromUnit === 'kilograms' && toUnit === 'pounds') {
        convertedValue = value * 2.20462;
    } else if (fromUnit === 'pounds' && toUnit === 'kilograms') {
        convertedValue = value / 2.20462;
    } else if (fromUnit === 'grams' && toUnit === 'ounces') {
        convertedValue = value * 0.035274;
    } else if (fromUnit === 'ounces' && toUnit === 'grams') {
        convertedValue = value / 0.035274;
    }
    // Temperature conversions
    else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        convertedValue = (value * 9/5) + 32;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        convertedValue = (value - 32) * 5/9;
    }
    // Same unit
    else if (fromUnit === toUnit) {
        convertedValue = value;
    } else {
        resultDiv.textContent = 'Conversion not supported between these units';
        return;
    }
    
    resultDiv.textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`;
    resultDiv.style.display = 'block';
});

// Age Calculator
const calculateAgeBtn = document.getElementById('calculateAgeBtn');
const ageResultDiv = document.getElementById('ageResult');

calculateAgeBtn.addEventListener('click', () => {
    const birthDate = new Date(document.getElementById('birthDate').value);
    const today = new Date();
    
    if (isNaN(birthDate.getTime())) {
        ageResultDiv.textContent = 'Please enter a valid date';
        return;
    }
    
    if (birthDate > today) {
        ageResultDiv.textContent = 'Birth date cannot be in the future';
        return;
    }
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // Calculate months and days
    let months, days;
    if (today.getMonth() >= birthDate.getMonth()) {
        months = today.getMonth() - birthDate.getMonth();
    } else {
        months = 12 + today.getMonth() - birthDate.getMonth();
    }
    
    if (today.getDate() >= birthDate.getDate()) {
        days = today.getDate() - birthDate.getDate();
    } else {
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days = lastMonth.getDate() - birthDate.getDate() + today.getDate();
        months--;
    }
    
    ageResultDiv.innerHTML = `
        <p>Your age is: <strong>${age} years, ${months} months, and ${days} days</strong></p>
        <p>Total days: ${Math.floor((today - birthDate) / (1000 * 60 * 60 * 24))}</p>
    `;
    ageResultDiv.style.display = 'block';
});

// BMI Calculator
const calculateBmiBtn = document.getElementById('calculateBmiBtn');
const bmiResultDiv = document.getElementById('bmiResult');

calculateBmiBtn.addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (isNaN(weight) || isNaN(height)) {
        bmiResultDiv.textContent = 'Please enter valid weight and height';
        return;
    }
    
    if (weight <= 0 || height <= 0) {
        bmiResultDiv.textContent = 'Weight and height must be positive values';
        return;
    }
    
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category;
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }
    
    bmiResultDiv.innerHTML = `
        <p>Your BMI: <strong>${bmi.toFixed(1)}</strong></p>
        <p>Category: <strong>${category}</strong></p>
    `;
    bmiResultDiv.style.display = 'block';
});

// Speed Calculator
const calculateSpeedBtn = document.getElementById('calculateSpeedBtn');
const speedResultDiv = document.getElementById('speedResult');

calculateSpeedBtn.addEventListener('click', () => {
    const distance = parseFloat(document.getElementById('distance').value);
    const time = parseFloat(document.getElementById('time').value);
    
    if (isNaN(distance) || isNaN(time)) {
        speedResultDiv.textContent = 'Please enter valid distance and time';
        return;
    }
    
    if (distance <= 0 || time <= 0) {
        speedResultDiv.textContent = 'Distance and time must be positive values';
        return;
    }
    
    const speed = distance / time;
    
    speedResultDiv.innerHTML = `
        <p>Speed: <strong>${speed.toFixed(2)} km/h</strong></p>
        <p>Time to cover 1 km: <strong>${(1 / speed * 60).toFixed(2)} minutes</strong></p>
    `;
    speedResultDiv.style.display = 'block';
});

// Initialize the first tool as active
document.querySelector('.nav-btn.active').click();
