export default function initFetch(baseUrl) {
  async function get(url) {
    let response = await fetch(baseUrl + url);
    if (response.ok) {
      let result = await response.json();
      return result;
    }
  }

  async function getCurrentNote(url, id) {
    let response = await fetch(baseUrl + url + id);
    if (response.ok) {
      let result = await response.json();
      return result;
    }
  }

  async function post(url, body) {
    let response = await fetch(baseUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    let result = await response.json();
    return result;
  }

  async function put(url, body) {
    let response = await fetch(baseUrl + url + body.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    let result = await response.json();
    return result;
  }

  async function del(url, id) {
    let response = await fetch(baseUrl + url + id, {
      method: 'DELETE'
    });
    let result = await response.json();
    return result;
  }

  return { get, getCurrentNote, post, put, del };
}
