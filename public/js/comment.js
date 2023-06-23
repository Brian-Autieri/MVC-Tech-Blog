const handleComment = async (event) => {
  event.preventDefault();
  const comment = document.querySelector("#comment").value.trim();
  const post_id = document.querySelector("#post-id").value;

  if (comment && post_id) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};
document
  .querySelector(".add-comment-form")
  .addEventListener("submit", handleComment);
// post to api comment route
// refer to post.js
