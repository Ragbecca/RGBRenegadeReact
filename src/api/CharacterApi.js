import { instance } from "./AuthApi";
import { bearerAuth } from "../misc/Helpers";

export function createCharacter(user, character) {
  return instance.post(`/api/character/create`, character, {
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

export function getRaces(user) {
  return instance.get(`/api/character/races`, {
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

export function adminAcceptCharacter(user, username) {
  return instance.get(`/api/character/admin/accept?username=${username}`, {
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

export function adminDeleteCharacter(user, username) {
  return instance.get(`/api/character/admin/delete?username=${username}`, {
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

export function viewSingleCharacter(user, username) {
  return instance.get(`/api/character/view/single?username=${username}`, {
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

export function viewAcceptedCharacters(user) {
  return instance.get(`/api/character/view/all/accepted`, {
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

export function viewNonAcceptedCharacters(user) {
  return instance.get(`/api/character/view/all/non-accepted`, {
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

export function viewAllCharacters(user) {
  return instance.get(`/api/character/view/all`, {
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}
