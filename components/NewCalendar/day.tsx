import { daysProps } from "./newCalendar";
import styles from "./newCalendar.module.scss";
import clx from "classnames";

interface DayArgs {
  day: daysProps;
  topRow: boolean;
  onClick: (day: daysProps) => void;
}

const personColour = {
  Jack: "jack",
  Charlie: "charlie",
  Lily: "lily",
  "M&D": "mumAndDad",
};

export const Day: React.FC<DayArgs> = ({ day, topRow, onClick }: DayArgs) => {
  return (
    <div
      key={day.date}
      className={clx(styles.day, {
        [styles.topRow]: topRow,
        [styles.selected]: day.selected,
        [styles.booked]: day.booked,
      })}
      onClick={() => !day.booked && onClick(day)}
    >
      <div className={styles.dayNumber}>{day.day}</div>
      {day.booked && (
        <div
          className={clx(
            styles.bookedDay,
            styles[personColour[day.bookedBy as keyof typeof personColour]]
          )}
        ></div>
      )}
    </div>
  );
};
