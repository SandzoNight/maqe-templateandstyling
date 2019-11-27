import authorsJSON from '../data/authors.json'

const findAllAuthors = async () => {
    return authorsJSON
}
const findAuthorById = async (authorId) => {
    return authorsJSON.find((author) => author.id === authorId)
}

export default {
    findAllAuthors,
    findAuthorById,
}