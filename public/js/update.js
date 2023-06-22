const updateHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#project-desc').value.trim();
    const content = document.querySelector('#content').value;
    const post_id = document.querySelector('#post-id').value;

    console.log(title, content, post_id);

    if (title && content) {
        const response = await fetch(`/api/posts/${post_id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
       if(response.ok){
          document.location.replace('/dashboard');
        }
        
        else {
          alert('Failed to create project');
        }
      }
    };

    document.querySelector('.new-project-form').addEventListener('submit', updateHandler);