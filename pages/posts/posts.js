import { get, deleteAxios, updateAxios } from "../../api.js";
import { show as showLoading, destroy as destroyLoading } from "../../loading";
import {
  createFilters,
  onFilter as filterPosts,
  checkStorage,
} from "../../filters.js";
import { createDialog } from "../../alertDialog.js";
const postsMain = document.getElementById("template");
const postsPage = "https://jsonplaceholder.typicode.com/posts";
let posts = [];
let postsShow = [];
let editDialog = null;
let deleteDialog = null;

const filters = [
  {
    placeholder: "Tytuł",
    type: "text",
    id: "title",
  },
  {
    placeholder: "ID Użytkownika",
    type: "number",
    id: "userId",
  },
  {
    placeholder: "Zawartość",
    type: "text",
    id: "body",
  },
  {
    type: "select",
    options: [
      {
        value: "title",
        text: "Tytuł",
      },
      {
        value: "userId",
        text: "ID użytkownika",
      },
      {
        value: "body",
        text: "Zawartość",
      },
    ],
    id: "sort",
  },
];
const loadingEl = showLoading(document.getElementById("template"), "");

async function getPosts() {
  posts = await get(postsPage);
  checkStorage();
  destroyLoading(loadingEl);
}

async function getComments(id) {
  const commentBtn = document.getElementById(`comment${id}`);
  if (commentBtn.value === "closed") {
    const el = document.getElementById(`comments${id}`);
    if (el) {
      el.remove();
    }

    const postEl = document.getElementById(`post${id}`).nextSibling;

    const commentsEl = document.createElement("div");
    commentsEl.setAttribute("id", `comments${id}`);
    commentsEl.setAttribute("class", "comments-card");
    const loadingCommentsEl = showLoading(commentsEl, "-small");
    commentsEl.appendChild(loadingCommentsEl);
    postsCard = document.getElementById("posts_card");
    if (postEl) {
      postsCard.insertBefore(commentsEl, postEl);
    } else {
      postsCard.appendChild(commentsEl);
    }
    commentsEl.style.maxHeight = `${commentsEl.scrollHeight}px`;

    const comments = await get(`${postsPage}/${id}/comments`);

    destroyLoading(loadingCommentsEl);
    for (let comment of comments) {
      commentsEl.innerHTML += `
            <div class="comment-card">
            <h3>${comment.name}</h3>
            <p>${comment.body}</p>
            <p class='small'>email: ${comment.email}</p>
            <hr>
            </div>
            `;
    }
    commentsEl.style.maxHeight = `${commentsEl.scrollHeight}px`;
    commentBtn.innerHTML =
      "Komentarze <i class='fa-solid fa-arrow-down-long'></i>";
    commentBtn.value = "opened";
  } else {
    const commentsEl = document.getElementById(`comments${id}`);
    commentsEl.style.maxHeight = "0px";
    commentBtn.innerHTML =
      "Komentarze <i class='fa-solid fa-arrow-up-long'></i>";
    commentBtn.value = "closed";
  }
}

function showPosts(postsToShow) {
  const el = document.getElementById("posts_card");
  if (el) {
    el.remove();
  }
  const postsEl = document.createElement("div");
  postsEl.setAttribute("id", "posts_card");
  postsEl.setAttribute("class", "cards_container");

  for (key in postsToShow) {
    const postCard = document.createElement("div");
    postCard.setAttribute("class", "card");
    postCard.setAttribute("id", `post${postsToShow[key].id}`);
    postCard.innerHTML = `
            <h2>${postsToShow[key].title}</h2>
            <p class="user_id">ID Użytkownika: ${postsToShow[key].userId}</p>
            <p class="content">${postsToShow[key].body}</p>
            `;

    const rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row-space");
    const innerRowEl = document.createElement("div");
    innerRowEl.setAttribute("class", "row-start");

    const removeEl = document.createElement("i");
    removeEl.setAttribute("class", "fa-solid fa-trash");
    removeEl.setAttribute("id", `remove${postsToShow[key].id}`);

    const editEl = document.createElement("i");
    editEl.setAttribute("class", "fa-regular fa-pen-to-square");
    editEl.setAttribute("id", `edit${postsToShow[key].id}`);

    innerRowEl.appendChild(removeEl);
    innerRowEl.appendChild(editEl);

    rowEl.appendChild(innerRowEl);

    const commentBtn = document.createElement("button");
    commentBtn.setAttribute("id", `comment${postsToShow[key].id}`);
    commentBtn.setAttribute("value", "closed");
    commentBtn.innerHTML =
      "Komentarze <i class='fa-solid fa-arrow-up-long'></i>";
    rowEl.appendChild(commentBtn);
    postCard.appendChild(rowEl);

    postsEl.appendChild(postCard);

    commentBtn.addEventListener("click", (e) => {
      getComments(+e.target.id.slice(7));
    });

    removeEl.addEventListener("click", (e) => {
      createRemovePost(+e.target.id.slice(6));
    });

    editEl.addEventListener("click", (e) => {
      createEditPost(+e.target.id.slice(4));
    });
  }
  postsMain.appendChild(postsEl);
}

