import { LightningElement, api } from "lwc";

export default class ScheduleItem extends LightningElement {
  @api scheduleItem;
  @api recordId;
}
