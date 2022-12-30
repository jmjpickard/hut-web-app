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
