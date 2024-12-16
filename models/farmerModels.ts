import pool from "../config/dbConfig";

/**
 * Farmer Model
 */
class Farmer {
  /**
   * Create a new farmer in the database.
   * @param name - Name of the farmer.
   * @param email - Email of the farmer.
   * @param location - Location of the farmer.
   * @returns The result of the insert operation.
   */
  static async createFarmer(
    name: string,
    email: string,
    location?: string
  ): Promise<any> {
    try {
      const [result] = await pool.query(
        "INSERT INTO farmers (name, email, location) VALUES (?, ?, ?)",
        [name, email, location || null]
      );
      return result;
    } catch (error) {
      console.error("Error creating farmer:", error);
      throw new Error("Could not create farmer");
    }
  }

  /**
   * Retrieve all farmers from the database.
   * @returns A promise that resolves with a list of farmers.
   */
  static async getAllFarmers(): Promise<any[]> {
    try {
      const [rows] = await pool.query("SELECT * FROM farmers");
      return rows as any[];
    } catch (error) {
      console.error("Error fetching farmers:", error);
      throw new Error("Could not retrieve farmers");
    }
  }

  /**
   * Retrieve a farmer by ID.
   * @param id - The ID of the farmer to retrieve.
   * @returns A promise that resolves with the farmer data.
   */
  static async getFarmerById(id: number): Promise<any | undefined> {
    try {
      const [rows] = await pool.query("SELECT * FROM farmers WHERE id = ?", [
        id,
      ]);
      return (rows as any[])[0];
    } catch (error) {
      console.error(`Error fetching farmer with ID ${id}:`, error);
      throw new Error("Could not retrieve farmer");
    }
  }

  /**
   * Update a farmer's details.
   * @param id - The ID of the farmer to update.
   * @param updates - The fields to update with their new values.
   * @returns The result of the update operation.
   */
  static async updateFarmer(
    id: number,
    updates: { name?: string; email?: string; location?: string }
  ): Promise<any> {
    try {
      const { name, email, location } = updates;
      const [result] = await pool.query(
        "UPDATE farmers SET name = ?, email = ?, location = ? WHERE id = ?",
        [name || null, email || null, location || null, id]
      );
      return result;
    } catch (error) {
      console.error(`Error updating farmer with ID ${id}:`, error);
      throw new Error("Could not update farmer");
    }
  }

  /**
   * Delete a farmer by ID.
   * @param id - The ID of the farmer to delete.
   * @returns The result of the delete operation.
   */
  static async deleteFarmer(id: number): Promise<any> {
    try {
      const [result] = await pool.query("DELETE FROM farmers WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      console.error(`Error deleting farmer with ID ${id}:`, error);
      throw new Error("Could not delete farmer");
    }
  }

  /**
   * Retrieve all products associated with a farmer.
   * @param farmerId - The ID of the farmer.
   * @returns A promise that resolves with a list of products.
   */
  static async getFarmerProducts(farmerId: number): Promise<any[]> {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM products WHERE farmerId = ?",
        [farmerId]
      );
      return rows as any[];
    } catch (error) {
      console.error(
        `Error fetching products for farmer ID ${farmerId}:`,
        error
      );
      throw new Error("Could not retrieve farmer's products");
    }
  }
}

export default Farmer;
