"use server"

// Resend is imported lazily inside the action to avoid top-level crashes
// when RESEND_API_KEY is not yet available at module load time.

export type OrderData = {
  service: "gold" | "boosting" | "accounts" | "item"
  // Gold fields
  goldServer?: string
  goldFaction?: string
  goldAmount?: number
  goldCharacter?: string
  // Boosting fields
  boostType?: string
  boostCurrentLevel?: string
  boostDesiredLevel?: string
  boostSchedule?: string
  boostAddons?: string[]
  boostProfessions?: string[]
  arenaBracket?: string
  arenaRating?: number
  // Account fields
  characterId?: string
  accountType?: string
  accountClass?: string
  accountExpansion?: string
  // Item fields
  itemSlug?: string
  itemName?: string
  itemServer?: string
  itemFaction?: string
  itemQuantity?: number
  itemCharacter?: string
  // Contact
  email: string
  discord: string
  paymentMethod: string
  couponCode?: string
  notes?: string
  // Computed
  totalPrice: number
}

function buildEmailHtml(order: OrderData): string {
  const orderId = `EXO-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  const serviceLabels: Record<string, string> = {
    gold: "Gold Selling",
    boosting: "Character Boosting",
    accounts: "Accounts",
    item: `Item/Service: ${order.itemName || order.itemSlug || "N/A"}`,
  }

  let serviceDetails = ""

  if (order.service === "item") {
    serviceDetails = `
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Item/Service</td><td style="padding:8px 16px;color:#c9a84c;font-weight:bold;">${order.itemName || order.itemSlug || "N/A"}</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Server</td><td style="padding:8px 16px;color:#e8dcc8;">${order.itemServer || "N/A"}</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Faction</td><td style="padding:8px 16px;color:#e8dcc8;">${order.itemFaction || "N/A"}</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Quantity</td><td style="padding:8px 16px;color:#e8dcc8;">${order.itemQuantity || 1}</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Character Name</td><td style="padding:8px 16px;color:#e8dcc8;">${order.itemCharacter || "N/A"}</td></tr>
    `
  } else if (order.service === "gold") {
    serviceDetails = `
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Server / Realm</td><td style="padding:8px 16px;color:#e8dcc8;">${order.goldServer || "N/A"}</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Faction</td><td style="padding:8px 16px;color:#e8dcc8;">${order.goldFaction || "N/A"}</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Amount</td><td style="padding:8px 16px;color:#c9a84c;font-weight:bold;">${order.goldAmount?.toLocaleString() || "N/A"} Gold</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Character Name</td><td style="padding:8px 16px;color:#e8dcc8;">${order.goldCharacter || "N/A"}</td></tr>
    `
  } else if (order.service === "boosting") {
    serviceDetails = `
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Boost Type</td><td style="padding:8px 16px;color:#e8dcc8;">${order.boostType || "N/A"}</td></tr>
      ${order.boostType === "arena-rating" && order.arenaBracket ? `<tr><td style="padding:8px 16px;color:#8a7e6b;">Arena Bracket</td><td style="padding:8px 16px;color:#39d353;font-weight:bold;">${order.arenaBracket}</td></tr>` : ""}
      ${order.boostType === "arena-rating" && order.arenaRating ? `<tr><td style="padding:8px 16px;color:#8a7e6b;">Target Rating</td><td style="padding:8px 16px;color:#39d353;font-weight:bold;">${order.arenaRating}</td></tr>` : ""}
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Character Name</td><td style="padding:8px 16px;color:#e8dcc8;">${order.boostCurrentLevel || "N/A"}</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Server</td><td style="padding:8px 16px;color:#e8dcc8;">${order.boostSchedule || "N/A"}</td></tr>
      ${order.boostAddons && order.boostAddons.length > 0 ? `<tr><td style="padding:8px 16px;color:#8a7e6b;">Add-ons</td><td style="padding:8px 16px;color:#39d353;">${order.boostAddons.join(", ")}</td></tr>` : ""}
      ${order.boostProfessions && order.boostProfessions.length > 0 ? `<tr><td style="padding:8px 16px;color:#8a7e6b;">Professions</td><td style="padding:8px 16px;color:#c9a84c;">${order.boostProfessions.join(", ")}</td></tr>` : ""}
    `
  } else if (order.service === "accounts") {
    serviceDetails = `
      ${order.characterId ? `<tr><td style="padding:8px 16px;color:#8a7e6b;">Character ID</td><td style="padding:8px 16px;color:#e05d20;font-weight:bold;">#${order.characterId}</td></tr>` : ""}
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Account Type</td><td style="padding:8px 16px;color:#e8dcc8;">${order.accountType || "N/A"}</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Preferred Class</td><td style="padding:8px 16px;color:#e8dcc8;">${order.accountClass || "Any"}</td></tr>
      <tr><td style="padding:8px 16px;color:#8a7e6b;">Server</td><td style="padding:8px 16px;color:#e8dcc8;">${order.accountExpansion || "N/A"}</td></tr>
    `
  }

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#0a0a0f;font-family:Georgia,serif;">
      <div style="max-width:600px;margin:0 auto;padding:24px;">
        <div style="text-align:center;padding:24px 0;border-bottom:1px solid #2a2a3e;">
          <h1 style="color:#c9a84c;font-size:24px;margin:0;">Exodar Market</h1>
          <p style="color:#39d353;font-size:11px;letter-spacing:3px;margin:4px 0 0;text-transform:uppercase;">TBC Classic Anniversary - New Order</p>
        </div>

        <div style="padding:24px 0;">
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #2a2a3e;">
              <td style="padding:12px 16px;color:#8a7e6b;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Order ID</td>
              <td style="padding:12px 16px;color:#c9a84c;font-weight:bold;font-size:14px;">${orderId}</td>
            </tr>
            <tr style="border-bottom:1px solid #2a2a3e;">
              <td style="padding:12px 16px;color:#8a7e6b;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Service</td>
              <td style="padding:12px 16px;color:#e8dcc8;font-weight:bold;font-size:14px;">${serviceLabels[order.service]}</td>
            </tr>
          </table>
        </div>

        <div style="background:#12121a;border:1px solid #2a2a3e;border-radius:8px;padding:4px 0;margin-bottom:24px;">
          <p style="padding:8px 16px;color:#c9a84c;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0;border-bottom:1px solid #2a2a3e;">Service Details</p>
          <table style="width:100%;border-collapse:collapse;">
            ${serviceDetails}
          </table>
        </div>

        <div style="background:#12121a;border:1px solid #2a2a3e;border-radius:8px;padding:4px 0;margin-bottom:24px;">
          <p style="padding:8px 16px;color:#39d353;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0;border-bottom:1px solid #2a2a3e;">Contact Information</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 16px;color:#8a7e6b;">Email</td><td style="padding:8px 16px;color:#e8dcc8;">${order.email}</td></tr>
            <tr><td style="padding:8px 16px;color:#8a7e6b;">Discord</td><td style="padding:8px 16px;color:#e8dcc8;">${order.discord}</td></tr>
            <tr><td style="padding:8px 16px;color:#8a7e6b;">Payment Method</td><td style="padding:8px 16px;color:#e8dcc8;">${order.paymentMethod}</td></tr>
            ${order.couponCode ? `<tr><td style="padding:8px 16px;color:#8a7e6b;">Coupon Code</td><td style="padding:8px 16px;color:#c9a84c;">${order.couponCode}</td></tr>` : ""}
            ${order.notes ? `<tr><td style="padding:8px 16px;color:#8a7e6b;">Notes</td><td style="padding:8px 16px;color:#e8dcc8;">${order.notes}</td></tr>` : ""}
          </table>
        </div>

        <div style="background:#1a1a2e;border:1px solid #c9a84c;border-radius:8px;padding:16px;text-align:center;margin-bottom:24px;">
          <p style="color:#8a7e6b;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">Total Price</p>
          <p style="color:#c9a84c;font-size:28px;font-weight:bold;margin:0;">$${order.totalPrice.toFixed(2)}</p>
        </div>

        <div style="text-align:center;padding:16px 0;border-top:1px solid #2a2a3e;">
          <p style="color:#8a7e6b;font-size:11px;margin:0;">Exodar Market - WoW TBC Classic Anniversary Edition Services</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function sendOrder(
  order: OrderData
): Promise<{ success: boolean; message: string }> {
  try {
    if (!order.email || !order.discord || !order.service) {
      return { success: false, message: "Please fill in all required fields." }
    }

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey || apiKey.length < 5) {
      return {
        success: false,
        message:
          "Email service is not configured. Please contact us on Discord (exodarmarket111) to place your order manually.",
      }
    }

    const serviceLabels: Record<string, string> = {
      gold: "Gold Selling",
      boosting: "Character Boosting",
      accounts: "Accounts",
      item: `Item/Service: ${order.itemName || order.itemSlug || "N/A"}`,
    }

    // Dynamic import to avoid any top-level side effects
    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)


    const { data, error } = await resend.emails.send({
      from: "Exodar Market <onboarding@resend.dev>",
      to: "exodarmarket@proton.me",
      subject: `[TBC Classic Anniversary] New Order: ${serviceLabels[order.service]} - $${order.totalPrice.toFixed(2)}`,
      html: buildEmailHtml(order),
    })

    if (error) {
  
      return {
        success: false,
        message: "Failed to send order. Please try again or contact us on Discord (exodarmarket111).",
      }
    }

    return {
      success: true,
      message: "Order submitted successfully! We'll contact you on Discord shortly.",
    }
  } catch (err) {

    return {
      success: false,
      message: "An unexpected error occurred. Please contact us on Discord (exodarmarket111).",
    }
  }
}
