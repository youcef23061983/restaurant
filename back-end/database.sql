CREATE TABLE menu (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT[],
    price NUMERIC(10, 2)[] NOT NULL,  -- Array of prices
    type TEXT CHECK (type IN ('menu', 'dessert', 'boissons')) NOT NULL,
    amount INTEGER DEFAULT 1
);

INSERT INTO menu ( name, description, image, price, type, amount) VALUES
( 'Couscous', 'Le couscous est d''une part une semoule de blé dur préparée à l''huile d''olive et d''autre part, une spécialité culinaire issue de la cuisine berbère, à base de couscous, de légumes, d''épices, d''huile d''olive et de viande ou de poisson.', ARRAY['/images/menu/meals/kouskous.jpg'], ARRAY[2000], 'menu', 1),
('Couscous noir', 'Ce couscous noir qu''on ne trouve qu''en Algérie est peu connu en Tunisie...', ARRAY['/images/menu/meals/kouskousnoirpoisson.jpg'], ARRAY[1500], 'menu', 1),
( 'osban', 'L''osban est un plat cuisiné à base de panse de mouton...', ARRAY['/images/menu/meals/assbane.jpg'], ARRAY[2200], 'menu', 1),
( 'bouzelouf', 'La chtitha bouzelouf est une recette traditionnelle algéroise...', ARRAY['/images/menu/meals/bouzaloufe.jpg'], ARRAY[1800], 'menu', 1),
( 'douara', 'Le tajine douara est une recette ancestrale de la cuisine algérienne...', ARRAY['/images/menu/meals/douwara.jpg'], ARRAY[1800], 'menu', 1),
( 'Riz au poulet', 'Le riz au poulet hainanais est un plat composé de succulent poulet...', ARRAY['/images/menu/meals/elrouzebeljaje.jpg'], ARRAY[2000], 'menu', 1),
( 'Mtewem', 'Le mtewem ou tajine mtewem est un plat algérien...', ARRAY['/images/menu/meals/methoume.jpg'], ARRAY[2500], 'menu', 1),
( 'rechta', 'La rechta est un plat à base de pâtes fraîches artisanales...', ARRAY['/images/menu/meals/rachta.jpg'], ARRAY[2000], 'menu', 1),
( 'trida', 'La trida est un plat traditionnel algérien...', ARRAY['/images/menu/meals/trida.jpg'], ARRAY[2000], 'menu', 1),
( 'Chakhchoukha', 'La chakhchoukha est un mets de fête se composant de pâte de semoule émiettée...', ARRAY['/images/menu/meals/shakhshoukha.jpg'], ARRAY[2000], 'menu', 1);
INSERT INTO menu (name, description, image, price, type, amount) VALUES
(
  'chorba',
  'La chorba, chorwa, chourpa, chorpa, chorpo, sorpa, chaṛḇa, est une soupe traditionnelle d''Afrique du Nord, des Balkans, de l''Europe de l''Est, de l''Asie centrale, du Moyen-Orient et de l''Asie du Sud.',
  ARRAY['/images/menu/meals/shourba.jpg'],
  ARRAY[1700.00],
  'menu',
  1
),
(
  'tikarbanine',
  'Ce plat se compose de boulettes de semoule, de forme ronde ou ovale, cuites dans une sauce rouge piquante, parfumée à la coriandre et à la menthe. Ces boules sont préparées avec de la semoule de blé (ou très rarement d''orge), d''huile, d''oignons et d''épices, un peu de sauce ainsi que beaucoup de coriandre et de menthe.',
  ARRAY['/images/menu/meals/tikarbanine.jpg'],
  ARRAY[1300.00],
  'menu',
  1
),
(
  'Baklava',
  'Le baklava est un dessert traditionnel commun aux peuples des anciens empires ottoman et perse. On trouve également ce dessert dans plusieurs régions telles que le Caucase, les Balkans, le Moyen-Orient et l''Afrique du Nord.',
  ARRAY['/images/menu/desert/Baklava.jpg'],
  ARRAY[300.00],
  'dessert',
  1
),
(
  'Lham hlou',
  'Le lham hlou, lham lahlou, ou tadjine lahlou, qui veut dire « viande sucrée » ou « tadjne doux », est un plat sucré algérien, fait à base de viande et de pruneaux principalement, avec éventuellement des abricots et décoré de raisins secs et d''amandes dans un sirop de sucre et d''eau de fleur d''oranger.',
  ARRAY['/images/menu/desert/Lham hlou.jpg'],
  ARRAY[1500.00],
  'dessert',
  1
),
(
  'Kalb el louz',
  'Kalb el louz ou qalb el louz est une pâtisserie algérienne, originaire de Constantine. Cette pâtisserie est une des plus populaires du pays. Elle est très largement consommée durant les soirées du mois sacré du ramadan avec un thé à la menthe ou du thé noir aux clous de girofle ou du café.',
  ARRAY['/images/menu/desert/Kalb el louz.jpg'],
  ARRAY[200.00],
  'dessert',
  1
),
(
  'Qatayef',
  'Le katayef, plus rarement transcrit qatayef en français ou atayef, est une pâtisserie levantine à base de pâte à crêpe, farcie de crème de lait, de pistache ou de noix.',
  ARRAY['/images/menu/desert/Qatayef.jpg'],
  ARRAY[200.00],
  'dessert',
  1
),
(
  'Baghrir',
  'Le baghrir, ghrayef, khringo, tibouâjajin, appelé aussi en français mille trous, est une crêpe répandue au Maghreb préparée à base de semoule ou de farine, de levure et de sel, servie chaude, généralement imbibée de beurre et de miel.',
  ARRAY['/images/menu/desert/Baghrir.jpg'],
  ARRAY[150.00],
  'dessert',
  1
),
(
  'Makroud',
  'Le makroud ou makrout, également orthographié maqroudh ou maqrouth, est une pâtisserie maghrébine, à base de semoule de blé et de pâte de dattes, reconnaissable à sa forme en losange. C''est une pâtisserie très populaire au Maghreb et également à Malte.',
  ARRAY['/images/menu/desert/Makroud.jpg'],
  ARRAY[150.00],
  'dessert',
  1
),
(
  'griwech',
  'La chebakia (ou chbakia), appelée également griwech (aussi griouech ou griwèche) en Algérie ou m''kharqa (ou l''mkharqa) au Maroc, est une pâtisserie de forme roulée originaire du Maghreb, à base de farine, de matière grasse, de miel et d''eau de fleur d''oranger.',
  ARRAY['/images/menu/desert/griwech.jpg'],
  ARRAY[150.00],
  'dessert',
  1
),
(
  'zlabia',
  'La zlabia, ou zelabia, parfois sous la forme jalebi, est une confiserie de la cuisine orientale traditionnelle. C''est une pâtisserie frite intermédiaire entre un gâteau et une confiserie. On la retrouve au Maghreb, en Afrique de l''Est, au Moyen-Orient, dans le sous-continent indien, en Asie du Sud.',
  ARRAY['/images/menu/desert/Zalabiyeh.jpg'],
  ARRAY[200.00],
  'dessert',
  1
);


