// Community Portal JavaScript - Complete Implementation
console.log("Welcome to the Community Portal");

// Event data array - Community events with real details
const communityEvents = [
    {
        id: 1,
        name: "Summer Music Festival",
        category: "music",
        date: "2024-07-15",
        time: "6:00 PM",
        location: "Central Park Amphitheater",
        description: "An unforgettable evening of live music featuring local bands, food trucks, and community spirit. Join us for an amazing celebration!",
        seats: 250,
        maxSeats: 300,
        fee: 15
    },
    {
        id: 2,
        name: "Digital Photography Workshop",
        category: "workshop",
        date: "2024-06-20",
        time: "2:00 PM",
        location: "Community Arts Center",
        description: "Master the art of digital photography with professional instructors. Learn composition, lighting, and editing techniques.",
        seats: 12,
        maxSeats: 15,
        fee: 25
    },
    {
        id: 3,
        name: "Community Basketball Championship",
        category: "sports",
        date: "2024-06-25",
        time: "10:00 AM",
        location: "Riverside Sports Complex",
        description: "Annual basketball tournament bringing together teams from across our community. All skill levels welcome!",
        seats: 75,
        maxSeats: 100,
        fee: 10
    },
    {
        id: 4,
        name: "Town Hall Community Meeting",
        category: "community",
        date: "2024-06-18",
        time: "7:00 PM",
        location: "City Hall Main Auditorium",
        description: "Monthly community gathering to discuss local initiatives, upcoming projects, and address resident concerns.",
        seats: 45,
        maxSeats: 120,
        fee: 0
    },
    {
        id: 5,
        name: "Culinary Arts Workshop",
        category: "workshop",
        date: "2024-07-02",
        time: "4:00 PM",
        location: "Community Kitchen",
        description: "Learn to create delicious dishes with Chef Maria. Discover new flavors and cooking techniques in this hands-on workshop.",
        seats: 8,
        maxSeats: 12,
        fee: 30
    },
    {
        id: 6,
        name: "Jazz Evening Concert",
        category: "music",
        date: "2024-06-30",
        time: "8:00 PM",
        location: "Community Center Garden",
        description: "Smooth jazz under the stars with the Community Jazz Ensemble. Bring a blanket and enjoy an evening of beautiful music.",
        seats: 40,
        maxSeats: 60,
        fee: 12
    },
    {
        id: 7,
        name: "Youth Soccer Tournament",
        category: "sports",
        date: "2024-06-22",
        time: "9:00 AM",
        location: "Green Fields Sports Park",
        description: "Young athletes showcase their skills in this exciting tournament. Supporting our future champions with community pride!",
        seats: 95,
        maxSeats: 150,
        fee: 8
    },
    {
        id: 8,
        name: "Family Fun Day",
        category: "community",
        date: "2024-07-08",
        time: "11:00 AM",
        location: "Central Park",
        description: "A day filled with activities for the whole family - games, food, entertainment, and community bonding for everyone!",
        seats: 180,
        maxSeats: 250,
        fee: 5
    }
];

// DOM Elements Cache
let elements = {};

// DOM initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventHandlers();
    displayEvents();
    loadPreferences();
    console.log("Community Portal initialized successfully");
});

