import fetch from 'isomorphic-fetch'

export const fetchInstance = {
  fetch(method, url, data, options = {}) {
    const opts = {
      ...options,
      method,
      headers: { ...options.headers, 'Content-Type': 'application/json' },
    }
    if (data) opts.body = JSON.stringify(data)

    return fetch(url, opts).then(r => {
      if (r.status >= 400) {
        return r.json().then(data => {
          throw { ...data.error, status: r.status }
        })
      } else {
        return r.json()
      }
    })
  },

  get(url, options = {}) {
    return this.fetch('GET', url, null, options)
  },
  post(url, data, options = {}) {
    return this.fetch('POST', url, data, options)
  },
  patch(url, data, options = {}) {
    return this.fetch('PATCH', url, data, options)
  },
}
