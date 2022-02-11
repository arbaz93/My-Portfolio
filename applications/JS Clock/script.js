const days = document.querySelector('.days'); // target ul element where we want our week.
const nowDay = new Date().getDay();           //  current day
const html = document.querySelector('body');
const text = html.querySelector('h1');
const walk = 20;                              // following speed

let week = [                                  
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
]
let newDays = [];      // New array to put our week elements after adding nowDay a class of active.

function setTime(timeValue) {   // This function returns current hour|minutes|seconds.
    let now = new Date();
    let nowHour = now.getHours();
    let nowMinutes = now.getMinutes();
    let nowSeconds = now.getSeconds();
    
    if(timeValue == 'hour') {
        return nowHour;
    } else if (timeValue == 'minutes') {
        return nowMinutes;
    } else {
        return nowSeconds;

    }
}
week[nowDay] = `<span class="active">${week[nowDay]}</span>`;
for(var i = 0; i < week.length; i++) {
    newDays.push(`<li>${week[i]}</li>`);
}
newDays = newDays.join('');

days.innerHTML = `<li>${newDays}</li>`;

const twelveHourSystem = document.getElementById('twelveHourSystem');
const twentyFourHourSystem = document.getElementById('twentyFourHourSystem');

var c; 

let nowHour = setTime('hour')

nowHour = nowHour % 12;                         // Convert 24 hour format to 12 hour format
nowHour = nowHour ? nowHour : 12;

var ampm = nowHour >= 12 ? 'PM' : 'AM';
var askMeridiem = ampm;

function timeFormat(formatPressedButtonFromHtml) { // updates time and change format
    format = formatPressedButtonFromHtml;
    if (format == 'twelve') {
        twelveHourSystem.classList.add('active');
        twentyFourHourSystem.classList.remove('active');

        nowHour = nowHour % 12;
        nowHour = nowHour ? nowHour : 12;
        askMeridiem = ampm;
    }else if(format == 'twentyFour') {
        nowHour = setTime('hour');
        askMeridiem = '';
                
        twelveHourSystem.classList.remove('active');
        twentyFourHourSystem.classList.add('active');
    } 
    //printing time in Html page
    document.getElementById("time").innerHTML = `<h1>${nowHour}:${setTime('minutes')}:${setTime('seconds')} ${askMeridiem}</h1>`;

}
setInterval(timeFormat, 1000);  // Activates timeFormat function every second

function follow(e) {            
    const { offsetWidth: width, offsetHeight: height } = html;
    let { offsetX: x, offsetY: y } = e; // cursor position
    if (this !== e.target) {
      y = y + e.target.offsetTop;
    }
    console.log(x,y)
    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    html.style.transform = `translate(${xWalk}px,${yWalk}px)`;
    html.style.textShadow = `${xWalk * -1}px ${yWalk * -1}px 0 rgba(10,10,10,0.7)`;

  }

  html.addEventListener('mousemove', follow);