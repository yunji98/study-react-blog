import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

const post = new Router(); // /api/posts/:id
posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);

// 검증 미들웨어 추가
/*posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read);
posts.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove);
posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update);*/

//상단 리팩토링
posts.use('/:id', postsCtrl.checkObjectId, post.routes());

export default posts;
