import Admin from "../models/Admin.js"
import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE   
export const createPost = async (req, res, next) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            report: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post.sort((a, b) => {
            return b.createdAt - a.createdAt;
        }
        ));
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

//READ

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();

        // (post.sort((a, b) => {
        //     return b.createdAt - a.createdAt;
        // }
        // ));

        // res.status(200).json(post);
        res.status(200).json(post.sort((a, b) => {
            return b.createdAt - a.createdAt;
        }
        ));
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

//UPDATE

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


export const reportPost = async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.body.loggedInUserId;
        const post = await Post.findById(id);
        const isReported = post.report.get(loggedInUserId);




        if (isReported) {
            console.log("once reported");
            res.status(200).send({
                success: false,
                message: "This Post, You Have Reported Once",
            });
        } else {
            post.report.set(loggedInUserId, true);



            const user = await User.findById(loggedInUserId)
            console.log(user, "user adda ");

            const admin = await Admin.findOne();
            const unseenNotifications = admin.unseenNotifications;

            unseenNotifications.push({
                type: "New Report",
                message: `${user.firstName} ${user.lastName} has reported an post Id ${id} of ${post.firstName} ${post.lastName}`,
                data: {
                    userId: user._id,
                    message: `${user.firstName} ${user.lastName} has reported an post Id ${id} of ${post.firstName} ${post.lastName}`
                },

            });
            console.log(admin, "ith admin addda");

            await Admin.findByIdAndUpdate(admin._id, { unseenNotifications });
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { report: post.report },
                { new: true }
            );

            res.status(200).send({
                success: true,
                message: "Reported successfully",
            });
        }




    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


export const commentPost = async (req, res) => {
    try {

        const postId = req.body.postId
        const comments = {
            username: req.body.userName,
            comment: req.body.comment
        }

        await Post.updateOne({ _id: postId }, {
            $push: {
                comments
            }
        })
        const newCommentPost = await Post.findById(postId);

        res.status(200).json({ message: 'Posts', success: true, newCommentPost });

    } catch (err) {
        res.status(409).json({ message: err.message });
    }

}






export const getPostForDelete = async (req, res) => {

    try {
        let posts = await Post.find()


        const formattedPosts = posts.map(
            ({ _id, userId }) => {
                return { _id, userId };
            }
        );
        res.status(200).json({ message: 'Posts', success: true, formattedPosts })
    } catch (error) {
        res.status(500).json({ error: error.message, message: "error while fetching posts", success: false })
    }
}


export const deletePost = async (req, res) => {
    try {
        const { postId } = req.body
        console.log(postId, 'postid');


        let deletePost = await Post.deleteOne({ _id: postId })
        if (deletePost) {
            let posts = await Post.find()

            const newposts = posts.map(
                ({ _id }) => {
                    return { _id };
                }
            )

            res.status(200).json({ newposts, message: "Post Deleted Successfully", success: true });

        } else {
            console.log("error");
        }



    } catch (error) {
        res.status(500).json("hello" + error.message);
    }
}




export const editPostdescription = async (req, res) => {
    try {
        const { description, postId } = req.body
        console.log(postId, 'postid');
        console.log(description, 'description');



        let updateDescription = await Post.findByIdAndUpdate(postId, { description: description }, { new: true })
        if (updateDescription) {
            console.log(updateDescription, 'kittunath');

            res.status(200).json({ updateDescription, message: " Post edited", success: true });

        } else {
            console.log("error");
        }



    } catch (error) {
        res.status(500).json("hello" + error.message);
    }
}



export const getReportedPosts = async (req, res) => {

    try {
        let posts = await Post.find()

        const formattedPosts = posts.map(

            ({ _id, firstName, location, report }) => {

                return { _id, firstName, location, report };

            }
        );
        const formattedReports = posts.map(

            ({ report }) => {

                return { report };

            }
        );
        res.status(200).json({ message: 'Users', success: true, formattedPosts, formattedReports })



    } catch (error) {
        res.status(500).json({ error: error.message, message: "error while fetching users", success: false })
    }
}