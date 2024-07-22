export function loginRule(value) {
  value = value.replaceAll("/", "");
  value = value.trim();
  return value.length > 0 || "doit contenir au moins 3 caractères";
}

export function emailRule(value) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return  regex.test(value) || "L'adresse email n'est pas valide !";
}

export function textRule(value) {
  return  !!value || 'Le champ ne doit pas être vide !'
}

export function phoneRule(value) {
  const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/im;
  return  regex.test(value) || "Le numéro de téléphone n'est pas valide !";
}

export function passwordRule(value) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/;

  if(value.length < 12 ){
    return "Le mot de passe doit contenir au moins 12 caractères !";
  }

  return regex.test(value) || "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial !";
}


export function fileRule(value) {
  if (value === null) {
    return "Veuillez sélectionner un fichier !";
  }

  return !!value || "Type de fichier non pris en charge !";
}
