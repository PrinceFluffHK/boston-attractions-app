/* eslint-disable no-console */
import { connection } from "../boot.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"
import SiteSeeder from "./seeders/SiteSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding sites")
    await SiteSeeder.seed()

    console.log("seeding users")
    await UserSeeder.seed()

    console.log("seeding reviews")
    await ReviewSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder