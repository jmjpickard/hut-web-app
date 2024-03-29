import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import styles from "../components/styles.module.scss";
import { NewCalendar } from "../components/NewCalendar/newCalendar";
import { UpcomingEvents } from "../components/UpcomingEvents/UpcomingEvents";
import { Bookings } from "@prisma/client";
import { NewBooking } from "../components/NewBooking/NewBooking";
import { trpc } from "../utils/trpc";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export type upcoming = "all" | "selected" | "newEvent";

export const buildBookings = (data: any[]): Bookings[] => {
  return data.map((i: any) => ({
    id: i.id,
    owner: i.owner,
    title: i.title,
    description: i.description,
    start_date: i.start_date,
    end_date: i.end_date,
    approved: i.approved,
  }));
};

const Home: React.FC = () => {
  const [events, setEvents] = useState<Bookings[] | undefined>([]);
  const [upcomingState, setUpcomingState] = useState<upcoming>("all");
  const [selectedEvent, setSelectedEvent] = useState<Bookings | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    setEndDate(undefined);
  };

  useEffect(() => {
    if (upcomingState !== "selected") {
      setSelectedEvent(undefined);
    }
  }, [upcomingState]);

  const { error, isLoading } = trpc.getBookings.useQuery(undefined, {
    onSuccess: (data) => setEvents(buildBookings(data)),
  });

  if (error) {
    return <div>"An error has occurred: "{error.message}</div>;
  }

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
                onStartDateChange={handleStartDateChange}
                onEndDateChange={setEndDate}
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
                      loading={isLoading}
                      setUpcomingState={setUpcomingState}
                    />
                  );
                case "selected":
                  return (
                    <UpcomingEvents
                      events={events}
                      setEvents={setEvents}
                      selectedEvent={selectedEvent}
                      loading={isLoading}
                      setUpcomingState={setUpcomingState}
                    />
                  );
                case "newEvent":
                  return (
                    <NewBooking
                      startDate={startDate}
                      endDate={endDate}
                      setSelectedEvent={setSelectedEvent}
                      setUpcomingState={setUpcomingState}
                    />
                  );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withPageAuthRequired(Home);
