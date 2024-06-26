export function getIdFromIri(iri) {
  return iri.split("/").pop();
}
