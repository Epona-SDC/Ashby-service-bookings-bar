import React, { Component } from "react";
import styles from "./GuestBar.css";

const hostPath = 'http://localhost:3003'

class GuestBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { max_guests, numAdults, numChildren, numInfants, onMinusClick, onPlusClick, closeGuestBar} = this.props;

    return (
      <div className={styles.bar}>
        <div className={styles.row}>
          <div className={styles.title}>Adults</div>
          <div className={`${styles.btn} numAdults`}>
            <span className={`${styles.minus} ${(numAdults === 1) ? styles.inactive : ""} numAdults`} onClick={onMinusClick}>
              <img className={styles.minusSign} src={`${hostPath}/img/minus.svg`} alt="minus sign"></img>
            </span>
            <span className={styles.num}>{numAdults}</span>
            <span className={`${styles.plus} ${(numChildren + numAdults === max_guests) ? styles.inactive : ""} numAdults`} onClick={onPlusClick}>
              <img className={styles.plusSign} src={`${hostPath}/img/plus.svg`} alt="plus sign"></img>
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>Children<br></br><span className={styles.description}>Ages 2-12</span></div>
          <div className={`${styles.btn} numChildren`}>
            <span className={`${styles.minus} ${(numChildren === 0) ? styles.inactive : ""} numChildren`} onClick={onMinusClick}>
              <img className={styles.minusSign} src={`${hostPath}/img/minus.svg`} alt="minus sign"></img>
            </span>
            <span className={styles.num}>{numChildren}</span>
            <span className={`${styles.plus} ${(numChildren + numAdults === max_guests) ? styles.inactive : ""} numChildren`} onClick={onPlusClick}>
              <img className={styles.plusSign} src={`${hostPath}/img/plus.svg`} alt="plus sign"></img>
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>Infants<br></br><span className={styles.description}>Under 2</span></div>
          <div className={`${styles.btn} numInfants`}>
            <span className={`${styles.minus} ${(numInfants === 0) ? styles.inactive : ""} numInfants`} onClick={onMinusClick}>
              <img className={styles.minusSign} src={`${hostPath}/img/minus.svg`} alt="minus sign"></img>
            </span>
            <span className={styles.num}>{numInfants}</span>
            <span className={`${styles.plus} ${(numInfants === 5) ? styles.inactive : ""} numInfants`} onClick={onPlusClick}>
              <img className={styles.plusSign} src={`${hostPath}/img/plus.svg`} alt="plus sign"></img>
            </span>
          </div>
        </div>
        <div className={`${styles.explainer}`}>
          {max_guests} guests maximum. Infants don’t count toward the number of guests.
        </div>
        <div className={styles.btnContainer}>
          <a className={styles.closeBtn} onClick={closeGuestBar}>Close</a>
        </div>
      </div>
    );
  }
}

export default GuestBar;
