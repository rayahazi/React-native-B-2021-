import Country from "../models/Country";

export const COUNTRIES = [
    new Country('c1', 'Israel', 'darkcyan'),
    new Country('c2', 'France', 'coral'),
    new Country('c3', 'Iceland', 'darksalmon'),
    new Country('c4', 'Brazil', 'darkviolet'),
    new Country('c5', 'Spain', 'firebrick'),
    new Country('c6', 'Norway', 'gold'),
    new Country('c7', 'USA', 'green'),
    new Country('c8', 'England', 'lightpink'),
    new Country('c9', 'China', 'lightslategrey'),
    new Country('c10', 'Ireland', 'mediumorchid'),
]

// import:
import Trip from "../models/Trip";

// add data for Trips:

export const TRIPS = [
  new Trip(
    "t1",
    ["c1"], // Array of countries id's
    "JERUSALEM DAY TOUR",
    "affordable",
    "simple",
    "https://media.audleytravel.com/-/media/images/home/north-africa-and-the-middle-east/israel/places/istock_691476048_jerusalem_letterbox.jpg?q=79&w=1920&h=640",
    "1 day",
    "Day tour in jerusalem city...",
    [
      `08:00 – Old City Tour`,
      `11:00 - Tour of Mount Zion`,
      `12:00 - Panoramic views of Jerusalem from the Haas Promenade`,
      `12:30 - Tour the First Station, the Israeli Parliament, the Rose Garden, and more`,
      `16:00 - Explore the Machane Yehuda Market`,
    ],
    true,
    true,
    false,
    true
  ),
  new Trip(
    "t2",
    ["c2"],
    "Canary Islands Walking - La Gomera and Tenerife",
    "priecy",
    "trek",
    "https://cdn.tourradar.com/s3/tour/1500x800/124760_a6b909f2.jpg",
    "8 days",
    "Start and end in San Miguel de Abona! With the Hiking & Trekking tour Canary Islands Walking - La Gomera and Tenerife, you have a 8 days tour package taking you through San Miguel de Abona, Spain and 5 other destinations in Spain. Canary Islands Walking - La Gomera and Tenerife includes accommodation in a hotel as well as an expert guide, meals, transport and more.    ",
    [
      "Day 1: Join trip in Los Cristianos, Tenerife; ferry to La Gomera Island",
      "Day 2: Walk from Vallehermoso to coastal town of Agulo",
      "Day 3: Explore the ancient cloud forest and ascend Alto de Garajonay",
      "Day 4: Descend to Chejelipes via La Laja village; free afternoon",
      "Day 5: Free day to relax or enjoy an optional walk",
      "Day 6: Walk to the black sand beach of Playa Caleta",
      "Day 7: Ferry back to Tenerife; circular walk on El Teide",
      "Day 8: Trip ends in San Miguel de Abona, Tenerife",
    ],
    false,
    false,
    true,
    false
  ),
  new Trip(
    "t3", // id
    ['c9'], // countryIds
    "How to Visit The Forbidden City", // title
    "pricey", // affordability
    "challanging", // complexity
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F2.bp.blogspot.com%2F-9G6w8y6174M%2FURD4388aElI%2FAAAAAAAAQd4%2FPwGeK1CS8Mw%2Fs1600%2FForbidden%2BCity%2BBeijing%2BChina%2B16.jpg&f=1&nofb=1", //imageUrl
    "3 days", //duration
    "As the seat of power for hundreds of years, Beijing is full of examples of imperial extravagance and architectural design. In no place are these on better display than the Forbidden City, also known as the Palace Museum or gu gong in Chinese.", //description
    [
      `Day 1:
      Tiananmen Square – China's iconic public square
      Forbidden City – explore the immense palace complex that was home to China's emperors for more than 400 years
      Jingshan Park – a charming park with panoramic views of the Forbidden City
      Lunch – at a traditional hutong home
      Hutong Rickshaw Tour with Local Family Visit – explore Beijing's narrow hutongs from the back of a rickshaw and see how local people live
      Houhai lake – stroll around this scenic lake and get a glimpse of local life
      Drum Tower – enjoy bird's-eye views of Beijing's traditional hutong area from the top of this historic building
      Acrobatic Show at Chaoyang Theater – prepare to be amazed by this popular acrobatic show (seating: rows`,
      `Day 2:
      Mutianyu Great Wall – this scenic section of the Great Wall has been restored but is still far less touristy (with toboggan and cable car)
      Lunch – fresh trout and other Chinese dishes
      Ming Tombs & Sacred Way – enjoy a peaceful walk along the Sacred Way and explore the magnificent final resting places of China's emperors`,
      `Day 3:
      Tai Chi Class – do some relaxing morning exercise in the historic Temple of Heaven park
      Temple of Heaven – browse this magnificent temple complex and learn about Chinese sacrificial culture
      Lunch – Peking duck
      Summer Palace – a masterpiece of Chinese imperial garden design
      Chinese Tea Experience – spend a relaxing couple of hours in a tranquil tea house
      Olympic Venues – see the iconic sports venues from the 2008 Beijing Olympics, Bird's Nest stadium and Water Cube (outside view only)`,
    ], //steps
    true, //isFamilyAvailable
    false, //isSuitableForDisabled
    true, //isWaterAccess
    true //isUrban
  ),
  new Trip(
    "t4",
    ['c7'],
    "New York Day Tour",
    "Pricy",
    "Simple",
    "https://blog-www.pods.com/wp-content/uploads/2019/04/MG_1_1_New_York_City-1.jpg",
    "2 Days",
    "let's axplore New York Together, 2 Day Trip in The Big Apple...",
    [
      `Day 1`,
      '08:00 - Meeting in Starbaks For Coffe and Donut',
      `08:30 - Taking the ferry To Librety Islend `,
      `10:00 - Tour in Ellis Islend`,
      `12:00 - Lunch Break`,
      `13:00 - Central Park guided tour of Strawberry Fields`,
      `15:00 - Empire State Building`,
      `17:00 - Meeting For Dinner at One of the Best Restaurant in Manhettan`,
      `18:00 - Free Time for axplore Manhetten at night`,
      `Day 2`,
      `09:00 - Brooklyn Bridge Seen from the boat cruise`,
      `11:00 - The National 9/11 Memorial & Museum`,
      `12:00 - Lunch Break`,
      `13:00 - Federal Hall`,
      `14:00 - St. Paul's Chapel `,
      `15:00 - Times Square`,
      `17:00 - Broadway`
    ],
    true,
    false,
    true,
    true
  )
];

