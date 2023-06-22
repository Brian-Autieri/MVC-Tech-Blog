const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#project-desc').value.trim();
    const content = document.querySelector('#content').value;
    
    if (title && content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
     if(response.ok){
        document.location.reload();
      }
      
      else {
        alert('Failed to create project');
      }
    }
  };

  const deleteHandler = async (event) => {
    const post_id = event.target.getAttribute("data-id");
    console.log(post_id);
    const response = await fetch("/api/posts/" + post_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete post");
    }
  };

  document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);
  document
    .querySelector('.btn-danger')
    .addEventListener('click', deleteHandler);