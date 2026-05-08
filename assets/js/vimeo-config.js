// MAPEO DE VIDEOS VIMEO
// Actualiza este objeto con los IDs correctos proporcionados por el usuario
const VIMEO_MAP = {
  'historias/intro.html': '884660721',                    // Actualizar con ID real
  'historias/alexa-y-sofia.html': null,                  // Por confirmar
  'historias/amelia.html': null,                         // Por confirmar
  'historias/ana.html': null,                            // Por confirmar
  'historias/ángela.html': null,                         // Por confirmar
  'historias/lia-y-vera.html': null,                     // Por confirmar
  'historias/final.html': null,                          // Por confirmar
  'laboratorio-de-creación/videos-de-convocatoria.html': null,  // Por confirmar
  'cortometraje.html': null,                             // Por confirmar
};

function getVimeoUrl(page) {
  const id = VIMEO_MAP[page];
  if (!id) return null;
  return `https://player.vimeo.com/video/${id}`;
}
