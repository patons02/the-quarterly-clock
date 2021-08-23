window.onload = function() {

    const hourHand = document.querySelector('.hourHand');
    const minuteHand = document.querySelector('.minuteHand');
    const time = document.querySelector('.time');

    const deriveWeekOfYear = date => {
        let onejan = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    };
    
    const getQuarter = date => {
        let weekOfYear = deriveWeekOfYear(date);
        return Math.ceil((weekOfYear/52.0) * 4.0);
    }; 
    
    const quarter = getQuarter(new Date());
    console.log("We are in Quarter " + quarter);
    
    const getDegreesForQuarter = date => {
        const quarter = getQuarter(date);
        return 90 * (quarter - 1);
    }

    const weekOfQuarter = weekOfYear => {
        if (quarter == 1) {
            return weekOfYear;
        }
        
        return weekOfYear - (13 * (quarter-1)) - 1;
    };

    setInterval( () => {
        let now = new Date();
        let weekOfYear = deriveWeekOfYear(now);
        
        const degreesPointInYear = getDegreesForQuarter(now);
        let degreesPointInQuarter = (360/13) * weekOfYear;

        if (weekOfYear === 13 || weekOfYear === 26 || weekOfYear === 39 || weekOfYear === 52) {
            degreesPointInQuarter = (360/13) * (weekOfYear - 1)
        }
        
        minuteHand.style.transform = `rotate(${degreesPointInQuarter}deg)`;
        hourHand.style.transform = `rotate(${degreesPointInYear}deg)`;
        time.innerHTML = '<span>' + '<strong>' + 'Q' + quarter + '</strong>' + ' : ' + '<small>' + ' Week ' + weekOfQuarter(weekOfYear) +'</small>'+ '</span>';
    });
}