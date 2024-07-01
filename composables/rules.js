export function loginRule(value) {
  value = value.replaceAll("/", "");
  value = value.trim();
  return value.length > 0 || "doit contenir au moins 3 caractères";
}

export function passwordRule(value) {
  // use CNIL recomendation
  // todo put back when the backend will be ready
  return true;
  // const regex =
  //   /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[@&#{(\[\-|_\\)\]=}%?!\/]).{12,}$/;
  // return (
  //   regex.test(value) ||
  //   "doit contenir 12 caractères, 1 minuscule, 1 majuscule, 1chiffre, un caratère special"
  // );
}
