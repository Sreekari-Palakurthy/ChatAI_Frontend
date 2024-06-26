async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

async function displayUsers() {
    const users = await fetchData('http://localhost:8000/users/');
    const userList = document.getElementById('userList');
    if (users) {
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name} - ${user.email}`;
            userList.appendChild(listItem);
        });
    } else {
        userList.innerHTML = '<li>Error fetching users</li>';
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message) {
        const userList = document.getElementById('userList');
        const listItem = document.createElement('li');
        listItem.textContent = message;
        userList.appendChild(listItem);
        messageInput.value = '';
    }
}

window.onload = function() {
    displayUsers();
};
