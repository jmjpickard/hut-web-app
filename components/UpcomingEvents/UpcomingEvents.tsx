import styles from "./upcomingEvents.module.scss";
import { Bookings } from "@prisma/client";

interface Props {
  events?: Bookings[];
}

interface EventProps {
  title?: string;
}

export const Event: React.FC<EventProps> = ({ title }) => {
  return (
    <div className={styles.event}>
      <div>{title}</div>
    </div>
  );
};

export const UpcomingEvents: React.FC<Props> = ({ events }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Upcoming bookings</div>
      <div className={styles.bookingsContent}>
        {events ? (
          events.map((event) => <Event title={event.owner} />)
        ) : (
          <div className={styles.nonEvent}>Nothing booked at the moment</div>
        )}
      </div>
    </div>
  );
};
