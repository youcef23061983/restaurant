export async function getMeals(id) {
  const url = id
    ? `${import.meta.env.VITE_PUBLIC_MENU_URL}/menu/${id}`
    : `${import.meta.env.VITE_PUBLIC_MENU_URL}/menu`;

  // ? `http://localhost:3000/menu/${id}`
  // : " http://localhost:3000/menu";

  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch menu",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
}

export async function getReservation() {
  const res = await fetch(
    `${import.meta.env.VITE_PUBLIC_MENU_URL}/reservations`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw {
      message: "Failed to fetch menu",
      statusText: res.statusText,
      status: res.status,
    };
  }

  const data = await res.json();
  return data;
}
