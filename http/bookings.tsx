import { approveBookingReq } from "../pages/api/crud/approveBooking";

export const test = () => {
  return fetch("/api/hello").then((res) => {
    if (res.status === 401) {
      window.location.reload();
    }

    return res.json();
  });
};

export const getBookings = async () => {
  return await fetch("/api/crud/getBookings").then((res) => {
    if (res.status === 401) {
      window.location.reload();
    }

    return res.json();
  });
};

export interface approveProps {
  id: number;
  approve: boolean;
}

export const approveBooking = async ({ id, approve }: approveProps) => {
  return await fetch("/api/crud/approveBooking", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, approve }),
  });
};
