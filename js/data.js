/*
 * ===========================================================
 *  Travel data — edit this file to add countries and photos
 * ===========================================================
 *
 *  Each key must match the country name used by the map data, e.g.
 *    "Germany", "Portugal", "France", "Taiwan", "Japan",
 *    "United States of America", "United Kingdom", "South Korea", "Spain" ...
 *
 *  Put photos under photos/<folder>/ and point `src` at them.
 *  If a photo is missing, the site shows a gradient placeholder instead.
 *
 *  Fields:
 *    name      display name
 *    flag      flag emoji
 *    lat/lng   where the pin sits and where the camera flies to
 *    visited   when / where (free text)
 *    intro     short introduction shown with the photos
 *    photos[]
 *      src       photo path
 *      title     building name
 *      location  city / area
 *      year      when it was built
 *      story     the history behind it — an array of paragraphs
 */

const TRAVELS = {
  Germany: {
    name: "Germany",
    flag: "🇩🇪",
    lat: 48.14, lng: 11.58,
    visited: "Munich",
    intro: "Munich, capital of Bavaria — a Gothic Revival town hall, Baroque churches, and the “Athens on the Isar” that King Ludwig I dreamed up.",
    photos: [
      {
        src: "photos/germany/neues-rathaus.jpg",
        title: "New Town Hall (Neues Rathaus)",
        location: "Marienplatz, Munich",
        year: "1867–1908",
        story: [
          "Designed by Georg von Hauberrisser and built in three phases between 1867 and 1908, the New Town Hall is one of Germany's finest examples of Gothic Revival architecture.",
          "Its 85-metre tower holds the famous Glockenspiel: 43 bells and 32 life-size figures. The upper tier re-enacts the 1568 wedding of Duke Wilhelm V and Renata of Lorraine, complete with a jousting match. The lower tier shows the Coopers' Dance — legend says that after a 16th-century plague, the barrel-makers danced through the streets to coax frightened townspeople back outside.",
          "The golden Virgin Mary on the tall column at the right of the photo crowns the Mariensäule, raised in 1638 — it's where Marienplatz gets its name."
        ]
      },
      {
        src: "photos/germany/nationaltheater.jpg",
        title: "National Theatre (Bavarian State Opera)",
        location: "Max-Joseph-Platz, Munich",
        year: "1818 (rebuilt 1963)",
        story: [
          "Karl von Fischer's National Theatre opened in 1818, only to burn down in 1823. Leo von Klenze rebuilt it to the original design — the Corinthian portico and pediment are textbook Neoclassicism.",
          "It was a key stage for Richard Wagner: both Tristan und Isolde (1865) and Die Meistersinger von Nürnberg (1868) premiered here.",
          "Allied bombing destroyed the theatre in 1943, and it only reopened in 1963. Look closely at the frieze: “APOLLINI MVSISQVE REDDITVM MCMLXIII” — “Restored to Apollo and the Muses, 1963” — marks that rebirth."
        ]
      },
      {
        src: "photos/germany/propylaeen.jpg",
        title: "Propyläen",
        location: "Königsplatz, Munich",
        year: "1854–1862",
        story: [
          "King Ludwig I of Bavaria adored ancient Greece and wanted to turn Munich into an “Athens on the Isar”. Leo von Klenze modelled this gateway on the Propylaea of the Athenian Acropolis: a Doric colonnade flanked by two massive towers.",
          "It also commemorates the Greek War of Independence and Ludwig's son Otto, who became the first King of modern Greece in 1832. The reliefs on the towers depict scenes from that war.",
          "The irony: the gate was finished in 1862 — the very year Otto was overthrown and sent back to Bavaria."
        ]
      },
      {
        src: "photos/germany/altes-rathaus.jpg",
        title: "Old Town Hall (Altes Rathaus)",
        location: "Marienplatz, Munich",
        year: "1470–1480",
        story: [
          "Between 1470 and 1480, Jörg von Halsbach — also the architect of the Frauenkirche — rebuilt the Old Town Hall in its late Gothic form. It became the “old” one in 1874, when the council moved across the square to the New Town Hall.",
          "On the night of 9 November 1938, Joseph Goebbels gave an inflammatory speech in its great hall that unleashed Kristallnacht, the pogrom against Germany's Jews.",
          "Badly damaged in the Second World War, it was rebuilt to its historic appearance. Today the tower houses a toy museum — I walked right past its entrance that day."
        ]
      },
      {
        src: "photos/germany/asamkirche.jpg",
        title: "Asam Church (St. Johann Nepomuk)",
        location: "Sendlinger Straße, Munich",
        year: "1733–1746",
        story: [
          "The Asam brothers — Egid Quirin, a sculptor, and Cosmas Damian, a painter — bought the plot next to their house and built this church with their own money, originally as a private chapel.",
          "It's only about 8 metres wide, yet packed with gold, marble and frescoes, making it one of the most lavish works of late Baroque in southern Germany. The brothers could reportedly see the altar from their own window.",
          "Public pressure eventually forced them to open it to everyone, and it's now one of Munich's favourite hidden gems."
        ]
      },
      {
        src: "photos/germany/michaelskirche.jpg",
        title: "St. Michael's Church",
        location: "Kaufingerstraße, Munich",
        year: "1583–1597",
        story: [
          "Duke Wilhelm V of Bavaria built St. Michael's for the Jesuits. It is the largest Renaissance church north of the Alps and a landmark of the Counter-Reformation.",
          "In 1590, during construction, the original tower collapsed. The duke took it as a sign from heaven and ordered the church enlarged. Its barrel vault spans about 20 metres — in its day second only to St. Peter's in Rome.",
          "Between the two main doors, a bronze Archangel Michael defeats a demon. Down in the crypt lies Ludwig II, Bavaria's “fairy-tale king”."
        ]
      }
    ]
  },

  Japan: {
    name: "Japan",
    flag: "🇯🇵",
    lat: 34.8, lng: 135.6,
    visited: "Kyoto & Osaka",
    intro: "Spring in Kansai — dawn walks through Kyoto's temples and cherry blossoms, then Osaka's castle, canals and neon-lit streets.",
    photos: [
      {
        src: "photos/japan/kiyomizu-dera.jpg",
        title: "Kiyomizu-dera",
        location: "Higashiyama, Kyoto",
        year: "Founded 778 (main hall rebuilt 1633)",
        story: [
          "Kiyomizu-dera is said to have been founded in 778, taking its name — “pure water” — from the Otowa waterfall on its grounds. Fire destroyed it many times; the current main hall was rebuilt in 1633 by Tokugawa Iemitsu, the third Tokugawa shogun.",
          "Its famous stage juts out from the hillside about 13 metres above the ground, held up by eighteen huge zelkova pillars joined without a single nail.",
          "In Japanese, “jumping off the stage at Kiyomizu” means taking the plunge on a bold decision. In 1994 the temple became part of the Historic Monuments of Ancient Kyoto World Heritage Site."
        ]
      },
      {
        src: "photos/japan/yasaka-pagoda.jpg",
        title: "Yasaka Pagoda (Hōkan-ji)",
        location: "Higashiyama, Kyoto",
        year: "Rebuilt 1440",
        story: [
          "The five-storey pagoda of Hōkan-ji is said to trace back to Prince Shōtoku in the late 6th century, making the temple one of the oldest in Kyoto.",
          "Fire and lightning destroyed the pagoda several times. The tower standing today was rebuilt in 1440 with the support of Ashikaga Yoshinori, the sixth Muromachi shogun. At about 46 metres, it is one of the tallest wooden pagodas in Japan.",
          "I took this at dawn, before the crowds arrived — the stone-paved slope of Yasaka-dōri leading up to it is one of the most photographed streets in Kyoto."
        ]
      },
      {
        src: "photos/japan/yasaka-shrine.jpg",
        title: "Yasaka Shrine · Dance Hall",
        location: "Gion, Kyoto",
        year: "Founded c. 7th century",
        story: [
          "Yasaka Shrine, known for centuries as Gion-sha, is the guardian shrine of the Gion district. Its history is thought to reach back to the 7th century.",
          "In 869, during a deadly epidemic, Emperor Seiwa ordered a ritual to appease the god of this shrine: 66 decorated halberds, one for each province of Japan, were raised in the capital. That ceremony grew into the Gion Matsuri, held every July and one of the most famous festivals in Japan.",
          "The hall in my photo is the Buden, the shrine's dance stage. Each of its hundreds of paper lanterns carries the name of a local business that donated to the shrine — and at night they are all lit up."
        ]
      },
      {
        src: "photos/japan/gion-shirakawa.jpg",
        title: "Gion Shirakawa",
        location: "Gion, Kyoto",
        year: "Edo period townscape",
        story: [
          "The Shirakawa canal runs through the oldest part of Gion, Kyoto's geisha district. Wooden teahouses with bamboo blinds line its banks, and weeping willows and cherry trees hang over the water.",
          "These traditional machiya townhouses were built narrow and deep, because property taxes were once based on the width of a building's street frontage.",
          "The area is a protected historic preservation district. I walked along it early on a spring morning, when the cherry blossoms were just past their peak and the streets were still quiet."
        ]
      },
      {
        src: "photos/japan/museum-of-kyoto.jpg",
        title: "Museum of Kyoto · Annex",
        location: "Sanjō-dōri, Kyoto",
        year: "1906",
        story: [
          "This red-brick building opened in 1906 as the Kyoto branch of the Bank of Japan. It was designed by Tatsuno Kingo — the architect of Tokyo Station — together with his student Nagano Uheiji.",
          "The bold red brick striped with white stone, together with its corner turrets, is so typical of his work that in Japan it's simply called the “Tatsuno style”.",
          "It is now a designated Important Cultural Property and serves as the annex of the Museum of Kyoto, hosting exhibitions and concerts. I passed it late at night, when the façade was lit up against the dark sky."
        ]
      },
      {
        src: "photos/japan/osaka-castle.jpg",
        title: "Osaka Castle",
        location: "Osaka",
        year: "Begun 1583 (current keep 1931)",
        story: [
          "In 1583 Toyotomi Hideyoshi began building a dazzling castle on the site of the Ishiyama Hongan-ji temple — a symbol of his power as he unified Japan.",
          "In the Summer Siege of Osaka in 1615, Tokugawa Ieyasu took the castle and the Toyotomi clan was wiped out. The Tokugawa rebuilt it, even re-laying the stone walls, but the keep burned after a lightning strike in 1665.",
          "Today's keep was rebuilt in reinforced concrete in 1931, paid for by donations from Osaka's citizens and modelled on Toyotomi-era folding screens. The top floor is decorated with golden tigers and shachihoko. The glass elevator beside it was added later for accessibility."
        ]
      },
      {
        src: "photos/japan/miraiza-osakajo.jpg",
        title: "Miraiza Osaka-jo",
        location: "Osaka Castle Park, Osaka",
        year: "1931",
        story: [
          "This castle-like building was completed in 1931, the same year Osaka Castle's keep was rebuilt. It was the headquarters of the Imperial Japanese Army's 4th Division — and its turrets and battlements were designed to look like a medieval European fortress.",
          "After the Second World War it housed the Osaka police headquarters, and from 1960 to 2001 it was the Osaka City Museum.",
          "After sixteen years standing empty, it reopened in 2017 as Miraiza Osaka-jo, with restaurants, cafés and a rooftop terrace looking out over the castle keep."
        ]
      },
      {
        src: "photos/japan/dotonbori-glico.jpg",
        title: "Dōtonbori & the Glico Man",
        location: "Namba, Osaka",
        year: "Canal dug 1612–1615",
        story: [
          "Dōtonbori takes its name from Yasui Dōton, the merchant who began digging this canal in 1612. He died in the Siege of Osaka before it was finished; his relatives completed it in 1615.",
          "In the Edo period the canal banks were lined with kabuki and bunraku theatres, and the area has been Osaka's entertainment district ever since — famous for the motto kuidaore, “eat until you drop”.",
          "The running man on the billboard is the Glico Man, a candy advertisement that has stood here since 1935. Today's sign is an LED version, and copying his victory pose on Ebisu Bridge is a rite of passage for every visitor."
        ]
      },
      {
        src: "photos/japan/tsutenkaku.jpg",
        title: "Tsutenkaku",
        location: "Shinsekai, Osaka",
        year: "1912 (current tower 1956)",
        story: [
          "The first Tsutenkaku went up in 1912 as the centrepiece of the Shinsekai (“New World”) entertainment district. Its design was audacious: an Arc de Triomphe on the bottom and an Eiffel Tower on top.",
          "Damaged by a nearby fire in 1943, it was dismantled and its steel donated to the war effort. The current tower, designed by “tower doctor” Tachu Naito, was rebuilt in 1956 with money raised by local residents. It stands about 103 metres tall.",
          "Inside sits Billiken, a lucky god whose feet you rub for good fortune. The Hitachi sign on the tower has been lit since 1957, and the streets below are one of the birthplaces of Osaka's kushikatsu."
        ]
      }
    ]
  },

  Portugal: {
    name: "Portugal",
    flag: "🇵🇹",
    lat: 38.72, lng: -9.14,
    visited: "Lisbon & Sintra",
    intro: "Where the Age of Discovery set sail. Three days from Belém's monastery and maritime monuments, up to Sintra's fairy-tale palaces, and back down to the Lisbon rebuilt after the great earthquake of 1755.",
    photos: [
      {
        src: "photos/portugal/jeronimos.jpg",
        title: "Jerónimos Monastery",
        location: "Belém, Lisbon",
        year: "Begun 1501",
        story: [
          "King Manuel I ordered the monastery around 1501 to celebrate Vasco da Gama's sea route to India. It was largely funded by taxes on the spice trade and took nearly a century to complete.",
          "It is the masterpiece of the Manueline style: a Gothic skeleton carved all over with ropes, coral, seaweed and armillary spheres, as if the Age of Discovery had been set in stone.",
          "Vasco da Gama and Portugal's great poet Luís de Camões are buried here. When the monastery was dissolved in 1834, the monks' custard-tart recipe passed to the bakery next door — today's famous pastéis de Belém. The monastery and Belém Tower became a World Heritage Site in 1983."
        ]
      },
      {
        src: "photos/portugal/belem-tower.jpg",
        title: "Belém Tower",
        location: "Belém, Lisbon",
        year: "1514–1519",
        story: [
          "Built between 1514 and 1519, Belém Tower guarded the mouth of the Tagus and the port of Lisbon — and was the last glimpse of home for countless fleets heading out to sea.",
          "It is richly Manueline too. One of its carvings is a rhinoceros, said to be modelled on the rhino sent from India to the king in 1515 — the same animal Albrecht Dürer made famous in his woodcut.",
          "The tower originally stood on a small island in the river; as the shoreline shifted, it ended up almost touching the land."
        ]
      },
      {
        src: "photos/portugal/padrao.jpg",
        title: "Monument to the Discoveries",
        location: "Belém, Lisbon",
        year: "1960",
        story: [
          "The monument began as a temporary structure for the Portuguese World Exhibition of 1940. It was rebuilt permanently in concrete and stone in 1960 for the 500th anniversary of the death of Prince Henry the Navigator.",
          "Standing about 52 metres tall, it is shaped like the prow of a caravel. Henry leads at the front holding a small ship, followed by explorers such as Vasco da Gama and Magellan, along with missionaries and scholars — 33 figures in all.",
          "The square in front is paved with a huge compass rose and world map, marking where and when Portuguese navigators reached each part of the globe."
        ]
      },
      {
        src: "photos/portugal/pena-palace.jpg",
        title: "Pena Palace",
        location: "Sintra",
        year: "1840s",
        story: [
          "A 16th-century monastery once stood on this hilltop, left almost in ruins after the 1755 earthquake. In 1838 the art-loving king consort Ferdinand II bought it and, with German architect Baron von Eschwege, turned it into a dreamlike Romantic palace.",
          "Gothic, Manueline, Moorish and Renaissance styles are mixed together and painted in bright red, yellow and tile-blue. It's considered a landmark of European Romanticism and is said to have inspired Bavaria's Neuschwanstein. Inside, I found a stone plaque carved “ANNO DE MDCCCXL” — the year 1840.",
          "On a clear day you can see all the way to the Atlantic from the terraces. The Cultural Landscape of Sintra became a World Heritage Site in 1995."
        ]
      },
      {
        src: "photos/portugal/initiation-well.jpg",
        title: "Quinta da Regaleira · Initiation Well",
        location: "Sintra",
        year: "1904–1910",
        story: [
          "Quinta da Regaleira belonged to António Augusto Carvalho Monteiro, a Brazilian-born tycoon nicknamed “Monteiro the Millionaire”. Between 1904 and 1910 he had Italian architect Luigi Manini fill the estate with mysterious symbols.",
          "This “Initiation Well” never held water. Its spiral staircase drops about 27 metres through nine levels, often read as Dante's nine circles of Hell, or as a Masonic or Templar initiation rite — descending from light into darkness before being reborn at the surface.",
          "At the bottom, tunnels lead out to the lake and grottoes of the estate — I took quite a few photos down there too."
        ]
      },
      {
        src: "photos/portugal/rua-augusta-arch.jpg",
        title: "Rua Augusta Arch",
        location: "Praça do Comércio, Lisbon",
        year: "Completed 1873",
        story: [
          "On 1 November 1755, Lisbon was struck by an earthquake, a tsunami and fire. The lower city was almost entirely destroyed, along with the royal palace by the river. The Marquis of Pombal led the reconstruction, laying out a new grid of streets with earthquake-resistant buildings.",
          "The arch was meant as the symbol of that rebirth, but it wasn't finished until 1873. At the top, Glory crowns Genius and Valour; below stand historic figures including Vasco da Gama and the Marquis of Pombal.",
          "The Latin inscription “VIRTVTIBVS MAIORVM UT SIT OMNIBVS DOCVMENTO” means “To the virtues of the ancestors, as a lesson to all.” Walk through it and you reach Praça do Comércio, where the royal palace once faced the Tagus."
        ]
      },
      {
        src: "photos/portugal/se-cathedral.jpg",
        title: "Lisbon Cathedral (Sé)",
        location: "Alfama, Lisbon",
        year: "Begun 1147",
        story: [
          "In 1147 Afonso Henriques, Portugal's first king, took Lisbon from the Moors and began building this cathedral on the site of the city's mosque. It is the oldest church in Lisbon.",
          "Two square towers and thick walls make it look like a fortress — typical of Romanesque architecture — with a rose window set between them.",
          "Earthquakes, including the one of 1755, damaged it many times, so the interior is a mix of styles from different eras. Tradition says Lisbon's patron saint, St. Anthony, was baptised here."
        ]
      }
    ]
  },

  France: {
    name: "France",
    flag: "🇫🇷",
    lat: 49.44, lng: 1.10,
    visited: "Rouen",
    intro: "Rouen, capital of Normandy — the “city of a hundred spires”, as Victor Hugo called it. I first wandered the old town on a bright morning between rain showers, and came back another day when a flea market filled the streets.",
    photos: [
      {
        src: "photos/france/cathedral.jpg",
        title: "Rouen Cathedral",
        location: "Place de la Cathédrale, Rouen",
        year: "12th–16th century",
        story: [
          "Notre-Dame de Rouen was built and rebuilt over four centuries, so its façade is a catalogue of Gothic styles — from early Gothic portals to the lace-like Flamboyant stonework of the late Middle Ages.",
          "The tower on the right is the Tour de Beurre, the “Butter Tower”. Legend has it that it was paid for by wealthy citizens who bought the right to keep eating butter during Lent.",
          "Claude Monet rented a room opposite in 1892–1894 and painted this façade more than thirty times, at every hour and in every kind of weather. Its cast-iron spire, finished in 1876, reaches 151 metres — the tallest in France — and the heart of Richard the Lionheart is buried inside."
        ]
      },
      {
        src: "photos/france/gros-horloge.jpg",
        title: "Gros-Horloge",
        location: "Rue du Gros-Horloge, Rouen",
        year: "Movement 1389 · dial 1529",
        story: [
          "The clock's mechanism dates from 1389, making it one of the oldest working clock movements in France. At first it had no face at all — it simply struck the hours from the belfry next door.",
          "Around 1527–1529 a Renaissance arch was built across the street and the clock was given two great golden dials, one on each side, about 2.5 metres across. There is only one hand, ending in a lamb, the symbol of Rouen; a small sphere above shows the phases of the moon.",
          "That morning I set out specifically to find this street — and it's still the busiest one in the old town, with everyone stopping under the arch to look up."
        ]
      },
      {
        src: "photos/france/saint-maclou.jpg",
        title: "Saint-Maclou Church",
        location: "Place Barthélémy, Rouen",
        year: "1437–1521",
        story: [
          "Saint-Maclou is one of the purest examples of Flamboyant Gothic — the late Gothic style named after its flame-like tracery. Parisian master mason Pierre Robin drew up the plans around 1437, and the church was consecrated in 1521.",
          "Its most famous feature is the curved west porch with five gables, fanning out towards the square like an open book of stone. The carved wooden doors beneath are Renaissance masterpieces.",
          "The 83-metre spire was only added in the 19th century. The church was badly damaged in the bombing of 1944 and needed a long restoration."
        ]
      },
      {
        src: "photos/france/sainte-jeanne-darc.jpg",
        title: "Church of Saint Joan of Arc",
        location: "Place du Vieux-Marché, Rouen",
        year: "1979",
        story: [
          "On 30 May 1431, Joan of Arc was burned at the stake in Rouen's old market square. This church, designed by Louis Arretche and dedicated in 1979, stands right next to the spot.",
          "Its sweeping roof is meant to evoke both the flames that killed Joan and an upturned Viking ship — a nod to Normandy's Norse past. Inside, the wooden ceiling curves overhead like the hull of a boat.",
          "The wall of colour comes from much older glass: 16th-century Renaissance windows from the church of Saint-Vincent, which was destroyed in 1944. The windows had been taken down for safekeeping before the bombing, and were built into this modern church instead."
        ]
      },
      {
        src: "photos/france/palais-de-justice.jpg",
        title: "Palais de Justice",
        location: "Rue aux Juifs, Rouen",
        year: "Begun 1499",
        story: [
          "Begun in 1499 for the Exchequer of Normandy, which later became the Parliament of Normandy, this is one of the most spectacular civic buildings of late Gothic France — every roofline bristles with pinnacles, gables and carved stone lace.",
          "The Allied bombing of 1944 hit it hard. Shell fragments pitted the walls, and some of those scars were deliberately left unrepaired so the war would never be forgotten.",
          "In 1976, workers repaving the courtyard uncovered something remarkable: the “Maison Sublime”, a Romanesque building from around 1100, carved with Hebrew graffiti. It is thought to be the oldest surviving Jewish monument in France — a reminder that this street, Rue aux Juifs, was once the heart of Rouen's Jewish quarter."
        ]
      },
      {
        src: "photos/france/saint-ouen.jpg",
        title: "Saint-Ouen Abbey Church",
        location: "Place du Général-de-Gaulle, Rouen",
        year: "1318–1549 (west front 1846–1851)",
        story: [
          "Saint-Ouen was the church of one of the most powerful Benedictine abbeys in Normandy. The current building was begun in 1318 and finished in the 16th century; it is almost as large as the cathedral, and many consider its soaring, light-filled nave even more elegant.",
          "The twin-spired west front in my photo is younger than it looks: it was only completed in the Gothic Revival style between 1846 and 1851, replacing a façade that had never been finished.",
          "Inside is one of the great organs of France, built by Aristide Cavaillé-Coll in 1890. On the day I visited, a photography exhibition was set up along the railings out front."
        ]
      },
      {
        src: "photos/france/croix-de-pierre.jpg",
        title: "Fontaine de la Croix-de-Pierre",
        location: "Croix-de-Pierre quarter, Rouen",
        year: "Rebuilt 1861",
        story: [
          "This spire-shaped fountain gave the whole Croix-de-Pierre (“Stone Cross”) quarter its name — an ancient stone cross once stood on this spot.",
          "What you see is a Neo-Gothic copy: when it was rebuilt in 1861 it was also moved a few metres, while the original Gothic fountain went to the garden of Rouen's Museum of Antiquities. The fountain was destroyed in the fighting of August 1944 and rebuilt again after the war.",
          "It used to be a public fountain where residents fetched water, fed by a nearby spring and a cistern 13 metres underground. With the weekend flea market around it, the square is still the heart of the neighbourhood."
        ]
      },
      {
        src: "photos/france/monument-forains.jpg",
        title: "War Memorial to the Fairground Showmen",
        location: "Rouen",
        year: "1931",
        story: [
          "The curved colonnade reads “AUX FORAINS MORTS GLORIEUSEMENT POUR LA PATRIE 1914–1918” — “To the fairground people who died gloriously for their country.” It is the only First World War memorial in France dedicated to travelling showmen.",
          "After the war, fairground families formed a committee to build a memorial. Turned down by Paris and elsewhere, they chose Rouen, home every autumn to one of France's biggest fairs, the Foire Saint-Romain.",
          "The sculpture is by Maxime Real del Sarte: two lions pull a chariot while a winged Glory raises a laurel crown in one hand and supports a dying soldier with the other. The plaque at the base was added in 1949 for the dead of the Second World War. The memorial was listed as a French historic monument in 2022."
        ]
      }
    ]
  },

  Taiwan: {
    name: "Taiwan",
    flag: "🇹🇼",
    lat: 24.79, lng: 120.99,
    visited: "Hsinchu · National Tsing Hua University",
    intro: "National Tsing Hua University re-established itself in Hsinchu in 1956. Its lakes, bridges and buildings old and new tell the story of a university that journeyed from Beijing to Taiwan.",
    photos: [
      {
        src: "photos/taiwan/chenggong-lake.jpg",
        title: "Chenggong Lake",
        location: "NTHU, Hsinchu",
        year: "Japanese colonial era",
        story: [
          "Chenggong Lake is the largest of the three lakes on campus, covering about 3 hectares. It was actually dug during the Japanese colonial era as a reservoir for fire-fighting — before Tsing Hua ever arrived in Hsinchu.",
          "In the university's early years the water was so clear that students fished in it for extra dinner. But with no fresh inflow, decades of silt left it murky.",
          "In 2022, backed by about NT$60 million in alumni donations, the university launched the biggest restoration since its founding in Taiwan: dredging, cleaning the water, and adding a waterside dock, a lakeside path and night lighting — making the lake the heart of campus again."
        ]
      },
      {
        src: "photos/taiwan/kegong-bridge.jpg",
        title: "Kegong Bridge",
        location: "Chenggong Lake, NTHU",
        year: "1965",
        story: [
          "This little wooden-railed bridge leads to the island in Chenggong Lake. It was built in 1965 — the post is still carved with “Built in the 54th year of the Republic of China”.",
          "It was funded by alumnus Chai Ke-bin (class of 1943) in memory of his brother Chai Ke-gong, also a Tsing Hua graduate — hence the name Kegong Bridge.",
          "A small bridge with a story of brotherly love behind it, and a reminder of the alumni who keep giving back to their university."
        ]
      },
      {
        src: "photos/taiwan/zhushi-building.jpg",
        title: "College of Education Building",
        location: "NTHU, Hsinchu",
        year: "2025",
        story: [
          "This striking new building is home to NTHU's Tsing Hua College of Education (Zhushi), with eight floors above ground and two below. It officially opened in October 2025.",
          "The great red beam frames a giant doorway called the “Hongdao Gate” (弘道之門, “spreading the Way”), a symbol of teaching passed down from one generation to the next.",
          "NTHU merged with National Hsinchu University of Education in 2016, and the education faculty stayed on the old Nanda campus. With this building, nearly two thousand students and staff moved to the main campus, ending nine years of being split between two sites."
        ]
      }
    ]
  }
};