// Initialize DOM element references
function initializeElements() {
    elements = {
        eventsContainer: document.getElementById('eventsContainer'),
        eventFilter: document.getElementById('eventFilter'),
        eventSearch: document.getElementById('eventSearch'),
        findNearbyBtn: document.getElementById('findNearbyBtn'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        locationDisplay: document.getElementById('locationDisplay'),
        locationInfo: document.getElementById('locationInfo'),
        registrationForm: document.getElementById('registrationForm'),
        userName: document.getElementById('userName'),
        userEmail: document.getElementById('userEmail'),
        userPhone: document.getElementById('userPhone'),
        eventDate: document.getElementById('eventDate'),
        eventType: document.getElementById('eventType'),
        eventFee: document.getElementById('eventFee'),
        feeAmount: document.getElementById('feeAmount'),
        userMessage: document.getElementById('userMessage'),
        charCount: document.getElementById('charCount'),
        formOutput: document.getElementById('formOutput'),
        promoVideo: document.getElementById('promoVideo'),
        videoMessage: document.getElementById('videoMessage'),
        imageModal: document.getElementById('imageModal'),
        modalImage: document.getElementById('modalImage'),
        savePreferences: document.getElementById('savePreferences'),
        clearPreferences: document.getElementById('clearPreferences')
    };
}

// Setup all event handlers
function setupEventHandlers() {
    // Navigation smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Event filtering and search
    if (elements.eventFilter) {
        elements.eventFilter.addEventListener('change', filterEvents);
    }
    
    if (elements.eventSearch) {
        elements.eventSearch.addEventListener('input', debounce(filterEvents, 300));
        elements.eventSearch.addEventListener('keydown', handleSearchKeydown);
    }

    // Geolocation
    if (elements.findNearbyBtn) {
        elements.findNearbyBtn.addEventListener('click', findNearbyEvents);
    }

    // Form handling
    if (elements.registrationForm) {
        elements.registrationForm.addEventListener('submit', handleFormSubmit);
    }

    // Phone validation on blur
    if (elements.userPhone) {
        elements.userPhone.addEventListener('blur', validatePhone);
    }

    // Event type change to show fee
    if (elements.eventType) {
        elements.eventType.addEventListener('change', showEventFee);
    }

    // Character counting for textarea
    if (elements.userMessage) {
        elements.userMessage.addEventListener('input', updateCharCount);
        elements.userMessage.addEventListener('keydown', handleTextareaKeydown);
    }

    // Video events
    if (elements.promoVideo) {
        elements.promoVideo.addEventListener('canplay', showVideoMessage);
        elements.promoVideo.addEventListener('play', function() {
            showAlert('🎬 Enjoy our community promo video!', 'info');
        });
        elements.promoVideo.addEventListener('ended', function() {
            showAlert('✨ Ready to join our community events? Register below!', 'success');
            setTimeout(() => {
                document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        });
    }

    // Gallery images - click and double-click events
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => enlargeImage(img));
        img.addEventListener('dblclick', () => enlargeImage(img));
    });

    // Modal close on click
    if (elements.imageModal) {
        elements.imageModal.addEventListener('click', closeModal);
    }

    // User preferences
    if (elements.savePreferences) {
        elements.savePreferences.addEventListener('click', savePreferences);
    }
    
    if (elements.clearPreferences) {
        elements.clearPreferences.addEventListener('click', clearPreferences);
    }

    // Before unload warning for unsaved form data
    window.addEventListener('beforeunload', function(e) {
        if (isFormDirty()) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    });
}

// Display events with staggered animations
function displayEvents(events = communityEvents) {
    if (!elements.eventsContainer) return;

    elements.eventsContainer.innerHTML = '';

    if (events.length === 0) {
        elements.eventsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i style="font-size: 3rem; color: #64748b; margin-bottom: 1rem;">🔍</i>
                <h4>No events found</h4>
                <p style="color: #64748b;">Try adjusting your search criteria or browse all events.</p>
            </div>
        `;
        return;
    }

    events.forEach((event, index) => {
        const eventCard = createEventCard(event);
        
        // Add staggered animation
        setTimeout(() => {
            eventCard.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
            elements.eventsContainer.appendChild(eventCard);
        }, index * 100);
    });
}

// Create individual event card
function createEventCard(event) {
    const div = document.createElement('div');
    div.className = 'event-card';
    
    const status = getEventStatus(event);
    
    div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <h5 style="margin: 0; color: var(--dark);">${event.name}</h5>
            <span class="event-category ${event.category}">${event.category}</span>
        </div>
        <p style="color: var(--secondary); margin-bottom: 0.5rem;">
            📅 ${formatDate(event.date)} at ${event.time}
        </p>
        <p style="color: var(--secondary); margin-bottom: 1rem;">
            📍 ${event.location}
        </p>
        <p style="margin-bottom: 1rem; line-height: 1.6;">${event.description}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <small style="color: var(--secondary);">
                👥 ${event.seats}/${event.maxSeats} seats available
            </small>
            <strong style="color: var(--primary); font-size: 1.1rem;">$${event.fee}</strong>
        </div>
        <button class="btn btn-primary btn-full" 
                onclick="scrollToRegistration(${event.id})"
                ${status === 'full' ? 'disabled' : ''}>
            ${status === 'full' ? '❌ Event Full' : '📝 Register Now'}
        </button>
    `;
    
    return div;
}

// Get event status based on available seats
function getEventStatus(event) {
    if (event.seats === 0) return 'full';
    if (event.seats <= event.maxSeats * 0.2) return 'limited';
    return 'available';
}

// Format date for display
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Filter events by category and search term
function filterEvents() {
    const filterValue = elements.eventFilter?.value || 'all';
    const searchValue = elements.eventSearch?.value.toLowerCase() || '';
    
    let filtered = [...communityEvents];
    
    // Filter by category
    if (filterValue !== 'all') {
        filtered = filtered.filter(event => event.category === filterValue);
    }
    
    // Filter by search term
    if (searchValue) {
        filtered = filtered.filter(event =>
            event.name.toLowerCase().includes(searchValue) ||
            event.description.toLowerCase().includes(searchValue) ||
            event.location.toLowerCase().includes(searchValue) ||
            event.category.toLowerCase().includes(searchValue)
        );
    }
    
    displayEvents(filtered);
    
    // Show results count
    if (searchValue || filterValue !== 'all') {
        showAlert(`Found ${filtered.length} event${filtered.length !== 1 ? 's' : ''} matching your criteria.`, 'info');
    }
}

// Handle search keydown events
function handleSearchKeydown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        filterEvents();
    }
}

