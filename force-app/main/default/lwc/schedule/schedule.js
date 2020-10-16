import { LightningElement, wire, track, api } from "lwc";
import getUpcomingItems from "@salesforce/apex/ScheduleController.getUpcomingItems";

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

export default class Schedule extends LightningElement {
  @api recordId;
  @track error;
  @track selectedScheduleData;
  @track selectedMonthInteger = currentMonth + 1;
  @track selectedYear = currentYear;
  @track searchKey = "";
  @track totalMonths;
  @track previousButton;
  @track nextButton;
  @track data;
  @track foundData;

  @wire(getUpcomingItems, {
    filter: "$searchKey",
    month: "$selectedMonthInteger",
    year: "$selectedYear"
  })
  wiredMonths({ error, data }) {
    if (data) {
      this.selectedScheduleData = data;
      if (data.length >= 1) {
        this.foundData = true;
      } else {
        this.foundData = false;
      }
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.selectedScheduleData = undefined;
    }
  }

  handlePrevious() {
    if (this.selectedMonthInteger > 1) {
      this.selectedMonthInteger = this.selectedMonthInteger -= 1;
    } else {
      this.selectedMonthInteger = this.selectedMonthInteger = 12;
      this.selectedYear = this.selectedYear - 1;
    }

    this.updateSelectedMonthString();
  }

  handleNext() {
    if (this.selectedMonthInteger < 12) {
      this.selectedMonthInteger = this.selectedMonthInteger += 1;
    } else {
      this.selectedMonthInteger = this.selectedMonthInteger = 1;
      this.selectedYear = this.selectedYear + 1;
    }
    this.updateSelectedMonthString();
  }

  viewAll() {
    alert("View All");
  }

  get selectedMonth() {
    let selectedMonthString = '';
    switch (this.selectedMonthInteger) {
      case 1:
        selectedMonthString = "January";
        break;
      case 2:
        selectedMonthString = "February";
        break;
      case 3:
        selectedMonthString = "March";
        break;
      case 4:
        selectedMonthString = "April";
        break;
      case 5:
        selectedMonthString = "May";
        break;
      case 6:
        selectedMonthString = "June";
        break;
      case 7:
        selectedMonthString = "July";
        break;
      case 8:
        selectedMonthString = "August";
        break;
      case 9:
        selectedMonthString = "September";
        break;
      case 10:
        selectedMonthString = "October";
        break;
      case 11:
        selectedMonthString = "November";
        break;
      case 12:
        selectedMonthString = "December";
        break;
      default:
        console.log('date not matched');
    }
    return selectedMonthString;
  }
}
