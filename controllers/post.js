
const  Post = require('../models/post.js')



// create post
async function postcreate(req , res){
    try{
    const postblog = new Post({
        title : req.body.title,
        content : req.body.content,
        author : req.user.id,
    })
    const blog = await postblog.save()
    res.json(blog)

    }catch(err){

        res.send('Error' + err);
    }
}



// delete post
async function postdelete(req, res) {
    try {
        const blog = await Post.findById(req.params.id); // Await the asynchronous call

        if (!blog) {
            return res.status(404).send('Post not found');
        }

        if (req.user.id !== blog.author.toString()) {
            return res.status(403).send('You are not authorized to delete this post');
        }

        await Post.deleteOne({ _id: req.params.id });
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
}



// updata post
async function postupdate(req , res){
    try{
    const blog = await Post.findById(req.params.id);
   
    if (!blog) {
        return res.status(404).send('Post not found');
    }

    if (req.user.id !== blog.author.toString()) {
        return res.status(403).send('You are not authorized to delete this post');
    }
    blog.content = req.body.content;
    blog.title = req.body.title;
    const patchvar = await blog.save();
    res.json(patchvar);
    }catch(err){
        res.send('error' + err);
    }
}

module.exports = {postcreate , postdelete , postupdate};






