import Head from "next/head";
import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { getBookings } from "../http/bookings";
import styles from "../components/styles.module.scss";
import { NewCalendar } from "../components/NewCalendar/newCalendar";
import { UpcomingEvents } from "../components/UpcomingEvents/UpcomingEvents";
import { Bookings } from "@prisma/client";
import { SelectedEvent } from "../components/SelectedEvent/SelectedEvent";

export type upcoming = "all" | "selected" | "newEvent";

export default function Home() {
  const [events, setEvents] = useState<Bookings[] | undefined>([]);
  const [upcomingState, setUpcomingState] = useState<upcoming>("all");
  const [selectedEvent, setSelectedEvent] = useState<Bookings | undefined>();
  useEffect(() => {
    getBookings().then((res) => setEvents(res));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>The Hut</title>
        <meta name="description" content="The Hut booking site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
                  return <UpcomingEvents events={events} />;
                case "selected":
                  return <SelectedEvent booking={selectedEvent} />;
                case "newEvent":
                  return <UpcomingEvents events={events} />;
              }
            })()}
          </div>
        </div>
      </main>
    </div>
  );
}
