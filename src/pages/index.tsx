import Head from "next/head";
import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { getBookings } from "../../http/bookings";
import styles from "../components/styles.module.scss";
import { NewCalendar } from "../components/NewCalendar/newCalendar";
import { UpcomingEvents } from "../components/UpcomingEvents/UpcomingEvents";
import { Bookings } from "@prisma/client";
import { NewBooking } from "../components/NewBooking/NewBooking";
import { trpc } from "../utils/trpc";

export type upcoming = "all" | "selected" | "newEvent";

export default function Home() {
  const [events, setEvents] = useState<Bookings[] | undefined>([]);
  const [upcomingState, setUpcomingState] = useState<upcoming>("all");
  const [selectedEvent, setSelectedEvent] = useState<Bookings | undefined>();
  useEffect(() => {
    getBookings().then((res) => {
      setEvents(res);
      const newSelectedEvent = events?.find((event) => event.id === res.id);
      setSelectedEvent(newSelectedEvent);
    });
  }, []);

  useEffect(() => {
    if (upcomingState !== "selected") {
      setSelectedEvent(undefined);
    }
  }, [upcomingState]);

  const hello = trpc.hello.useQuery({ msg: "client" });
  const bookings = trpc.getBookings.useQuery();
  console.log({ hello, bookings }, bookings.data);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.container}>
          <NavBar />
          <div className={styles.card}>
            <div className={styles.calendar}>
              <NewCalendar
                events={events}
                setUpcomingState={setUpcomingState}
                setSelectedEvent={setSelectedEvent}
              />
            </div>
            {(() => {
              switch (upcomingState) {
                case "all":
                  return (
                    <UpcomingEvents
                      events={events}
                      setEvents={setEvents}
                      selectedEvent={selectedEvent}
                    />
                  );
                case "selected":
                  return (
                    <UpcomingEvents
                      events={events}
                      setEvents={setEvents}
                      selectedEvent={selectedEvent}
                    />
                  );
                case "newEvent":
                  return <NewBooking />;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
