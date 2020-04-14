import React, { Component } from "react";
import axios from "axios";
import styles from "./BookingBar.css";

import Calendar from "../Calendar/Calendar.jsx";
import GuestBar from "../GuestBar/GuestBar.jsx";

const hostPath = 'http://localhost:3003'

class BookingBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastClickedGuest: null,
      daySelected: null,
      showGuestBar: false,
      showCalendar: false,
      clickedDate: null,
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
      price: null,
      max_guests: null,
      reviews: {
        numReviews: null,
        avgStars: null
      },
      fees: {
        cleaning_fee: null,
        service_fee: null,
        occupancy_fee: null
      },
      availability: []
    };

    this.handleCalendarPopup = this.handleCalendarPopup.bind(this);
    this.handleGuestBarPopup = this.handleGuestBarPopup.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onPlusClick = this.onPlusClick.bind(this);
    this.onMinusClick = this.onMinusClick.bind(this);
    this.closeGuestBar = this.closeGuestBar.bind(this);
    this.updateGuestText = this.updateGuestText.bind(this);
    this.updateInfantText = this.updateInfantText.bind(this);
  }

  handleCalendarPopup(e) {
    let id = e.target.id;
    if (this.state.clickedDate === id) {
      id = null;
      this.setState((prevState, props) => {
        if (prevState.showGuestBar) {
          return { showGuestBar: false, showCalendar: !prevState.showCalendar, clickedDate: id };
        }
        return { showCalendar: !prevState.showCalendar, clickedDate: id };
      });
    } else if (this.state.clickedDate !== null) {
      this.setState((prevState, props) => {
        if (prevState.showGuestBar) {
          return { showGuestBar: false, showCalendar: prevState.showCalendar, clickedDate: id };
        }
        return { showCalendar: prevState.showCalendar, clickedDate: id };
      });
    } else {
      this.setState((prevState, props) => {
        if (prevState.showGuestBar) {
          return { showGuestBar: false, showCalendar: !prevState.showCalendar, clickedDate: id };
        }
        return { showCalendar: !prevState.showCalendar, clickedDate: id };
      });
    }
  }

  handleGuestBarPopup() {
    this.setState((prevState, props) => {
      if(prevState.showCalendar) {
        return { showCalendar: false, showGuestBar: !prevState.showGuestBar }
      }
      return { showGuestBar: !prevState.showGuestBar };
    });
  }

  handleClick(e) {
    const id = e.target.id;
    this.setState({
      daySelected: id
    });
  }

  onPlusClick(e) {
    let target;
    if(e.target.parentNode.classList.contains("numAdults")) {
      target = "numAdults";
    } else if (e.target.parentNode.classList.contains("numChildren")) {
      target = "numChildren"
    } else {
      target = "numInfants"
    }

    if(target === "numInfants") {
      if (this.state.numInfants < 5) {
        this.setState((prevState, props) => ({
          [target]: prevState[target] + 1,
          lastClickedGuest: target
        }));
      }
    } else {
      if(this.state.numAdults + this.state.numChildren < this.state.max_guests) {
        this.setState((prevState, props) => ({
          [target]: prevState[target] + 1,
          lastClickedGuest: target
        }));
      }
    }
  }

  onMinusClick(e) {
    let target;
    if(e.target.parentNode.classList.contains("numAdults")) {
      target = "numAdults";
    } else if (e.target.parentNode.classList.contains("numChildren")) {
      target = "numChildren"
    } else {
      target = "numInfants"
    }

    if(this.state[target] > 0) {
      if(target === "numAdults") {
        if (this.state.numAdults > 1) {
          this.setState((prevState, props) => ({
            [target]: prevState[target] - 1,
            lastClickedGuest: target
          }));
        }
      } else {
        this.setState((prevState, props) => ({
          [target]: prevState[target] - 1,
          lastClickedGuest: target
        }));
      }
    }
  }
  updateGuestText() {
    const { numAdults, numChildren, numInfants } = this.state;
    const numGuests = numAdults + numChildren;

    let ret = ""
    if (numGuests === 1) {
      ret += "1 guest";
    } else {
      ret += `${numGuests} guests`;
    }

    if(numInfants > 0) {
      ret += ", ";
    }

    return ret;
  }

  updateInfantText() {
    const { numInfants } = this.state;

    if (numInfants === 1) {
      return "1 infant";
    } else if (numInfants > 1) {
      return `${numInfants} infants`;
    }
  }

  closeGuestBar() {
    this.setState({
      showGuestBar: false
    });
  }

  componentDidMount() {
    const url = window.location.href;
    const queryString = url.slice(url.indexOf("?"));
    axios.get(`${hostPath}/api/rentals/${queryString}`)
      .then(res => {
        const data = res.data;
        this.setState({
          price: data.price,
          max_guests: data.max_guests,
          reviews: {
            numReviews: data.reviews.numReviews,
            avgStars: data.reviews.avgStars
          },
          fees: {
            cleaning_fee: data.fees.cleaning_fee,
            service_fee: data.fees.service_fee,
            occupancy_fee: data.fees.occupancy_fee
          },
          availability: data.availability
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { lastClickedGuest, numAdults, numChildren, numInfants, daySelected, showCalendar, showGuestBar, clickedDate, price, max_guests, reviews, fees, availability } = this.state;

    const calendarPopupStyle = showCalendar ? { visibility: "visible" } : { visibility: "hidden" };
    const guestBarPopupStyle = showGuestBar ? { visibility: "visible" } : { visibility: "hidden" };

    let highlightStartDateStyle = "";
    let highlightEndDateStyle = "";
    if (clickedDate === "startDate") {
      highlightStartDateStyle = styles.highlightText;
    } else if (clickedDate === "endDate") {
      highlightEndDateStyle = styles.highlightText;
    }

    let highlightGuestText = "";
    let highlightInfantText = "";
    if (showGuestBar) {
      if (lastClickedGuest === "numInfants" && numInfants !== 0) {
        highlightInfantText = styles.highlightText;
      } else {
        highlightGuestText = styles.highlightText;
      }
    }

    return (
      <div>
        <div className={styles.wrapper}>
          <h1 className={styles.price}>${price} <span className={styles.perNight}>per night</span></h1>
          <p className={styles.reviews}>
            <img src={`${hostPath}/img/star.svg`} alt="star" className={styles.star}></img>
            <span className={styles.avgStars}><b> {reviews.avgStars} </b></span>
            <span className={styles.numReviews}>({reviews.numReviews} reviews)</span>
          </p>
          <div className={styles.barWrapper}>
            <h3 className={styles.barTitle}>Dates</h3>
            <div className={styles.bar}>
              <div className={styles.startDate}>
                <div className={`${styles.startDateText} ${highlightStartDateStyle}`} onClick={this.handleCalendarPopup} id="startDate">03/20/2020</div>
              </div>
              <img className={styles.arrow} src={`${hostPath}/img/arrow.svg`} alt="arrow"></img>
              <div className={styles.endDate}>
                <div className={`${styles.endDateText} ${highlightEndDateStyle}`} onClick={this.handleCalendarPopup} id="endDate">03/27/2020</div>
              </div>
              <div className={styles.calendarPopup} style={calendarPopupStyle}>
                <Calendar className={styles.calendar} availability={availability} handleClick={this.handleClick}/>
              </div>
            </div>
          </div>
          <div className={styles.barWrapper}>
            <h3 className={styles.barTitle}>Guests</h3>
            <div className={`${styles.bar} ${styles.guestBar}`}>
              <div className={styles.guestBarTextContainer} onClick={this.handleGuestBarPopup}>
                <span className={`${styles.guestText} ${highlightGuestText}`}>
                  {this.updateGuestText()}
                </span>
                <span className={`${styles.guestText} ${highlightInfantText}`}>
                    {this.updateInfantText()}
                </span>
              </div>
              <div className={styles.guestBarPopup} style={guestBarPopupStyle}>
                <GuestBar max_guests={max_guests} numAdults={numAdults} numChildren={numChildren} numInfants={numInfants} onPlusClick={this.onPlusClick} onMinusClick={this.onMinusClick} closeGuestBar={this.closeGuestBar}/>
              </div>
            </div>
          </div>
          <div className={styles.priceCalc}>
            <p className={styles.title}>${price} x 7 nights</p>
            <p className={styles.description}>${price * 7}</p>
            <p className={styles.title}>Cleaning fee</p>
            <p className={styles.description}>${fees.cleaning_fee}</p>
            <p className={styles.title}>Service fee</p>
            <p className={styles.description}>${fees.service_fee}</p>
            <p className={styles.title}>Occupancy taxes and fees</p>
            <p className={styles.description}>${fees.occupancy_fee}</p>
            <p className={`${styles.title} ${styles.total}`}>Total</p>
            <p className={`${styles.description} ${styles.total}`}>${price * 7 + fees.cleaning_fee + fees.service_fee + fees.occupancy_fee}</p>
          </div>
          <button className={styles.btnReserve}>Reserve</button>
        </div>
      </div>
    );
  }
}

export default BookingBar;