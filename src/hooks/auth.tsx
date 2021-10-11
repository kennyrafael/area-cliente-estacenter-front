export const authHook = () => {
  return {
    hasUserSet: () => {
      const document = localStorage.getItem('document')
      if (document) {
        return true
      }

      return false
    },
    setUser: (search: string) => {
      const parseData = getQsParse(search)
      if (parseData['document']) {
        localStorage.setItem('document', parseData['document'])
      }
      return true
    },
  }
}

const getQsParse = (search: string) => {
  const qs = search ? search.substring(1) : false
  if (!qs) {
    return []
  }

  const parseData = JSON.parse(
    '{"' + qs.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    (key, value) => {
      return key === '' ? value : decodeURIComponent(value)
    }
  )

  return parseData
}
