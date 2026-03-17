import { NextRequest, NextResponse } from "next/server";
import { findGuestBySlug } from "@/lib/google-sheets";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim();

  if (!slug) {
    return NextResponse.json(
      { error: "El parametro slug es obligatorio." },
      { status: 400 }
    );
  }

  try {
    const guest = await findGuestBySlug(slug);

    if (!guest) {
      return NextResponse.json(
        { error: "Invitado no encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      nombre: guest.nombre,
      detalle: guest.detalle,
      asistencia: guest.asistencia,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "No fue posible consultar el invitado." },
      { status: 500 }
    );
  }
}
