export function processUserData() {
    return {
        getUserObj: addUniqIdToObjects
    }

    function addUniqIdToObjects(request) {
        return Object.entries(request.data).map(([id, obj]) => {
            return {
                id: Number(id),
                ...obj
            };
        })
    }
}
