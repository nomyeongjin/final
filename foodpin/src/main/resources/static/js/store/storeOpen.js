document.addEventListener('DOMContentLoaded', function () {
    const openContainer = document.querySelector(".storedetail-opencontainer");
    const busiHoursShort = document.querySelector(".busi-hours-short");

    const moreScheduleInfoBtn = document.querySelector("#moreScheduleInfoBtn");
    const shutScheduleInfoBtn = document.querySelector("#shutScheduleInfoBtn");

    if (moreScheduleInfoBtn && shutScheduleInfoBtn && busiHoursShort) {
        moreScheduleInfoBtn.addEventListener('click', () => {
            moreScheduleInfoBtn.style.display = 'none'; 
            shutScheduleInfoBtn.style.display = 'inline-block'; 
            busiHoursShort.style.display = 'block'; 
        });

        shutScheduleInfoBtn.addEventListener("click", () => {
            shutScheduleInfoBtn.style.display = 'none'; 
            moreScheduleInfoBtn.style.display = 'inline-block';
            busiHoursShort.style.display = 'none'; 
        });
    }

    function generateSchedule() {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const currentDay = getCurrentDayOfWeek(); 

        const schedule = [];
        const currentDate = new Date();
        for (let i = 0; i < 7; i++) {
            const dayIndex = (currentDay + i) % 7;
            const day = daysOfWeek[dayIndex];
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            const dateStr = `${date.getMonth() + 1}.${date.getDate()}`;
            schedule.push({
                day: dayIndex === currentDay ? `[오늘] ${dateStr} ${day}` : `${dateStr} ${day}`,
                openHour: '11:00',
                closeHour: '21:30',
                breaktimeStart: '14:30',
                breaktimeEnd: '17:00'
            });
        }

        return schedule; 
    }

    function getCurrentDayOfWeek() {
        return new Date().getDay();
    }

    function renderSchedule() {
        const schedule = generateSchedule();
        const currentDaySchedule = document.getElementById('currentDaySchedule'); 
        const weeklySchedule = document.getElementById('weeklySchedule');

        currentDaySchedule.innerHTML = '';
        weeklySchedule.innerHTML = '';

        const currentDay = schedule[0]; 

        const currentListItem = document.createElement('li');
        currentListItem.innerHTML = `
            <div class="time-wrapper space-between">
                <p class="t-txt">${currentDay.day}</p>
                <div class="time-details">
                    <p class="l-txt">
                        영업시간: ${currentDay.openHour} - ${currentDay.closeHour}
                    </p>
                    <p class="l-txt">
                        브레이크타임: ${currentDay.breaktimeStart} - ${currentDay.breaktimeEnd}
                    </p>
                </div>
            </div>
        `;
        currentDaySchedule.appendChild(currentListItem);

        for (let i = 1; i < schedule.length; i++) {
            const day = schedule[i]; 
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="time-wrapper space-between">
                    <p class="t-txt">${day.day}</p>
                    <div class="time-details">
                        <p class="l-txt">
                            영업시간: ${day.openHour} - ${day.closeHour}
                        </p>
                        <p class="l-txt">
                            브레이크타임: ${day.breaktimeStart} - ${day.breaktimeEnd}
                        </p>
                    </div>
                </div>
            `;
            weeklySchedule.appendChild(listItem);
        }
    }

    renderSchedule();
});