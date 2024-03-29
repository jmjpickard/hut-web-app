import { daysProps } from "./newCalendar";
import styles from "./newCalendar.module.scss";
import clx from "classnames";

interface DayArgs {
  day: daysProps;
  topRow: boolean;
  onClick: (day: daysProps) => void;
}

export const personColour = {
  Jack: "jack",
  Isobel: "jack",
  Charlie: "charlie",
  Lily: "lily",
  "M&D": "mumAndDad",
};

export const Day: React.FC<DayArgs> = ({ day, topRow, onClick }: DayArgs) => {
  return (
    <div
      key={day.date}
      className={clx(styles.day, {
        [styles.topRow as string]: topRow,
        [styles.selected as string]: day.selected,
        [styles.booked as string]: day.booked,
      })}
      onClick={() => onClick(day)}
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
