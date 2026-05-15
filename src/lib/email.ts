// ConvertKit credentials — fill these in from your ConvertKit account:
// API Key: https://app.convertkit.com/account_settings/advanced_settings (Public API Key)
// Form ID: the numeric ID from your form's URL, e.g. app.convertkit.com/forms/1234567
export const CONVERTKIT_API_KEY = "YOUR_CONVERTKIT_API_KEY";
export const CONVERTKIT_FORM_ID = "YOUR_FORM_ID";

export async function subscribeToNewsletter(
  email: string
): Promise<{ success: boolean; error?: string }> {
  // Dev/placeholder mode — simulate success so UI can be tested before credentials are set
  if (
    CONVERTKIT_API_KEY === "YOUR_CONVERTKIT_API_KEY" ||
    CONVERTKIT_FORM_ID === "YOUR_FORM_ID"
  ) {
    await new Promise((r) => setTimeout(r, 700));
    return { success: true };
  }

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
      }
    );
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.message || "Failed");
    return { success: true };
  } catch {
    return { success: false, error: "Couldn't subscribe — please try again." };
  }
}
