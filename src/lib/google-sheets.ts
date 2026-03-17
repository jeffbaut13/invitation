import { google } from "googleapis";

const SHEET_ID =
  process.env.GOOGLE_SHEET_ID ?? "1DEjNQFW62ICIjcqT7g1JeAPwCIMpG1Hdt9Ed6_BXAY0";
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME ?? "invitados";

type GuestRow = {
  rowIndex: number;
  nombre: string;
  whatsapp: string;
  detalle: string;
  asistencia: string;
  slug: string;
};

function normalizeSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function getSheetsClient() {
  const projectId = process.env.GOOGLE_SHEETS_PROJECT_ID;
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Faltan variables de entorno de Google Sheets.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    projectId,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

function mapRow(row: string[], rowIndex: number): GuestRow {
  const nombre = row[0]?.trim() ?? "";
  const whatsapp = row[1]?.trim() ?? "";
  const detalle = row[2]?.trim() ?? "";
  const asistencia = row[3]?.trim().toLowerCase() ?? "";

  return {
    rowIndex,
    nombre,
    whatsapp,
    detalle,
    asistencia,
    slug: normalizeSlug(nombre),
  };
}

export async function findGuestBySlug(slug: string) {
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:D`,
  });

  const rows = response.data.values ?? [];

  if (rows.length <= 1) {
    return null;
  }

  const dataRows = rows.slice(1);

  const guest = dataRows
    .map((row, index) => mapRow(row, index + 2))
    .find((item) => item.slug === normalizeSlug(slug));

  return guest ?? null;
}

export async function updateGuestAttendance(
  slug: string,
  decision: "asistir" | "no asistir"
) {
  const guest = await findGuestBySlug(slug);

  if (!guest) {
    return null;
  }

  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!D${guest.rowIndex}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[decision]],
    },
  });

  return {
    ...guest,
    asistencia: decision,
  };
}

export type { GuestRow };
