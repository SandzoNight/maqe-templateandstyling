import postsJSON from '../data/posts.json'

const findAllPosts = async (pageNumber, pageSize) => {
    if(pageNumber && pageSize) {
        --pageNumber
        return postsJSON.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize )
    }
    return postsJSON
}
const findPostById = async (postId) => {
    postId = parseInt(postId)
    return postsJSON.find((post) => post.id === postId)
}

export default {
    findAllPosts,
    findPostById,
}