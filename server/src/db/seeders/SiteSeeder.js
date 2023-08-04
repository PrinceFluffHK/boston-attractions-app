import { Site } from "../../models/index.js";

class SiteSeeder {
  static async seed() {
    const siteData = [
      {
        name: "Boston Common",
        address: "139 Tremont St, Boston MA 02111",
        description: "Considered the oldest public park in the United States",
        setting: "Outdoor",
        minimumAge: 0,
        image: "https://static.displate.com/857x1200/displate/2020-03-12/c47b057f270b9101cfb4d462279d38b3_7477322f46cfe492f40beb04fe6d42ff.jpg"
      },
      {
        name: "Faneuil Hall",
        address: "Boston MA 02109",
        description: "For 280 years, Faneuil hall ('The Cradle of Liberty') has been a prominent meeting location for residents and visitors to Boston.",
        setting: "Hybrid",
        image: "https://static.displate.com/857x1200/displate/2020-03-12/c47b057f270b9101cfb4d462279d38b3_7477322f46cfe492f40beb04fe6d42ff.jpg",
      },
      {
        name: "The Paul Revere House",
        address: "19 North Square, Boston MA 02113",
        description: "Colonial house of American patriot and Founding Father Paul Revere during the time of the American Revolution.",
        setting: "Indoor",
        minimumAge: 13,
        image:"https://static.displate.com/857x1200/displate/2020-03-12/c47b057f270b9101cfb4d462279d38b3_7477322f46cfe492f40beb04fe6d42ff.jpg"
      },
    ];

    for (const singleSite of siteData) {
      const currentSite = await Site.query().findOne({ name: singleSite.name });
      if (!currentSite) {
        await Site.query().insert(singleSite);
      }
    }
  }
}

export default SiteSeeder;