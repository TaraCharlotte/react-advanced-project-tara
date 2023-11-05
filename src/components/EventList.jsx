import { EventItemCard } from "./EventItemCard.jsx";

export const EventList = ({ events, clickFn, categories }) => {
  return (
    <>
      {events.map((event) => (
        <EventItemCard
          clickFn={clickFn}
          event={event}
          key={event.id}
          categories={categories}
        />
      ))}
    </>
  );
};