function editPostFun() {
  const titleVal = document.getElementById("edit-title").value;
  const bodyVal = document.getElementById("edit-content").value;
  updateAxios(`${postsPage}/${this.id}`, {
    id: this.id,
    title: titleVal,
    body: bodyVal,
    userId: this.userId,
  }).then((res) => {
    if (editDialog) {
      editDialog.remove();
      editDialog = null;
    }
    if (res) {
      createSuccessDialog("Edytowano post!");
    } else {
      createErrorDialog("Nie udało się edytować postu!");
    }
  });
}

function deletePostFun() {
  deleteAxios(`${postsPage}/${this.id}`).then((res) => {
    if (deleteDialog) {
      deleteDialog.remove();
      deleteDialog = null;
    }
    if (res) {
      createSuccessDialog("Usunięto post!");
    } else {
      createErrorDialog("Nie udało się usunąć postu!");
    }
  });
}

function createEditPost(id) {
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return;
  }
  componentsEdit = [
    {
      el: "button",
      attributes: {
        class: "save_button",
      },
      eventListeners: {
        click: editPostFun.bind(post),
      },
      innerText: "Zapisz",
    },
    {
      el: "p",
      innerText: "Edytowanie posta",
    },
    {
      el: "label",
      attributes: {
        for: "edit-title",
      },
      innerText: "Tytuł",
    },
    {
      el: "input",
      attributes: {
        type: "text",
        name: "edit-title",
        id: "edit-title",
      },
      value: post.title,
    },
    {
      el: "label",
      attributes: {
        for: "edit-content",
      },
      innerText: "Zawartość",
    },
    {
      el: "textarea",
      attributes: {
        type: "text",
        name: "edit-title",
        id: "edit-content",
        rows: "10",
      },
      value: post.body,
    },
  ];
  editDialog = createDialog(componentsEdit);
}

function createRemovePost(id) {
  componentsDelete = [
    {
      el: "button",
      attributes: {
        class: "delete_button",
      },
      eventListeners: {
        click: deletePostFun.bind(id),
      },
      innerText: "Usuń",
    },
    {
      el: "span",
      attributes: {
        class: "ask-icon",
      },
      innerText: "?",
    },
    {
      el: "p",
      innerText: "Czy chcesz usunąć ten post?",
    },
  ];
  deleteDialog = createDialog(componentsDelete);
}

function createSuccessDialog(msg) {
  const succesComponents = [
    {
      el: "span",
      attributes: {
        class: "success-icon",
      },
      innerHTML: `<i class="fa-solid fa-check"></i>`,
    },
    {
      el: "p",
      innerText: msg,
    },
  ];
  createDialog(succesComponents);
}

function createErrorDialog(msg) {
  const errorComponents = [
    {
      el: "span",
      attributes: {
        class: "error-icon",
      },
      innerText: "!",
    },
    {
      el: "p",
      innerText: msg,
    },
  ];
  createDialog(errorComponents);
}

getPosts();
createFilters(filters, "posts");

window.document.addEventListener(
  "filter",
  () => {
    postsShow = filterPosts(posts);
    showPosts(postsShow);
  },
  false
);
