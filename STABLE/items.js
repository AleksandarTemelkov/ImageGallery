const url = "http://localhost:8080/load";
const images = [];
const posts = [];
var data = [];

const main = async (url) => {
        // Collecting URLs of images
    const res = await fetch(url); 
    data = await res.json();

    for (var i = 0; i < data.length; i++) {
        images[i] = `http://localhost:8080/images/${data[i]}`;
    }
}

const main_extension = () => {
        // Emptying the previous posts
    posts.splice(0, posts.length);


        // Adding posts
    for (var i = 0; i < images.length; i++) {
        var item = {
            id: i + 1,
            title: `${data[i]}`,
            image: images[i]
        }
        posts.push(item);
    }


        // Generating Masonry Grid
    const container = document.querySelector(".container");

    const generateMasonryGrid = (columns, posts) => {
        container.innerHTML = '';
        console.log(posts);

            // Store all column arrays which contain the relevant posts
        let columnWrappers = {};

            // Create column item array and add this to columnWrapped object
        for (let i = 0; i < columns; i++) {
            columnWrappers[`column${i}`] = [];
        }

        for (let i = 0; i < posts.length; i++) {
            const column = i % columns; 
            columnWrappers[`column${column}`].push(posts[i]); 
        }

        console.log(columnWrappers);

        for (let i = 0; i < columns; i++) {
            let columnPosts = columnWrappers[`column${i}`];
            let column = document.createElement("div");
            column.classList.add("column");

            columnPosts.forEach(post => {
                let postDiv = document.createElement("div");
                postDiv.classList.add("post");
                let image = document.createElement("img");
                image.src = post.image;
                let overlay = document.createElement("div");
                overlay.classList.add("overlay");
                let title = document.createElement("h3");
                title.innerText = post.title.split(".")[0];
                let buttonRename = document.createElement("i");
                buttonRename.classList.add("imageRename");
                buttonRename.classList.add("fa-sharp");
                buttonRename.classList.add("fa-solid");
                buttonRename.classList.add("fa-pen");
                buttonRename.classList.add("buttonOverlay");
                buttonRename.style.marginRight = "3rem";
                let buttonDelete = document.createElement("i");
                buttonDelete.classList.add("imageDelete");
                buttonDelete.classList.add("fa-sharp");
                buttonDelete.classList.add("fa-solid");
                buttonDelete.classList.add("fa-trash");
                buttonDelete.classList.add("buttonOverlay");

                overlay.appendChild(title);
                overlay.appendChild(buttonRename);
                overlay.appendChild(buttonDelete);
                postDiv.appendChild(image);
                postDiv.appendChild(overlay);
                column.appendChild(postDiv);
            });
            container.appendChild(column);
        }
    }

    generateMasonryGrid(4, posts);


        // Screen resize
    let previousScreenSize = window.innerWidth;
    window.addEventListener("resize", () => {
        if (window.innerWidth < 576 && previousScreenSize >= 576) generateMasonryGrid(1, posts);
        else if (window.innerWidth >= 576 && window.innerWidth <= 992 && (previousScreenSize < 576 || previousScreenSize > 992)) generateMasonryGrid(2, posts);
        else if (window.innerWidth >= 992 && window.innerWidth <= 1400 && (previousScreenSize < 992 || previousScreenSize > 1400)) generateMasonryGrid(3, posts);
        else if (window.innerWidth >= 1400 && previousScreenSize < 1400) generateMasonryGrid(4, posts);
        previousScreenSize = window.innerWidth;
    });


        // Page load
    if (previousScreenSize >= 1400) generateMasonryGrid(4, posts);
    else if (previousScreenSize >= 992) generateMasonryGrid(3, posts);
    else if (previousScreenSize >= 576) generateMasonryGrid(2, posts);
    else if (previousScreenSize < 576) generateMasonryGrid(1, posts);
};

main(url).then(main_extension);