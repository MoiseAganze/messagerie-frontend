export function whoIsFriend(user_id, tab) {
  if (tab[0]._id == user_id) {
    return tab[1];
  } else {
    return tab[0];
  }
}
