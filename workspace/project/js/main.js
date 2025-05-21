// main.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');
    
    // You can add your JavaScript code here
    const greeting = 'Welcome to JunaGO!';
    console.log(greeting);
    
    // Example: Add a click event to the h1 element
    const h1Element = document.querySelector('h1');
    if (h1Element) {
        h1Element.addEventListener('click', function() {
            this.style.color = getRandomColor();
        });
    }
    
    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}); 