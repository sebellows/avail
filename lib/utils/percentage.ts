export const percentage = (num: number, den: number): string => {
    const ratio = Number.parseFloat(String((num / den) * 100));
    let ratioStr = `${ratio}`;
    if (
    	ratioStr.split('.').length > 1 &&
        ratioStr.split('.')[1].length > 3
    ) {
        ratioStr = ratio.toFixed(3);
    }
    return `${ratioStr}%`;
}
