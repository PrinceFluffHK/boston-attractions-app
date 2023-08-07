import { Site } from "../../models/index.js";

class SiteSeeder {
  static async seed() {
    const siteData = [
      {
        name: "Boston Common",
        address: "139 Tremont St, Boston MA 02111",
        description: "Considered the oldest public park in the United States",
        setting: "Outdoors",
        image: "https://images.squarespace-cdn.com/content/v1/5bd469dd2727be0524ab0289/1613093676402-T2YPZRQ14EGOP86P6K4H/Boston+Common.jpg",
        minimumAge: 0,
        creatorId: 1
      },
      {
        name: "Faneuil Hall",
        address: "Boston MA 02109",
        description: "For 280 years, Faneuil hall ('The Cradle of Liberty') has been a prominent meeting location for residents and visitors to Boston.",
        setting: "Indoors and Outdoors",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Faneuil_Hall_%285813514354%29.jpg",
        creatorId: 1
      },
      {
        name: "The Paul Revere House",
        address: "19 North Square, Boston MA 02113",
        description: "Colonial house of American patriot and Founding Father Paul Revere during the time of the American Revolution.",
        setting: "Indoors",
        minimumAge: 13,
        image: "https://www.thefreedomtrail.org/sites/default/files/styles/image_width__720/public/content/slider-gallery/paul_revere_house_2015_0.jpg?itok=md-r4dsC",
        creatorId: 2
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