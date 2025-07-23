export function generateMonthlyProgram() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendar = {};

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const iso = date.toISOString().split("T")[0];
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    calendar[iso] = { type: weekday }; 
  }

  return calendar;
}
