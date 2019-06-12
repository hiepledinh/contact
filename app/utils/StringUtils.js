export function nvl(value, valueIfNull){
    if (value === null || value == null) {
        return valueIfNull;
    }
    return value;

}

export function trimInside(value) {
    return nvl(value, '').replace(/ /g, '');
}