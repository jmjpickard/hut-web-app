import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { useWindowSize } from "../hooks/window";
import { getBookings } from "../http/bookings";
import styles from "../components/styles.module.scss";
import { NewCalendar } from "../components/NewCalendar/newCalendar";
import { UpcomingEvents } from "../components/UpcomingEvents/UpcomingEvents";
import { Login } from "../components/Login";

export interface ViewProps {
  view: "home" | "calendar";
  width: number;
}

export interface CalendarEvent {
  allDay?: boolean;
  title?: React.ReactNode;
  start?: Date;
  end?: Date;
  resource?: any;
  owner: "Jack" | "Charlie" | "Lily" | "M & D" | "Other";
  description: string;
  approved: boolean;
}

export interface ApiCalendarEvent {
  start_date: Date;
  end_date: Date;
  title: string;
  description: string;
  owner: "Jack" | "Charlie" | "Lily" | "M & D" | "Other";
  approved: boolean;
}

const convertToCalendarEvents = (events: ApiCalendarEvent[]) => {
  if (events.length > 0) {
    return events.map((event) => {
      return {
        start: event.start_date,
        end: event.end_date,
        owner: event.owner,
        title: event.title,
        description: event.description,
        approved: event.approved,
      };
    });
  }
};

export default function Home() {
  const [events, setEvents] = useState<CalendarEvent[] | undefined>();
  const [token, setToken] = useState<string | null>();
  useEffect(() => {
    if (window !== undefined) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const view = token ? "calendar" : "calendar";
  const [width] = useWindowSize();
  // useEffect(() => {
  //   getBookings().then((res: ApiCalendarEvent[]) => {
  //     const eventData = convertToCalendarEvents(res);
  //     setEvents(eventData);
  //   });
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>The Hut</title>
        <meta name="description" content="The Hut booking site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <NavBar view={view} width={width} />
          {token ? (
            <div className={styles.card}>
              <div className={styles.calendar}>
                <NewCalendar events={events} />
              </div>
              <UpcomingEvents events={events} />
            </div>
          ) : (
            <Login message="" />
          )}
        </div>
      </main>
    </div>
  );
}
