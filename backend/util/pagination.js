export const getPagination = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const skip = (page - 1) * limit;

    return {
        page,
        limit,
        skip
    };
};

export const getPaginationMeta = (page, limit, total) => {
    return {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
    };
};