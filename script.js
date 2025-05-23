var inp = document.querySelector(".input");
var search = document.querySelector(".search");
var card = document.querySelector(".card");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) {
      throw new Error("User not Found!");
    }
    return raw.json();
  });
}
function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  ).then((raw) => {
    if (!raw.ok) {
      throw new Error("Failed to fetch!");
    }
    return raw.json();
  });
}
function decorateData(data) {
  var details = `<!-- Avatar -->
    <div class="flex-shrink-0">
      <img 
        src="${data.avatar_url}" 
        alt="User Avatar" 
        class="avatar w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
      />
    </div>

    <!-- Info -->
    <div class="flex-1 text-center sm:text-left">
      <h2 class="Name text-2xl font-semibold">${data.name}</h2>
      <p class="ID text-gray-400 mb-3">@${data.login}</p>
      <p class=" text-sm text-gray-300 mb-4">
       ${data.bio ? data.bio : "NO BIO"}
      </p>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 text-center sm:text-left">
        <div>
          <p class="repos text-lg font-bold text-white">${data.public_repos}</p>
          <p class="text-xs text-gray-400">Repositories</p>
        </div>
        <div>
          <p class="followers text-lg font-bold text-white">${
            data.followers
          }</p>
          <p class="text-xs text-gray-400">Followers</p>
        </div>
        <div>
          <p class="following text-lg font-bold text-white">${
            data.following
          }</p>
          <p class="text-xs text-gray-400">Following</p>
        </div>
      </div>

      <!-- Meta -->
      <div class="mt-5 space-y-1 text-sm text-gray-400">
        <p class="company" >
              <span class="text-white font-medium">Company:</span> ${
                data.company ? data.company : "N/A"
              }
  </p>
        <p class="location"><span class="text-white font-medium">Location:</span> ${
          data.location
        }</p>
        <p>
          <span class="text-white font-medium">Website:</span> <a href="https://${
            data.blog ? data.blog : "#"
          }" class="website text-blue-400 hover:underline">${
    data.blog ? data.blog : "N/A"
  }</a>
</p>
        <p>
 <span class="text-white font-medium">Twitter:</span> <a href="https://twitter.com/${
   data.twitter ? data.twitter : "N/A"
 }" class="twitter text-blue-400 hover:underline">${
    data.twitter ? `@${data.twitter}` : "N/A"
  }</a>
        </p>
      </div>
    </div>`;
  card.innerHTML = details;
}
search.addEventListener("click", () => {
  let username = inp.value.trim();
  if (username.length > 0) {
    decorateData(username);
    getProfileData(username).then((data) => {
      console.log(data);
      decorateData(data);
    });
  }
});
