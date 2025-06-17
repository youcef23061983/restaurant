import { useScroll, useTransform, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import reserver from "/images/landingimage/reserver.jpg";
import Calendar from "react-calendar";
import "./calendar.css";
import { useLoaderData } from "react-router-dom";

import { add, format } from "date-fns";
import { getReservation } from "../data/API";

import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AppContext } from "../data/AppProvider";
export const loader = async () => {
  return getReservation();
};

const Reservation = () => {
  const { formUser } = useContext(AppContext);
  const data = useLoaderData();
  console.log("reservation data ", data);

  const [isSubmitting, setIsSubmitting] = useState("idle");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
    capacity: null,
    customer_name: "",
    customer_phone: "",
    customer_email: "",
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
  const disabledCapacities = data
    ?.filter(
      (reservation) => reservation?.datetime === date?.dateTime?.toISOString()
    )

    ?.map((reservation) => reservation?.capacity);

  console.log(
    "disabled reservation",
    data?.map((x) => x.datetime)
  );
  console.log("date", date?.dateTime?.toISOString());
  console.log("Local time:", date?.dateTime?.toLocaleString());
  console.log("dateTime select", date?.dateTime);

  const peopleOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const guests = ["Sélectionnez le nombre de personnes", ...peopleOptions].map(
    (person, i) => (
      <option
        value={person}
        key={i}
        disabled={
          typeof person === "number" && disabledCapacities?.includes(person)
        }
      >
        {person}
      </option>
    )
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !date.dateTime ||
      !date.capacity ||
      !date.customer_name ||
      !date.customer_phone
    ) {
      setError("Please complete all required fields");
      return;
    }

    setIsSubmitting("submitting");
    setError(null);
    setSuccess(false); // Reset success state on new submission

    try {
      const payload = {
        datetime: date.dateTime.toISOString(),
        capacity: Number(date.capacity),
        customer_name: date.customer_name,
        customer_phone: date.customer_phone,
        customer_email: date.customer_email || null,
        customer_id: formUser?.id || null,
      };

      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_MENU_URL}/reservations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // First check if response exists
      if (!response) {
        throw new Error("No response from server");
      }

      // Then check if response is OK
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to make reservation");
      }

      const data = await response.json();
      setSuccess(true);

      setDate({
        justDate: null,
        dateTime: null,
        capacity: null,
        customer_name: "",
        customer_phone: "",
        customer_email: "",
      });
      setTimeout(() => {
        window.location.reload(); // Full page refresh
      }, 1500);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      console.error("Reservation error:", err);
    } finally {
      setIsSubmitting("idle"); // Always reset submitting state
    }
  };

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", isMediumScreen ? "0.2 0" : "0.05 0"],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const scrollParagraph = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const scrollHeader = useTransform(scrollYProgress, [0, 1], [200, 0]);

  return (
    <>
      <Helmet>
        <title>Reservation</title>
        <meta
          name="description"
          content="Make a reservation at our restaurant and enjoy a delightful dining experience."
        />
        <meta property="og:title" content="Reservation" />
        <meta
          property="og:description"
          content="Make a reservation at our restaurant and enjoy a delightful dining experience."
        />
        <meta property="og:image" content={reserver} />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reservation" />
        <meta
          name="twitter:description"
          content="Make a reservation at our restaurant and enjoy a delightful dining experience."
        />
        <meta name="twitter:image" content={reserver} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="reservation, dining, restaurant, booking"
        />
        <meta name="author" content="el bahja" />
      </Helmet>
      <img
        src={reserver}
        alt="Reservation"
        className="landingImg"
        loading="lazy"
      />
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

          {date.capacity && (
            <div className="mt-6 p-6 bg-[#F9FCE1] rounded-lg shadow-sm">
              <div className="space-y-4">
                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="customer_name"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="customer_name"
                      name="customer_name"
                      value={date.customer_name}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      className="w-full px-3 py-2 border-2 border-[#D47A3B] rounded bg-[#F5F0EA] text-black focus:outline-none focus:ring-2 focus:ring-[#D47A3B] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="customer_email"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="customer_email"
                      name="customer_email"
                      value={date.customer_email}
                      onChange={handleChange}
                      placeholder="Votre email"
                      className="w-full px-3 py-2 border-2 border-[#D47A3B] rounded bg-[#F5F0EA] text-black focus:outline-none focus:ring-2 focus:ring-[#D47A3B] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="customer_phone"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="customer_phone"
                      name="customer_phone"
                      value={date.customer_phone}
                      onChange={handleChange}
                      placeholder="Votre numéro de téléphone"
                      className="w-full px-3 py-2 border-2 border-[#D47A3B] rounded bg-[#F5F0EA] text-black focus:outline-none focus:ring-2 focus:ring-[#D47A3B] focus:border-transparent"
                      required
                    />
                  </div>
                  {date.dateTime &&
                    date.capacity &&
                    date.customer_name &&
                    date.customer_phone &&
                    date.customer_email && (
                      <button
                        className={`mt-6 px-6 py-3 rounded-md text-white font-medium transition-colors ${
                          isSubmitting === "submitting"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#D07739] hover:bg-[#F5F0EA]"
                        }`}
                        type="submit"
                      >
                        {isSubmitting === "submitting"
                          ? "Réservation en cours..."
                          : "Réserver"}
                      </button>
                    )}
                </form>
              </div>
            </div>
          )}

          {success && (
            <div className="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
              🎉 Votre réservation a été enregistrée avec succès !
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reservation;
