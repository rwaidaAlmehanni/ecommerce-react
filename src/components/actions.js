/**
 * Created by salalem on 01/10/17.
 */

export function syncAction(type, data) {
  return {
    type: type,
    payload: data
  };
}
