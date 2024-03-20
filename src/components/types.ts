export type EventType = {
  id: string;
  eventType: TypesOfEvents;
  personName: string;
  eventDate: string;
};

export const enum TypesOfEvents {
  birthday = "Birthday",
  anniversary = "Anniversary",
  general_event = "General Event",
}
