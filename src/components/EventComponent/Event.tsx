import { SetStateAction } from "react";
import { Bookings } from "@prisma/client";
import moment from "moment";
import { useUser } from "@auth0/nextjs-auth0/client";
import { personColour } from "../NewCalendar/day";
import { approveBooking, getBookings } from "../../../http/bookings";

import styles from "./event.module.scss";
import clx from "classnames";

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
                  [styles.approve as string]: !approved,
                  [styles.revoke as string]: approved,
                })}
                onClick={() => {
                  if (id) {
                    console.log("hello");
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
