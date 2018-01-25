
export function getImageUrl(imgobj, size = 'xl') {
    if (!imgobj) return '';
    return imgobj.template.replace(/\{id\}/, imgobj.id).replace(/\{size\}/, size);
}
