export function createHoverDescription(obj) {
    let content = ``
    content += `<h2>${obj.name}</h2>`
    content += `<p>${obj.description}</p>`
    if(obj.maxAp) content += `<p><b>AP:</b> ${obj.maxAp}</p>`
    return content
}