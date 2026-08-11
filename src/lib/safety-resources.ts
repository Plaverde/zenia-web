// Este archivo es el ÚNICO punto editable para los recursos de emergencia por
// ciudad/país. Los componentes lo importan; no se edita código para agregar
// líneas nuevas.
// IMPORTANTE: este sitio NO es un servicio de emergencia y no ofrece
// monitoreo permanente. Las líneas aquí listadas son de referencia.
export interface EmergencyResource {
  region: string
  label: string
  numbers: { label: string; value: string; tel?: string }[]
  note: string
}

export const SAFETY_RESOURCES: EmergencyResource[] = [
  {
    region: "CO",
    label: "Colombia",
    numbers: [
      { label: "Línea 123 — Emergencias", value: "123", tel: "123" },
      { label: "Línea 106 — Salud Mental", value: "106", tel: "106" },
      { label: "SAMU 125", value: "125", tel: "125" },
    ],
    note: "Las líneas territoriales vigentes pueden variar; el profesional debe actualizar este archivo según su ciudad y país.",
  },
  {
    region: "OTRO",
    label: "Otra región",
    numbers: [],
    note: "Agregar aquí las líneas de emergencia de la región/país correspondiente.",
  },
]

export function getSafetyResources(
  region: string = "CO"
): EmergencyResource {
  return (
    SAFETY_RESOURCES.find((r) => r.region === region) ??
    SAFETY_RESOURCES.find((r) => r.region === "OTRO")!
  )
}
