export default (current, arr)=> {
    var obj = {}
    arr.forEach((key) => {
        obj[key] = current[key]
    })
    return obj
}