var a = fetch(
  `${document.location.href.split("?")[0].split("issues")[0] + "projects"}`
).then(function(response) {
  var projectsData = response.text().then(function(res) {
    return res;
  });
  projectsData
    .then(d => {
      return (projectsData = `${d}`);
    })
    .then(
      run =>
        (a = projectsData.split(`<h4 class="mb-1">`).map(a => {
          if (a.split(`" class="link-gray-dark mr-1">`)[1] != undefined) {
            return [
              a.split(`" class="link-gray-dark mr-1">`)[1].split("</a>")[0],
              a.split(`" class="link-gray-dark mr-1">`)[0].split("projects/")[1]
            ];
          }
        }))
    );
});

function styleIssue(data, n) {
  var h3 = document.createElement("a");
  h3.className = "issues_project";
  count = 0;

  data
    .split("160px;")
    .map(a => {
      return a.split(">")[1];
    })
    .map(a => {
      if (a.includes("</span")) {
        return count++;
      }
    });

  if (count === 1) {
    res = data
      .split("160px;")[1]
      .split(">")[1]
      .split("</span")[0];
    var def = document.getElementById(`issue_${n}_link`).innerHTML;
    let num;
    a.forEach(a => {
      if (a == undefined) {
      } else if (a[0] == res) {
        num = a[1];
      }
    });
    var href =
      document.location.href.split("?")[0] +
      "?q=is%3Aopen+is%3Aissue+project%3A" +
      document.location.href.split("?")[0].split("/")[3] +
      "%2F" +
      document.location.href.split("?")[0].split("/")[4] +
      "%2F" +
      `${num}`;
    document.getElementById(
      `issue_${n}_link`
    ).innerHTML = `[<a class="link-gray-dark v-align-middle no-underline h4 js-navigation-open" href=${href}>${res}</a>] ${def}`;
  } else if (count > 1) {
    for (var i = 1; i < count + 1; i++) {
      res = data
        .split("160px;")
        [i].split(">")[1]
        .split("</span")[0];
      var def = document.getElementById(`issue_${n}_link`).innerHTML;
      let num;
      a.forEach(a => {
        if (a == undefined) {
        } else if (a[0] == res) {
          num = a[1];
        }
      });
      var href =
        document.location.href.split("?")[0] +
        "?q=is%3Aopen+is%3Aissue+project%3A" +
        document.location.href.split("?")[0].split("/")[3] +
        "%2F" +
        document.location.href.split("?")[0].split("/")[4] +
        "%2F" +
        `${num}`;
      document.getElementById(
        `issue_${n}_link`
      ).innerHTML = `[<a class="link-gray-dark v-align-middle no-underline h4 js-navigation-open" href=${href}>${res}</a>] ${def}`;
    }
  }
}

function github() {
  arr = Array.from(document.querySelectorAll(".Box-row")).map(a => {
    if (a.innerText.split("#")[1] != undefined) {
      return a.innerText.split("#")[1].split(" ")[0];
    }
  });

  arr.map(n => {
    fetch(`${document.location.href.split("issues")[0]+"issues"}/${n}`).then(function(
      response
    ) {
      var data = response.text().then(function(res) {
        return res;
      });
      data
        .then(d => {
          return (data = `${d}`);
        })
        .then(run => this.styleIssue(data, n));
    });
  });
}
window.github();
