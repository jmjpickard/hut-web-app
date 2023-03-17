import { useUser } from "@auth0/nextjs-auth0/client";
import clx from "classnames";
import { personColour } from "../NewCalendar/day";
import styles from "../EventComponent/event.module.scss";
import moment from "moment";
import { Input } from "../input/input";
import { trpc } from "~/utils/trpc";
import React, { Dispatch, SetStateAction } from "react";
import { upcoming } from "~/pages";
import { Bookings } from "@prisma/client";
import ClipLoader from "react-spinners/ClipLoader";

interface NewBookingProps {
  startDate?: string;
  endDate?: string;
  setUpcomingState: Dispatch<SetStateAction<upcoming>>;
  setSelectedEvent: Dispatch<SetStateAction<Bookings | undefined>>;
}

const formatDate = (date: string) => moment(new Date(date)).format("DD MMM");

export const NewBooking: React.FC<NewBookingProps> = ({
  startDate,
  endDate,
  setUpcomingState,
  setSelectedEvent,
}: NewBookingProps) => {
  const { user } = useUser();
  const utils = trpc.useContext();
  const name = user?.name ?? "jack";
  const [description, setDescription] = React.useState<string>();

  const createBooking = trpc.createBooking.useMutation({
    onSuccess: (data) => {
      if (data) {
        utils.getBookings.invalidate();
        setUpcomingState("selected");
        setSelectedEvent(data);
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <div className={styles.title}>New booking</div>
        <div
          className={styles.allBookings}
          onClick={() => setUpcomingState("all")}
        >
          All bookings
        </div>
      </div>

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
        {createBooking.isLoading ? (
          <ClipLoader
            color={"#6aaeb2"}
            loading={createBooking.isLoading}
            size={20}
            className={styles.loader}
          />
        ) : (
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
        )}
      </div>
    </div>
  );
};
