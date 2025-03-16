document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const tableBody = document.querySelector('#userTable tbody');
    const noRecords = document.querySelector('.no-records');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            
            // Send form data using fetch
            fetch(window.location.href, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': formData.get('csrfmiddlewaretoken')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Create new row with the submitted data
                    if (noRecords) {
                        noRecords.style.display = 'none';
                    }

                    if (!tableBody) {
                        // If table doesn't exist, create it
                        location.reload();
                        return;
                    }

                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${formData.get('name')}</td>
                        <td>${formData.get('email')}</td>
                        <td>${formData.get('phone')}</td>
                        <td>${formData.get('address')}</td>
                        <td>${new Date().toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}</td>
                    `;
                    
                    // Add new row to the beginning of the table
                    tableBody.insertBefore(newRow, tableBody.firstChild);
                    
                    // Clear form
                    form.reset();

                    // Show success message
                    showMessage('User information submitted successfully!', 'success');
                    
                    // Refresh the page after a short delay
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000); // 1 second delay to show the success message
                } else {
                    showMessage(data.message || 'Error submitting form. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Error submitting form. Please try again.', 'error');
            });
        });
    }

    // Function to show messages
    function showMessage(text, type) {
        const messagesContainer = document.querySelector('.messages');
        if (!messagesContainer) {
            const container = document.querySelector('.container');
            const newMessagesContainer = document.createElement('div');
            newMessagesContainer.className = 'messages';
            container.insertBefore(newMessagesContainer, container.firstChild);
        }

        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        const messages = document.querySelector('.messages');
        messages.appendChild(message);

        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
            if (messages.children.length === 0) {
                messages.remove();
            }
        }, 5000);
    }

    // Auto-hide messages after 5 seconds
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        setTimeout(() => {
            message.remove();
            const messagesContainer = document.querySelector('.messages');
            if (messagesContainer && messagesContainer.children.length === 0) {
                messagesContainer.remove();
            }
        }, 5000);
    });
});

// Print table function
function printTable() {
    // Add a title to the print
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            @page {
                size: A4;
                margin: 2cm;
            }
            .table-header h2 {
                text-align: center;
                margin-bottom: 20px;
            }
            .table-header h2::before {
                content: "User Records - ";
            }
            .table-header h2::after {
                content: " (Generated on ${new Date().toLocaleDateString()})";
            }
        }
    `;
    document.head.appendChild(style);

    // Trigger print
    window.print();

    // Remove the style element after printing
    setTimeout(() => {
        document.head.removeChild(style);
    }, 1000);
} 