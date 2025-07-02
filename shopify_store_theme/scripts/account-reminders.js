
const upcomingSection =  document.getElementById('section-upcoming');
const laterSection =  document.getElementById('section-later');
const errorElement = document.getElementById('customer-reminder-error');


fetch(`/apps/scribblerApi/v1/scribbler/private/reminders`, { method: 'GET', headers: { 'Content-Type': 'application/json', Accept: `application/json` } })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status)
        } else {
            return response.json()
        }
    })
    .then(response => {
        
        if (response.data && response.data.length > 0) {
            
            const reminders = response.data;

            const today = new Date();
            const sevenDaysFromNow = new Date();
            sevenDaysFromNow.setDate(today.getDate() + 7);

            today.setHours(0, 0, 0, 0);
            sevenDaysFromNow.setHours(23, 59, 59, 999);

            const [upcoming, later] = reminders.reduce(
            ([up, rest], reminder) => {
                const eventTime = Date.parse(reminder.event_date);
                if (eventTime >= today.getTime() && eventTime <= sevenDaysFromNow.getTime()) {
                up.push(reminder);
                } else {
                rest.push(reminder);
                }
                return [up, rest];
            },
            [[], []] 
            );
            
            if(upcoming.length > 0){
                upcomingSection.classList.remove('hidden');
                generateReminderTiles(upcoming, 'upcoming-reminders');
            }

            if(later.length > 0) {
                laterSection.classList.remove('hidden');
                generateReminderTiles(later, 'later-reminders');
            }
            errorElement.innerHTML = '';

            return
        } else {           
            laterSection.style.display = 'none';
            upcomingSection.style.display = 'none';
            errorElement.innerHTML = "You don't have any reminders yet.";
            return
        }
    })
    .catch(e => {
        laterSection.style.display = 'none';
        upcomingSection.style.display = 'none';
        errorElement.innerHTML = e.message;
    })
    .finally(() => {
    })


function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }); 
}

function getDaysUntil(dateStr) {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    const diff = eventDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const generateReminderTiles = (upcoming = [], element='') => {
    const upcomingContainer = document.getElementById(element);
    
    upcoming.forEach(reminder => {
    const daysLeft = getDaysUntil(reminder.event_date);
    const formattedDate = formatDate(reminder.event_date);
    const reminderIcon = window.themeAssets.reminderIcon;
    const shareIcon = window.themeAssets.shareIcon;

    const card = document.createElement('div');
    card.className = 'reminder-card-ui';
    card.innerHTML = `
        <div class="share-icon">
            <img src="${shareIcon}" alt="Share" />
        </div>
        <div class="reminder-content">
            <div class="reminder-icon">
            <img src="${reminderIcon}" alt="Reminder Icon" />
            </div>
            <div class="reminder-text">
            <span class="reminder-date">${formattedDate}</span>
            <span class="reminder-title">${reminder.reminder_message}</span>
            <span class="reminder-countdown">In ${daysLeft} day${daysLeft === 1 ? '' : 's'}</span>
            </div>
            <div class="reminder-button">
            <a href="#" class="shop-btn">Shop</a>
            </div>
        </div>
        `;

    upcomingContainer.appendChild(card);
    });

  };