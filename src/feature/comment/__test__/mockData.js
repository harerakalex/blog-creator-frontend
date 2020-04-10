const longComment = `At vero eos et accusamus et iusto odio dignissimos ducimus
    qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
     et quas molestias excepturi sint occaecati cupiditate non provident, 
     similique sunt in culpa qui officia deserunt mollitia animi, id est
      laborum et dolorum fuga. Et harum quidem rerum facilis est et 
      expedita distinctio. Nam libero tempore, cum soluta nobis est 
      eligendi optio cumque nihil impedit quo minus id quod maxime placeat
       facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
       Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus 
       saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
        Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis 
        voluptatibus maiores alias consequatur aut perferendis doloribus 
        asperiores repellat.`;

export default {
  store1: {
    comment: {
      comments: [{
        id: 1,
        Commenter: {
          userName: 'Eric',
          image: 'image',
        },
        createdAt: '2019-11-01T10:47:22.872Z',
        comment: 'comment',
      }],
      commentLoading: true,
    },
    login: {
      user: {
        username: 'Eric',
      },
      isAuthenticated: true
    },
    profile: {
      profile: {
        image: 'image',
      }
    },
    getSingleArticle: {
      article: {
        id: 1,
        slug: 'does',
        title: 'Does'
      }
    },
    isEditing: true,
  },
  store2: {
    getSingleArticle: {
      article: {
        id: 1,
        slug: 'does',
        title: 'Does'
      }
    },
    comment: {
      comments: [{
        id: 1,
        Commenter: {
          userName: 'Eric',
          image: null,
        },
        createdAt: '2019-11-01T10:47:22.872Z',
        comment: longComment,
      }],
      commentLoading: false,
    },
    login: {
      user: {
        username: 'Eric',
      },
      isAuthenticated: true
    },
    profile: {
      profile: {
        image: null,
      }
    },
    isEditing: true,
  },
  store3: {
    getSingleArticle: {
      article: {
        id: 1,
        slug: 'does',
        title: 'Does'
      }
    },
    comment: {
      comments: [{
        id: 1,
        Commenter: {
          userName: 'Eric',
          image: 'image',
        },
        createdAt: '2019-11-01T10:47:22.872Z',
        comment: longComment,
      }],
      commentLoading: true,
    },
    login: {
      user: {
        username: null,
      },
    },
    profile: {
      profile: {
        image: null,
      }
    },
    isEditing: false,
  },
  store5: {
    getSingleArticle: {
      article: {
        id: 1,
        slug: 'does',
        title: 'Does'
      }
    },
    comment: {
      comments: [],
      commentLoading: true,
    },
    login: {
      user: {
        username: 'eric',
      },
      isAuthenticated: true
    },
    isAuthenticated: true,
    profile: {
      profile: {
        image: 'image',
      }
    },
    isEditing: false,
  },
  comments: [
    {
      id: 1,
      Commenter: {
        userName: 'Eric',
        image: null,
      },
      createdAt: '2019-11-01T10:47:22.872Z',
      comment: longComment,
    },
    {
      id: 2,
      Commenter: {
        userName: 'Placide',
        image: null,
      },
      createdAt: '2019-11-01T10:47:22.872Z',
      comment: 'Placide has commented',
    }
  ]
};
