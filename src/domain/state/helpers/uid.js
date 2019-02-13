let prevUid = 0

function getUid () {
  return (prevUid += 1)
}

export function useInternalUid (obj) {
  if (Array.isArray(obj)) {
    return obj.map(x => useInternalUid(x))
  }

  return {
    ...obj,
    uid: getUid()
  }
}

export function splitByUid (obj) {
  let { uid } = obj
  let justUid = { uid }
  let rest = { ...obj }
  delete rest.uid
  return [justUid, rest]
}
