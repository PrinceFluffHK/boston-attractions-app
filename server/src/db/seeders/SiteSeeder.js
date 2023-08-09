import { Site, User } from "../../models/index.js";

class SiteSeeder {
  static async seed() {
    const garrett = await User.query().findOne("firstName", "Garrett")
    const matthew = await User.query().findOne("firstName", "Matthew")

    const siteData = [
      {
        name: "Boston Common",
        address: "139 Tremont St, Boston MA 02111",
        description: "Considered the oldest public park in the United States",
        setting: "Outdoors",
        image: "https://express-file-uploading-part-2-production.s3.amazonaws.com/Boston%2BCommon.jpeg",
        minimumAge: 0,
        yearEstablished: 1830,
        creatorId: garrett.id
      },
      {
        name: "Faneuil Hall",
        address: "Boston MA 02109",
        description: "For 280 years, Faneuil hall ('The Cradle of Liberty') has been a prominent meeting location for residents and visitors to Boston.",
        setting: "Indoors and Outdoors",
        image: "https://express-file-uploading-part-2-production.s3.amazonaws.com/Faneuil_Hall.jpeg",
        creatorId: garrett.id
      },
      {
        name: "The Paul Revere House",
        address: "19 North Square, Boston MA 02113",
        description: "Colonial house of American patriot and Founding Father Paul Revere during the time of the American Revolution.",
        setting: "Indoors",
        yearEstablished: 1680,
        minimumAge: 13,
        image: "https://express-file-uploading-part-2-production.s3.amazonaws.com/dusty.jpeg",
        creatorId: matthew.id
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