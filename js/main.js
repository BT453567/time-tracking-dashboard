const card2Current = document.getElementById("card2-hours-current");
const card2Previous = document.getElementById("card2-hours-previous");

const card3Current = document.getElementById("card3-hours-current");
const card3Previous = document.getElementById("card3-hours-previous");

const card4Current = document.getElementById("card4-hours-current");
const card4Previous = document.getElementById("card4-hours-previous");

const card5Current = document.getElementById("card5-hours-current");
const card5Previous = document.getElementById("card5-hours-previous");

const card6Current = document.getElementById("card6-hours-current");
const card6Previous = document.getElementById("card6-hours-previous");

const card7Current = document.getElementById("card7-hours-current");
const card7Previous = document.getElementById("card7-hours-previous");

const buttonDaily = document.getElementById("daily-button");
const buttonWeekly = document.getElementById("weekly-button");
const buttonMonthly = document.getElementById("monthly-button");


function fetchData(period) {
    fetch('./assets/data/data.json')
        .then(response => {
            if(!response.ok) {
                throw new Error('Could not fetch file')
            }

            return response.json();
        })

        .then(data => {

            var displayMessage = "";

            switch (period) {
                case 'daily':
                    displayMessage = "Yesterday - ";
                    buttonDaily.classList.add("active");
                    buttonWeekly.classList.remove("active");
                    buttonMonthly.classList.remove("active");
                    break;
                case 'weekly':
                    displayMessage = "Last Week - ";
                    buttonDaily.classList.remove("active");
                    buttonWeekly.classList.add("active");
                    buttonMonthly.classList.remove("active");
                    break;

                case 'monthly':
                    displayMessage = "Last Month - ";
                    buttonDaily.classList.remove("active");
                    buttonWeekly.classList.remove("active");
                    buttonMonthly.classList.add("active");
                    break;
            }
                

            const workObject = data.find(item => item.title === "Work");
            const playObject = data.find(item => item.title === "Play");
            const studyObject = data.find(item => item.title === "Study");
            const exerciseObject = data.find(item => item.title === "Exercise");
            const socialObject = data.find(item => item.title === "Social");
            const selfCareObject = data.find(item => item.title === "Self Care");


            card2Current.textContent = workObject.timeframes[period].current;
            card2Previous.textContent = displayMessage + workObject.timeframes[period].previous + "hrs";

            card3Current.textContent = playObject.timeframes[period].current;
            card3Previous.textContent = displayMessage + playObject.timeframes[period].previous + "hrs";

            card4Current.textContent = studyObject.timeframes[period].current;
            card4Previous.textContent = displayMessage + studyObject.timeframes[period].previous + "hrs";

            card5Current.textContent = exerciseObject.timeframes[period].current;
            card5Previous.textContent = displayMessage + exerciseObject.timeframes[period].previous + "hrs";

            card6Current.textContent = socialObject.timeframes[period].current;
            card6Previous.textContent = displayMessage + socialObject.timeframes[period].previous + "hrs";

            card7Current.textContent = selfCareObject.timeframes[period].current;
            card7Previous.textContent = displayMessage + selfCareObject.timeframes[period].previous + "hrs";
            
        })

        .catch(error => {
            console.error('Error loading data:', error);
        });
}


document.addEventListener('DOMContentLoaded', () => {
    fetchData('daily');
});

buttonDaily.addEventListener("click", function() {
    fetchData("daily");
});
buttonWeekly.addEventListener("click", function() {
    fetchData("weekly");
});
buttonMonthly.addEventListener("click", function() {
    fetchData("monthly");
});