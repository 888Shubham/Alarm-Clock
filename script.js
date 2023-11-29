// let time = document.getElementById("time");
let dateInput = document.getElementById("alarmDate");
let tInput = document.getElementById("alarmTime");
let btn = document.getElementById("setAlarm");
let contan = document.getElementById("alarms");
let interVal;
let maxValue = 3;
let cnt = 0;
let almTimesArray = [];

// ----------- display current data and time ----------- //

var currentDay = document.getElementById('day');
var currentDate = document.getElementById('date');
var currentHour = document.getElementById('hour');
var currentSec = document.getElementById('second');

function displayCurrentTime(){

    var date = new Date();

    let day = String(date).substring(0, 3);

    if(day === 'Mon'){
        day = 'Monday';
    }

    else if(day === 'Tue'){
        day = 'Tuesday';
    }

    else if(day === 'Wed'){
        day = 'Wednesday';
    }

    else if(day === 'Thu'){
        day = 'Thursday';
    }

    else if(day === 'Fri'){
        day = 'Friday';
    }

    else if(day === 'Sat'){
        day = 'Saturday';
    }

    else if(day === 'Sun'){
        day = 'Sunday';
    }

    let hour = date.getHours();

    hour = hour % 12;

    if(hour == 0){
        hour = 12;
    }

    if(Number(hour) < 10){
        hour = '0' + "" + hour;
    }

    let minutes = date.getMinutes();
    if(Number(minutes) < 10){
        minutes = '0' + "" + minutes;
    }
    let second = date.getSeconds();

    if(second < 10){
        second = '0' + '' + second
    }

    currentDay.innerText = day;
    currentDate.innerText = String(date).substring(4, 16);
    currentHour.innerText = hour + ":" + minutes;
    currentSec.innerText = second + '  SEC';

	setTimeout(displayCurrentTime, 1000);

    
}
document.body.onload = function(){
    displayCurrentTime();
}

// ----------- setting the alarm ----------- //

function alarmSetFunction() {
	let now = new Date();
	let selectedDate = new Date(dateInput.value + "T" + tInput.value);
	if (selectedDate <= now) {
		alert(`Invalid time. Please select 
	a future date and time.`);
		return;
	}
	if (almTimesArray.includes(selectedDate.toString())) {
		alert(`You cannot set multiple 
	alarms for the same time.`);
		return;
	}
	if (cnt < maxValue) {
		let timeUntilAlarm = selectedDate - now;
		let alarmDiv = document.createElement("div");
		alarmDiv.classList.add("alarm");
		alarmDiv.innerHTML = `
			<span>
			${selectedDate.toLocaleString()}
			</span>
			<button class="delete-alarm">
			Delete
			</button>
		`;
		alarmDiv
			.querySelector(".delete-alarm")
			.addEventListener("click", () => {
				alarmDiv.remove();
				cnt--;
				clearTimeout(interVal);
				const idx = almTimesArray.indexOf(selectedDate.toString());
				if (idx !== -1) {
					almTimesArray.splice(idx, 1);
				}
			});
		interVal = setTimeout(() => {
			alert("Time to wake up!");
			alarmDiv.remove();
			cnt--;
			const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
			if (alarmIndex !== -1) {
				almTimesArray.splice(alarmIndex, 1);
			}
		}, timeUntilAlarm);
		contan.appendChild(alarmDiv);
		cnt++;
		almTimesArray.push(selectedDate.toString());
	} else {
		alert("You can only set a maximum of 3 alarms.");
	}
}
  
// ----------- display all the set Alarm----------- //

function showAlarmFunction() {
	let alarms = contan.querySelectorAll(".alarm");
	alarms.forEach((alarm) => {
		let deleteButton = alarm.querySelector(".delete-alarm");
		deleteButton.addEventListener("click", () => {
			alarmDiv.remove();
			cnt--;
			clearTimeout(interVal);
			const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
			if (alarmIndex !== -1) {
				almTimesArray.splice(alarmIndex, 1);
			}
		});
	});
}
showAlarmFunction();
btn.addEventListener("click", alarmSetFunction);
timeChangeFunction();
