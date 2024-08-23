import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import reserver from "/images/landingimage/reserver.jpg";
import Calendar from "react-calendar";
import "./calendar.css";
import { add, format } from "date-fns";

const Reservation = () => {
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
    capacity: 0,
  });

  const getTimes = () => {
    if (!date.justDate) return [];

    const beginning = add(date.justDate, { hours: 12 });
    const end = add(date.justDate, { hours: 23 });
    const interval = 30;
    const times = [];

    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }
    return times;
  };

  const times = getTimes();

  const peopleOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const guests = ["Sélectionnez le nombre de personnes", ...peopleOptions].map(
    (person, i) => (
      <option value={person} key={i}>
        {person}
      </option>
    )
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({ ...prev, [name]: value }));
  };
  console.log(date);

  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      document.title = "Réservetion";
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = () => setMatches(media.matches);

      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", listener);
      } else {
        media.addListener(listener);
      }

      return () => {
        if (typeof media.removeEventListener === "function") {
          media.removeEventListener("change", listener);
        } else {
          media.removeListener(listener);
        }
      };
    }, [query]);

    return matches;
  };

  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const ref = useRef();
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    ref,
    offset: ["0 1", isMediumScreen ? "0.2 0" : "0.05 0"],
  });

  const scrollOpacity = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollParagraph = useTransform(scrollYProgress1, [0, 1], [-500, 0]);
  const scrollHeader = useTransform(scrollYProgress1, [0, 1], [500, 0]);
  console.log(getTimes());

  return (
    <>
      <img src={reserver} alt="Reservation" className="landingImg" />
      <div ref={ref} className="article">
        <motion.h2
          style={{ opacity: scrollOpacity, x: scrollHeader }}
          className="articleHeader"
        >
          Réservez Votre Table
        </motion.h2>
        <motion.p
          style={{ opacity: scrollOpacity, x: scrollParagraph }}
          className="articleParagraph"
        >
          Plongez dans l’ambiance chaleureuse et les saveurs authentiques d'El
          Bahja en réservant votre table dès aujourd'hui. Que ce soit pour une
          soirée intime, un repas en famille, ou une célébration spéciale, nous
          vous garantissons une expérience culinaire inoubliable. Pour assurer
          votre confort et vous offrir le meilleur service possible, nous vous
          recommandons de réserver à l'avance. Faites votre réservation en ligne
          ou par téléphone:(213) 00/00/00/00, et laissez-nous vous transporter
          au cœur de la tradition culinaire algérienne. Pour les groupes de neuf
          personnes ou plus, veuillez envoyer un e-mail à ----@------.com.
        </motion.p>
      </div>
      <div className="reservationForm">
        <div>
          <Calendar
            view="month"
            onClickDay={(date) =>
              setDate((prev) => ({ ...prev, justDate: date }))
            }
            value={date.justDate}
          />
        </div>

        <div className="calendarContainer">
          {date.justDate ? (
            <div className="timesContainer">
              {times.map((time, i) => (
                <button
                  key={`time-${i}`}
                  onClick={() =>
                    setDate((prev) => ({ ...prev, dateTime: time }))
                  }
                  className={`timeButton ${
                    date.dateTime && date.dateTime.getTime() === time.getTime()
                      ? "timeSelected"
                      : ""
                  }`}
                >
                  {format(time, "kk:mm")}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          {date.dateTime ? (
            <div className="capacitySelection">
              <label htmlFor="capacity">Choisir le nombre de personnes</label>
              <select
                name="capacity"
                id="capacity"
                value={date.capacity}
                onChange={handleChange}
                className="capacity"
              >
                {guests}
              </select>
            </div>
          ) : null}
          {date.capacity ? (
            <button className="mt-3 linkmenu">trouvez la table</button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Reservation;
