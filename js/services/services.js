const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })
    return await res.json()

} 

const getResources = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Произошла ошибка, данные по адресу ${url} не были
                            загружены статус ошибки: ${res.status}`)
    }
    return await res.json()
}


export {
    postData,
    getResources
}