// Scroll to registration and pre-fill form
function scrollToRegistration(eventId) {
    const event = communityEvents.find(e => e.id === eventId);
    
    if (event && event.seats > 0) {
        // Pre-fill the event type in the form
        if (elements.eventType) {
            elements.eventType.value = event.category;
            showEventFee();
        }
        
        // Show helpful message
        showAlert(`Ready to register for "${event.name}"! Fill out the form below.`, 'info');
    } else if (event && event.seats === 0) {
        showAlert(`Sorry, "${event.name}" is currently full. Try another event!`, 'error');
        return;
    }
    
    // Smooth scroll to registration section
    document.getElementById('registration')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Find nearby events using geolocation
function findNearbyEvents() {
    if (!navigator.geolocation) {
        showAlert('Geolocation is not supported by your browser. Please search manually.', 'error');
        return;
    }
    
    showSpinner(true);
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
    };
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            showSpinner(false);
            const { latitude, longitude } = position.coords;
            const accuracy = position.coords.accuracy;
            
            // Display location information
            if (elements.locationInfo) {
                elements.locationInfo.innerHTML = `
                    <strong>Your Location:</strong> ${latitude.toFixed(4)}, ${longitude.toFixed(4)}<br>
                    <strong>Accuracy:</strong> ±${Math.round(accuracy)} meters<br>
                    <small>Showing events near your location</small>
                `;
            }
            
            if (elements.locationDisplay) {
                elements.locationDisplay.classList.remove('hidden');
            }
            
            // Filter nearby events (simulated based on location keywords)
            const nearbyEvents = communityEvents.filter(event => 
                event.location.toLowerCase().includes('center') || 
                event.location.toLowerCase().includes('park') ||
                event.location.toLowerCase().includes('complex')
            );
            
            displayEvents(nearbyEvents);
            showAlert(`📍 Found ${nearbyEvents.length} events near your location!`, 'success');
        },
        function(error) {
            showSpinner(false);
            let message = 'Location error: ';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message += 'Please allow location access to find nearby events.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message += 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    message += 'Location request timed out. Please try again.';
                    break;
                default:
                    message += 'An unknown error occurred.';
                    break;
            }
            
            showAlert(message, 'error');
        },
        options
    );
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {
        userName: elements.userName?.value || '',
        userEmail: elements.userEmail?.value || '',
        userPhone: elements.userPhone?.value || '',
        eventDate: elements.eventDate?.value || '',
        eventType: elements.eventType?.value || '',
        userMessage: elements.userMessage?.value || ''
    };
    
    // Validate required fields
    if (!data.userName || !data.userEmail || !data.eventType || !data.eventDate) {
        showAlert('Please fill in all required fields (marked with *).', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.userEmail)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }
    
    // Date validation (must be in future)
    const selectedDate = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showAlert('Please select a future date for your event.', 'error');
        return;
    }
    
    // Simulate form submission with loading
    showSpinner(true);
    
    setTimeout(() => {
        showSpinner(false);
        
        // Display success message
        if (elements.formOutput) {
            elements.formOutput.innerHTML = `
                <div class="alert alert-success">
                    <h6>✅ Registration Confirmed!</h6>
                    <p><strong>Name:</strong> ${data.userName}</p>
                    <p><strong>Email:</strong> ${data.userEmail}</p>
                    <p><strong>Event Type:</strong> ${getEventTypeName(data.eventType)}</p>
                    <p><strong>Date:</strong> ${formatDate(data.eventDate)}</p>
                    <p>📧 Confirmation email sent to ${data.userEmail}</p>
                    <p>🎫 Please save this confirmation for your records.</p>
                </div>
            `;
            elements.formOutput.classList.remove('hidden');
        }
        
        // Reset form
        e.target.reset();
        updateCharCount();
        showEventFee(); // Reset fee display
        
        showAlert('🎉 Registration submitted successfully! Check your email for confirmation.', 'success');
        
        // Scroll to confirmation
        if (elements.formOutput) {
            elements.formOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
    }, 1500); // Simulate processing time
}

// Get event type display name
function getEventTypeName(value) {
    const option = elements.eventType?.querySelector(`option[value="${value}"]`);
    return option ? option.textContent : value;
}

// Validate phone number on blur
function validatePhone() {
    if (!elements.userPhone || !elements.userPhone.value) return;
    
    const phoneValue = elements.userPhone.value.trim();
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    
    if (phoneValue && !phoneRegex.test(phoneValue)) {
        elements.userPhone.style.borderColor = 'var(--danger)';
        showAlert('Please enter a valid phone number (e.g., 555-123-4567)', 'error');
    } else if (phoneValue) {
        elements.userPhone.style.borderColor = 'var(--success)';
    }
}