/* "Hello" in many languages, floating up from the globe; lat/lng is where each one appears */
const HELLOS = [
  { text: "Hello", lat: 39, lng: -98 },
  { text: "Hello", lat: 53, lng: -1.5 },
  { text: "Bonjour", lat: 46.6, lng: 2.4 },
  { text: "Hola", lat: 40.3, lng: -3.7 },
  { text: "¡Hola!", lat: 23.6, lng: -102.5 },
  { text: "Ciao", lat: 42.8, lng: 12.5 },
  { text: "Hallo", lat: 51.2, lng: 10.4 },
  { text: "Olá", lat: -10.3, lng: -53.2 },
  { text: "Привет", lat: 60, lng: 90 },
  { text: "こんにちは", lat: 36.2, lng: 138.3 },
  { text: "你好", lat: 34, lng: 104 },
  { text: "哈囉", lat: 23.7, lng: 121 },
  { text: "안녕하세요", lat: 36.5, lng: 127.8 },
  { text: "नमस्ते", lat: 22, lng: 79 },
  { text: "مرحبا", lat: 24, lng: 45 },
  { text: "Merhaba", lat: 39, lng: 35 },
  { text: "Γειά σου", lat: 39, lng: 22 },
  { text: "Hej", lat: 62, lng: 15 },
  { text: "สวัสดี", lat: 15.8, lng: 101 },
  { text: "Xin chào", lat: 16, lng: 107.8 },
  { text: "Jambo", lat: 0, lng: 37.9 },
  { text: "Sawubona", lat: -29, lng: 25 },
  { text: "Kia ora", lat: -41, lng: 174 },
  { text: "G'day", lat: -25, lng: 134 },
  { text: "Salam", lat: 32.4, lng: 53.7 },
  { text: "Halo", lat: -2.5, lng: 118 },
  { text: "Kamusta", lat: 12.9, lng: 122 },
  { text: "Sain uu", lat: 46.9, lng: 103.8 },
  { text: "Shalom", lat: 31, lng: 34.9 },
  { text: "Hallå", lat: 64.9, lng: -18 },
  { text: "Aloha", lat: 20.8, lng: -156.3 },
  { text: "Hei", lat: 64, lng: 26 }
];
