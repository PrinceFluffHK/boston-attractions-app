/* eslint-disable no-console */
import { connection } from "../boot.js"
import SiteSeeder from "./seeders/SiteSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding sites")
    await SiteSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder