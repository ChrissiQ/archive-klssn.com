import express from 'express';

let router = express.Router();

/* GET posts listing. */
router.get('/', (req, res, next) => {
  let Post = req.models.post;

  Post.cFindAll()
    .then(posts => res.send(posts))
    .catch(err => console.error(err));
});

router.get('/:uri', (req, res, next) => {
  let uri = req.params.uri;
  let Post = req.models.post;

  Post.cFindOne({uri: uri})
  .then(post => res.send(post))
  .catch(err => console.error(err));
});

router.post('/', (req, res, next) => {
  let user = req.user;
  let Post = req.models.post;
  let PostDetail = req.models.postDetail;

  Post.create({
    uri: req.body.uri
  }).then(post => {

    PostDetail.create({
      title: req.body.title,
      content: req.body.content
    }).then(postDetail => {
      postDetail.setPost(post);
      postDetail.setUpdatedByUser(user);
      post.setCurrentDetail(postDetail);
      res.send(post);
    }).catch(err => console.error(err));

  }).catch(err => console.error(err));
});

export default router;