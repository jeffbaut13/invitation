import { NextRequest, NextResponse } from "next/server";
import { updateGuestAttendance } from "@/lib/google-sheets";

type AttendanceDecision = "asistir" | "no asistir";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      slug?: string;
      decision?: AttendanceDecision;
    };

    const slug = body.slug?.trim();
    const decision = body.decision;

    if (!slug) {
      return NextResponse.json(
        { error: "El campo slug es obligatorio." },
        { status: 400 }
      );
    }

    if (decision !== "asistir" && decision !== "no asistir") {
      return NextResponse.json(
        { error: "La decision debe ser 'asistir' o 'no asistir'." },
        { status: 400 }
      );
    }

    const guest = await updateGuestAttendance(slug, decision);

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
      { error: "No fue posible actualizar la asistencia." },
      { status: 500 }
    );
  }
}
