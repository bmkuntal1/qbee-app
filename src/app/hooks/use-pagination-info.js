
const usePaginationInfo = (page, pageSize, totalItems) => {
    let from = 0;
    if (totalItems > 0) {
        from = page * pageSize - pageSize + 1;
    }
    let to = page * pageSize;
    if (totalItems < to) {
        to = totalItems;
    }
    return { from, to, total: totalItems }
}

export { usePaginationInfo }