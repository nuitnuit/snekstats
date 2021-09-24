export function getList() {
    return fetch('/api/NCD_BMI_30A')
        .then(data => data.json())
}

export function setItem(item) {
    return fetch('/api/NCD_BMI_30A', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item })
    })
        .then(data => data.json())
}