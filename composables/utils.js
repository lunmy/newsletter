import {storeToRefs} from "pinia";
import {useAuthStore} from "~/store/auth";
import jwtDecode from "jwt-decode";

const hierarchy = {
  ROLE_SUPER_ADMIN: ['ROLE_ADMIN', 'ROLE_USER', 'IS_AUTHENTICATED_FULLY'],
  ROLE_ADMIN: ['ROLE_USER', 'IS_AUTHENTICATED_FULLY'],
  ROLE_USER: ['IS_AUTHENTICATED_FULLY'],
  IS_AUTHENTICATED_FULLY: [],
}
export function getIdFromIri(iri) {
  return iri.split("/").pop();
}


export function isGranted(permission, userRoles = null) {
  if (import.meta.client) {
    if(userRoles === null) {
      const {token} = storeToRefs(useAuthStore());
      const user = jwtDecode(token.value);
      if (user === undefined || user === null) {
        return false
      }

      userRoles = user.roles
    }

    if (
        userRoles === undefined ||
        userRoles === null ||
        permission === undefined
    ) {
      return false
    }

    function checkRole(role, target) {
      if (role === target) return true;
      if (!hierarchy[role]) return false;
      for (let grantedRole of hierarchy[role]) {
        if (checkRole(grantedRole, permission)) return true;
      }
      return false;
    }

    for (let role of userRoles) {
      if (checkRole(role, permission)) return true;
    }

    return false;
  }
  return false
}

export function extractTextBetweenPercents(input) {
  const regex = /%([a-zA-Z0-9_]+)%/g;
  let matches = new Set();
  let match;

  while ((match = regex.exec(input)) !== null) {
    if(match[1] === 'assets') continue;
    matches.add(match[1]);
  }
  return Array.from(matches);
}

