import styles from "./upcomingEvents.module.scss";
import { Bookings } from "@prisma/client";
import moment from "moment";
import clx from "classnames";
import { personColour } from "../NewCalendar/day";
import { useUser } from "@auth0/nextjs-auth0/client";
import { approveBooking, getBookings } from "../../http/bookings";
import { SetStateAction } from "react";

interface Props {
  events?: Bookings[];
  setEvents: (value: SetStateAction<Bookings[] | undefined>) => void;
}

interface EventProps {
  id?: number;
  name?: string;
  description?: string;
  start?: Date;
  end?: Date;
  approved?: boolean;
  setEvents: (value: SetStateAction<Bookings[] | undefined>) => void;
}

export const Event: React.FC<EventProps> = ({
  id,
  description,
  name,
  start,
  end,
  approved,
  setEvents,
}) => {
  const startDate = moment(new Date(start ?? ""))
    .add(1, "day")
    .format("DD MMM");
  const endDate = moment(new Date(end ?? "")).format("DD MMM YYYY");
  const { user } = useUser();
  return (
    <div
      className={clx(
        styles.event,
        styles[personColour[name as keyof typeof personColour]]
      )}
    >
      <div className={styles.header}>
        <div>{name}</div>
        <div>
          {startDate} - {endDate}
        </div>
      </div>
      <div className={styles.body}>
        <div>{description}</div>
        <div className={styles.approved}>
          <div>Approved: {approved ? "Yes" : "No"}</div>
          {user?.name === "Jack" && (
            <div className={styles.buttons}>
              <button
                className={clx(styles.button, {
                  [styles.approve]: !approved,
                  [styles.revoke]: approved,
                })}
                onClick={() => {
                  if (id) {
                    approveBooking({
                      id,
                      approve: !approved,
                    }).then(() => getBookings().then((res) => setEvents(res)));
                  }
                }}
              >
                {approved ? "Revoke" : "Approve"}
              </button>
            </div>
          )}
          {user?.name === name && (
            <div className={styles.buttons}>
              <button className={clx(styles.button, styles.cancel)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const UpcomingEvents: React.FC<Props> = ({ events, setEvents }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Upcoming bookings</div>
      <div className={styles.bookingsContent}>
        {events ? (
          events.map((event) => (
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
    </div>
  );
};
