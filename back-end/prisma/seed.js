const db = require("../libs/db.js");

async function main() {
  await db.menu.createMany({
    data: [
      {
        name: "Couscous",
        description:
          "Le couscous est d'une part une semoule de blé dur préparée à l'huile d'olive...",
        image: ["/images/menu/meals/kouskous.jpg"],
        price: [2000.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "Couscous noir",
        description:
          "Ce couscous noir qu'on ne trouve qu'en Algérie est peu connu en Tunisie...",
        image: ["/images/menu/meals/kouskousnoirpoisson.jpg"],
        price: [1500.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "osban",
        description: "L'osban est un plat cuisiné à base de panse de mouton...",
        image: ["/images/menu/meals/assbane.jpg"],
        price: [2200.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "bouzelouf",
        description:
          "La chtitha bouzelouf est une recette traditionnelle algéroise...",
        image: ["/images/menu/meals/bouzaloufe.jpg"],
        price: [1800.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "douara",
        description:
          "Le tajine douara est une recette ancestrale de la cuisine algérienne...",
        image: ["/images/menu/meals/douwara.jpg"],
        price: [1800.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "Riz au poulet",
        description:
          "Le riz au poulet hainanais est un plat composé de succulent poulet...",
        image: ["/images/menu/meals/elrouzebeljaje.jpg"],
        price: [2000.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "Mtewem",
        description: "Le mtewem ou tajine mtewem est un plat algérien...",
        image: ["/images/menu/meals/methoume.jpg"],
        price: [2500.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "rechta",
        description:
          "La rechta est un plat à base de pâtes fraîches artisanales...",
        image: ["/images/menu/meals/rachta.jpg"],
        price: [2000.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "trida",
        description: "La trida est un plat traditionnel algérien...",
        image: ["/images/menu/meals/trida.jpg"],
        price: [2000.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "Chakhchoukha",
        description:
          "La chakhchoukha est un mets de fête se composant de pâte de semoule émiettée...",
        image: ["/images/menu/meals/shakhshoukha.jpg"],
        price: [2000.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "chorba",
        description:
          "La chorba est une soupe traditionnelle d'Afrique du Nord...",
        image: ["/images/menu/meals/shourba.jpg"],
        price: [1700.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "tikarbanine",
        description:
          "Ce plat se compose de boulettes de semoule dans une sauce rouge piquante...",
        image: ["/images/menu/meals/tikarbanine.jpg"],
        price: [1300.0],
        type: "menu",
        amount: 1,
      },
      {
        name: "Baklava",
        description:
          "Le baklava est un dessert traditionnel commun aux anciens empires ottoman et perse...",
        image: ["/images/menu/desert/Baklava.jpg"],
        price: [300.0],
        type: "dessert",
        amount: 1,
      },
      {
        name: "Lham hlou",
        description:
          "Le lham hlou est un plat sucré algérien, fait à base de viande et de pruneaux...",
        image: ["/images/menu/desert/Lham hlou.jpg"],
        price: [1500.0],
        type: "dessert",
        amount: 1,
      },
      {
        name: "Kalb el louz",
        description:
          "Kalb el louz est une pâtisserie algérienne très populaire pendant le Ramadan...",
        image: ["/images/menu/desert/Kalb el louz.jpg"],
        price: [200.0],
        type: "dessert",
        amount: 1,
      },
      {
        name: "Qatayef",
        description:
          "Le katayef est une pâtisserie levantine à base de pâte à crêpe farcie...",
        image: ["/images/menu/desert/Qatayef.jpg"],
        price: [200.0],
        type: "dessert",
        amount: 1,
      },
      {
        name: "Baghrir",
        description:
          "Le baghrir, appelé aussi mille trous, est une crêpe répandue au Maghreb...",
        image: ["/images/menu/desert/Baghrir.jpg"],
        price: [150.0],
        type: "dessert",
        amount: 1,
      },
      {
        name: "Makroud",
        description:
          "Le makroud est une pâtisserie maghrébine à base de semoule et de pâte de dattes...",
        image: ["/images/menu/desert/Makroud.jpg"],
        price: [150.0],
        type: "dessert",
        amount: 1,
      },
      {
        name: "griwech",
        description:
          "La griwech est une pâtisserie roulée à base de farine, miel et eau de fleur d’oranger...",
        image: ["/images/menu/desert/griwech.jpg"],
        price: [150.0],
        type: "dessert",
        amount: 1,
      },
      {
        name: "zlabia",
        description:
          "La zlabia est une confiserie frite de la cuisine orientale...",
        image: ["/images/menu/desert/Zalabiyeh.jpg"],
        price: [200.0],
        type: "dessert",
        amount: 1,
      },
    ],
    skipDuplicates: true,
  });
  // Insert gallery items
  await db.gallery.createMany({
    data: [
      { url: "/images/gallery/gallery1.jpg" },
      { url: "/images/gallery/gallery2.jpg" },
      { url: "/images/gallery/gallery3.jpg" },
      { url: "/images/gallery/gallery4.jpg" },
      { url: "/images/gallery/gallery5.jpg" },
      { url: "/images/gallery/gallery6.jpg" },
      { url: "/images/gallery/gallery7.jpg" },
      { url: "/images/gallery/gallery8.jpg" },
      { url: "/images/gallery/gallery9.jpg" },
      { url: "/images/gallery/gallery10.jpg" },
      { url: "/images/gallery/gallery11.jpg" },
      { url: "/images/gallery/gallery12.jpg" },
      { url: "/images/gallery/gallery13.jpg" },
      { url: "/images/gallery/gallery14.jpg" },
      { url: "/images/gallery/gallery15.jpg" },
      { url: "/images/gallery/gallery16.jpg" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Menu data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);

    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
