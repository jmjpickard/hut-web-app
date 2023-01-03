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
      <div className={styles.title}>Selected</div>
      <div className={styles.bookingsContent}>
        <Event title={booking?.title} />
      </div>
    </div>
  );
};
