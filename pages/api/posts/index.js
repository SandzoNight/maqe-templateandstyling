import postService from '../../../services/posts'

export default async (req, res) => {
    const { pageNumber, pageSize } = req.query
    res.status(200).json({
        data: await postService.getAllPosts(pageNumber, pageSize),
    })
}