export async function getMeals(id) {
  const url = id
    ? `http://localhost:3000/menu/${id}`
    : " http://localhost:3000/menu";
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
