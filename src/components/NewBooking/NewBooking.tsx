import { useUser } from "@auth0/nextjs-auth0/client";
import clx from "classnames";
import { personColour } from "../NewCalendar/day";
import styles from "../EventComponent/event.module.scss";
import moment from "moment";
import { Input } from "../input/input";
import { trpc } from "~/utils/trpc";
import { SetStateAction } from "react";
import { Bookings } from "@prisma/client";
import { buildBookings } from "~/pages";
import React from "react";

interface NewBookingProps {
  startDate?: string;
  endDate?: string;
  setEvents: (value: SetStateAction<Bookings[] | undefined>) => void;
}

const formatDate = (date: string) => moment(new Date(date)).format("DD MMM");

export const NewBooking: React.FC<NewBookingProps> = ({
  startDate,
  endDate,
  setEvents,
}: NewBookingProps) => {
  const { user } = useUser();
  const name = user?.name ?? "jack";
  const [description, setDescription] = React.useState<string>();

  const createBooking = trpc.createBooking.useMutation({
    onSuccess: (data) => {
      if (data) {
        setEvents(buildBookings(data));
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>New booking</div>
      <div
        className={clx(
          styles.event,
          styles[personColour[name as keyof typeof personColour]]
        )}
      >
        <div className={styles.header}>
          <div>{name}</div>
          <div>
            {startDate && formatDate(startDate)} -{" "}
            {endDate && formatDate(endDate)}
          </div>
        </div>
        <div className={styles.bodyNewBooking}>
          <div>Description</div>
          <Input onChange={(val) => setDescription(val)} />
        </div>
      </div>
      <div className={styles.confirmRow}>
        <button
          className={styles.newBookingButton}
          onClick={() => {
            if (startDate && endDate) {
              createBooking.mutate({
                start_date: startDate,
                end_date: endDate,
                description: description ?? "",
                title: "",
                owner: name,
                approved: false,
              });
            }
          }}
        >
          Confirm booking
        </button>
      </div>
    </div>
  );
};
