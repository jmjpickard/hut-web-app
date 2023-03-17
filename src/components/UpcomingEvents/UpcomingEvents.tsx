import styles from "./upcomingEvents.module.scss";
import { Bookings } from "@prisma/client";
import { SetStateAction } from "react";
import { Event } from "../EventComponent/Event";
import PropagateLoader from "react-spinners/PropagateLoader";

interface Props {
  events?: Bookings[];
  selectedEvent: Bookings | undefined;
  setEvents: (value: SetStateAction<Bookings[] | undefined>) => void;
  loading?: boolean;
}

export const UpcomingEvents: React.FC<Props> = ({
  events,
  selectedEvent,
  setEvents,
  loading,
}) => {
  const displayEvents = selectedEvent
    ? events?.filter((e) => e.id === selectedEvent.id)
    : events;
  return (
    <div className={styles.container}>
      <div className={styles.title}>Upcoming bookings</div>
      {loading ? (
        <PropagateLoader
          color={"#6aaeb2"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          className={styles.loader}
        />
      ) : (
        <div className={styles.bookingsContent}>
          {displayEvents ? (
            displayEvents.map((event) => (
              <div key={event.id}>
                <Event
                  id={event.id}
                  description={event.description}
                  name={event.owner}
                  start={event.start_date}
                  end={event.end_date}
                  approved={event.approved}
                  setEvents={setEvents}
                />
              </div>
            ))
          ) : (
            <div className={styles.nonEvent}>Nothing booked at the moment</div>
          )}
        </div>
      )}
    </div>
  );
};
