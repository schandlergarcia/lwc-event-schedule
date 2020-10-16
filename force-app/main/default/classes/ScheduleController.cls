public with sharing class ScheduleController {
  @AuraEnabled(cacheable=true)
  public static List<Event> getUpcomingItems(
    String filter,
    Integer month,
    Integer year
  ) {
    try {
      List<Event> schedule = new List<Event>();
      schedule = [
        SELECT Id, StartDateTime, EndDateTime, Subject, Location
        FROM Event
        WHERE
          CALENDAR_MONTH(StartDateTime) = :month
          AND CALENDAR_YEAR(StartDateTime) = :year
        ORDER BY StartDateTime ASC
      ];
      return schedule;
    } catch (Exception e) {
      System.debug('The following exception has occurred: ' + e.getMessage());
      return null;
    }
  }
}
