document.addEventListener('DOMContentLoaded', () => {
    const contactList = document.querySelector('.contact-list');
    const chatHeader = document.getElementById('chat-header');
    const messageArea = document.getElementById('message-area');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatHeaderImage = document.getElementById('chat-header-image');
    const chatHeaderName = document.getElementById('chat-header-name');
    const searchInput = document.getElementById('search-input');  // Get the search input

    let currentContact = 'John Doe'; // Default to first contact

    // Example data (replace with your API calls)
    const messages = {
        'John Doe': [
            { sender: 'John Doe', text: 'Hey, how are you?', time: '10:30 AM' },
            { sender: 'You', text: 'I\'m good, thanks! How about you?', time: '10:32 AM' },
            { sender: 'John Doe', text: 'Doing great! Are we still meeting for coffee tomorrow?', time: '10:35 AM' },
            { sender: 'You', text: 'Absolutely! Looking forward to it. Same place at 2pm?', time: '10:36 AM' },
            { sender: 'John Doe', text: 'Perfect! See you then.', time: '10:42 AM' },
        ],
        'Jane Smith': [
            { sender: 'Jane Smith', text: 'Hi there!', time: 'Yesterday' },
            { sender: 'You', text: 'Hello Jane!', time: 'Yesterday' },
        ],
        'Alice Brown': [],
        'Mike Johnson': [
            { sender: 'Mike Johnson', text: 'Can you help me with that project?', time: 'Feb 12' },
            { sender: 'You', text: 'Sure, I can help with that!', time: 'Feb 12' },
            { sender: 'Mike Johnson', text: 'Thanks for the help!', time: 'Feb 12' },
        ]
    };

    const contactImages = {
        'John Doe': 'images/pic1.png',
        'Jane Smith': 'images/f1.jpg',
        'Alice Brown': 'images/bg7.jpg',
        'Mike Johnson': 'images/idea.png' // Using pic1.png as a placeholder since you only provided 3 images
    };

    // Function to display messages for a selected contact
    function displayMessages(contactName) {
        messageArea.innerHTML = ''; // Clear existing messages
        chatHeaderName.textContent = contactName;

        //Set Profile image
        chatHeaderImage.src = contactImages[contactName];
        chatHeaderImage.style.display = 'inline-block';

        // Update active contact in sidebar
        document.querySelectorAll('.contact-list a').forEach(item => {
            if (item.dataset.contact === contactName) {
                item.classList.add('active');
                // Remove unread badge when conversation is opened
                const badge = item.querySelector('.unread-badge');
                if (badge) badge.remove();
            } else {
                item.classList.remove('active');
            }
        });

        currentContact = contactName;

        if (messages[contactName] && messages[contactName].length > 0) {
            messages[contactName].forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.classList.add(message.sender === 'You' ? 'sent' : 'received');

                // Message content
                messageDiv.textContent = message.text;

                // Add time element
                const timeDiv = document.createElement('div');
                timeDiv.classList.add('message-time');
                timeDiv.textContent = message.time;
                messageDiv.appendChild(timeDiv);

                messageArea.appendChild(messageDiv);
            });

            // Add subtle delay before scrolling for smooth animation
            setTimeout(() => {
                messageArea.scrollTop = messageArea.scrollHeight;
            }, 100);
        } else {
            messageArea.innerHTML = '<div class="no-messages">No messages yet. Say hello! 👋</div>';
        }
    }

   // Search Functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('.contact-list li a').forEach(contact => {
            const contactName = contact.dataset.contact.toLowerCase();
            if (contactName.includes(searchTerm)) {
                contact.style.display = 'flex';
            } else {
                contact.style.display = 'none';
            }
        });
    });

    // Event listener for contact selection
    contactList.addEventListener('click', (event) => {
        // Find the closest anchor element
        const anchor = event.target.closest('a');
        if (anchor) {
            event.preventDefault();
            const contactName = anchor.dataset.contact;
            displayMessages(contactName);
        }
    });

    // Event listener for sending a message
    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText && currentContact) {
            // Get current time
            const now = new Date();
            const hours = now.getHours() % 12 || 12;
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
            const timeString = `${hours}:${minutes} ${ampm}`;

            const newMessage = {
                sender: 'You',
                text: messageText,
                time: timeString
            };

            if (!messages[currentContact]) {
                messages[currentContact] = [];
            }
            messages[currentContact].push(newMessage);

            // Create and append new message element
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'sent');
            messageDiv.textContent = messageText;

            const timeDiv = document.createElement('div');
            timeDiv.classList.add('message-time');
            timeDiv.textContent = timeString;
            messageDiv.appendChild(timeDiv);

            messageArea.appendChild(messageDiv);

            // Clear input and scroll to newest message
            messageInput.value = '';
            messageArea.scrollTop = messageArea.scrollHeight;

            // Simulate reply after a random delay (for demo purposes)
            if (Math.random() > 0.3) {
                setTimeout(() => {
                    simulateReply(currentContact);
                }, 1000 + Math.random() * 2000);
            }
        }
    }

    // Function to simulate a reply (for demo purposes)
    function simulateReply(contactName) {
        const replies = [
            "That's great!",
            "I see what you mean.",
            "Interesting thought!",
            "Let me think about that.",
            "👍",
            "Sounds good!",
            "I'll get back to you on that.",
            "Perfect!"
        ];

        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        // Get current time
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        const timeString = `${hours}:${minutes} ${ampm}`;

        const newMessage = {
            sender: contactName,
            text: randomReply,
            time: timeString
        };

        messages[contactName].push(newMessage);

        // Create and append new message element
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'received');
        messageDiv.textContent = randomReply;

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = timeString;
        messageDiv.appendChild(timeDiv);

        messageArea.appendChild(messageDiv);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    // Display messages for default contact on page load
    displayMessages(currentContact);
});