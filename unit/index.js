
export function getImageUrl(imgobj = {}, size = 'xl') {
    if (!imgobj) return '';
    return imgobj.template.replace(/\{id\}/, imgobj.id).replace(/\{size\}/, size);
}

export function leaveOut(str = '', n = 0) {
    if (str.length === 0) return '这同学很懒，什么介绍都没写。';
    return str.length > n ? str.slice(0, n) + '...' : str;
}

export function toThousands(num = 0) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

