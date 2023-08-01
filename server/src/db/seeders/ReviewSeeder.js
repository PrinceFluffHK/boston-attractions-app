import { Review, User, Site } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const bostonCommon = await Site.query().findOne("name", "Boston Common");
    const faneuilHall = await Site.query().findOne("name", "Faneuil Hall");
    const garrett = await User.query().findOne("email", "garrett@email.com");
    const matthew = await User.query().findOne("email", "matthew@email.com");

    await Review.query().insert({
      siteId: bostonCommon.id,
      userId: garrett.id,
      rating: 5,
      reviewBody: "Lots of sunlight, very cool sculpture, love the coding camp down the street!",
    });
    await Review.query().insert({
      siteId: faneuilHall.id,
      userId: matthew.id,
      rating: 1,
      reviewBody: "Terrible historical site, 0 dead bodies",
    });
    await Review.query().insert({
      siteId: faneuilHall.id,
      userId: garrett.id,
      rating: 2,
    });
  }
}

export default ReviewSeeder;
