export function variablesTypes() {
    return [
        {key: 'STRING', label: 'Texte court'},
        {key: 'TEXT', label: 'Texte'},
        {key: 'RICHTEXT', label: 'Texte enrichi'},
        {key: 'HTML', label: 'Texte HTML'},
        {key: 'IMAGE', label: 'Image'},
        {key: 'COLOR', label: 'Couleur'},
    ]
}

export function newsletterStatus() {
    return [
        {key: 'CANCELED', label: 'Annulée'},
        {key: 'DRAFT', label: 'Brouillon'},
        {key: 'VALIDATED', label: 'Validé'},
        {key: 'DELIVERED', label: 'Envoyée'},
    ]
}

export function userRoles() {
    return [
        {key: 'ADMIN', label: 'Administrateur'},
        {key: 'USER', label: 'Editeur'},
        {key: 'SUPER_ADMIN', label: 'Super administrateur'},
    ]
}

