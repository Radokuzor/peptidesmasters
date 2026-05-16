export async function subscribeToNewsletter(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Failed");
    return { success: true };
  } catch {
    return { success: false, error: "Couldn't subscribe — please try again." };
  }
}
