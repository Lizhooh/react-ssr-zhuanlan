
export function getImageUrl(imgobj, size = 'xl') {
    if (!imgobj) return '';
    return imgobj.template.replace(/\{id\}/, imgobj.id).replace(/\{size\}/, size);
}

export function leaveOut(str, n) {
    return str.length > n ? str.slice(0, n) + '...' : str;
}

export function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