INSERT INTO menu ( name, description, image, price, type, amount) VALUES
( 'les cigares',
 'Les cigares au dessert sont une spécialité sucrée qui évoque l''élégance et le raffinement de la pâtisserie orientale. Ces délices croustillants, en forme de rouleaux fins, sont faits de feuilles de brick délicatement dorées au four ou frites, et garnis d''une farce parfumée. Traditionnellement, la farce est composée d''amandes moulues, de sucre, de cannelle, et parfois de fleur d''oranger ou de miel, ce qui leur confère un goût riche et aromatique. Ils sont souvent servis avec un filet de miel ou saupoudrés de sucre glace, et accompagnés d''un thé à la menthe pour une expérience gastronomique authentique et gourmande.',
 ARRAY['/images/menu/desert/les cigares.jpg'], ARRAY[300.00], 'dessert', 1),

( 'hamoud blanc',
 'Hamoud Boualem Blanche est une boisson gazeuse traditionnelle de la célèbre marque algérienne Hamoud Boualem. Cette limonade emblématique, souvent simplement appelée Blanche se distingue par sa clarté et son goût rafraîchissant. Faite à partir d''ingrédients naturels, elle présente un goût subtil de citron avec une touche légèrement sucrée.',
 ARRAY['/images/menu/drinks/whitebighamoud.jpg', '/images/menu/drinks/whitesmallhamoud.jpg'], ARRAY[200.00, 100.00], 'boissons', 1),

( 'hamoud Selecto',
 'Le Selecto est une boisson de l''entreprise algérienne Hamoud Boualem. Il s''agit d''un soda au caramel, souvent assimilé au Coca-Cola en raison de sa couleur malgré une saveur radicalement différente de celle des colas. Si ce bandeau n''est plus pertinent, retirez-le.',
 ARRAY['/images/menu/drinks/blackbighamoud.jpg', '/images/menu/drinks/blacksmallhamoud.jpg'], ARRAY[200.00, 100.00], 'boissons', 1),

