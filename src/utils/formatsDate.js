export function formatHourMinute(dateStr) {
  const dateObj = new Date(dateStr);

  // Extraire l'heure et les minutes locales
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  // Format final
  const time = `${hours}:${minutes}`;

  return time;
}

const memeSemaine = (date1, date2) => {
  const debutSemaine = (date) => {
    const jour = date.getDay() || 7; // Lundi = 1, Dimanche = 7
    date.setHours(0, 0, 0, 0); // Réinitialise l'heure locale pour une comparaison précise
    return new Date(date.setDate(date.getDate() - jour + 1)); // Début de la semaine (lundi)
  };

  return (
    debutSemaine(new Date(date1)).getTime() ===
    debutSemaine(new Date(date2)).getTime()
  );
};

export function formatDateDay(isoDate) {
  const date = new Date(isoDate);
  const joursSemaine = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];

  // Ajuster "hier" et "aujourd'hui" en heures locales
  const hier = new Date();
  hier.setDate(hier.getDate() - 1);
  hier.setHours(0, 0, 0, 0); // Début de "hier"

  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0); // Début d'aujourd'hui

  // Comparaisons pour aujourd'hui, hier et même semaine
  if (date.toDateString() === aujourdHui.toDateString()) {
    return "aujourd'hui";
  } else if (
    date.getTime() >= hier.getTime() &&
    date.getTime() < aujourdHui.getTime()
  ) {
    return "hier";
  } else if (memeSemaine(date, new Date())) {
    return joursSemaine[date.getDay()];
  }

  // Utiliser Intl.DateTimeFormat pour formater la date en français
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(date);

  return formattedDate;
}
