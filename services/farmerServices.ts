import pool from "../config/dbConfig";

/**
 * Retrieves all users from the database.
 * @returns A promise that resolves with an array of all users.
 */
export const getAllUsers = async (): Promise<any[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows as any[];
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw new Error("Could not retrieve users");
  }
};

/**
 * Retrieves a user by ID from the database.
 * @param id - The ID of the user to retrieve.
 * @returns A promise that resolves with the user object or undefined if not found.
 */
export const getUserById = async (id: number): Promise<any | undefined> => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return (rows as any[])[0]; // Return the first row, if available.
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw new Error("Could not retrieve user");
  }
};

/**
 * Creates a new user in the database.
 * @param name - The name of the user.
 * @param email - The email of the user.
 * @param password - The hashed password of the user.
 * @returns A promise that resolves with the result of the insert operation.
 */
export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
};

/**
 * Deletes a user by ID from the database.
 * @param id - The ID of the user to delete.
 * @returns A promise that resolves with the result of the delete operation.
 */
export const deleteUser = async (id: number): Promise<any> => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw new Error("Could not delete user");
  }
};