( 'hamoud citron',
 'Hamoud, une limonade aux arômes naturels de citron et sans édulcorant. Hamoud, une limonade aux subtiles huiles essentielles de citron, délicieusement rafraîchissante et sans édulcorant.',
 ARRAY['/images/menu/drinks/citronbighamoud.jpg', '/images/menu/drinks/citronsmallhamoud.jpg'], ARRAY[200.00, 100.00], 'boissons', 1),

( 'ifruit abricot',
 'La boisson iFruit Abricot est une création rafraîchissante qui capture la douceur naturelle et le parfum délicat de l''abricot. Ce soda fruité, légèrement pétillant, offre une explosion de saveurs authentiques à chaque gorgée, avec un équilibre parfait entre sucré et acidulé. Sa texture lisse et son goût juteux en font le compagnon idéal pour se désaltérer lors des journées ensoleillées ou pour apporter une touche fruitée à n''importe quel repas. Emballée dans un design moderne et coloré, la boisson iFruit Abricot est autant un plaisir pour les yeux que pour les papilles.',
 ARRAY['/images/menu/drinks/abricotbigifruit.jpg', '/images/menu/drinks/abricotsmallifruit.jpg'], ARRAY[200.00, 100.00], 'boissons', 1),

( 'ifruit orange',
 'La boisson iFruit Orange est une explosion de saveurs d''agrumes, offrant une expérience rafraîchissante et vivifiante. Ce soda pétillant est infusé de l''essence d''oranges juteuses, capturant à la fois leur douceur naturelle et leur vivacité acidulée. Chaque gorgée transporte les papilles vers un goût ensoleillé et énergisant, parfait pour étancher la soif par temps chaud ou pour accompagner un repas. Présentée dans un emballage vibrant qui reflète la fraîcheur et l''éclat des oranges, la boisson iFruit Orange est le choix idéal pour les amateurs de saveurs fruitées et pétillantes.',
 ARRAY['/images/menu/drinks/orangebigifruit.jpg', '/images/menu/drinks/orangesmallifruit.jpg'], ARRAY[200.00, 100.00], 'boissons', 1),

('ifruit raisin',
 'La boisson iFruit Raisin est une fusion pétillante de saveurs riches et sucrées, inspirée par la douceur naturelle des raisins mûrs. Ce soda gazéifié se distingue par son goût intense et fruité, offrant une expérience sensorielle luxuriante avec chaque gorgée. La boisson capture l''essence des grappes de raisin, équilibrant parfaitement leur saveur sucrée avec une touche légèrement acidulée, pour un rafraîchissement sophistiqué et satisfaisant. Avec son emballage élégant et son arôme enivrant, iFruit Raisin est le choix parfait pour ceux qui recherchent une boisson gourmande et pleine de caractère.',
 ARRAY['/images/menu/drinks/raisinsbigifuit.jpg', '/images/menu/drinks/raisinsmallifruit.jpg'], ARRAY[200.00, 100.00], 'boissons', 1),

( 'ramy',
 'Le cocktail Ramy est une boisson pétillante qui marie l''intensité des saveurs fruitées de Ramy avec une touche d''élégance. Chaque gorgée offre un équilibre parfait entre la douceur des fruits et une légère acidité, enrichie par des notes rafraîchissantes d''herbes ou d''épices. Parfait pour les soirées d''été ou les occasions festives, il se prépare généralement avec un mélange de soda Ramy, des fruits frais, et parfois un soupçon de menthe ou d''agrumes pour accentuer les saveurs. Servi bien frais avec des glaçons, le cocktail Ramy est une option délicieuse pour ceux qui cherchent à se désaltérer avec style tout en savourant une boisson originale et vivante.',
 ARRAY['/images/menu/drinks/bigramy.jpg', '/images/menu/drinks/smallramy.jpg'], ARRAY[200.00, 100.00], 'boissons', 1),

('N''gaous',
 'La boisson N''gaous est une infusion rafraîchissante qui capture les saveurs et les arômes de l''Algérie. Cette boisson est préparée en infusant des fruits frais, tels que des dattes ou des agrumes locaux, avec des herbes aromatiques comme la menthe ou la verveine. Le mélange est légèrement sucré et peut être servi glacé pour une expérience désaltérante. Parfait pour accompagner les repas ou pour se rafraîchir lors des journées chaudes, le N''gaous allie les saveurs fruitées à une touche d''herbes fraîches, créant ainsi une boisson à la fois authentique et revitalisante.',
 ARRAY['/images/menu/drinks/Ngaousbig.jpg', '/images/menu/drinks/Ngaoussmall.jpg'], ARRAY[200.00, 100.00], 'boissons', 1),

