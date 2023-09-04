export function createHoverDescription(obj) {
    let content = ``
    content += `<h2>${obj.name}</h2>`
    content += `<p>${obj.description}</p>`
    content += `<p><b>AP:</b> ${obj.maxAp}</p>`
    return content
}