import styles from "./newBooking.module.scss";

interface NewBookingProps {}

export const NewBooking: React.FC<NewBookingProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>New booking</div>
    </div>
  );
};
