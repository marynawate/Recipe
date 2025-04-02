document.addEventListener('DOMContentLoaded', () => {
    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Dummy Recipe Data (Replace with your actual data)
    const recipes = [
        { title: 'Spaghetti Carbonara', image: 'https://bellyfull.net/wp-content/uploads/2023/02/Spaghetti-Carbonara-blog-1.jpg', description: 'Classic Italian pasta.' },
        { title: 'Chicken Curry', image: 'https://i2.wp.com/savoryandsweetfood.com/wp-content/uploads/2015/12/img_8857.jpg', description: 'Delicious Indian curry.' },
        { title: 'Chocolate Cake', image: 'https://www.oogio.net/wp-content/uploads/2018/11/American_chocolate_cake6-s.jpg', description: 'Rich and decadent cake.' }
    ];

    // Load Recipes (Initially hide them)
    const recipeGrid = document.querySelector('.recipe-grid');
    function loadRecipes(hasUsername) {
        recipeGrid.innerHTML = ''; // Clear existing recipes
        if (hasUsername) {
            recipes.forEach(recipe => {
                const recipeItem = document.createElement('div');
                recipeItem.classList.add('recipe-item');
                recipeItem.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                `;
                recipeGrid.appendChild(recipeItem);
            });
        } else {
            recipeGrid.innerHTML = '<p>Please enter your details to view your recipes.</p>';
        }
    }

    // Settings Form Submission
    const settingsForm = document.getElementById('settings-form');
    settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newEmail = document.getElementById('new-email').value;
        const newPassword = document.getElementById('new-password').value;

        // Replace with your actual logic to save settings (e.g., send to server)
        console.log('New settings:', { newUsername, newEmail, newPassword });

        // Update profile info (dummy update)
        if (newUsername) {
            document.getElementById('profile-username').textContent = newUsername;
            updateProfilePicture(newUsername); // Update profile picture and color
            loadRecipes(true); // Load recipes when username exists
        }
        if (newEmail) {
            document.getElementById('profile-email').textContent = newEmail;
        }

        // Add activity log entry
        if (newUsername || newEmail || newPassword) {
            const activityLog = document.querySelector('.activity-log');
            const activityItem = document.createElement('li');
            activityItem.textContent = 'Updated profile settings.';
            activityLog.appendChild(activityItem);
        }

        // Clear form fields
        document.getElementById('new-username').value = '';
        document.getElementById('new-email').value = '';
        document.getElementById('new-password').value = '';

        alert('Settings saved!'); // Basic success message
    });

    // Dummy Activity Log Update (Example: Add a new entry)
    function addActivity(message) {
        const activityLog = document.querySelector('.activity-log');
        const activityItem = document.createElement('li');
        activityItem.textContent = message;
        activityLog.appendChild(activityItem);
    }

    // Example of calling addActivity (you can call this from other parts of your code)
    // addActivity('Viewed recipe: Chicken Curry');

    // Gender Detection Lists (Extend these lists for better accuracy)
    const femaleNames = ['Alice', 'Emma', 'Olivia', 'Sophia', 'Isabella', 'Lesley', 'Grace', 'Purity', 'Mary', 'Ava', 'Mia', 'Emily', 'Charlotte', 'Abigail', 'Lena', 'Sarah', 'Anna', 'Laura','Esther'];
    const maleNames = ['Liam', 'Noah', 'William', 'James', 'Oliver', 'Benjamin', 'Elijah', 'Lucas', 'Mason', 'Logan', 'David', 'John', 'Michael', 'Robert'];

    // Function to update profile picture and username color based on name and gender lists
    function updateProfilePicture(username) {
        const profileAvatar = document.querySelector('.profile-avatar img');
        const profileUsername = document.getElementById('profile-username');
        const firstName = username.split(' ')[0]; // Get the first name
        const normalizedFirstName = firstName.toLowerCase();

        if (femaleNames.map(name => name.toLowerCase()).includes(normalizedFirstName)) {
            profileAvatar.src = 'https://i.pinimg.com/originals/da/51/c2/da51c26fe3398b0f8314fee17a98e0e7.jpg'; // Female profile picture
            profileUsername.style.color = 'pink'; // Female username color
        } else if (maleNames.map(name => name.toLowerCase()).includes(normalizedFirstName)) {
            profileAvatar.src = 'https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg'; // Male profile picture
            profileUsername.style.color = 'blue'; // Male username color
        } else {
            // Default to male if name is not found, or add a neutral image.
            profileAvatar.src = 'https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg';
            profileUsername.style.color = 'blue'; // Default to blue
        }
    }

    // Initial profile picture and color update
    updateProfilePicture(document.getElementById('profile-username').textContent);

    // Initial recipes check
    loadRecipes(document.getElementById('profile-username').textContent !== 'username');
});