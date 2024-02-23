import * as bcrypt from 'bcrypt';

export async function comparePasswords(
  enteredPassword: string,
  hashedPasswordFromDB: string,
): Promise<boolean> {
  try {
    const match = await bcrypt.compare(enteredPassword, hashedPasswordFromDB);
    return match;
  } catch (error) {
    // Handle error
    console.error('Error comparing passwords:', error);
    return false; // Return false in case of error
  }
}
