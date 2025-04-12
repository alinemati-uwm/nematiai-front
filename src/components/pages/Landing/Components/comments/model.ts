export interface commentItem {
  name: string;
  message: string;
  location: string;
  lat: number;
  lng: number;
}

const items: commentItem[] = [
  {
    name: "John Peterson",
    message:
      "I'm happy to see this site.\nThe tools are incredibly innovative.\nI can't wait to explore more features.",
    location: "Germany, Berlin",
    lat: 52.52,
    lng: 13.405,
  },
  {
    name: "Sarah Smith",
    message:
      "This AI tool is amazing!\nI love the design and usability.\nKeep up the great work.",
    location: "USA, New York",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    name: "Carlos Garcia",
    message:
      "Very user-friendly and powerful tools.\nThe photo generation feature is incredible.\nPerfect for creative projects.",
    location: "Spain, Madrid",
    lat: 40.4168,
    lng: -3.7038,
  },
  {
    name: "Emma Brown",
    message:
      "I’m impressed with the variety of options.\nChat AI works flawlessly and is intuitive.\nHighly recommend this platform.",
    location: "UK, London",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    name: "Akira Tanaka",
    message:
      "The Japanese language support is great.\nAI-generated photos are truly realistic.\nExcited to use this for my projects.",
    location: "Japan, Tokyo",
    lat: 35.6895,
    lng: 139.6917,
  },
  {
    name: "Sophia Martinez",
    message:
      "This site is a game changer for AI tools.\nI used it for a presentation and got compliments.\nAmazing work by the team.",
    location: "Mexico, Mexico City",
    lat: 19.4326,
    lng: -99.1332,
  },
  {
    name: "Liam Nguyen",
    message:
      "Superb AI tools and easy to navigate.\nThe chat feature feels like talking to a friend.\nI’ll recommend this to everyone.",
    location: "Vietnam, Hanoi",
    lat: 21.0285,
    lng: 105.8542,
  },
  {
    name: "Olivia Müller",
    message:
      "An excellent combination of features.\nI use it daily for creative tasks.\nTotally worth trying out.",
    location: "Germany, Munich",
    lat: 48.1351,
    lng: 11.582,
  },
  {
    name: "Mateo Rossi",
    message:
      "The tools are practical and well-designed.\nThe AI chat is surprisingly intelligent.\nGreat for daily use.",
    location: "Italy, Rome",
    lat: 41.9028,
    lng: 12.4964,
  },
  {
    name: "Aisha Khan",
    message:
      "I love how intuitive this site is.\nThe AI-generated images are stunning.\nI’ll use it for my photography projects.",
    location: "India, Mumbai",
    lat: 19.076,
    lng: 72.8777,
  },
  {
    name: "Ethan Johnson",
    message:
      "Fantastic platform for AI enthusiasts.\nThe performance is fast and smooth.\nHighly recommend to tech lovers.",
    location: "Canada, Toronto",
    lat: 43.6511,
    lng: -79.3835,
  },
  {
    name: "Chloe Martin",
    message:
      "I’m blown away by the photo tool.\nThe chat responses are very accurate.\nThis site has become my go-to tool.",
    location: "France, Paris",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    name: "Javier Gomez",
    message:
      "A great tool for content creators.\nIt has saved me so much time.\nI’ll definitely share it with my team.",
    location: "Argentina, Buenos Aires",
    lat: -34.6037,
    lng: -58.3816,
  },
  {
    name: "Sofia Ivanova",
    message:
      "The design is modern and sleek.\nAI tools are accurate and versatile.\nIt’s a pleasure to use this platform.",
    location: "Russia, Moscow",
    lat: 55.7558,
    lng: 37.6173,
  },
  {
    name: "Mohammed Ali",
    message:
      "A fantastic addition to AI toolkits.\nThe image generator is top-notch.\nI can’t wait to see future updates.",
    location: "UAE, Dubai",
    lat: 25.276,
    lng: 55.2962,
  },
  {
    name: "Luna Chang",
    message:
      "I’m impressed with the AI quality.\nGenerated images are lifelike and clear.\nKeep improving this great tool!",
    location: "China, Shanghai",
    lat: 31.2304,
    lng: 121.4737,
  },
  {
    name: "Noah Wilson",
    message:
      "Amazing experience using this site.\nThe tools are efficient and innovative.\nWould recommend it to anyone.",
    location: "Australia, Sydney",
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    name: "Hassan Yusuf",
    message:
      "A very useful platform for creativity.\nThe speed and accuracy are remarkable.\nThanks for providing such tools.",
    location: "Egypt, Cairo",
    lat: 30.0444,
    lng: 31.2357,
  },
  {
    name: "Emma Lee",
    message:
      "The variety of tools is impressive.\nI use it for both work and fun.\nI’m excited for future updates!",
    location: "South Korea, Seoul",
    lat: 37.5665,
    lng: 126.978,
  },
  {
    name: "William Brown",
    message:
      "This site has exceeded my expectations.\nThe chat tool feels like magic.\nHighly recommended for AI enthusiasts.",
    location: "USA, San Francisco",
    lat: 37.7749,
    lng: -122.4194,
  },
];

const commentsLandingModel = { items };

export default commentsLandingModel;