('orangina',
 'Orangina est une boisson gazeuse au goût d''orange, reconnue pour sa texture légèrement trouble due aux particules de pulpe d''orange en suspension. Avec un mélange de jus d''orange concentré et d''eau gazeuse, elle offre un goût fruité, acidulé et rafraîchissant. Servie bien fraîche, elle est souvent présentée dans une bouteille en forme d''orange, ajoutant une touche distinctive à cette boisson pétillante.',
 ARRAY['/images/menu/drinks/bigorangina.jpg', '/images/menu/drinks/smallorangina.jpg'], ARRAY[200.00, 100.00], 'boissons', 1);


INSERT INTO menu (name, description, image, price, type, amount)
VALUES 
(
  'rouiba',
  'Rouiba propose des boissons rafraîchissantes, incluant des jus de fruits naturels et des sodas. Les jus sont faits à partir de fruits frais, offrant des saveurs authentiques comme l''orange et la pomme. Les boissons gazeuses de Rouiba sont légèrement pétillantes et fruitées, idéales pour se désaltérer.',
  ARRAY['/images/menu/drinks/bigrouiba.jpg', '/images/menu/drinks/smallrouiba.jpg'],
  ARRAY[200.00, 100.00],
  'boissons',
  1
),
(
  'café',
  'Au sein d''un restaurant traditionnel, le café est préparé avec soin pour compléter l''expérience culinaire. Servi chaud, il est généralement offert dans des tasses élégantes, parfois accompagnées de petites douceurs comme des biscuits ou des pâtisseries. Le café peut être préparé de manière classique, comme un espresso fort et riche, ou sous d''autres formes telles que le café filtre ou le cappuccino, selon les préférences. La présentation peut varier, mais l''accent est souvent mis sur l''authenticité et la qualité des grains de café utilisés. Ce moment convivial est idéal pour conclure un repas avec une note chaleureuse et réconfortante, tout en permettant aux convives de prolonger leur expérience gastronomique.',
  ARRAY['/images/menu/drinks/café.jpg'],
  ARRAY[100.00],
  'boissons',
  1
),
(
  'thé',
  'Au sein d''un restaurant traditionnel, le thé est une boisson servie avec élégance et soin. Préparé avec des feuilles de thé de qualité, il peut être présenté dans une variété de styles, allant du thé noir classique au thé vert, en passant par des mélanges aromatiques comme le thé à la menthe ou le thé aux épices. Le thé est souvent accompagné de petites douceurs ou de pâtisseries pour enrichir l''expérience.',
  ARRAY['/images/menu/drinks/thé.jpg'],
  ARRAY[100.00],
  'boissons',
  1
);


-- //////create a gallery table:\\\\\\\\\\\\\\\\\\\\
CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL
);
INSERT INTO gallery ( url) VALUES
( '/images/gallery/gallery1.jpg'),
( '/images/gallery/gallery2.jpg'),
( '/images/gallery/gallery3.jpg'),
( '/images/gallery/gallery4.jpg'),
( '/images/gallery/gallery5.jpg'),
( '/images/gallery/gallery6.jpg'),
( '/images/gallery/gallery7.jpg'),
( '/images/gallery/gallery8.jpg'),
( '/images/gallery/gallery9.jpg'),
( '/images/gallery/gallery10.jpg'),
( '/images/gallery/gallery11.jpg'),
( '/images/gallery/gallery12.jpg'),
( '/images/gallery/gallery13.jpg'),
( '/images/gallery/gallery14.jpg'),
( '/images/gallery/gallery15.jpg'),
( '/images/gallery/gallery16.jpg');


-- ////////////////create user table :\\\\\\\\\\\\\\

-- to delete all data and set it to 0: TRUNCATE TABLE tbluser RESTART IDENTITY;

CREATE TABLE tbluser (
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    contact VARCHAR(15),
    accounts TEXT[],
    password TEXT,
    provider VARCHAR(10) NOT NULL DEFAULT 'local',
    country TEXT,
    currency VARCHAR(5) NOT NULL DEFAULT 'USD',
    user_role VARCHAR(10) NOT NULL DEFAULT 'customer' 
        CHECK (user_role IN ('customer', 'admin')),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);