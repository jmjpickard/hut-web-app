import { Bookings } from "@prisma/client";
import React, { SetStateAction } from "react";
import { Event } from "../EventComponent/Event";
import styles from "./selectedEvent.module.scss";

interface Props {
  booking: Bookings | undefined;
  setEvents: (value: SetStateAction<Bookings[] | undefined>) => void;
}

export const SelectedEvent: React.FC<Props> = ({
  booking,
  setEvents,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Selected booking</div>
      <div className={styles.bookingsContent}>
        <Event
          id={booking?.id}
          description={booking?.description}
          name={booking?.owner}
          start={booking?.start_date}
          end={booking?.end_date}
          approved={booking?.approved}
          setEvents={setEvents}
        />
      </div>
    </div>
  );
};
