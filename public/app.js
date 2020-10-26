
const app = new Vue({
    el: '#app',
    data: {
        url: '',
        slug: '',
        created: null,
        error: ''
    },
    methods: {
        async createUrl() {
            this.slug = this.slug.toLowerCase();
	    const response = await fetch('/url', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    url: this.url,
                    slug: this.slug
                })
            });
            this.created = await response.json();
        }
    }
});

// var button = document.getElementById("submitButton");
// button.addEventListener("click", function(event) {
//     event.preventDefault();
//     createUrl();
// });

// async function createUrl() {

//     var url = document.getElementById("url").value;
//     var slug = document.getElementById("slug").value;

//     // const response = await fetch('/url', {
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type' : 'application/json',
//     //     },
//     //     body: JSON.stringify({
//     //         url: url,
//     //         slug: slug
//     //     })
//     // });
//     // var created = await response.json();

//     var xhr = new XMLHttpRequest();
    
//     xhr.open("POST", window.location.href + "url", true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             var json = JSON.parse(xhr.responseText);
//             console.log(json.slug + ", " + json.url);
//         }
//     };
//     var data = JSON.stringify({"url": url, "slug": slug});
//     xhr.send(data);
// }