// Show event fee based on selected event type
function showEventFee() {
    if (!elements.eventType || !elements.eventFee || !elements.feeAmount) return;
    
    const selectedOption = elements.eventType.options[elements.eventType.selectedIndex];
    const fee = selectedOption.getAttribute('data-fee');
    
    if (fee !== null && selectedOption.value) {
        elements.feeAmount.textContent = fee;
        elements.eventFee.classList.remove('hidden');
    } else {
        elements.eventFee.classList.add('hidden');
    }
}

// Update character count for textarea
function updateCharCount() {
    if (!elements.userMessage || !elements.charCount) return;
    
    const count = elements.userMessage.value.length;
    elements.charCount.textContent = count;
    
    // Change color based on length
    if (count > 500) {
        elements.charCount.style.color = 'var(--danger)';
    } else if (count > 300) {
        elements.charCount.style.color = 'var(--warning)';
    } else {
        elements.charCount.style.color = 'var(--secondary)';
    }
}

// Handle textarea keydown events
function handleTextareaKeydown(event) {
    // Allow keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
        return;
    }
    
    // Update character count on next tick
    setTimeout(updateCharCount, 0);
}

// Show video ready message
function showVideoMessage() {
    if (!elements.videoMessage) return;
    
    elements.videoMessage.classList.remove('hidden');
    
    setTimeout(() => {
        elements.videoMessage.classList.add('hidden');
    }, 4000);
}

// Enlarge image in modal
function enlargeImage(img) {
    if (!elements.imageModal || !elements.modalImage) return;
    
    elements.modalImage.src = img.src;
    elements.modalImage.alt = img.alt;
    elements.imageModal.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    if (!elements.imageModal) return;
    
    elements.imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Save user preferences to localStorage
function savePreferences() {
    try {
        const preferences = {
            eventType: elements.eventType?.value || '',
            savedAt: new Date().toISOString(),
            userName: elements.userName?.value || '',
            userEmail: elements.userEmail?.value || ''
        };
        
        localStorage.setItem('communityPortalPrefs', JSON.stringify(preferences));
        showAlert('💾 Preferences saved successfully!', 'success');
        
    } catch (error) {
        console.error('Error saving preferences:', error);
        showAlert('Unable to save preferences. Please try again.', 'error');
    }
}

// Load user preferences from localStorage
function loadPreferences() {
    try {
        const saved = localStorage.getItem('communityPortalPrefs');
        if (saved) {
            const preferences = JSON.parse(saved);
            
            // Load event type preference
            if (elements.eventType && preferences.eventType) {
                elements.eventType.value = preferences.eventType;
                showEventFee();
            }
            
            // Load user info if form is empty
            if (elements.userName && !elements.userName.value && preferences.userName) {
                elements.userName.value = preferences.userName;
            }
            
            if (elements.userEmail && !elements.userEmail.value && preferences.userEmail) {
                elements.userEmail.value = preferences.userEmail;
            }
            
            console.log('Preferences loaded successfully');
        }
    } catch (error) {
        console.warn('Could not load preferences:', error);
    }
}

// Clear user preferences
function clearPreferences() {
    try {
        localStorage.removeItem('communityPortalPrefs');
        sessionStorage.clear();
        
        // Reset form fields
        if (elements.eventType) {
            elements.eventType.value = '';
            showEventFee();
        }
        
        showAlert('🗑️ Preferences cleared successfully!', 'info');
        
    } catch (error) {
        console.error('Error clearing preferences:', error);
        showAlert('Unable to clear preferences. Please try again.', 'error');
    }
}

// Utility Functions

// Show/hide loading spinner
function showSpinner(show) {
    if (!elements.loadingSpinner) return;
    
    if (show) {
        elements.loadingSpinner.classList.remove('hidden');
    } else {
        elements.loadingSpinner.classList.add('hidden');
    }
}

// Show alert messages
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '100px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '1500';
    alertDiv.style.maxWidth = '400px';
    alertDiv.style.animation = 'slideInRight 0.3s ease-out';
    
    // Add close button
    alertDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; font-size: 1.2rem; cursor: pointer; margin-left: 1rem;">×</button>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => alertDiv.remove(), 300);
        }
    }, 5000);
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if form has unsaved data
function isFormDirty() {
    if (!elements.registrationForm) return false;
    
    const formData = new FormData(elements.registrationForm);
    for (let [key, value] of formData.entries()) {
        if (value.trim()) return true;
    }
    return false;
}

// Global functions for onclick events
window.scrollToRegistration = scrollToRegistration;
window.enlargeImage = enlargeImage;
window.closeModal = closeModal;

// Additional animations for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log("Community Portal JavaScript loaded successfully");