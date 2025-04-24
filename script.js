// Tab Switching Logic for Tools
const navButtons = document.querySelectorAll('.nav-btn');
const toolSections = document.querySelectorAll('.tool-section');

// Set default active tool on load
document.addEventListener('DOMContentLoaded', () => {
    navButtons[0].classList.add('active');
    toolSections[0].classList.add('active');
});

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        toolSections.forEach(section => section.classList.remove('active'));

        button.classList.add('active');
        const toolId = button.getAttribute('data-tool');
        document.getElementById(toolId).classList.add('active');
    });
});

// Unit Converter Logic
document.getElementById('convertBtn').addEventListener('click', function() {
    const value = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultElement = document.getElementById('result');

    if (isNaN(value)) {
        resultElement.textContent = 'Please enter a valid number.';
        return;
    }

    const conversionRates = {
        meters: { feet: 3.28084 },
        feet: { meters: 0.3048 },
        kilograms: { pounds: 2.20462 },
        pounds: { kilograms: 0.453592 },
        celsius: { fahrenheit: (val) => (val * 9/5) + 32 },
        fahrenheit: { celsius: (val) => (val - 32) * 5/9 }
    };

    let result;
    if (conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]) {
        const conversion = conversionRates[fromUnit][toUnit];
        result = typeof conversion === 'function' ? conversion(value) : value * conversion;
    } else if (fromUnit === toUnit) {
        result = value;
    } else {
        resultElement.textContent = 'Conversion not supported.';
        return;
    }

    resultElement.textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
});

// Age Calculator Logic (years, months, days)
document.getElementById('calculateAgeBtn').addEventListener('click', function() {
    const birthInput = document.getElementById('birthDate').value;
    const resultElement = document.getElementById('ageResult');
    if (!birthInput) {
        resultElement.textContent = 'Please enter a valid birth date.';
        return;
    }
    const birthDate = new Date(birthInput);
    const today = new Date();

    if (birthDate > today) {
        resultElement.textContent = "Birth date cannot be in the future.";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    resultElement.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
});

// BMI Calculator Logic
document.getElementById('calculateBmiBtn').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const resultElement = document.getElementById('bmiResult');

    if (!weight || !height || isNaN(weight) || isNaN(height)) {
        resultElement.textContent = 'Please enter valid weight and height.';
        return;
    }

    const bmi = weight / (height * height);
    let status = '';
    if (bmi < 18.5) status = ' (Underweight)';
    else if (bmi < 25) status = ' (Normal)';
    else if (bmi < 30) status = ' (Overweight)';
    else status = ' (Obese)';
    resultElement.textContent = `Your BMI is ${bmi.toFixed(2)}${status}.`;
});