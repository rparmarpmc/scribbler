let upcomingSection=document.getElementById("section-upcoming"),laterSection=document.getElementById("section-later"),errorElement=document.getElementById("customer-reminder-error");function formatDate(e){return new Date(e).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}function getDaysUntil(e){var e=new Date(e),n=new Date,e=(n.setHours(0,0,0,0),e.setHours(0,0,0,0),e-n);return Math.ceil(e/864e5)}fetch("/apps/scribblerApi/v1/scribbler/private/reminders",{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(e=>{if(e.ok)return e.json();throw new Error("HTTP status "+e.status)}).then(e=>{if(e.data&&0<e.data.length){e=e.data;let a=new Date,s=new Date;s.setDate(a.getDate()+7),a.setHours(0,0,0,0),s.setHours(23,59,59,999);var[e,n]=e.reduce(([e,n],t)=>{var r=Date.parse(t.event_date);return(r>=a.getTime()&&r<=s.getTime()?e:n).push(t),[e,n]},[[],[]]);0<e.length&&(upcomingSection.classList.remove("hidden"),generateReminderTiles(e,"upcoming-reminders")),0<n.length&&(laterSection.classList.remove("hidden"),generateReminderTiles(n,"later-reminders")),errorElement.innerHTML=""}else laterSection.style.display="none",upcomingSection.style.display="none",errorElement.innerHTML="You don't have any reminders yet."}).catch(e=>{laterSection.style.display="none",upcomingSection.style.display="none",errorElement.innerHTML=e.message}).finally(()=>{});let generateReminderTiles=(e=[],n="")=>{let i=document.getElementById(n);e.forEach(e=>{var n=getDaysUntil(e.event_date),t=formatDate(e.event_date),r=window.themeAssets.reminderIcon,a=window.themeAssets.shareIcon,s=document.createElement("div");s.className="reminder-card-ui",s.innerHTML=`
        <div class="share-icon">
            <img src="${a}" alt="Share" />
        </div>
        <div class="reminder-content">
            <div class="reminder-icon">
            <img src="${r}" alt="Reminder Icon" />
            </div>
            <div class="reminder-text">
            <span class="reminder-date">${t}</span>
            <span class="reminder-title">${e.reminder_message}</span>
            <span class="reminder-countdown">In ${n} day${1===n?"":"s"}</span>
            </div>
            <div class="reminder-button">
            <a href="#" class="shop-btn">Shop</a>
            </div>
        </div>
        `,i.appendChild(s)})};