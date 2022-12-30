import Head from "next/head";
import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { getBookings } from "../http/bookings";
import styles from "../components/styles.module.scss";
import { NewCalendar } from "../components/NewCalendar/newCalendar";
import { UpcomingEvents } from "../components/UpcomingEvents/UpcomingEvents";
import { Bookings } from "@prisma/client";
import { useAuthentication } from "../hooks/useAuthentication";

export default function Home() {
  useAuthentication();

  const [events, setEvents] = useState<Bookings[] | undefined>([]);
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
          <a href="/api/auth/login">Login</a>
          <a href="/api/auth/logout">Logout</a>
          <div className={styles.card}>
            <div className={styles.calendar}>
              <NewCalendar events={events} />
            </div>
            <UpcomingEvents events={events} />
          </div>
        </div>
      </main>
    </div>
  );
}
