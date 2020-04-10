export default {
  payload: {
    title: 'Growth mindset',
    description: 'How to demonstrate growth mindsewt',
    tags: 'education',
    category: 'Eductaion',
    body:
      'is simply dummy text of the printing and typesetting industry Lorem Ipsum has'
  },
  article: {
    title: 'Kigali the cleaniest city in Africa',
    description:
      'Kigali also known as a city of a thousand hills boasts itself with the cleaniest neighbourhood in Africa',
    body:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
  },
  createResponse: {
    articles: [
      {
        title: 'Kigali the cleaniest city in Africa',
        description:
          'Kigali also known as a city of a thousand hills boasts itself with the cleaniest neighbourhood in Africa',
        body:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
      }
    ]
  },

  returnedArticle: {
    author: {
      bio: null,
      firstName: 'Carlos',
      image: null,
      lastName: 'Gringo',
      userName: 'carlosG'
    },
    authorId: 3,
    blocked: false,
    slug: 'tech-world-becoming-a-village-2lk1kg3x3y',
    body:
      "<h2>Where can I get some?</h2><p>There are many variations of injected humour, or non-characteristic</p><figure class='image'><img src='http://res.cloudinary.com/jkadhuwa/image/upload/v1570696434/buxtk2bswoki2jhiwtr5.png'></figure>",
    category: 'Education',
    createdAt: '2019-10-10T08:34:04.511Z',
    description:
      'I like creating a fontawesome.js in the src folder and then importing that into index.js. Feel free to add this file wherever as long as the components you want to use the icons in have access (are child components).'
  },
  returnedArticleWithImage: {
    author: {
      bio: null,
      firstName: 'Carlos',
      image:
        'http://res.cloudinary.com/jkadhuwa/image/upload/v1570696434/buxtk2bswoki2jhiwtr5.png',
      lastName: 'Gringo',
      userName: 'carlosG'
    },
    authorId: 3,
    blocked: false,
    slug: 'tech-world-becoming-a-village-2lk1kg3x3y',
    body:
      "<h2>Where can I get some?</h2><p>There are ristic</p><figure class='image'><img src='http://res.cloudinary.com/jkadhuwa/image/upload/v1570696434/buxtk2bswoki2jhiwtr5.png'></figure>",
    category: 'Education',
    createdAt: '2019-10-10T08:34:04.511Z',
    description: 'I like creating a fontawesome.js in the src folder and.'
  },
  ArticleWithDeaultImage: {
    author: {
      bio: null,
      firstName: 'Carlos',
      image:
        'http://res.cloudinary.com/jkadhuwa/image/upload/v1570696434/buxtk2bswoki2jhiwtr5.png',
      lastName: 'Gringo',
      userName: 'carlosG'
    },
    authorId: 3,
    blocked: false,
    slug: 'tech-world-becoming-a-village-2lk1kg3x3y',
    body: '<h2>Where can I get some?</h2><p>There are ristic</p>',
    category: 'Education',
    createdAt: '2019-10-10T08:34:04.511Z',
    description: 'I like creating a fontawesome.js in the src folder and.'
  },
  following:
  [{
    id: 111,
    follower: 10,
    following: 2,
    updatedAt: '2019-10-24T09:01:56.240Z',
    createdAt: '2019-10-24T09:01:56.240Z'
  },
  {
    id: 222,
    username: 'username',
    following: 15,
    updatedAt: '2019-10-24T09:01:56.240Z',
    createdAt: '2019-10-24T09:01:56.240Z'
  }],
  followSucces: {
    data: {
      id: 11,
      follower: 10,
      following: 2,
      updatedAt: '2019-10-24T09:01:56.240Z',
      createdAt: '2019-10-24T09:01:56.240Z'
    }
  },
  followFail: {
    data: {
      id: 11,
      follower: 10,
      following: 2,
      updatedAt: '2019-10-24T09:01:56.240Z',
      createdAt: '2019-10-24T09:01:56.240Z'
    }
  },
  bookmarks: [{
    id: 232,
    articleId: 7,
    userId: 10,
    createdAt: '2019-11-13T08:49:16.032Z',
    updatedAt: '2019-11-13T08:49:16.032Z',
    Article: {
      slug: 'rwanda-at-a-glance-2lk2vrwhaz',
      title: 'Rwanda at a glance',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    }
  }]
};
