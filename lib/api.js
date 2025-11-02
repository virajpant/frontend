export async function fetchUserById(userId, token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch user");
    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
