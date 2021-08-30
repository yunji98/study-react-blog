import Post from '../../modules/post';

/*
POST /api/posts
{
  title: "제목",
  body: "내용",
  tags: ["태그1", "태그2"]
}
*/
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
GET /api/posts
*/
export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec(); // 모델 인스턴스의 find() => 데이터 조회
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
GET /api/posts/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 400; // Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
PATCH /api/posts/:id
{
  title: " 수정 제목",
  body: "수정 내용",
  tags: ["수정", "태그"]
}
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환
      //false일 때는 업데이트 되기 이전의 데이터 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
