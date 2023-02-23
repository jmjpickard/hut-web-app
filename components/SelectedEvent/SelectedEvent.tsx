import { Bookings } from "@prisma/client";
import React from "react";
import { Event } from "../UpcomingEvents/UpcomingEvents";
import styles from "./selectedEvent.module.scss";

interface Props {
  booking: Bookings | undefined;
}

export const SelectedEvent: React.FC<Props> = ({ booking }: Props) => {
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
        />
      </div>
    </div>
  );
};
