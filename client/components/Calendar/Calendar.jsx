import React, { Component } from 'react';
import styles from "./Calendar.css";

// const hostPath = 'http://localhost:3003'
const hostPath = '52.15.41.113:3003';

const DateToMonthString = (monthIndex) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[monthIndex];
}

const getCurrentDayOfWeek = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // gets current day of week as index from 0 (Sunday) to 6 (Saturday)
  const currentDay = (new Date()).getDay();
  return days[currentDay];
}

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYear: null,
      // month as number from 0 (January) to 11 (December)
      currentMonth: null,
      currentMonthString: null,
      firstDayOfWeek: null,
      numDays: null
    };

    this.changeMonth = this.changeMonth.bind(this);
  }

  componentDidMount() {
    const currentDate = new Date();

    this.setState({
      currentYear: currentDate.getFullYear(),
      currentMonth: currentDate.getMonth(),
      currentMonthString: DateToMonthString(currentDate.getMonth()),
      firstDayOfWeek: (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)).getDay(),
      numDays: (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).getDate()
    });
  }

  changeMonth(e) {
    let updatedDate;
    if(e.currentTarget.id === "right") {
      updatedDate = new Date(this.state.currentYear, this.state.currentMonth + 1, 1);
    } else {
      updatedDate = new Date(this.state.currentYear, this.state.currentMonth - 1, 1);
    }

    this.setState({
      currentYear: updatedDate.getFullYear(),
      currentMonth: updatedDate.getMonth(),
      currentMonthString: DateToMonthString(updatedDate.getMonth()),
      firstDayOfWeek: (new Date(updatedDate.getFullYear(), updatedDate.getMonth(), 1)).getDay(),
      numDays: (new Date(updatedDate.getFullYear(), updatedDate.getMonth() + 1, 0)).getDate(),
    });
  }

  render() {
    const { currentYear, currentMonth, currentMonthString, firstDayOfWeek, numDays } = this.state;
    const { availability, handleClick } = this.props;

    const days = [];
    for(let i = 1; i <= numDays; i++) {
      days.push(i);
    }

    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const daysAvailable = [];
    availability.forEach(day => {
      const temp = day.split("-");
      if (parseInt(temp[1]) === currentMonth + 1) {
        daysAvailable.push(temp[2]);
      }
    });

    return (
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.header}>
            <div className={styles.leftArrowContainer} onClick={this.changeMonth} id="left">
              <img className={styles.leftArrow} src={`${hostPath}/img/arrow.svg`} alt="arrow"></img>
            </div>
            <div className={styles.date}>
              {`${currentMonthString} ${currentYear}`}
            </div>
            <div className={styles.rightArrowContainer} onClick={this.changeMonth} id="right">
              <img className={styles.rightArrow} src={`${hostPath}/img/arrow.svg`} alt="arrow"></img>
            </div>
          </div>
          {daysOfWeek.map(dayOfWeek =>
            <div className={styles.dayOfWeek} key={dayOfWeek}>{dayOfWeek}</div>
          )}
          {days.map(day =>
            (() => {
              if (day === 1 && !daysAvailable.includes(`${day}`)) {
                return <div className={styles.day} key={day} style={{ gridColumnStart: firstDayOfWeek + 1, textDecoration: "line-through", color: "#e4e4e4" }}>{day}</div>
              } else if (day === 1 && daysAvailable.includes(`${day}`)) {
                return <div className={`${styles.day} ${styles.dayAvailable}`} key={day} style={{ gridColumnStart: firstDayOfWeek + 1 }} onClick={handleClick}>{day}</div>
              } else if (!daysAvailable.includes(`${day}`)) {
                return <div className={styles.day} key={day} style={{ textDecoration: "line-through", color: "#e4e4e4" }}>{day}</div>
              } else {
                return <div className={`${styles.day} ${styles.dayAvailable}`} key={day} onClick={handleClick}>{day}</div>
              }
            })()
          )}
        </div>
      </div>
    );
  }
}

export default Calendar;